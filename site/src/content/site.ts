// Author-level content. All copy is taken verbatim from andrewfsullivan.com
// (scraped 2026-06-11). Do not add editorial copy that does not exist on the
// current site.

export const author = {
  name: 'Andrew F. Sullivan',
  // Bio copy supplied verbatim by PK (2026-06-11); supersedes the scraped
  // homepage bio. Rendered as one paragraph per array entry.
  bio: [
    `Andrew F. Sullivan is the author of *The Marigold*, a finalist for the Aurora Awards, the Locus Awards, and the Hamilton Literary Awards, and named a Best Book of the Year by *Esquire*, *The Verge*, *Book Riot* and the *Winnipeg Free Press*. He cowrote *The Handyman Method* with Nick Cutter, a novel about home improvement gone wrong. Sullivan is also the author of the novel *WASTE*, a *Globe & Mail* Best Book of the Year, and the short story collection *All We Want is Everything*, a *Globe & Mail* Best Book of the Year and finalist for the ReLit Award. He lives in Hamilton, Ontario.`,
    `Sullivan’s next novel *Earth Filled with Blood* is forthcoming from Gallery Books (a division of Simon & Schuster) in Spring 2027.`,
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
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
