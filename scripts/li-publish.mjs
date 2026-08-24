#!/usr/bin/env node
/**
 * LinkedIn publisher — posts today's content-bank/li/YYYY-MM-DD/post.md
 * via Composio REST (LINKEDIN_CREATE_LINKED_IN_POST). No browser.
 *
 * Env: COMPOSIO_REST_API_KEY, COMPOSIO_LINKEDIN_ACCOUNT_ID
 * Usage:
 *   node scripts/li-publish.mjs            — publish today's bank post
 *   node scripts/li-publish.mjs <file.md>  — publish a specific file
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import path from "node:path";

const AUTHOR = "urn:li:person:q_REAAY3_T";
const ENTITY = "ruchit";
const DIR = "distribution/first-ten-customers-for-a-b2b-ai-startup";

const apiKey = process.env.COMPOSIO_REST_API_KEY;
const accountId = process.env.COMPOSIO_LINKEDIN_ACCOUNT_ID;
if (!apiKey || !accountId) {
  console.error("Missing COMPOSIO_REST_API_KEY / COMPOSIO_LINKEDIN_ACCOUNT_ID — skipping.");
  process.exit(0);
}

const IST_OFFSET_MIN = 330;
const today = new Date(Date.now() + IST_OFFSET_MIN * 60000).toISOString().slice(0, 10);

let file = process.argv[2];
let stateFile = null;
if (!file) {
  const dir = path.join("content-bank", "li", today);
  file = path.join(dir, "post.md");
  stateFile = path.join(dir, "posted.json");
  if (!existsSync(file)) {
    console.log(`No LinkedIn bank post for ${today}.`);
    process.exit(0);
  }
  if (existsSync(stateFile)) {
    console.log(`${today} LinkedIn post already published.`);
    process.exit(0);
  }
}

const commentary = readFileSync(file, "utf8").trim();
if (commentary.length < 100) {
  console.error("Post suspiciously short — refusing.");
  process.exit(1);
}

// Composio's LINKEDIN_CREATE_LINKED_IN_POST pins a dead LinkedIn-Version
// (20241101 → 426). Use Composio's raw proxy with a current version instead.
const LINKEDIN_VERSION = "202606";

async function liProxy(endpoint, method, body) {
  const r = await fetch("https://backend.composio.dev/api/v3/tools/execute/proxy", {
    method: "POST",
    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      connected_account_id: accountId,
      endpoint, method, body,
      parameters: [
        { name: "LinkedIn-Version", type: "header", value: LINKEDIN_VERSION },
        { name: "X-Restli-Protocol-Version", type: "header", value: "2.0.0" },
      ],
    }),
  });
  return { ok: r.ok, data: await r.json() };
}

// Optional image: an image.png beside the post file gets attached. The flow
// (verified 2026-08-24): initializeUpload via proxy -> signed uploadUrl that
// accepts an unauthenticated binary PUT (201) -> attach the image urn.
// Any failure falls back to a text-only post rather than blocking.
let postContent = null;
const imgPath = path.join(path.dirname(file), "image.png");
if (existsSync(imgPath)) {
  try {
    const init = await liProxy("/rest/images?action=initializeUpload", "POST",
      { initializeUploadRequest: { owner: AUTHOR } });
    const v = init.data?.data?.value ?? init.data?.value;
    if (v?.uploadUrl && v?.image) {
      const up = await fetch(v.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/octet-stream" },
        body: readFileSync(imgPath),
      });
      if (up.status >= 200 && up.status < 300) {
        postContent = { media: { id: v.image } };
        console.log(`image attached: ${v.image}`);
      } else console.error(`image PUT ${up.status}; posting text-only`);
    } else console.error(`initializeUpload odd response; posting text-only: ${JSON.stringify(init.data).slice(0, 200)}`);
  } catch (e) { console.error(`image flow failed (${e.message}); posting text-only`); }
}
const res = await fetch("https://backend.composio.dev/api/v3/tools/execute/proxy", {
  method: "POST",
  headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
  body: JSON.stringify({
    connected_account_id: accountId,
    endpoint: "/rest/posts",
    method: "POST",
    body: {
      author: AUTHOR,
      commentary,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED",
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
      ...(postContent ? { content: postContent } : {}),
    },
    parameters: [
      { name: "LinkedIn-Version", type: "header", value: LINKEDIN_VERSION },
      { name: "X-Restli-Protocol-Version", type: "header", value: "2.0.0" },
    ],
  }),
});

const data = await res.json();
const status = data.status ?? res.status;
if (!res.ok || status >= 300) {
  console.error(`LinkedIn post failed: ${JSON.stringify(data).slice(0, 500)}`);
  process.exit(1);
}

const location = data.headers?.location ?? "";
const urn = decodeURIComponent(location.replace("/posts/", "")) || "urn-unknown";
const url = urn !== "urn-unknown" ? `https://www.linkedin.com/feed/update/${urn}/` : "";

if (stateFile) {
  writeFileSync(stateFile, JSON.stringify({ urn, url, at: new Date().toISOString() }, null, 2));
}

const nowIst = new Date(Date.now() + IST_OFFSET_MIN * 60000).toISOString().replace("Z", "+05:30");
appendFileSync(
  `${DIR}/post-stats-registry.md`,
  `| ${today}-li-native | LinkedIn | native_post | ${urn} | ${url} |  | ${nowIst} | Composio REST (own project) |  |  |  |  |  | active | Auto-published from content bank. |\n`,
);

console.log(`LinkedIn post live: ${url || urn}`);
