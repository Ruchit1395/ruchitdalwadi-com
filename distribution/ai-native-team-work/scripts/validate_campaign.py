#!/usr/bin/env python3

import csv
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / "POST_BANK.md"
QUEUE = ROOT / "POST_QUEUE.csv"


def fail(message: str) -> None:
    raise SystemExit(f"FAIL {message}")


text = BANK.read_text(encoding="utf-8")
parts = re.split(r"(?m)^## Day (\d+): (.+)$", text)
posts = []
for index in range(1, len(parts), 3):
    posts.append((int(parts[index]), parts[index + 1], parts[index + 2].strip()))

if len(posts) != 36:
    fail(f"expected 36 posts, found {len(posts)}")

if [day for day, _, _ in posts] != list(range(1, 37)):
    fail("post day numbers are not continuous from 1 to 36")

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

if len(rows) != 36:
    fail(f"expected 36 queue rows, found {len(rows)}")

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

print("OK 36 privacy-safe core posts")
print("OK post lengths are 350 to 900 characters")
print("OK language and link bans")
print("OK 36-row platform queue")
