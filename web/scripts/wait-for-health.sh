#!/usr/bin/env bash
set -euo pipefail
URL="${1:-http://localhost:5173/health}"
TIMEOUT_SECS="${2:-60}"
INTERVAL=1
elapsed=0
while [ $elapsed -lt $TIMEOUT_SECS ]; do
  if curl -sSf --max-time 2 "$URL" > /dev/null 2>&1; then
    echo "OK: $URL"
    exit 0
  fi
  sleep $INTERVAL
  elapsed=$((elapsed + INTERVAL))
  echo "waiting for $URL ($elapsed/$TIMEOUT_SECS)"
done

echo "ERROR: $URL did not become available within ${TIMEOUT_SECS}s" >&2
exit 2
