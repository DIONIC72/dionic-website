#!/bin/bash
set -e

REPO="https://github.com/DIONIC72/gregarious-gaufre-b1f4af.git"
REPO_DIR="gregarious-gaufre-b1f4af"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "▶ Dionic April — Auto Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Clone repo if not already present
if [ ! -d "$REPO_DIR" ]; then
  echo "→ Cloning repo..."
  git clone "$REPO"
else
  echo "→ Repo found — pulling latest..."
  cd "$REPO_DIR" && git pull origin main && cd ..
fi

cd "$REPO_DIR"

# 2. Copy files from deploy package into repo
echo "→ Copying site files..."
cp -r "$SCRIPT_DIR/dionic-april" .
cp "$SCRIPT_DIR/netlify.toml" .
cp "$SCRIPT_DIR/README.md" .

# 3. Validate index.html exists and has content
if [ ! -f "dionic-april/index.html" ]; then
  echo "✗ ERROR: index.html missing. Aborting."
  exit 1
fi

HTML_SIZE=$(wc -c < "dionic-april/index.html")
if [ "$HTML_SIZE" -lt 5000 ]; then
  echo "✗ ERROR: index.html looks too small ($HTML_SIZE bytes). Aborting."
  exit 1
fi

# 4. Validate logo exists
if [ ! -f "dionic-april/assets/images/logo.png" ]; then
  echo "✗ ERROR: logo.png missing. Aborting."
  exit 1
fi

echo "✓ Files validated:"
echo "  index.html   $(wc -c < dionic-april/index.html | tr -d ' ') bytes"
echo "  style.css    $(wc -c < dionic-april/assets/css/style.css | tr -d ' ') bytes"
echo "  main.js      $(wc -c < dionic-april/assets/js/main.js | tr -d ' ') bytes"
echo "  logo.png     $(wc -c < dionic-april/assets/images/logo.png | tr -d ' ') bytes"
echo "  netlify.toml $(wc -c < netlify.toml | tr -d ' ') bytes"

# 5. Git stage + commit + push
echo ""
echo "→ Staging changes..."
git add .

CHANGED=$(git diff --cached --name-only | wc -l | tr -d ' ')
if [ "$CHANGED" -eq 0 ]; then
  echo "→ No changes detected — already up to date."
  exit 0
fi

echo "→ Files to commit:"
git diff --cached --name-only | sed 's/^/  /'

echo ""
echo "→ Committing..."
git commit -m "feat: dionic april redesign — logo, bold titles, services CTA"

echo "→ Pushing to main..."
git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Done. Netlify will deploy in ~2 minutes."
echo "  Check: https://app.netlify.com/sites/gregarious-gaufre-b1f4af/deploys"
echo "  Live:  https://dionic.ca"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
