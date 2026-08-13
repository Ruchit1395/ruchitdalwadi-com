#!/usr/bin/env python3

import csv
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / "POST_BANK.md"
QUEUE = ROOT / "POST_QUEUE.csv"
REQUIRED_ASSETS = (
    ROOT / "README.md",
    ROOT / "SERIES_STRATEGY.md",
    ROOT / "PUBLIC_EVIDENCE_LEDGER.md",
    ROOT / "PRIVACY_AND_LANGUAGE_RULES.md",
    ROOT / "RUNBOOK.md",
)


def fail(message: str) -> None:
    raise SystemExit(f"FAIL {message}")


text = BANK.read_text(encoding="utf-8")

for asset in REQUIRED_ASSETS:
    if not asset.exists():
        fail(f"missing campaign asset: {asset.name}")

parts = re.split(r"(?m)^## Day (\d+): (.+)$", text)
posts = []
for index in range(1, len(parts), 3):
    posts.append((int(parts[index]), parts[index + 1], parts[index + 2].strip()))

if len(posts) != 40:
    fail(f"expected 40 posts, found {len(posts)}")

if [day for day, _, _ in posts] != list(range(1, 41)):
    fail("post day numbers are not continuous from 1 to 40")

for day, title, body in posts:
    if not 350 <= len(body) <= 900:
        fail(f"day {day} body length is {len(body)}, expected 350 to 900")
    if "—" in body or "–" in body:
        fail(f"day {day} contains a banned dash")
    if re.search(r"https?://|www\.", body, flags=re.I):
        fail(f"day {day} contains a link")
    if re.search(r"(?<!\w)#[A-Za-z]", body):
        fail(f"day {day} contains a hashtag")
    for phrase in (
        "game-changer",
        "revolutionary",
        "insane",
        "unlock",
        "leverage",
        "seamless",
        "paradigm",
        "thought leadership",
        "the future is here",
        "we built",
        "our team",
        "our company",
        "our customers",
        "after a year",
    ):
        if re.search(rf"(?<![a-z]){re.escape(phrase)}(?![a-z])", body.lower()):
            fail(f"day {day} contains banned phrase: {phrase}")

with QUEUE.open(newline="", encoding="utf-8") as handle:
    rows = list(csv.DictReader(handle))

if len(rows) != 40:
    fail(f"expected 40 queue rows, found {len(rows)}")

required = {
    "day",
    "topic_id",
    "title",
    "x_status",
    "x_posted_at_ist",
    "x_url",
    "linkedin_status",
    "linkedin_posted_at_ist",
    "linkedin_url",
    "notes",
}
if set(rows[0]) != required:
    fail("queue headers do not match the runbook contract")

for (day, title, _), row in zip(posts, rows):
    if int(row["day"]) != day or row["title"] != title:
        fail(f"queue mismatch on day {day}")
    if row["x_status"] not in {"pending", "posted", "blocked"}:
        fail(f"invalid X status on day {day}")
    if row["linkedin_status"] not in {"pending", "posted", "blocked"}:
        fail(f"invalid LinkedIn status on day {day}")
    if row["topic_id"] != f"AI-{day:02d}":
        fail(f"invalid topic id on day {day}")

if any(row["x_status"] != "posted" or row["linkedin_status"] != "posted" for row in rows[:2]):
    fail("published false-start rows 1 and 2 must remain posted on both platforms")

if any(row["x_status"] != "pending" or row["linkedin_status"] != "pending" for row in rows[2:]):
    fail("rebuilt unpublished rows 3 to 40 must remain pending until publication")

print("OK 40 evidence-gated core lessons")
print("OK post lengths are 350 to 900 characters")
print("OK language and link bans")
print("OK 40-row platform queue")
print("OK campaign strategy and evidence assets")
print("OK published history preserved and rebuilt sequence pending")
