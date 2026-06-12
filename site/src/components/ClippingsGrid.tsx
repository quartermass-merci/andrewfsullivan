import { getBook } from '../content/books';
import { type PressGroupData } from '../content/press';

/**
 * The clippings wall — every interview / podcast as a card in a responsive
 * grid, each one linking out. Adapted from a feature-grid component into the
 * flat-ink language: raised panels on the wall, a hard accent top-edge and
 * offset-shadow hover in the book's colour, the outlet set like a masthead.
 * Cards are flattened from the per-book groups and tagged with their book.
 */
export default function ClippingsGrid({
  groups,
  kind,
}: {
  groups: PressGroupData[];
  kind: 'interview' | 'podcast';
}) {
  const verb = kind === 'podcast' ? 'Listen' : 'Read';
  const noun = kind === 'podcast' ? 'Podcast' : 'Interview';

  const cards = groups.flatMap((g) => {
    const book = getBook(g.slug);
    if (!book) return [];
    return g.items.map((it) => ({ ...it, book }));
  });

  return (
    <div className="clips">
      {cards.map((c) => (
        <a
          key={c.url}
          className="clip"
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ['--bk-accent' as string]: c.book.theme.accent }}
        >
          <span className="clip__tag">{c.book.title}</span>
          <span className="clip__outlet">{c.outlet}</span>
          <span className="clip__title">{c.title}</span>
          <span className="clip__foot">
            <span className="clip__kind">
              {noun}
              {c.date ? ` · ${c.date}` : ''}
            </span>
            <span className="clip__cta">
              {verb} <span aria-hidden="true">↗</span>
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
