/**
 * Shared Gemini drafting helper for campaign agents.
 *
 * Guards learned the hard way (Jul 4):
 * - thinkingBudget: 0 — Flash's thinking silently eats maxOutputTokens and
 *   truncates the visible text mid-word.
 * - finishReason must be STOP; anything else = incomplete draft, reject.
 * - Output must end in sentence punctuation.
 * - Sycophant openers rejected (Absolutely / Spot on / Totally agree...) —
 *   banned by CONTENT_RULES, Gemini produces them anyway under agreement.
 * - Em/en dashes stripped defensively after a one-shot regeneration.
 */

const OPENER_BAN =
  /^(absolutely|totally agree|exactly|spot on|great (point|post|take)|you hit the nail|agreed|so true|100%|couldn't agree|well said|this[.!]|love this)/i;

// banned scaffolds from CONTENT_RULES — Gemini reaches for these under pressure
const SCAFFOLD_BAN =
  /(isn't just [^.]{3,40}, it's|is not just [^.]{3,40}, it is|the real (game|question|problem|shift) is|stop doing [^.]+\. start)/i;

export async function draftWithGemini({ system, user, maxChars = 240, attempts = 2 }) {
  let lastIssue = "";
  for (let i = 0; i < attempts; i++) {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [
            {
              parts: [
                {
                  text:
                    user +
                    (lastIssue
                      ? `\n\nYour previous draft was rejected: ${lastIssue}. Fix that specifically.`
                      : ""),
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.9,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      },
    );
    if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const data = await res.json();
    const cand = data.candidates?.[0];
    let text = (cand?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
    text = text.replace(/^["']|["']$/g, "").replace(/\s*[—–]\s*/g, ", ").trim();

    if (cand?.finishReason && cand.finishReason !== "STOP") {
      lastIssue = "it was cut off before completion";
      continue;
    }
    if (!/[.!?…"')\]]$/.test(text)) {
      lastIssue = "it did not end with a complete sentence";
      continue;
    }
    if (OPENER_BAN.test(text)) {
      lastIssue = "it opened with generic agreement, banned by the content rules; start with substance instead";
      continue;
    }
    if (SCAFFOLD_BAN.test(text)) {
      lastIssue = "it used a banned scaffold pattern (like: isn't just X, it's Y / the real game is); say it plainly instead";
      continue;
    }
    if (text.length > maxChars) {
      lastIssue = `it was ${text.length} characters; the hard limit is ${maxChars}`;
      continue;
    }
    return text;
  }
  return null; // caller skips this target
}
