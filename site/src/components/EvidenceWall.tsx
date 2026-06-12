import { useEffect, useRef, type CSSProperties } from 'react';
import { books, type Book } from '../content/books';
import { interviews, podcasts, type PressGroupData } from '../content/press';

/**
 * The clippings as an evidence wall — press cuttings taped to the dark wall,
 * filed into two cold groups (Interviews / Podcasts). Grimy mismatched paper
 * stock, a flat filing-square in the book's colour, the headline blunt and
 * loud (newsprint, not couture). Cuttings settle on load, drift with the
 * cursor and lift on hover; all reduced-motion gated to a static board.
 */

type Kind = 'interview' | 'podcast';
type Cutting = {
  url: string;
  outlet: string;
  title: string;
  date?: string;
  book: Book;
};

// Deterministic per-cutting variance (no Math.random).
const ROTS = [-2.2, 1.5, -1.0, 2.0, -1.6, 1.1, -2.4, 0.8, -1.3, 1.8];
const DEPTHS = [6, 10, 4, 11, 7, 9, 5, 8];
const VOFFS = [0, 11, 4, 15, 6, 13, 2, 9];
// Andrew's five-colour palette, worked through the wall: each cutting is one
// colour — a dusty tinted paper stock + a vivid filing-square (red / yellow /
// blue / green / pink). Tints stay aged so the dark ink still reads.
const THEMES = [
  { paper: '#e6cdc7', accent: '#f4333a' }, // vivid red
  { paper: '#ece1bc', accent: '#fee077' }, // pastel yellow
  { paper: '#ccd4de', accent: '#265b9d' }, // just blue
  { paper: '#ccd8cb', accent: '#357e5d' }, // just green
  { paper: '#e8cfdb', accent: '#fd45a6' }, // hot pink
];

function flatten(src: PressGroupData[]): Cutting[] {
  const out: Cutting[] = [];
  for (const book of books) {
    const items = src.find((g) => g.slug === book.slug)?.items ?? [];
    for (const it of items) out.push({ ...it, book });
  }
  return out;
}

function Wall({ cuttings, kind }: { cuttings: Cutting[]; kind: Kind }) {
  const noun = kind === 'podcast' ? 'Podcast' : 'Interview';
  return (
    <div className="wall-evidence">
      {cuttings.map((c, i) => {
        const wide = i % 6 === 2;
        const theme = THEMES[i % THEMES.length];
        const style = {
          '--rot': `${ROTS[i % ROTS.length]}deg`,
          '--depth': `${DEPTHS[i % DEPTHS.length]}px`,
          '--voff': `${VOFFS[i % VOFFS.length]}px`,
          '--paper': theme.paper,
          '--i': i,
          '--bk-accent': theme.accent,
        } as CSSProperties;
        return (
          <a
            key={c.url}
            className={`cut${wide ? ' cut--wide' : ''}`}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            style={style}
            aria-label={`${noun}: ${c.outlet} on ${c.book.title} — ${c.title}`}
          >
            <span className="cut__paper">
              <span className="cut__tape" aria-hidden="true" />
              <span className="cut__outlet">{c.outlet}</span>
              <span className="cut__head">{c.title}</span>
              <span className="cut__meta">
                {noun} · {c.book.title}
                {c.date ? ` · ${c.date}` : ''}
                <span className="cut__go" aria-hidden="true"> · read ↗</span>
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default function EvidenceWall() {
  const ref = useRef<HTMLDivElement>(null);
  const ivs = flatten(interviews);
  const pods = flatten(podcasts);

  // Cursor parallax — one wrapper var, every cutting drifts via CSS calc.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia('(pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', nx.toFixed(3));
        el.style.setProperty('--py', ny.toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ev" ref={ref}>
      {/* Labels removed per PK — the gap between groups stays */}
      <section className="ev-group" aria-label="Interviews">
        <Wall cuttings={ivs} kind="interview" />
      </section>

      <section className="ev-group" aria-label="Podcasts">
        <Wall cuttings={pods} kind="podcast" />
      </section>
    </div>
  );
}
