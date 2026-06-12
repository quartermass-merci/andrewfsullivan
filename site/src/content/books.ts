// Per-book content + theme. Every synopsis, quote, award, and buy link below
// is taken from andrewfsullivan.com (scraped 2026-06-11). Do NOT invent copy.
//
// Each book carries a `theme` derived from its actual cover artwork so its
// page becomes that book's world:
//   The Marigold ........ black field / hot magenta tower / gold roots
//   The Handyman Method . fog grey / blood-red glow / charcoal
//   WASTE ............... night-snow black / scrawl white / sodium orange
//   All We Want ......... b&w photo grey / hex-banner red / cream

export type Quote = { text: string; source: string };
export type BuyLink = { label: string; href: string };
export type BuyGroup = { label: string; links: BuyLink[] };

export type BookTheme = {
  bg: string; // page field
  ink: string; // body text on bg
  accent: string; // primary cover colour
  accent2: string; // secondary cover colour
  muted: string; // de-emphasised text
  titleStyle: 'stack' | 'glow' | 'scrawl' | 'banner'; // per-cover title treatment
  bandFocus: string; // object-position for the full-bleed cover band divider
};

export type Book = {
  slug: string;
  title: string;
  displayTitle: string; // linebreaks via \n where the cover stacks the words
  coAuthor?: string;
  publisher: string;
  year?: string;
  isbn?: string;
  kind: 'Novel' | 'Stories';
  /** The homepage spotlight blurb — supplied verbatim by PK. */
  blurb: string;
  cover: string;
  /**
   * Optional custom band art for the full-bleed divider strip.
   * Drop the file in public/images/bands/<slug>.jpg and set this path —
   * spec: 2560×480px, focal interest inside the central 50% width ×
   * 60% height (see README "Custom band art"). Until set, the page
   * falls back to a slice of the cover positioned by theme.bandFocus.
   */
  band?: string;
  /** A looping banner video (transcoded from the supplied GIF) for the
   *  full-bleed divider strip — plays slow, looped and muted. Takes priority
   *  over `band` and the cover-slice fallback. */
  bandVideo?: string;
  synopsis: string[]; // paragraphs, verbatim
  quotes: Quote[];
  awards: string[];
  buyGroups: BuyGroup[];
  gallery?: { src: string; artist: string; title?: string }[];
  teaser?: string;
  theme: BookTheme;
};

export const books: Book[] = [
  {
    slug: 'the-marigold',
    title: 'The Marigold',
    displayTitle: 'The\nMarigold',
    publisher: 'ECW Press',
    year: '2023',
    isbn: '9781770416642',
    kind: 'Novel',
    blurb: `In a near-future Toronto buffeted by environmental chaos and unfettered development, an unsettling new lifeform begins to grow beneath the surface, feeding off the past. The Marigold, a gleaming Toronto condo tower, sits a half-empty promise: a stack of scuffed rental suites and undelivered amenities that crumbles around its residents as a mysterious sludge spreads slowly through it.`,
    cover: '/images/books/marigold/cover.webp',
    bandVideo: '/video/bands/the-marigold.mp4',
    synopsis: [
      `In a near-future Toronto buffeted by environmental chaos and unfettered development, an unsettling new lifeform begins to grow beneath the surface, feeding off the past.`,
      `The Marigold, a gleaming condo tower, sits a half-empty promise with mysterious sludge spreading through it. Public health inspector Cathy Jin investigates toxic mold infesting the city's infrastructure, while Sam "Soda" Dalipagic cruises streets in his Camry awaiting rideshare alerts. Thirteen-year-old Henrietta Brakes chases a friend into a sinkhole. Stanley Marigold, son of a legendary developer, taps hidden power to realize Marigold II despite human costs.`,
      `The novel weaves disparate storylines through body horror, urban dystopia, and ecofiction, exploring community precarity and fragile designs binding society together.`,
    ],
    quotes: [
      { text: `One of the country's most talented young writers.`, source: '*The Globe & Mail*' },
      {
        text: `Sullivan makes a chilling case for humanity's obsolescence.`,
        source: '*Publishers Weekly* (Starred Review)',
      },
      {
        text: `Sullivan excels at blurring lines between dystopian nightmare and environmental crisis.`,
        source: '*Esquire*',
      },
      { text: `Body horror with a heart.`, source: '*Toronto Star*' },
      {
        text: `A scathing critique of development and technology run amok.`,
        source: '*Winnipeg Free Press*',
      },
      { text: `Equal parts grim, horrifying, and bizarre.`, source: '*Consumed by Ink*' },
      {
        text: `Unhinged literary horror that goes right to source of decay.`,
        source: 'Iain Reid',
      },
      { text: `A Cronenbergian *Bonfire of the Vanities*.`, source: 'David Demchuk' },
      {
        text: `A fast-paced thrill ride populated by sharply written characters.`,
        source: 'Matt Bell',
      },
      {
        text: `A fierce mirror reflecting our environmental doom back onto us.`,
        source: 'Michael Wehunt',
      },
      { text: `An exhilarating dive into weird new realities.`, source: 'Nathan Ballingrud' },
      {
        text: `Urban horror done right, layered with terror of world crumbling.`,
        source: 'Gretchen Felker-Martin',
      },
      {
        text: `Like reading *The Haunting of Hill House* from inside it.`,
        source: 'Trevor Henderson',
      },
      { text: `A bracing novel of the strictest realism.`, source: 'Nick Mamatas' },
      {
        text: `Social critique written as delirious, meticulously planned horror.`,
        source: 'Naben Ruthnum',
      },
    ],
    awards: [
      '2024 Locus Awards Finalist',
      '2024 Aurora Awards Shortlist',
      'Winnipeg Free Press: Favourite Books of 2023',
      'The Verge: Favourite Books of 2023',
      'Book Riot: 25 Best Horror Books of 2023',
      'Paste Magazine: Best Horror Books of 2023 (Honorable Mention)',
      'CBC Books: 13 Scarily Good Canadian Books (Summer 2023)',
      'Hamilton Review of Books: Best Books of 2023',
    ],
    buyGroups: [
      {
        label: 'Print',
        links: [
          { label: 'ECW Press', href: 'https://ecwpress.com/products/the-marigold' },
          { label: 'Indiebound', href: 'https://www.indiebound.org/book/9781770416642' },
          {
            label: 'Indigo',
            href: 'https://www.chapters.indigo.ca/en-ca/books/the-marigold/9781770416642-item.html',
          },
          {
            label: 'Barnes & Noble',
            href: 'https://www.barnesandnoble.com/w/the-marigold-andrew-f-sullivan/1142261858',
          },
          {
            label: 'Amazon Canada',
            href: 'https://www.amazon.ca/Marigold-Andrew-F-Sullivan/dp/1770416641',
          },
          {
            label: 'Amazon US',
            href: 'https://www.amazon.com/Marigold-Andrew-F-Sullivan/dp/1770416641',
          },
        ],
      },
      {
        label: 'Audiobook',
        links: [
          {
            label: 'Penguin Random House',
            href: 'https://www.penguinrandomhouse.com/books/737117/the-marigold-by-andrew-f-sullivan/',
          },
          {
            label: 'Penguin Random House Canada',
            href: 'https://www.penguinrandomhouse.ca/books/737117/the-marigold-by-andrew-f-sullivan/',
          },
          { label: 'Audible', href: 'https://www.amazon.com/gp/product/B0BR8HTXR3' },
          { label: 'Google Play', href: 'https://play.google.com/store/audiobooks' },
          { label: 'Kobo', href: 'https://www.kobo.com/ca/en/audiobook/the-marigold-1' },
          { label: 'Libro.fm', href: 'https://libro.fm/audiobooks/9780593791066' },
          {
            label: 'Apple Books',
            href: 'https://books.apple.com/us/audiobook/the-marigold-unabridged/id1660700966',
          },
        ],
      },
    ],
    gallery: [
      { src: '/images/books/marigold/illustration-sharp.webp', artist: 'Sid Sharp', title: 'Painting' },
      { src: '/images/books/marigold/illustration-pratap.webp', artist: 'Bhanu Pratap', title: 'Illustration' },
      { src: '/images/books/marigold/illustration-stefanik.webp', artist: 'Franz Stefanik', title: 'Ink drawing' },
      { src: '/images/books/marigold/illustration-martin.webp', artist: 'Jeff Martin', title: 'Illustration' },
      {
        src: '/images/books/marigold/illustration-woodall.webp',
        artist: 'Jenn Woodall',
        title: 'The Marigold — Chapter 2',
      },
      { src: '/images/books/marigold/illustration-henderson.webp', artist: 'Trevor Henderson', title: 'Cabeza' },
    ],
    teaser: '/video/marigold-teaser.mp4',
    theme: {
      bg: '#0e0a0d',
      ink: '#f3ece6',
      accent: '#ee2f8c',
      accent2: '#f2aa1f',
      muted: '#9d8e96',
      titleStyle: 'stack',
      bandFocus: '50% 42%', // the gold roots and orb between the towers
    },
  },

  {
    slug: 'the-handyman-method',
    title: 'The Handyman Method',
    displayTitle: 'The Handyman\nMethod',
    coAuthor: 'Nick Cutter',
    publisher: 'Saga Press / Gallery Books (Simon and Schuster)',
    isbn: '9781982196721',
    kind: 'Novel',
    blurb: `When a young family moves into an unfinished development community, cracks begin to emerge in both their new residence and their lives, as a mysterious online DIY instructor delivers dark subliminal suggestions about how to handle any problem around the house.`,
    cover: '/images/books/the-handyman-method.webp',
    bandVideo: '/video/bands/the-handyman-method.mp4',
    synopsis: [
      `When a young family moves into an unfinished development community, cracks begin to emerge in both their new residence and their lives, as a mysterious online DIY instructor delivers dark subliminal suggestions about how to handle any problem around the house. The trials of home improvement, destructive insecurities, and haunted house horror all collide in this thrilling story perfect for fans of Nick Cutter's bestsellers *The Troop* and *The Deep*.`,
    ],
    quotes: [
      {
        text: `A terrific horror novel, with a spellbinding story full of surprises and superb writing that is vivid, visceral, and, at times, darkly beautiful.`,
        source: '*ALA Booklist*',
      },
      {
        text: `A brutal yet modern twist on the haunted house. This story is full of moments that will burrow under readers' skin.`,
        source: '*Library Journal*',
      },
      {
        text: `Gruesome and grisly…The pace is relentless…The vibe throughout is one of unsettling, mounting dread that rarely falters.`,
        source: '*Winnipeg Free Press*',
      },
      {
        text: `Deeply disturbing...gripping tale, well-written modern horror...a near-classic chiller that you won't soon forget.`,
        source: '*Bookreporter*',
      },
      {
        text: `Wickedly brutal…a heinous twist on the classic haunted house theme while delivering equal doses of hilarity and horror.`,
        source: '*Grimdark Magazine*',
      },
      {
        text: `Surreal and disturbing, *The Handyman Method* is a diabolical tale of toxic masculinity gone awry.`,
        source: '*CrimeReads*',
      },
      {
        text: `The novel manages to be fun, thrilling, twisted, and harrowing all at once.`,
        source: '*Tor Dot Com*',
      },
      {
        text: `I took a few breaks from reading to scan my room in paranoia. That is one of the highest compliments I can give as a horror fan.`,
        source: '*HorrorGeekLife*',
      },
      {
        text: `One of the best horror novels I've ever read.`,
        source: '*Eggplante*',
      },
      {
        text: `*The Handyman Method* is a window into our deepest fears via strange, and insidious how-to videos.`,
        source: 'Gus Moreno, *This Thing Between Us*',
      },
      {
        text: `Often terrifying, consistently unsettling, and dripping with mounting dread, Cutter and Sullivan have created a modern masterpiece.`,
        source: 'Richard Chizmar, *Chasing the Boogeyman*',
      },
    ],
    awards: [],
    buyGroups: [
      {
        label: 'Order',
        links: [
          { label: 'Indiebound', href: 'https://www.indiebound.org/book/9781982196721' },
          {
            label: 'Indigo',
            href: 'https://www.chapters.indigo.ca/en-ca/books/the-handyman-method/9781982196721-item.html',
          },
          {
            label: 'Barnes & Noble',
            href: 'https://www.barnesandnoble.com/w/the-handyman-method-nick-cutter/1142483495',
          },
          {
            label: 'Amazon Canada',
            href: 'https://www.amazon.ca/Handyman-Method-Nick-Cutter/dp/1982196726',
          },
          {
            label: 'Amazon US',
            href: 'https://www.amazon.com/Handyman-Method-Nick-Cutter/dp/1982196726',
          },
        ],
      },
    ],
    theme: {
      bg: '#141519',
      ink: '#e9ebef',
      accent: '#c1141d',
      accent2: '#b9bfc7',
      muted: '#878d96',
      titleStyle: 'glow',
      bandFocus: '50% 24%', // the buried house and its red bleed
    },
  },

  {
    slug: 'waste',
    title: 'WASTE',
    displayTitle: 'WASTE',
    publisher: 'Dzanc Books',
    year: '2016',
    isbn: '9781938103407',
    kind: 'Novel',
    blurb: `Somewhere out there in the dark, a man is still looking for his lion. His name is Astor Crane, and he has never really understood forgiveness.`,
    cover: '/images/books/waste.webp',
    bandVideo: '/video/bands/waste.mp4',
    synopsis: [
      `A breakneck tour of a brokedown city littered with ruptured families, missing mothers, busted bowling alleys, and neon motels.`,
      `Larkhill, Ontario. 1989. A city on the brink of utter economic collapse. On the brink of violence. Driving home one night, unlikely passengers Jamie Garrison and Moses Moon hit a lion at fifty miles an hour. Both men stumble away from the freak accident unharmed, but neither reports the bizarre incident.`,
      `Haunted by the dead lion, Moses storms through the frozen city with his pathetic crew of wannabe skinheads searching for his mentally unstable mother. Jamie struggles with raising his young daughter and working a dead-end job in a butcher shop, where a dead body shows up in the waste buckets out back. A warning of something worse to come.`,
      `Somewhere out there in the dark, a man is still looking for his lion. His name is Astor Crane, and he has never really understood forgiveness.`,
    ],
    quotes: [
      { text: `A brutal, mesmeric debut novel.`, source: '*The Globe and Mail*' },
      {
        text: `A rollicking, offensive, and genuinely enjoyable ride.`,
        source: '*The Toronto Star*',
      },
      {
        text: `To enter Sullivan's first novel is to spend quality time with some of the worst people in the world.`,
        source: '*Kirkus Reviews*',
      },
      {
        text: `An insightful gut-punch to the soul for any reader tough enough to take it`,
        source: '*LitReactor*',
      },
      {
        text: `One of the most violent novels CanLit has ever seen`,
        source: '*CBC Books*',
      },
      {
        text: `In some of the sharpest prose anyone is writing today, Andrew F. Sullivan vividly brings to life some of the most damaged and sorrowful characters ever encountered in fiction. Mark my words, *Waste* is going to be considered one of the best books of the year.`,
        source: 'Donald Ray Pollock, author of *Knockemstiff* and *The Devil All The Time*',
      },
      {
        text: `Balancing tenderness and brutality in the palm of his hand, Andrew F. Sullivan has carved out his own category to capture the ugliness of the world, his words always in search and service of some beating heart beneath the dirt. With *Waste*, Sullivan's deft prose hammers out a harsh, hard-fought harmony that compels you to sit down and listen.`,
        source: 'Miriam Toews, author of *All My Puny Sorrows* and *A Complicated Kindness*',
      },
      {
        text: `Waste is the unholy amalgam of Pollock's *The Devil All the Time*, Selby's *Last Exit to Brooklyn*, and the films of Harmony Korine. Andrew F. Sullivan has written a scorcher. This book is riotously alive, pulsing with bad intentions—and very very dangerous.`,
        source: 'Craig Davidson, author of *Cataract City* and *Rust and Bone*',
      },
      {
        text: `An unflinching, black-hearted story told with relentless, straight-razor prose. *Waste*, Andrew F. Sullivan's brilliantly concussive new novel, reminds me most of a literary cage match: busted, doomed characters tumbled together with no hope of escape--and it all makes for one hell of a show.`,
        source: 'Michael Christie, author of *If I Fall, If I Die*',
      },
      {
        text: `A confident storyteller whose darkly humorous and down-market prose has the cumulative effect of a Jackson Pollock canvas – except instead of paint, Sullivan's medium is blood.`,
        source: '*Quill & Quire*',
      },
      {
        text: `*Waste* continually tugs at our emotions. While his outlook and subject matter may be bleak, [Sullivan] is an unquestionably talented writer.`,
        source: '*Winnipeg Free Press*',
      },
      {
        text: `Sometimes you don't learn from events so much as you witness them. That's what Sullivan has done here. He's stood witness to people lost and forgotten, the dross of capitalism, the runoff of greed.`,
        source: '*The Spark*',
      },
      {
        text: `No matter how steeped it may be in darkness, this novel is the basic story of, as Faulkner put it, the human heart in conflict with itself.`,
        source: '*Necessary Fiction*',
      },
      {
        text: `Like watching a '70s Italian horror movie while walking naked on a bed of coals.`,
        source: '*The Winnipeg Review*',
      },
      { text: `A blown pupil of a novel`, source: '*The Ottawa Review of Books*' },
      {
        text: `A brilliant if bleak vision from a biting new voice`,
        source: '*Type Books*',
      },
      {
        text: `*Waste* offers a visceral reminder of the forces that keep people overwhelmed by inertia, stagnant and unable to act in their own best interests.`,
        source: '*The Walrus*',
      },
      {
        text: `No shortage of dirt here: this is suburban Canadian Cringe-Lit at its finest.`,
        source: '*Library Bound*',
      },
      {
        text: `The same tone of brutality and hilarity that Harry Crews created in *A Feast of Snakes*`,
        source: '*Heavy Feather Review*',
      },
      {
        text: `*Waste* does not offer a choice between good and evil, but between the seriously flawed and the amoral. It may not be the choice we want, but it's the only one we're given.`,
        source: '*Foreword*',
      },
      {
        text: `Sullivan's Larkhill is all terminal cases, and if he can't save these lives, he at least honors them.`,
        source: '*The Solute*',
      },
    ],
    awards: [
      'The Globe & Mail — Best Books of 2016',
      'CBC Books — Best Debut Novels of 2016',
      'The Walrus — Best Books of 2016',
      "Writers' Trust of Canada — Best Books of 2016",
    ],
    buyGroups: [
      {
        label: 'Canadian Retailers',
        links: [
          { label: 'Local Booksellers', href: 'http://bookmanager.com/tbm/?q=h.stores' },
          { label: 'Type Books', href: 'http://www.typebooks.ca/' },
          {
            label: 'McNally Robinson',
            href: 'http://www.mcnallyrobinson.com/9781938103407/andrew-f-sullivan/waste',
          },
          { label: 'Pulp Fiction', href: 'http://pulpfictionbooksvancouver.com/' },
          {
            label: 'Indigo',
            href: 'https://www.chapters.indigo.ca/en-ca/books/waste/9781938103407-item.html',
          },
        ],
      },
      {
        label: 'American Retailers',
        links: [
          {
            label: 'Dzanc Books',
            href: 'http://www.dzancbooks.org/our-books/waste-by-andrew-f-sullivan',
          },
          { label: 'IndieBound', href: 'http://www.indiebound.org/book/9781938103407' },
          { label: "Powell's", href: 'http://www.powells.com/book/waste-9781938103407/62-0' },
          {
            label: 'Barnes & Noble',
            href: 'http://www.barnesandnoble.com/w/waste-andrew-f-sullivan/1122550611',
          },
          {
            label: 'Books-A-Million',
            href: 'http://www.booksamillion.com/p/Waste/Andrew-F-Sullivan/9781938103407',
          },
        ],
      },
    ],
    theme: {
      bg: '#0b0a08',
      ink: '#f1ece1',
      accent: '#f1ece1',
      accent2: '#d2814c',
      muted: '#8a8378',
      titleStyle: 'scrawl',
      bandFocus: '50% 80%', // the lit road into the trees
    },
  },

  {
    slug: 'all-we-want-is-everything',
    title: 'All We Want is Everything',
    displayTitle: 'All We Want\nis Everything',
    publisher: 'Arbeiter Ring Publishing (ARP)',
    year: '2013',
    isbn: '9781894037846',
    kind: 'Stories',
    blurb: `*All We Want is Everything*, Andrew F. Sullivan's exceptional debut collection of short stories, finds the misused and forgotten, the places in between, the borderlands on the edge of town where dead fields alternate with empty warehouses—places where men and women clutch tightly at whatever fragments remain.`,
    cover: '/images/books/all-we-want-is-everything.webp',
    bandVideo: '/video/bands/all-we-want-is-everything.mp4',
    synopsis: [
      `*All We Want is Everything*, Andrew F. Sullivan's exceptional debut collection of short stories, finds the misused and forgotten, the places in between, the borderlands on the edge of town where dead fields alternate with empty warehouses—places where men and women clutch tightly at whatever fragments remain. Motels are packed with human cargo, while parole is just another state of being. Christmas dinners become battlegrounds; truck cabs and bathroom stalls transform into warped confessionals; and stories are told and retold, held out by people stumbling towards one another in the dark.`,
      `Frightening, hilarious, filled with raging impotence and moments of embattled grace, *All We Want is Everything* is the advent of a tremendous new literary voice.`,
    ],
    quotes: [
      {
        text: `One of the country's most talented young writers debuts with an extreme and extremely good short-story collection, a book of booze, bleakness and bruises.`,
        source: '*The Globe and Mail*',
      },
      {
        text: `A striking debut from a writer worth paying attention to in the coming years.`,
        source: '*The National Post*',
      },
      {
        text: `It's Raymond Carver meets Raymond Chandler, tales of hard living rendered in poetic prose stripped down to the essentials.`,
        source: '*Broken Pencil*',
      },
      {
        text: `Andrew F. Sullivan wields his prose swiftly, expertly, slicing away all soft flesh and precious angles to get to the hidden marrow of his characters unquiet lives and then, when all seems hopeless, twists the knife slightly toward a momentary tenderness that's even more startling.`,
        source: 'Miriam Toews',
      },
      {
        text: `All We Want Is Everything is a slim book but it is jammed with stories that drip with guts, bodily emissions, and heartache, told by narrators who long for a real connection.`,
        source: 'Zoe Whittall, *The Globe and Mail*',
      },
      {
        text: `The 20 stories in *All We Want Is Everything* are hard and unforgiving, dragging the reader bodily through a world in which factory machines mangle workers beyond repair and clouds of birds descend on a city.`,
        source: 'Steven W. Beattie, *The National Post*',
      },
      {
        text: `From his catchy opening lines to his killer closing lines, there's not a wasted word on the pages of this book, and you will, more than once, be picking your jaw up off your lap.`,
        source: 'Chad Pelley, *Telegraph-Journal* / *Salon*',
      },
      {
        text: `Reading Sullivan's visceral, understated prose is roughly equivalent to watching a train wreck—horrifying, yet compelling, at the same time.`,
        source: 'Bev Sandell Greenberg, *Winnipeg Free Press*',
      },
      {
        text: `In *All We Want Is Everything*, Andrew F. Sullivan assembles a collection of short stories that are at once tragic, mortifying and funny.`,
        source: 'Chris Hanna, *Maisonneuve*',
      },
      {
        text: `*All We Want Is Everything* is the debut of a major talent.`,
        source: 'A.G. Pasquella, *Broken Pencil*',
      },
      {
        text: `Sullivan's *All We Want Is Everything* is an exploration of power and choice in the face of hopelessness, inertia, and hurt.`,
        source: 'Kelsie Hahn, *Heavy Feather Review*',
      },
      {
        text: `*All We Want Is Everything* is darkly funny at times, graceful at others and gritty throughout.`,
        source: 'Justin Brouckaert, *Sundog Lit*',
      },
      {
        text: `*All We Want is Everything* tells tales of psychological trauma, family dysfunction, broken hearts and broken bodies.`,
        source: 'Alessandra Ferrei, *The Book Stylist*',
      },
    ],
    awards: [
      'The Globe and Mail — Best Book Selection, 2013',
      'The National Post — Top 5 Short Story Collections of 2013',
      "Writers' Trust — Best Books of 2013",
      'ReLit Award for Short Fiction 2014 — Shortlist',
      '"Red Phone" (Little Brother #5) — National Magazine Award in Fiction nominee',
    ],
    buyGroups: [
      {
        label: 'Order',
        links: [
          {
            label: 'Amazon.ca',
            href: 'http://www.amazon.ca/All-Want-Everything-Andrew-Sullivan/dp/1894037847',
          },
          { label: 'AK Press', href: 'http://www.akpress.org/all-we-want-is-everything.html' },
          {
            label: 'Apple Books',
            href: 'https://itunes.apple.com/ca/book/all-we-want-is-everything/id658452873?mt=11',
          },
          {
            label: 'McNally Robinson',
            href: 'http://www.mcnallyrobinson.com/9781894037846/andrew-f-sullivan/all-want-everything',
          },
          {
            label: 'Kobo',
            href: 'http://store.kobobooks.com/en-ca/books/All-We-Want-is-Everything/df33Lmky8kih85VCo9OIXQ',
          },
          { label: 'Type Books', href: 'http://typebooks.ca/' },
          {
            label: 'Chapters Indigo',
            href: 'http://www.chapters.indigo.ca/books/all-we-want-is-everything/9781894037846-item.html',
          },
          { label: 'Indie Bound', href: 'http://www.indiebound.org/book/9781894037846' },
          { label: 'Book City', href: 'http://www.bookcity.ca/' },
        ],
      },
    ],
    theme: {
      bg: '#131110',
      ink: '#ece2cf',
      accent: '#de3a31',
      accent2: '#9b948a',
      muted: '#8d867c',
      titleStyle: 'banner',
      bandFocus: '50% 52%', // the dogs
    },
  },
];

// Forthcoming — the only facts on the current site are title, publisher, season.
export const forthcoming = {
  title: 'Earth Filled with Blood',
  publisher: 'Gallery Books (Simon & Schuster)',
  year: 'Spring 2027',
  blurb: `Pitched as “Nosferatu Meets Succession,” and drawing on Irish folklore, about territorial, supernatural beings desperate to thrive in the modern world and the ramshackle attempt to halt their domination. Coming 2027!`,
};

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
