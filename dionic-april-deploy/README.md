# Dionic — April 2025 Site

## Repo structure

```
gregarious-gaufre-b1f4af/      ← GitHub repo root
├── netlify.toml               ← Netlify config (serves from dionic-april/)
└── dionic-april/              ← Active site — Netlify publishes this folder
    ├── index.html
    └── assets/
        ├── css/
        │   └── style.css
        ├── js/
        │   └── main.js
        └── images/
            └── logo.png       ← Transparent logo (background removed)
```

## Deploy

```bash
# From repo root
git add .
git commit -m "feat: dionic april redesign"
git push origin main
```

Netlify auto-deploys on push. Live at dionic.ca within ~2 minutes.

## Contact form
Netlify Forms is active — submissions route to hello@dionic.ca automatically.
No additional config needed.

## Stack
- Plain HTML / CSS / JS — no build step required
- Hosted on Netlify (gregarious-gaufre-b1f4af)
- DNS via Cloudflare → dionic.ca
- Fonts: Cormorant Garamond + Syne + DM Mono (Google Fonts)
