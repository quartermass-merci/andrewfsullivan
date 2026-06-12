# andrewfsullivan.com — site build

Single-direction build of Andrew F. Sullivan's author site, designed from the moodboard (`../Moodboard/1.jpg`): warm-black wall, white-framed paperback objects, the author's skull-and-wordmark logo as the hero. Type runs **Anton** (heavy condensed) for the section headlines, **Archivo Black** for book titles, and **Bodoni Moda** (the Didone matching his printed wordmark) for the menu, drop caps and accents — all via Google Fonts. **React 19 + Vite + TypeScript**, deploys to Vercel as an SPA.

Signature behaviours: a site-wide **breathing shadow field** — a WebGL2 fragment shader (domain-warped masses on a deep breath cycle, cursor position/velocity reactive, accent ember per world, grain baked in; falls back to animated divs without WebGL2 and to static divs under reduced motion — `src/components/ShadowField.tsx`); a homepage of full-width **book spotlights** (cover + that book's title treatment + a logline + Enter cue — `src/components/BookSpotlight.tsx`); **enter-through-the-cover** View Transitions (the spotlight cover morphs into the book-page cover); loud **condensed section heads** (Anton, monochrome); full-bleed **cover bands** that play a slow-looping per-book **banner video** (transcoded from GIF, reduced-motion → static cover slice); a **clippings page** of interviews + podcasts as a card grid (`src/components/ClippingsGrid.tsx`); and the **animated wave footer** that doubles as contact (`src/components/AnimatedFooter.tsx`). All motion gates on `prefers-reduced-motion`.

## Run locally

```bash
cd "Andrew F Sullivan/site"
npm install      # one-time
npm run dev      # → http://localhost:4321
npm run build    # tsc + vite build → dist/
npm run preview  # serve the production build
```

## Routes

| Route | What it is |
|-------|------------|
| `/` | Hero (logo) → Book spotlights → Bio → Contact |
| `/books/the-marigold` | The Marigold's world — black / magenta / gold, artwork gallery + teaser video |
| `/books/the-handyman-method` | Fog grey / blood-red underglow |
| `/books/waste` | Night black / scrawled snow-white title |
| `/books/all-we-want-is-everything` | B&W / red hex-banner title from the jacket |
| `/clippings` | Interviews + podcast appearances as a card grid (reviews stay on each book page) |

Every book page embeds its **synopsis, press quotes, awards, and order links — all verbatim from the current live site** (scraped 2026-06-11). *Earth Filled with Blood* appears on the wall as a typographic card (forthcoming Spring 2027, Gallery Books — the only facts the live site states).

## Hard rules baked into this build

- **No invented copy.** Synopses, quotes, awards, bio, links: all from andrewfsullivan.com. UI labels (Books, Bio, Contact, Order, Clippings, Next) and the spotlight loglines (lifted from jacket copy) are the only words added.
- **No taglines or positioning copy on-page** (no "Canada's J.G. Ballard", no location eyebrow, no manifesto section).
- Each book page's palette/typography derives from its actual cover.
- Reduced motion is respected everywhere (reveals, misregister drift, cursor field all gate on `prefers-reduced-motion`).

## Where to edit

- `src/content/site.ts` — author name, verbatim bio (paragraph array), headshot (+ Eden Boudreau credit), socials, agent, email.
- `src/content/books.ts` — one entry per book: synopsis paragraphs, **logline** (the homepage spotlight one-liner, lifted from jacket copy), quotes, awards, buy groups, `bandVideo` (the looping divider-strip video), theme tokens (`bg / ink / accent / accent2 / muted / titleStyle`). Italicize titles inside strings with `*asterisks*`.
- `src/content/press.ts` — interviews + podcasts for `/clippings`, grouped by book (real titles/outlets/URLs, scraped from the live site).
- Title treatments (`titleStyle`): `stack` (Marigold), `glow` (Handyman), `scrawl` (WASTE), `banner` (AWWE) — implemented in `src/styles/book.css`.

## File map

```
site/
  index.html              — Vite shell (dark bg, noindex meta)
  vercel.json             — SPA rewrite for client routing
  src/
    main.tsx, App.tsx     — entry + router (/, /books/:slug, /clippings) + scroll manager
    content/site.ts       — author content (verbatim)
    content/books.ts      — per-book content + themes + loglines + bandVideo (verbatim)
    content/press.ts      — interviews + podcasts per book (verbatim, scraped)
    components/           — Nav, AnimatedFooter, ShadowField, Reveal,
                            BookSpotlight (homepage spotlights), ClippingsGrid (card grid)
    pages/Home.tsx        — hero, book spotlights, bio, contact
    pages/Book.tsx        — themed book-world template (band video lives here)
    pages/Clippings.tsx   — interviews + podcasts grid
    styles/               — global.css (tokens), home.css, book.css, press.css (clippings)
  public/images          — covers, Marigold artwork, headshot, brand logos
  public/video           — marigold teaser + bands/<slug>.mp4 banner loops (from GIF)
```

## Typography note

Three faces, all Google Fonts (loaded in `index.html`): **Anton** (`--font-head`) — the heavy condensed face for the section headlines (newspaper-bill / horror-paperback loudness); **Archivo Black** (`--font-display`) — book titles, labels, meta, the wave footer; **Bodoni Moda** (`--font-wordmark`) — the high-contrast Didone matching Andrew's printed wordmark, for the menu, drop caps and masthead accents. Body is the Gill Sans → Avenir → Trebuchet system chain. Swap or self-host any via `index.html` + the `--font-*` tokens in `src/styles/global.css`.

## Band banner videos

Each book page runs a full-bleed divider strip between the synopsis and the clippings. It plays a **slow-looping banner video** per book (`book.bandVideo` → `public/video/bands/<slug>.mp4`), transcoded from PK's source GIFs in `Assets from the Current Website/Book Level Banners/`. Reduced-motion users get a static cover slice instead, and playback runs at 0.5× (set in `Book.tsx`) for the "alive" creep.

To replace or add one (the source GIFs were 40–132 MB; H.264 brings them to ~1–2 MB):

```bash
npm i -D ffmpeg-static   # if not already installed
FF=$(node -e "process.stdout.write(require('ffmpeg-static'))")
"$FF" -y -i "input.gif" -vf "scale=1600:-2:flags=lanczos" -an \
  -c:v libx264 -pix_fmt yuv420p -crf 28 -movflags +faststart \
  public/video/bands/<slug>.mp4
```

Then set `bandVideo: '/video/bands/<slug>.mp4'` on that book in `src/content/books.ts`. Slugs: `the-marigold`, `the-handyman-method`, `waste`, `all-we-want-is-everything`. The strip is ~2:1 source shown ~180–360 px tall, cover-cropped to centre; the site adds the cream frame rules — design edge-to-edge, no text/border in the art. (The older static-image path still works via `band: '/images/bands/<slug>.jpg'` if you ever want a still instead.)

## TODO before production

- [ ] Confirm The Marigold synopsis wording against the live page (fetched text may be lightly condensed)
- [ ] `public/images/collage/` is currently unused (hero collage was replaced by the shadow-field hero) — delete or keep for future use
- [ ] Cover + page for *Earth Filled with Blood* when assets exist
- [ ] Remove `noindex,nofollow` from `index.html`
- [ ] Real favicon + Open Graph image
- [ ] Optimize large Marigold artwork webp files (some are ~1 MB)
- [ ] Decide production type licensing (Archivo Black + Bodoni Moda are Google Fonts — fine to ship, or self-host for performance)
- [ ] `/clippings`: recover the Rue Morgue "Sickness in the Six" interview URL (omitted — unrecoverable in the scrape); decide whether to add the SplitLip "Interview with Chana Porter" Q&A (conducted *by* Andrew, currently excluded)
- [ ] Band banner videos are CRF-28 H.264; if PK wants crisper, re-transcode at a lower CRF or add a WebM/VP9 sibling. The huge source GIFs live in `Assets from the Current Website/Book Level Banners/` (kept out of the build)

## Deploy (when instructed — not yet pushed)

1. Push to `quartermass-merci/andrewfsullivan`.
2. Vercel: Root Directory = `Andrew F Sullivan/site`, framework auto-detects Vite.
3. `vercel.json` already handles SPA rewrites for `/books/*`.
