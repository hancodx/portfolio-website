# Hind Sameut — Dual Profile Portfolio

A single-page site with a switch at the top ("Marketing" / "Tech") that
swaps the tagline, bio, stats, skills, tools, experience and projects
between your two profiles. Pure HTML, CSS and vanilla JS + Tailwind
(loaded from CDN, no build step) — ready to host on GitHub Pages.

## Structure

```
index.html          → the whole site
css/style.css        → theme (colors, fonts, animations) for both modes
js/script.js          → the mode switch, scroll reveal, lightbox, mobile menu
images/               → real slides pulled from your marketing portfolio PDF
files/                → your CVs + portfolio PDF (linked from the Download CV buttons)
```

## Deploy on GitHub Pages (free)

1. Create a new repository on GitHub, e.g. `hind-sameut-portfolio`.
2. Upload everything **inside this `site` folder** to the root of that
   repository (`index.html` must sit at the repo root, not inside a
   subfolder).
3. On GitHub: **Settings → Pages → Source → Deploy from a branch**,
   pick `main` and folder `/ (root)`, then **Save**.
4. Your site will be live in a minute or two at:
   `https://<your-username>.github.io/hind-sameut-portfolio/`

## Things to personalize before you publish

- **Behance / Instagram links** — the portfolio PDF mentions a Behance
  and Instagram portfolio but doesn't give the URLs. Add real links in
  `index.html` (search for `LinkedIn` in the Contact section and add
  matching `<a>` cards for Behance/Instagram next to it).
- **CV files** — `files/Hind_Sameut_CV_Tech.pdf` and
  `files/Hind_Sameut_CV_Marketing.pdf` are copies of the CVs you
  uploaded. Replace them any time with an updated PDF of the same name
  and the "Download CV" button will always serve the latest version.
- **Colors** — Marketing mode uses your portfolio's navy (`#1B2A53`)
  and red (`#C32631`). Tech mode uses a dark terminal theme with amber
  (`#F2A93B`) and teal (`#4FD1C5`). Change these in the `:root` blocks
  at the top of `css/style.css`.
- **Favicon** — currently a generated "HS" monogram; swap the `<link
  rel="icon">` in `index.html` for a real logo file if you have one.

## Notes

- No frameworks, no `npm install`, no build — just open `index.html`
  in a browser to preview locally, or use a tiny local server
  (`python3 -m http.server`) so the fetch of `files/` and `images/`
  works exactly as it will on GitHub Pages.
- Everything is responsive down to mobile and respects
  `prefers-reduced-motion`.
