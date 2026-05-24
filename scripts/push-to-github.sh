#!/usr/bin/env bash
# Push portfolio to GitHub (run once after: gh auth login)
set -euo pipefail

GH="/tmp/gh_2.92.0_macOS_arm64/bin/gh"
REPO="moeezislammalik/moeez-portfolio"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"

if [[ ! -d .git ]]; then
  git init
  git branch -M main
fi

if ! git rev-parse HEAD >/dev/null 2>&1; then
  git add -A
  git commit -m "Initial commit: portfolio site (moeezmalik.com)"
fi

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "Run: gh auth login"
  echo "Then run this script again."
  exit 1
fi

if ! "$GH" repo view "$REPO" >/dev/null 2>&1; then
  "$GH" repo create moeez-portfolio --public --source=. --remote=origin --description "Business analyst portfolio — moeezmalik.com" --push
else
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/${REPO}.git"
  git push -u origin main
fi

echo "Done: https://github.com/${REPO}"
