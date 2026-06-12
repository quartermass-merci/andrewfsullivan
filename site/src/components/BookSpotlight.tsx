import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { italicsToHtml } from '../content/site';
import type { Book } from '../content/books';

/**
 * One book as a full-width spotlight on the homepage — the cover as a large
 * framed hero, the title set in that book's own page treatment (stack / glow /
 * scrawl / banner), a short blurb, and an Enter cue.
 *
 * Adapted from a hover-reactive "featured spotlight" component into this
 * site's flat-ink language: hard offset shadows instead of soft glows, the
 * accent rule grows on hover, the arrow steps. The cover keeps its
 * view-transition name so clicking still morphs it into the book page.
 */
export default function BookSpotlight({
  book,
  index,
}: {
  book: Book;
  index: number;
}) {
  const { theme } = book;

  const vars = {
    '--bk-bg': theme.bg,
    '--bk-ink': theme.ink,
    '--bk-accent': theme.accent,
    '--bk-accent2': theme.accent2,
  } as CSSProperties;

  return (
    <Link
      to={`/books/${book.slug}`}
      viewTransition
      className={`spot spot--${theme.titleStyle}`}
      style={vars}
      aria-label={`${book.title} — open the book`}
    >
      <div className="spot__media">
        <span className="framed">
          <img
            src={book.cover}
            alt={`${book.title} — cover`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            style={{ viewTransitionName: `cover-${book.slug}` }}
          />
        </span>
      </div>

      <div className="spot__text">
        <p className="spot__kicker">
          <span className="spot__rule" aria-hidden="true" />
          <span>
            {book.kind}
            {book.year ? ` · ${book.year}` : ''}
            {book.coAuthor ? ` · with ${book.coAuthor}` : ''}
          </span>
        </p>

        <h3 className="spot__title display">
          {theme.titleStyle === 'scrawl'
            ? book.displayTitle.split('').map((ch, i) => (
                <span className="ch" key={i}>
                  {ch}
                </span>
              ))
            : book.displayTitle}
        </h3>

        <p
          className="spot__blurb"
          dangerouslySetInnerHTML={{ __html: italicsToHtml(book.blurb) }}
        />

        <span className="spot__enter">
          <span className="spot__enter-label">Enter</span>
          <span className="spot__enter-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
