# Dionic — Website

**dionic.ca** · Creative Strategy & Agentic Solutions

---

## Stack
Pure HTML / CSS / JS — no framework, no build step required.
Deploy to any static host in under 2 minutes.

---

## Project Structure

```
dionic-project/
├── index.html          # Main page (all sections)
├── css/
│   ├── tokens.css      # Design tokens (colors, type, spacing)
│   ├── base.css        # Reset + global utilities
│   ├── components.css  # Buttons, nav, cards, forms
│   └── sections.css    # Section-specific layouts
├── js/
│   └── main.js         # All interactivity (particles, theme, forms)
├── assets/
│   ├── images/         # ← Drop 4K landscape backgrounds here when ready
│   ├── icons/          # Favicon, app icons
│   └── fonts/          # Self-hosted fonts (optional)
├── docs/               # Internal docs, brand guidelines
├── netlify.toml        # Netlify deployment config
├── package.json        # Dev server script
└── .gitignore
```

---

## Run Locally

```bash
# Option 1 — Python (no install needed)
python3 -m http.server 3000

# Option 2 — Node serve
npm install
npm run dev

# Option 3 — VS Code
Install "Live Server" extension → right-click index.html → Open with Live Server
```

---

## Deploy

### Netlify (Recommended)
1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Publish directory: `.` (root)
4. Done — auto-deploys on every push

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Source: `main` branch, `/ (root)`

### Manual FTP/cPanel
Upload entire folder to `public_html/`

---

## Connecting the Contact Form

The pitch form in `index.html` has `netlify` attribute ready.
When deployed to Netlify it captures submissions automatically.

To email notifications to **mdscbi72@gmail.com**:
- Netlify Dashboard → Forms → dionic-contact → Notifications → Email

To use Formspree instead, replace the `fetch` URL in `js/main.js`:
```js
await fetch('https://formspree.io/f/YOUR_FORM_ID', { ... })
```

---

## Pending / Roadmap

See `../dionic-redesign/IDEAS_TABLED.md` for full feature backlog including:
- Rotating 4K landscape backgrounds (needs CDN)
- Sales Agent Tournament system
- Email routing (mdidio@dionic.ca → Gmail)
- Claude + Perplexity integrated environment

---

## Brand
| Token | Value |
|---|---|
| Black | `#08070C` |
| Crimson | `#C41E30` |
| Gold | `#E8A820` |
| White | `#F6F1EA` |
| Display font | Barlow Condensed |
| Serif font | Cormorant Garamond |
| Body font | Inter |

---

*Built with Perplexity Computer · © 2026 Dionic*
