// Author-level content. All copy is taken verbatim from andrewfsullivan.com
// (scraped 2026-06-11). Do not add editorial copy that does not exist on the
// current site.

export const author = {
  name: 'Andrew F. Sullivan',
  // Bio copy supplied verbatim by PK (2026-11-03). [text](url) renders as a
  // link; external links open in a new tab. One paragraph per array entry.
  bio: [
    `Andrew F. Sullivan is the author of the novel [*Earth Filled with Blood*](https://www.simonandschuster.com/books/Earth-Filled-with-Blood/Andrew-F-Sullivan/9781668242254). His previous novel, [*The Marigold*](/books/the-marigold), was a finalist for the [Aurora Awards](https://www.csffa.ca/awards-information/), the [Locus Awards](https://locusmag.com/2024/05/2024-locus-awards-top-ten-finalists), and the [Hamilton Literary Awards](https://hamiltonartscouncil.ca/literaryawards). His other books include the novel [*WASTE*](/books/waste), the short story collection [*All We Want Is Everything*](/books/all-we-want-is-everything)—both named *Globe & Mail* (Toronto) Best Books of the Year—and [*The Handyman Method*](/books/the-handyman-method), a novel cowritten with *USA TODAY* bestselling author Nick Cutter. Sullivan lives in Hamilton, Ontario, Canada.`,
    `Sullivan is represented by Ron Eckel at CookeMcDermid.`,
  ],
  headshot: {
    src: '/images/andrew-headshot.webp',
    alt: 'Andrew F. Sullivan',
    credit: 'Photo: Eden Boudreau',
  },
  socials: [
    { label: 'Instagram', handle: '@afsulli', href: 'https://www.instagram.com/afsulli/' },
    {
      label: 'Bluesky',
      handle: 'afsulli.bsky.social',
      href: 'https://bsky.app/profile/afsulli.bsky.social',
    },
  ],
  agent: {
    name: 'Ron Eckel',
    agency: 'CookeMcDermid',
    href: 'https://cookemcdermid.com/about-ron-1',
  },
  email: {
    obfuscated: 'andrewfsullivan [at] gmail [dot] com',
    href: 'mailto:andrewfsullivan@gmail.com',
  },
  copyright: 'Andrew F. Sullivan, 2026',
};

// Minimal *italics* renderer shared by components (escapes HTML first).
export function italicsToHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text: string, href: string) =>
      href.startsWith('/')
        ? `<a href="${href}">${text}</a>`
        : `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`,
    )
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
