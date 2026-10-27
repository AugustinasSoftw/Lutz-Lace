# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Lutz & Lace website — handoff brief

## What this is

A one-page marketing site, in Lithuanian, for **Lutz & Lace**: a concept brand of elegant, functional figure-skating apparel. It was made for a "Rinkodara 5.0" (Marketing 5.0) course project and belongs to another person (the project owner). Its structure follows a reference site the owner pointed to: https://sukneliu-namai-z8ru83s.gamma.site. That site runs hero → about → problem/principles → innovations → customer/team benefits → future → contact.

- **Stack:** static HTML/CSS/JS. No framework, no build step, no dependencies. Keep it that way unless the owner asks otherwise.
- **Live content source:** `content/rinkodara_5_0_rusne.xlsx` (the owner's spreadsheet). `content/content.json` is a verbatim structured export of it.
- **Origin:** built with Claude on claude.ai. It was first a design canvas, then exported to this project.

## Commands

| Task | Command |
|---|---|
| Local server | `npm run dev` serves `public/` at http://localhost:3000 |
| No-server preview | open `public/index.html` in a browser |
| Preview deploy | `npx vercel` |
| Production deploy | `npx vercel --prod` (or `npm run deploy`) |

There is no build, lint or test tooling. To verify a change, load the page in both light and dark color schemes and at phone width.

`vercel.json` sets the framework preset to "Other" (`null`), the output directory to `public/`, and `cleanUrls: true`. Only `public/` is ever served, so `content/` and this file stay private.

## Things that span files

- **Copy lives in two places.** Changing spreadsheet text means editing `public/index.html` by hand and also updating `content/content.json`. Nothing generates the HTML from the JSON. Keep the deliberate differences listed under Content rules.
- **Scores are duplicated in the markup.** Each score appears as the percentage text and again as the inline `style="width: NN%"` on the `aria-hidden` `.bar > span`. Change both.
- **Dark tokens are written twice** in `styles.css`: once under the `prefers-color-scheme` media query and once under `:root[data-theme="dark"]`. Edit both blocks together. The `theme-color` metas in `index.html` repeat the ground colors (`#F3F7FA` / `#0B1626`).
- **Anchors:** the whole page is wrapped in `#virsus`, which is what the wordmark links to. `main.js` handles every `href="#…"` click, so a new section only needs an `id`.

## Files

```
public/index.html          markup + ALL site copy (single page)
public/assets/styles.css   design tokens (light/dark), layout, components
public/assets/main.js      smooth scroll for in-page links; does not change the URL hash
public/assets/favicon.svg  figure-eight mark (same motif as the hero)
content/                   source spreadsheet + JSON export (not deployed)
```

## Page map

| Anchor id | Section | Source in the spreadsheet |
|---|---|---|
| — | Header: wordmark + nav (Apie mus, Paslaugos, Inovacijos, Duomenys) | — |
| — (hero) | H1, lead, 1 button, figure-eight SVG | Written for the site (see Content rules) |
| `apie` | Vizija / Misija / Strategija | Sheet1: `Vizija`, `Misija`, `Strategija` |
| `paslaugos` | 3 services × 3 stages. Each stage has Skaitmenizacija / Centralizacija / Standartizacija text plus a score bar | Sheet1: `Paslauga`, `Subpaslauga`, `Skaitmenizacija`, `Centralizacija`, `Standartizacija`, `Skaitmenizavimas`, `Centralizavimas`, `Standartizavimas` |
| `inovacijos` (`startup`, `deeptech`) | Two innovations as numbered steps, with large "5.0" / "6.0" marks | Sheet1: `Inovacija`, `Rinkodara` (stages "Spalvų ir dizaino pasirinkimas" and "Tinkamiausio kirpimo rekomendacija") |
| `duomenys` | Per stage: required data, how AI would use it, source links | Sheet "DI analizė": `Reikalingi duomenys`, `Kaip DI panaudotų duomenis?`, `Duomenų šaltiniai` |

The two innovation stages carry a "Inovacija: STARTUP / DEEPTECH" tag that links to `#startup` / `#deeptech`.

## Content rules

- **Spreadsheet text is used verbatim.** The only deliberate edits so far:
  - "tavo" → "mūsų" in two "DI analizė" rows (Išmatavimų parinkimas; Spalvų ir dizaino pasirinkimas), so the site speaks as the company.
  - The two innovation paragraphs were split into a lead sentence, numbered steps and a closing line. Step titles were added (e.g. "Muzikos analizė", "ISU taisyklių patikra", "Bandymai su čiuožėjais").
- **Copy written for the site, which the owner should review:**
  - the hero headline "Kostiumas, kuris juda kartu su čiuožėju" and its lead;
  - the section intros;
  - the innovation headlines "Kostiumas pagal programos muziką" and "Lekalai pagal kūną ir judesį".
- **Scores** (45–95) are shown as percentages ("lygis"). The owner has not confirmed what they measure.
- **Never invent facts:** no stats, testimonials, prices or client names. Missing facts stay as visible placeholders in brackets, e.g. `[TELEFONAS]`.
- **Lithuanian typography:**
  - quotes „…“;
  - a spaced en dash ( – );
  - a non-breaking space between a number and its unit, and inside thousands (`78&nbsp;%`, `48&nbsp;825`, `6&nbsp;mm`);
  - sentence case. STARTUP and DEEPTECH stay uppercase because they are labels from the source.
- `lang="lt"` on `<html>`; keep it if more text is added.

## Design system

- **Type:** Google Fonts, both with full Lithuanian character support.
  - Bodoni Moda (display): headings, statements, numerals.
  - Hanken Grotesk (body and UI).
- **Color:** every color is a CSS custom property in `styles.css`. Never hard-code hex values in markup.
  - Light values sit on `:root`.
  - Dark values sit under `@media (prefers-color-scheme: dark)`, guarded by `:root:not([data-theme="light"])`, and are repeated under `:root[data-theme="dark"]`.
  - The `data-theme` hooks leave room for a manual theme toggle later.
- **Palette (light):**
  - ice ground `#F3F7FA` and frost `#E4EDF3` for alternating sections;
  - navy ink `#0E2240` and body text `#34465C`;
  - berry accent `#A3195B` (`#E2669D` in dark mode, with dark text on accent fills);
  - the Inovacijos section is a navy "rink at night" panel.
- **Motifs:**
  - the hero SVG is a figure-eight blade tracing, like a skater's compulsory figures;
  - "5.0" / "6.0" are set big like the marks of the old figure-skating judging system, where 6.0 was a perfect score.
  - Keep these two as the only decorative moves.
- **Layout:** container `max-width: 1360px` with `clamp(20px, 5vw, 64px)` side padding. Grids use `repeat(auto-fit, minmax(min(300px, 100%), 1fr))` so they become one column on phones. Content is left-aligned.
- **Avoid:** gradient washes, emoji, shadowed card grids, ALL-CAPS eyebrow labels above headings, arrows appended to button text.
- **Accessibility, which must hold in both themes:**
  - text contrast ≥ 4.5:1;
  - visible `:focus-visible` outlines;
  - touch targets ≥ 44px;
  - motion off under `prefers-reduced-motion`;
  - decorative SVG `aria-hidden="true"`;
  - score bars `aria-hidden`, since the percentage is in the text.

## Open tasks

1. **Images:** there are none yet. The reference site used illustrations and an intro video. Only add images the owner supplies: costume photos or a logo. Use `<img>` with `width`/`height`, Lithuanian `alt` text and `loading="lazy"` below the fold.
2. **Sharing preview:** add `og:image` (1200×630) and `og:url` once the domain is known.
3. **Indexing:** the reference site uses `noindex, nofollow`. Ask the owner whether this site should be indexed, then add `<meta name="robots">` or `public/robots.txt`.
4. **Optional polish:**
   - render the Paslaugos and Duomenys sections from `content/content.json` to remove the repeated markup;
   - a compact mobile menu;
   - an `apple-touch-icon` PNG;
   - a Lighthouse pass.

## Deploy notes

- Vercel's free Hobby plan is for personal, non-commercial use only. That is fine for a course project. A real business site, or paid client work, needs Vercel Pro or another host.
- Quickest path without tools: drag the `public/` folder onto https://vercel.com/drop.
