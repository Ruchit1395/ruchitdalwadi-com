#!/usr/bin/env python3
"""Maintain the per-platform public-comment circuit breaker."""

import argparse
import json
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
STATE_PATH = ROOT / "comment-incident-state.json"
PLATFORMS = ("x", "linkedin")


def now():
    return datetime.now().astimezone().isoformat(timespec="seconds")


def local_date():
    return datetime.now().astimezone().date().isoformat()


def load():
    return json.loads(STATE_PATH.read_text(encoding="utf-8"))


def save(state):
    STATE_PATH.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")


def entry(state, platform):
    if platform not in PLATFORMS:
        raise ValueError(f"unsupported platform: {platform}")
    return state["platforms"][platform]


def rollover(state):
    today = local_date()
    if state["localDate"] == today:
        return False
    state["localDate"] = today
    for platform in PLATFORMS:
        item = entry(state, platform)
        if item["status"] in ("blocked_today", "repair_required"):
            item["status"] = "repair_required"
        else:
            item["status"] = "healthy"
            item["failedSubmits"] = 0
            item["signature"] = ""
            item["lastTarget"] = ""
        item["updatedAt"] = now()
    return True


def print_status(state):
    print(f"localDate={state['localDate']}")
    for platform in PLATFORMS:
        item = entry(state, platform)
        print(
            f"{platform}: status={item['status']} failedSubmits={item['failedSubmits']} "
            f"target={item['lastTarget'] or '-'}"
        )


def main():
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("status")
    sub.add_parser("rollover")
    for command in ("open", "block"):
        command_parser = sub.add_parser(command)
        command_parser.add_argument("--platform", required=True, choices=PLATFORMS)
        command_parser.add_argument("--signature", required=True)
        if command == "open":
            command_parser.add_argument("--target", required=True)
    clear_parser = sub.add_parser("clear")
    clear_parser.add_argument("--platform", required=True, choices=PLATFORMS)
    args = parser.parse_args()

    state = load()
    rollover(state)

    if args.command == "open":
        item = entry(state, args.platform)
        item["failedSubmits"] += 1
        item["status"] = "open" if item["failedSubmits"] == 1 else "repair_required"
        item["signature"] = args.signature
        item["lastTarget"] = args.target
        item["updatedAt"] = now()
        save(state)
    elif args.command == "block":
        item = entry(state, args.platform)
        item["status"] = "blocked_today"
        item["signature"] = args.signature
        item["updatedAt"] = now()
        save(state)
    elif args.command == "clear":
        item = entry(state, args.platform)
        item.update(
            status="healthy",
            failedSubmits=0,
            signature="",
            lastTarget="",
            updatedAt=now(),
        )
        save(state)
    elif args.command == "rollover":
        save(state)

    print_status(state)


if __name__ == "__main__":
    main()
