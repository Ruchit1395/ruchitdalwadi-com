#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CAMPAIGN_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
PORT="${PORT:-8765}"

cd "${CAMPAIGN_DIR}"

echo "Serving campaign cockpit from:"
echo "  ${CAMPAIGN_DIR}"
echo
echo "Open:"
echo "  http://127.0.0.1:${PORT}/launch-cockpit.html"
echo "  http://127.0.0.1:${PORT}/metrics-dashboard.html"
echo
echo "Press Ctrl+C to stop."

python3 -m http.server "${PORT}" --bind 127.0.0.1
