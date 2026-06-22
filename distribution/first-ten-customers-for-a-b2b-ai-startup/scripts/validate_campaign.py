#!/usr/bin/env python3
import csv
import json
import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def ok(message):
    print(f"OK   {message}")


def fail(message):
    print(f"FAIL {message}")
    return False


def require_file(path):
    full = ROOT / path
    if full.is_file():
        ok(f"{path} exists")
        return True
    return fail(f"{path} missing")


def read(path):
    return (ROOT / path).read_text(encoding="utf-8")


def validate_manifest():
    try:
        manifest = json.loads(read("campaign-manifest.json"))
    except Exception as exc:
        return fail(f"campaign-manifest.json invalid JSON: {exc}")

    required = [
        "campaign",
        "goal",
        "canonicalUrl",
        "localUrls",
        "approvalPhrases",
        "primaryAssets",
        "executionFiles",
        "status",
    ]
    passed = True
    for key in required:
        if key in manifest:
            ok(f"manifest has {key}")
        else:
            passed = fail(f"manifest missing {key}") and passed

    for phrase in [
        "approved: publish LinkedIn carousel",
        "approved: publish LinkedIn anchor",
        "approved: publish X thread",
        "approved: send direct outreach batch 2",
        "approved: send direct outreach batch 3",
        "approved: reply to Luke Sophinos",
        "approved: publish horizontal GPT X follow-up",
        "approved: publish horizontal GPT LinkedIn follow-up",
        "approved: add horizontal GPT X link reply",
        "approved: add horizontal GPT LinkedIn first comment",
        "approved: post horizontal GPT X engagement queue",
        "approved: post LinkedIn horizontal GPT engagement queue",
        "approved: scout high-engagement rooms",
        "approved: post LinkedIn high-engagement comment batch",
        "approved: post X high-engagement reply batch",
    ]:
        if phrase in manifest.get("approvalPhrases", []):
            ok(f"approval phrase present: {phrase}")
        else:
            passed = fail(f"approval phrase missing: {phrase}") and passed

    for path in manifest.get("executionFiles", []):
        passed = require_file(path) and passed

    for path in manifest.get("primaryAssets", {}).values():
        if path.endswith("/"):
            directory = ROOT / path
            if directory.is_dir():
                ok(f"{path} directory exists")
            else:
                passed = fail(f"{path} directory missing") and passed
        else:
            passed = require_file(path) and passed

    return passed


def validate_x_lengths():
    passed = True

    thread = read("copy-ready/x-thread.txt")
    parts = [part.strip() for part in thread.split("\n---\n") if part.strip()]
    for index, part in enumerate(parts, start=1):
        if len(part) <= 280:
            ok(f"X thread part {index} length {len(part)}")
        else:
            passed = fail(f"X thread part {index} too long: {len(part)}") and passed

    followups = read("follow-up-copy-bank.md")
    matches = re.findall(r"### X\d+\n\n([\s\S]*?)(?=\n### X\d+|$)", followups)
    for index, body in enumerate(matches, start=1):
        body = body.strip()
        if len(body) <= 280:
            ok(f"follow-up X{index} length {len(body)}")
        else:
            passed = fail(f"follow-up X{index} too long: {len(body)}") and passed

    paid_pilot = read("copy-ready/x-paid-pilot-followup.txt").strip()
    if len(paid_pilot) <= 280:
        ok(f"copy-ready x paid-pilot follow-up length {len(paid_pilot)}")
    else:
        passed = fail(f"copy-ready x paid-pilot follow-up too long: {len(paid_pilot)}") and passed

    luke_reply = read("copy-ready/x-reply-luke-sophinos-horizontal-gpt.txt").strip()
    if len(luke_reply) <= 280:
        ok(f"copy-ready Luke Sophinos reply length {len(luke_reply)}")
    else:
        passed = fail(f"copy-ready Luke Sophinos reply too long: {len(luke_reply)}") and passed

    horizontal_gpt = read("copy-ready/x-horizontal-gpt-followup.txt").strip()
    if len(horizontal_gpt) <= 280:
        ok(f"copy-ready horizontal GPT follow-up length {len(horizontal_gpt)}")
    else:
        passed = fail(f"copy-ready horizontal GPT follow-up too long: {len(horizontal_gpt)}") and passed

    horizontal_gpt_link = read("copy-ready/x-horizontal-gpt-link-reply.txt").strip()
    if len(horizontal_gpt_link) <= 280:
        ok(f"copy-ready horizontal GPT link reply length {len(horizontal_gpt_link)}")
    else:
        passed = fail(f"copy-ready horizontal GPT link reply too long: {len(horizontal_gpt_link)}") and passed

    horizontal_gpt_comment = read("copy-ready/x-horizontal-gpt-comment-template.txt").strip()
    if len(horizontal_gpt_comment) <= 280:
        ok(f"copy-ready horizontal GPT comment template length {len(horizontal_gpt_comment)}")
    else:
        passed = fail(f"copy-ready horizontal GPT comment template too long: {len(horizontal_gpt_comment)}") and passed

    queue = read("horizontal-gpt-engagement-queue-2026-06-21.md")
    queue_replies = re.findall(r"Draft reply:\n\n```text\n([\s\S]*?)\n```", queue)
    for index, body in enumerate(queue_replies, start=1):
        body = body.strip()
        if len(body) <= 280:
            ok(f"horizontal GPT queue reply {index} length {len(body)}")
        else:
            passed = fail(f"horizontal GPT queue reply {index} too long: {len(body)}") and passed

    linkedin_queue = read("linkedin-horizontal-gpt-engagement-queue-2026-06-21.md")
    linkedin_comments = re.findall(r"Draft comment:\n\n```text\n([\s\S]*?)\n```", linkedin_queue)
    for index, body in enumerate(linkedin_comments, start=1):
        body = body.strip()
        if len(body) <= 700:
            ok(f"LinkedIn horizontal GPT queue comment {index} length {len(body)}")
        else:
            passed = fail(f"LinkedIn horizontal GPT queue comment {index} too long: {len(body)}") and passed

    linkedin_high_engagement = read("linkedin-high-engagement-comment-batch-2026-06-22.md")
    linkedin_high_comments = re.findall(r"```text\n([\s\S]*?)\n```", linkedin_high_engagement)
    for index, body in enumerate(linkedin_high_comments, start=1):
        body = body.strip()
        if len(body) <= 700:
            ok(f"LinkedIn high-engagement comment {index} length {len(body)}")
        else:
            passed = fail(f"LinkedIn high-engagement comment {index} too long: {len(body)}") and passed

    scout_queue = read("high-engagement-scout-queue-2026-06-22.md")
    scout_comments = re.findall(r"```text\n([\s\S]*?)\n```", scout_queue)
    for index, body in enumerate(scout_comments, start=1):
        body = body.strip()
        limit = 280 if "X priority queue" in scout_queue[:scout_queue.find(body)] else 700
        if len(body) <= limit:
            ok(f"high-engagement scout draft {index} length {len(body)}")
        else:
            passed = fail(f"high-engagement scout draft {index} too long: {len(body)}") and passed

    x_high_engagement = read("x-high-engagement-reply-batch-2026-06-22.md")
    x_high_replies = re.findall(r"```text\n([\s\S]*?)\n```", x_high_engagement)
    for index, body in enumerate(x_high_replies, start=1):
        body = body.strip()
        if len(body) <= 280:
            ok(f"X high-engagement reply {index} length {len(body)}")
        else:
            passed = fail(f"X high-engagement reply {index} too long: {len(body)}") and passed

    hooks = read("hook-lab.md")
    hook_matches = re.findall(r"### X\d+\n\n([\s\S]*?)(?=\n### X\d+|\n## Hook scoring|$)", hooks)
    for index, body in enumerate(hook_matches, start=1):
        body = body.strip()
        if len(body) <= 280:
            ok(f"hook X{index} length {len(body)}")
        else:
            passed = fail(f"hook X{index} too long: {len(body)}") and passed

    return passed


def validate_csv():
    passed = True
    for name in [
        "metrics-log.csv",
        "tracker.csv",
        "reply-source-scorecard.csv",
        "daily-activity-ledger.csv",
    ]:
        try:
            reader = csv.DictReader((ROOT / name).open(newline="", encoding="utf-8"))
            rows = list(reader)
        except Exception as exc:
            passed = fail(f"{name} invalid CSV: {exc}") and passed
            continue
        if name == "reply-source-scorecard.csv" and reader.fieldnames:
            ok(f"{name} parses with {len(rows)} response rows")
            continue
        if rows:
            ok(f"{name} parses with {len(rows)} rows")
        else:
            passed = fail(f"{name} has no rows") and passed
    return passed


def validate_carousel():
    passed = True
    pngs = sorted((ROOT / "assets/carousel/png").glob("slide-*.png"))
    if len(pngs) == 9:
        ok("stable PNG carousel has 9 slides")
    else:
        passed = fail(f"stable PNG carousel has {len(pngs)} slides, expected 9") and passed

    pdf = ROOT / "assets/carousel/first-ten-customers-carousel.pdf"
    if pdf.is_file() and pdf.stat().st_size > 0:
        ok("carousel PDF exists and is non-empty")
    else:
        passed = fail("carousel PDF missing or empty") and passed

    return passed


def validate_local_server_optional():
    try:
        import urllib.request

        for path in ["launch-cockpit.html", "metrics-dashboard.html"]:
            url = f"http://127.0.0.1:8765/{path}"
            with urllib.request.urlopen(url, timeout=1.5) as response:
                if response.status == 200:
                    ok(f"{url} returns 200")
                else:
                    print(f"WARN {url} returned {response.status}")
    except Exception as exc:
        print(f"WARN local server check skipped/failed: {exc}")
    return True


def validate_shell_script():
    script = ROOT / "scripts/start_cockpit.sh"
    if not script.is_file():
        return fail("scripts/start_cockpit.sh missing")
    result = subprocess.run(["bash", "-n", str(script)], capture_output=True, text=True)
    if result.returncode == 0:
        ok("start_cockpit.sh shell syntax valid")
        return True
    return fail(f"start_cockpit.sh shell syntax invalid: {result.stderr.strip()}")


def main():
    checks = [
        validate_manifest(),
        validate_x_lengths(),
        validate_csv(),
        validate_carousel(),
        validate_shell_script(),
        validate_local_server_optional(),
    ]
    if all(checks):
        print("\nCampaign package validation passed.")
        return 0
    print("\nCampaign package validation failed.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
