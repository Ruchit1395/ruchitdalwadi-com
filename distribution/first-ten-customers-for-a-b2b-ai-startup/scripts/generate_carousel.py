from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase.pdfmetrics import stringWidth


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "carousel" / "first-ten-customers-carousel.pdf"

W, H = 1080, 1350
MARGIN = 86

BG = colors.HexColor("#F7F3EA")
INK = colors.HexColor("#151515")
MUTED = colors.HexColor("#5E5A50")
ACCENT = colors.HexColor("#0F7A5F")
LINE = colors.HexColor("#D8D0C0")


SLIDES = [
    {
        "kicker": "B2B AI GTM",
        "title": "The first 10 AI customers are not bought.",
        "body": ["They are recruited."],
        "footer": "1 / 9",
    },
    {
        "kicker": "Why normal SaaS advice breaks",
        "title": "Most GTM playbooks assume the wrong world.",
        "body": [
            "The product is deterministic.",
            "The buyer knows the workflow.",
            "The demo represents reality.",
            "Early AI startups usually have none of these.",
        ],
        "footer": "2 / 9",
    },
    {
        "kicker": "Move 1",
        "title": "Pick a workflow you can run live in a meeting.",
        "body": [
            '"We help analysts" is not a wedge.',
            '"We turn this exact input into the output your team signs off on" is a wedge.',
            "Specificity closes.",
        ],
        "footer": "3 / 9",
    },
    {
        "kicker": "Move 2",
        "title": "Trade integration work for design-partner rights.",
        "body": [
            "Build the integration.",
            "Get weekly feedback.",
            "Negotiate the right to generalize what you learn.",
            "Without that last part, it becomes custom consulting.",
        ],
        "footer": "4 / 9",
    },
    {
        "kicker": "Move 3",
        "title": "Charge real money on day one.",
        "body": [
            "Free pilots create polite feedback.",
            "Small paid pilots create honest feedback.",
            "The amount matters less than the fact that the customer made a real decision.",
        ],
        "footer": "5 / 9",
    },
    {
        "kicker": "Move 4",
        "title": "One founder owns the whole loop.",
        "body": [
            "Cold note.",
            "Demo.",
            "Integration.",
            "Onboarding.",
            "30-day check-in.",
            "Do not outsource the learning too early.",
        ],
        "footer": "6 / 9",
    },
    {
        "kicker": "The uncomfortable truth",
        "title": "Your first customers pay for founder attention.",
        "body": [
            "That is fine.",
            "The startup question is whether that attention becomes repeatable product learning.",
        ],
        "footer": "7 / 9",
    },
    {
        "kicker": "Ready for customer 11?",
        "title": "Scale only when these four things are true.",
        "body": [
            "You can predict who will sign.",
            "The integration takes days, not weeks.",
            "The customer's success metric is legible.",
            "You know who you should not sell to.",
        ],
        "footer": "8 / 9",
    },
    {
        "kicker": "Full essay",
        "title": "The first 10 customers are the product.",
        "body": [
            "I wrote the full playbook on my site.",
            "Link in the post comments.",
        ],
        "footer": "9 / 9",
    },
]


def wrap_line(text, font, size, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = f"{line} {word}".strip()
        if stringWidth(test, font, size) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_wrapped(c, text, x, y, font, size, leading, max_width, fill):
    c.setFont(font, size)
    c.setFillColor(fill)
    for line in wrap_line(text, font, size, max_width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_slide(c, slide):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    c.setFillColor(ACCENT)
    c.rect(MARGIN, H - 150, 72, 8, fill=1, stroke=0)

    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(ACCENT)
    c.drawString(MARGIN, H - 210, slide["kicker"].upper())

    y = H - 310
    y = draw_wrapped(c, slide["title"], MARGIN, y, "Helvetica-Bold", 70, 78, W - 2 * MARGIN, INK)
    y -= 56

    for item in slide["body"]:
        c.setFillColor(ACCENT)
        c.circle(MARGIN + 9, y + 15, 7, fill=1, stroke=0)
        y = draw_wrapped(c, item, MARGIN + 34, y, "Helvetica", 34, 46, W - 2 * MARGIN - 34, MUTED)
        y -= 24

    c.setStrokeColor(LINE)
    c.setLineWidth(2)
    c.line(MARGIN, 112, W - MARGIN, 112)

    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(MUTED)
    c.drawString(MARGIN, 70, "Ruchit Dalwadi")
    c.setFont("Helvetica", 22)
    c.drawRightString(W - MARGIN, 70, slide["footer"])


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(W, H))
    c.setTitle("First ten customers for a B2B AI startup")
    for slide in SLIDES:
        draw_slide(c, slide)
        c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__":
    main()
