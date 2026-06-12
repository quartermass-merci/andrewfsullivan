# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

**React build, single design direction.** The site lives in `site/` — React 19 + Vite + TypeScript + react-router, port 4321. The earlier Astro two-direction teaser (picker, /d1, /d2) was torn out on 2026-06-11 at PK's direction; do not resurrect it. Not pushed to GitHub or deployed yet — target is `quartermass-merci/andrewfsullivan` → Vercel. **Do not push or deploy without explicit instruction.**

```bash
cd "Andrew F Sullivan/site"
npm install      # one-time
npm run dev      # → http://localhost:4321
npm run build    # tsc + vite build
```

Read `site/README.md` for routes, file map, and TODOs.

## What This Project Is

Author website for **Andrew F. Sullivan**, Canadian horror writer. Audience: readers, critics, booksellers, festival programmers, editors. The design north star is the moodboard at `Moodboard/1.jpg` — warm-black wall, white-framed psychedelic paperback imagery, name in heavy red geometric caps, five-chip palette strip (red `#f4333a`, yellow `#fee077`, blue `#265b9d`, green `#357e5d`, pink `#fd45a6`).

## Hard Content Rules (PK-mandated)

- **Never invent copy.** Everything editorial — synopses, press quotes, awards, bio — is verbatim from andrewfsullivan.com. If content is missing, leave it out or mark a clearly-labelled TODO; do not write placeholder prose.
- **No positioning taglines on-page.** "Canada's J.G. Ballard" is internal creative direction only — PK explicitly banned it from rendered copy. Same for location/occupation eyebrows ("Hamilton, Ontario · Novelist"), hero CTAs, "world of the work" manifesto sections, and "FIG." diagram numbering. All were removed; do not reintroduce.
- **Reviews live inside each book's page** (the praise wall, now headed **"Clippings"**, as on the live site), not as a standalone homepage section. A separate `/clippings` route collects interviews + podcasts.
- **Flat ink, one exception.** The language is hard-edged screenprint: no glassmorphism/backdrop blur, no glow shadows, no border-radius, no chip/tag grids, no border-left blockquotes. Box shadows are single hard offsets; patterns are hard-stop repeating gradients. The one sanctioned soft element is the **shadow field** (`ShadowField.tsx`) — now a full-screen **WebGL2 fragment shader**: domain-warped noise masses on a deep inhale/exhale cycle, cursor position + velocity reactive, accent ember (red on the wall, book ink in a world), grain baked in. Fallback chain: reduced-motion → static divs; no WebGL2 / compile failure → animated div field. Gotchas learned the hard way: don't `loseContext()` in the effect cleanup (StrictMode re-runs kill it), keep `preserveDrawingBuffer: true`, and there's a setInterval watchdog because some webviews starve rAF.
- **Overdrive behaviours** (added via /overdrive, all reduced-motion gated): View Transitions on book links — the wall/spotlight cover morphs into the book-page cover (`viewTransitionName: cover-<slug>` on both imgs, `<Link viewTransition>`); book band images breathe (slow scale). (The earlier Marigold scroll-grown gold root tendrils were removed on PK's note — "the weird yellow stuff on Marigold looks bad"; `MarigoldRoots.tsx` deleted and its CSS pulled. Don't reintroduce.)
- The hero is the **logo mark alone** (`hero-logo.png`, skull + wordmark, full-viewport, gently breathing) over the shadow field, with a single tracked **"Enter ↓"** cue at the foot that scrolls to the books. PK rejected an empty soft-glow hero, a collage hero, and the spelled-out name in favour of the mark. Don't add swatches, taglines, or extra CTAs.
- **Section headings are loud condensed caps** (`.section-head`, `--font-head` = **Anton**) — newspaper-bill / horror-paperback energy. Monochrome, with only a faint same-tone misregister emboss (`::before` + `data-text`). PK's path here was Archivo Black ("AI-coded") → Bodoni Didone ("too polished/colourful") → Anton ("raw condensed pulp"); the rainbow colour off-print and the per-world head glow/gold-rule were pulled as "too colourful." Keep heads monochrome — colour lives in the bands, drop caps and title treatments.
- **Contact = the animated footer** (`AnimatedFooter.tsx`, on every page, `id="contact"`): a paper **mailing label** ("Email / Click to email / Hamilton, Ontario"), link columns, and a sine-wave bar mass (adapted from a Tailwind snippet into plain CSS) coloured by the page accent. The footer name-lockup image and the OAC/ON_REV funder chips were both removed on PK's note. Do not add Tailwind/shadcn for components — adapt them into the existing CSS system.
- **Book pages bleed their covers into the page**: a full-bleed `book__band` strip divides synopsis from what follows; AWWE's featured press attribution sits in the jacket's hex banner. The strip plays a **looping banner video** per book (`book.bandVideo` → `public/video/bands/<slug>.mp4`) at **half speed** for a creepy "alive" loop — transcoded from PK's supplied GIFs (originals were 40–132 MB each; `ffmpeg-static` → ~1–2 MB H.264, 1600×800). Reduced-motion falls back to the cover slice (`book.band` / `theme.bandFocus`). Never ship the raw GIFs.
- **Wall covers are never cropped** — `height: auto`, natural aspect ratio, `align-items: start`; the staggered bottoms are intentional. Don't reintroduce `object-fit: cover` or row-stretching on wall cards.
- **The contact email is a mailing label** (`afoot__mail`): cream paper block with dashed inner rule, modest display size — PK rejected the giant display email line.
- **Book page order is fixed**: head → cover/synopsis/honours/order → band → teaser (Marigold) → press → artwork → next. PK explicitly wants the teaser above the press.
- **The book-page Clippings wall renders as praise pages** (`press-note`), like the front matter of a paperback: no boxes/cards — an accent em-dash, source in small display caps, role muted beside it, quote beneath, in airy hairline-ruled columns. PK rejected boxed/card treatments *for the per-book review wall* twice; don't reintroduce containers there. (The separate `/clippings` page IS a card grid — PK asked for that explicitly.) Never photo avatars for sources (real critics; we don't fabricate faces). Featured quote stays as the big lead.
- **Marigold artwork is click-to-zoom** (`Lightbox` in `Book.tsx`): Esc closes, arrows step, body scroll locks, focus returns to the thumbnail. Keep artist credits in the caption.
- The cover column is sticky on desktop only — never on mobile (single column; a stuck cover traps the synopsis).

## Architecture

- Homepage spine: **Hero (logo) → Book spotlights → Bio → Contact.** The book module is a stack of full-width **spotlights** (`BookSpotlight.tsx`, `.spot`): each book is a large framed cover + its own page title treatment (stack/glow/scrawl/banner) + a one-line **logline** + an Enter cue, alternating left/right, the cover keeping its view-transition name. The loglines (`book.logline` in books.ts) are lifted verbatim from each book's jacket copy — never invented. (PK had the 01–05 index numerals removed.) Don't go back to the cramped wall-card grid.
- Routes: `/` (Home), `/books/:slug` (Book), `/clippings` (Clippings).
- **Clippings page** (`/clippings`, `Clippings.tsx`): interviews + podcast appearances as a **grid of cards** (`ClippingsGrid.tsx`, `.clip`) — raised panels on the wall, a hard accent top-edge in each book's colour, the outlet set like a masthead, the whole card links out. (This replaced an earlier Story-popup viewer that PK found "flat / underwhelming"; the adapted feature-grid is the keeper — don't bring the popup back.) Data is `src/content/press.ts`, scraped verbatim from the live per-book press lists (real titles/outlets/URLs only — two items with an unrecoverable/by-Andrew status were intentionally omitted; see the file header). Interviews + podcasts only. Adapted into the CSS system — no Tailwind/shadcn/radix.
- **Each book is its own world**: `/books/:slug` renders `src/pages/Book.tsx` themed by tokens in `src/content/books.ts` (`theme: bg/ink/accent/accent2/muted/titleStyle`). The synopsis opens with a per-world **drop cap** (Didone initial via `::first-letter` / `initial-letter`, float fallback). Palettes derive from each actual cover:
  - The Marigold — black / magenta `#ee2f8c` / gold `#f2aa1f`, title `stack` (off-print shadow + gold dashed rule); has artwork gallery (credit artists: Sid Sharp, Bhanu Pratap, Franz Stefanik, Jeff Martin, Jenn Woodall, Trevor Henderson) + teaser video
  - The Handyman Method — charcoal / blood red `#c1141d` / fog, title `glow` (red underglow)
  - WASTE — night black / snow white / sodium orange, title `scrawl` (per-letter rotation)
  - All We Want is Everything — b&w / banner red `#de3a31` / cream, title `banner` (jacket's hexagonal banner via clip-path)
- Headshot must always carry the **Eden Boudreau** photo credit.
- Fonts (Google Fonts, loaded in index.html): **Anton** (`--font-head`, the heavy condensed face for the section headlines) + **Archivo Black** (`--font-display`, book titles, labels, meta, the wave footer) + **Bodoni Moda** (`--font-wordmark`, the Didone for the menu, drop caps and masthead accents — matches the author's printed wordmark). Body: Gill Sans → Avenir → Trebuchet (system).
- All motion gates on `prefers-reduced-motion`.

## Assets

Source assets live at `Assets from the Current Website/` (migration source of truth — keep intact). Web copies live in `site/public/images/` and `site/public/video/` with kebab-case names. New assets: drop originals in the former, copy to the latter.

**Brand logos** (originals in `Logos/`, sourced from Desktop/LOGOS; web copies in `site/public/images/brand/`):
- `hero-logo.png` — the hero mark (cream ink on transparency, square). IS the homepage h1 (img with alt). Breathes gently (reduced-motion gated).
- `name-lockup.png` — wide one-line name lockup. Ships as near-black ink; the site runs it through `filter: invert(1)` for the dark wall (nav brand at ~15px, footer at ~22px). The web copy is CROPPED from the original square canvas to the ink band — re-crop if the source updates.
- `support-logo.png` — cream/red support mark, staged but not yet placed.
- The contact mailing label says "Click to email" (mailto held in `site.ts`); PK asked not to spell the address out.

**Band banner videos** (`site/public/video/bands/<slug>.mp4`): the per-book divider-strip loops, transcoded from PK's GIFs in `Assets from the Current Website/Book Level Banners/` via `ffmpeg-static` (a dev dependency — `node -e "process.stdout.write(require('ffmpeg-static'))"` prints the binary path; the transcode command is in the git history / band task). Re-run the transcode if PK supplies new GIFs; never reference the raw multi-MB GIFs directly.

## Relationship to the Workspace

Part of the multi-project workspace documented at `../CLAUDE.md` (Vercel + `quartermass-merci` org patterns). Do not apply PK Lawton brand tokens here — different client, different world.
