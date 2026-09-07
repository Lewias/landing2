#!/usr/bin/env bash
# Pull, rebuild, done. There is no service to restart: nginx serves dist/.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env.local ]; then
  echo "ERROR: .env.local is missing." >&2
  echo "It is gitignored, so it never arrives from GitHub — create it on the" >&2
  echo "server or the form will silently fall back to opening a mail client." >&2
  echo "See .env.example." >&2
  exit 1
fi

git pull --ff-only
npm ci
npm run build

echo
echo "Built. Serving from: $(pwd)/dist"
ls -la dist/index.html
