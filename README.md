# Lutz & Lace – svetainė

One-page website for Lutz & Lace, a figure-skating apparel brand. The site copy is in Lithuanian. It is plain HTML, CSS and JavaScript: no framework, no build step, no dependencies.

## Run it locally

- **Quickest:** open `public/index.html` in a browser.
- **Like a real server:** with Node.js installed, run `npm run dev` and open http://localhost:3000.

## Deploy to Vercel

- **No tools:** go to https://vercel.com/drop, drag in the `public` folder, name the project and click Deploy.
- **CLI:** from this folder run `npx vercel` for a preview link, then `npx vercel --prod` (or `npm run deploy`).
- **GitHub:** push this folder to a repository and import it at https://vercel.com/new. `vercel.json` already tells Vercel to serve the `public` folder.

Vercel's free Hobby plan is for personal, non-commercial projects. A real business site, or work someone is paid for, needs the Pro plan or another host.

## Before publishing

In `public/index.html`, replace the contact placeholders `[EL. PAŠTAS]`, `[TELEFONAS]` and `[ADRESAS]`. Also put the real address into the `mailto:` link on the "Parašykite mums" button.

## Project layout

```
public/                  everything that gets deployed
  index.html             page markup and all site copy
  assets/styles.css      colors (light + dark), type, layout
  assets/main.js         smooth scrolling for menu links
  assets/favicon.svg
content/
  rinkodara_5_0_rusne.xlsx   original spreadsheet (source of the content)
  content.json               the same content as JSON
CLAUDE.md                brief for Claude Code: content rules, design system, open tasks
vercel.json, package.json
```

## Working with Claude Code

Start Claude Code in this folder; it reads `CLAUDE.md` automatically. That file covers where each piece of content comes from, the design rules, and the list of open tasks.
