import { useEffect, useRef, useState, useCallback, type CSSProperties } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import AnimatedFooter from '../components/AnimatedFooter';
import Reveal from '../components/Reveal';
import { books, getBook, type Book as BookData } from '../content/books';
import { italicsToHtml } from '../content/site';

/** Render *italics* source strings as HTML (escaped first in italicsToHtml). */
function Rich({ text, as: Tag = 'span' }: { text: string; as?: 'span' | 'p' | 'q' }) {
  const T = Tag as 'span';
  return <T dangerouslySetInnerHTML={{ __html: italicsToHtml(text) }} />;
}

/**
 * Split a press source into name + role for the praise-page entries.
 * "Donald Ray Pollock, author of *Knockemstiff*" → name + role
 * "*Publishers Weekly* (Starred Review)"          → name + role
 * "*The Globe & Mail*"                            → name only
 */
function parseSource(source: string): { name: string; role?: string } {
  const parenMatch = source.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (parenMatch) {
    return { name: parenMatch[1], role: parenMatch[2] };
  }
  const comma = source.indexOf(', ');
  if (comma !== -1) {
    return { name: source.slice(0, comma), role: source.slice(comma + 2) };
  }
  return { name: source };
}

/** Full-screen viewer for the commissioned artwork. */
function Lightbox({
  gallery,
  index,
  onClose,
  onStep,
}: {
  gallery: NonNullable<BookData['gallery']>;
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const item = gallery[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title ?? 'Artwork'} by ${item.artist}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={onClose}
        autoFocus
      >
        Close ×
      </button>

      <button
        type="button"
        className="lightbox__step lightbox__step--prev"
        onClick={() => onStep(-1)}
        aria-label="Previous artwork"
      >
        ‹
      </button>

      <figure className="lightbox__figure">
        <span className="framed">
          <img src={item.src} alt={`${item.title ?? 'Artwork'} by ${item.artist}`} />
        </span>
        <figcaption>
          <strong>{item.artist}</strong>
          {item.title} · {index + 1} / {gallery.length}
        </figcaption>
      </figure>

      <button
        type="button"
        className="lightbox__step lightbox__step--next"
        onClick={() => onStep(1)}
        aria-label="Next artwork"
      >
        ›
      </button>
    </div>
  );
}

export default function Book() {
  const { slug = '' } = useParams();
  const book = getBook(slug);
  const [zoom, setZoom] = useState<number | null>(null);
  const bandRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useRef(
    typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  useEffect(() => {
    if (book) document.title = `${book.title} — Andrew F. Sullivan`;
  }, [book]);

  // The banner loops slow — a breathing creep (0.375× = 25% slower again).
  useEffect(() => {
    if (bandRef.current) bandRef.current.playbackRate = 0.375;
  }, [slug]);

  // The band reacts to scroll: an aperture that opens as it nears the centre of
  // the viewport and narrows to a slit as you scroll past it. JS-driven (via
  // clip-path, no reflow) so it works in every browser, not only ones with
  // view-timelines.
  useEffect(() => {
    if (reduceMotion) return;
    const v = bandRef.current;
    if (!v) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = v.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const dist = Math.min(1, Math.abs(r.top + r.height / 2 - vh / 2) / (vh / 2));
      // Open only near dead centre, then narrows fast to a slit — tracks the
      // scroll closely, so it visibly closes in real time as you pass.
      const t = Math.min(1, Math.max(0, dist - 0.05) / 0.6);
      v.style.clipPath = `inset(${(t * 48).toFixed(2)}% 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (v) v.style.clipPath = '';
    };
  }, [slug, reduceMotion]);

  // Reset the viewer when navigating between books.
  useEffect(() => {
    setZoom(null);
  }, [slug]);

  const closeZoom = useCallback(() => {
    setZoom((current) => {
      if (current !== null) {
        // Hand focus back to the thumbnail that opened the viewer.
        requestAnimationFrame(() => {
          document
            .querySelector<HTMLButtonElement>(`[data-art-idx="${current}"]`)
            ?.focus();
        });
      }
      return null;
    });
  }, []);

  const stepZoom = useCallback(
    (dir: 1 | -1) => {
      const n = book?.gallery?.length ?? 0;
      if (!n) return;
      setZoom((current) => (current === null ? current : (current + dir + n) % n));
    },
    [book]
  );

  if (!book) return <Navigate to="/" replace />;

  const { theme } = book;
  const [featured, ...wall] = book.quotes;
  const next = books[(books.findIndex((b) => b.slug === book.slug) + 1) % books.length];

  const vars = {
    '--bk-bg': theme.bg,
    '--bk-ink': theme.ink,
    '--bk-accent': theme.accent,
    '--bk-accent2': theme.accent2,
    '--bk-muted': theme.muted,
    '--nav-bg': theme.bg,
    '--nav-accent': theme.accent,
    '--head-accent': theme.accent,
    '--wave-color': theme.accent,
    '--shadow-accent': theme.accent,
  } as CSSProperties;

  return (
    <div className={`book page book--${theme.titleStyle}`} style={vars}>
      <Nav />

      <main>
        <div className="book__inner">
          <header className="book__head">
            <Link className="book__back" to="/#books" viewTransition>
              All books
            </Link>

            <h1 className="book__title display">
              {theme.titleStyle === 'scrawl'
                ? book.displayTitle.split('').map((ch, i) => (
                    <span className="ch" key={i}>
                      {ch}
                    </span>
                  ))
                : book.displayTitle}
            </h1>

            <p className="book__meta">
              <span className="book__meta-kind">{book.kind}</span>
              {book.coAuthor && (
                <span className="book__meta-item">
                  with <strong>{book.coAuthor}</strong>
                </span>
              )}
              <span className="book__meta-item">{book.publisher}</span>
              {book.year && (
                <span className="book__meta-item book__meta-num">{book.year}</span>
              )}
              {book.isbn && (
                <span className="book__meta-item">
                  ISBN <span className="book__meta-num">{book.isbn}</span>
                </span>
              )}
            </p>
          </header>

          <div className="book__body">
            <Reveal className="book__cover">
              <span className="framed">
                <img
                  src={book.cover}
                  alt={`${book.title} — cover`}
                  decoding="async"
                  style={{ viewTransitionName: `cover-${book.slug}` }}
                />
              </span>
            </Reveal>

            <div>
              <Reveal as="section" delay={80} className="book__synopsis">
                {book.synopsis.map((p, i) => (
                  <Rich key={i} text={p} as="p" />
                ))}
              </Reveal>

              {book.awards.length > 0 && (
                <Reveal as="section" delay={140} className="book__honors-block">
                  <h2 className="book__kicker book__honors-kicker">Honours</h2>
                  <ul className="book__honors">
                    {book.awards.map((a) => (
                      <li className="book__honor" key={a}>
                        <Rich text={a} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <Reveal as="section" delay={180} className="book__order">
                <h2 className="book__kicker book__order-kicker">Order</h2>
                {book.buyGroups.map((g) => {
                  // A single, undifferentiated list needs no sub-label — the
                  // "Order" kicker covers it. Multiple groups carry meaningful
                  // labels (Print / Audiobook, Canadian / American retailers).
                  const showLabel = book.buyGroups.length > 1;
                  return (
                    <p
                      className={`book__order-line${showLabel ? '' : ' book__order-line--full'}`}
                      key={g.label}
                    >
                      {showLabel && (
                        <span className="book__order-label">{g.label}</span>
                      )}
                      <span className="book__order-links">
                        {g.links.map((l, i) => (
                          <span key={l.label}>
                            <a href={l.href} target="_blank" rel="noopener noreferrer">
                              {l.label}
                            </a>
                            {i < g.links.length - 1 && (
                              <span className="book__order-sep" aria-hidden="true">
                                {' / '}
                              </span>
                            )}
                          </span>
                        ))}
                      </span>
                    </p>
                  );
                })}
              </Reveal>
            </div>
          </div>
        </div>

        {/* Full-bleed divider strip. Custom band art when provided
            (book.band, 2560×480 spec in the README); until then, a
            slice of the jacket positioned by theme.bandFocus. */}
        <div className="book__band" aria-hidden="true">
          {book.bandVideo && !reduceMotion ? (
            <video
              ref={bandRef}
              src={book.bandVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={book.band ?? book.cover}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ objectPosition: book.band ? 'center' : theme.bandFocus }}
            />
          )}
        </div>

        <div className="book__inner">
          {/* Teaser sits above the press, straight off the band */}
          {book.teaser && (
            <section className="book__teaser-block" aria-label="Teaser">
              <Reveal className="book__teaser">
                <span className="framed">
                  <video
                    src={book.teaser}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                  />
                </span>
                <p className="book__teaser-caption">Teaser</p>
              </Reveal>
            </section>
          )}

          {/* Press — embedded in the book's world, as on the current site */}
          <section className="book__press" aria-label="Reviews">
            {featured && (
              <Reveal as="blockquote" delay={60} className="book__press-feature">
                <q>
                  <Rich text={featured.text} />
                </q>
                <cite>
                  — <Rich text={featured.source} />
                </cite>
              </Reveal>
            )}

            <div className="book__press-wall">
              {wall.map((q2) => {
                const id = parseSource(q2.source);
                return (
                  <article className="press-note" key={q2.text.slice(0, 40)}>
                    <p className="press-note__source">
                      <span className="press-note__dash" aria-hidden="true">
                        —
                      </span>
                      <Rich text={id.name} />
                      {id.role && (
                        <span className="press-note__role">
                          {' · '}
                          <Rich text={id.role} />
                        </span>
                      )}
                    </p>
                    <blockquote className="press-note__quote">
                      <Rich text={`“${q2.text}”`} />
                    </blockquote>
                  </article>
                );
              })}
            </div>
          </section>

          {/* The Marigold's commissioned artwork — click to zoom */}
          {book.gallery && (
            <section className="book__art" aria-label="Artwork">
              <div className="book__art-strip">
                {book.gallery.map((g, i) => (
                  <Reveal as="figure" key={g.artist} delay={i * 60}>
                    <button
                      type="button"
                      className="art-thumb"
                      data-art-idx={i}
                      onClick={() => setZoom(i)}
                      aria-label={`View ${g.title ?? 'artwork'} by ${g.artist} full size`}
                    >
                      <span className="framed">
                        <img
                          src={g.src}
                          alt={`${g.title ?? 'Artwork'} by ${g.artist}`}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    </button>
                    <figcaption>
                      <strong>{g.artist}</strong>
                      {g.title}
                    </figcaption>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <nav
            className={`book__next book--${next.theme.titleStyle}`}
            aria-label="Next book"
            style={
              {
                '--bk-accent': next.theme.accent,
                '--bk-accent2': next.theme.accent2,
                '--bk-ink': next.theme.ink,
                '--bk-bg': next.theme.bg,
                '--bk-muted': next.theme.muted,
              } as CSSProperties
            }
          >
            <Link to={`/books/${next.slug}`} viewTransition>
              <span className="book__next-label">Next book</span>
              <span className="book__next-title display">
                {next.theme.titleStyle === 'scrawl'
                  ? next.title.split('').map((ch, i) => (
                      <span className="ch" key={i}>
                        {ch}
                      </span>
                    ))
                  : next.title}
              </span>
              <span className="book__next-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </nav>
        </div>
      </main>

      {book.gallery && zoom !== null && (
        <Lightbox
          gallery={book.gallery}
          index={zoom}
          onClose={closeZoom}
          onStep={stepZoom}
        />
      )}

      <AnimatedFooter />
    </div>
  );
}
