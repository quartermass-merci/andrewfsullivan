// Interviews + podcast appearances, scraped from andrewfsullivan.com's per-book
// press lists (2026-06-11). Every title, outlet, URL and date here is real and
// taken from the live site — nothing invented. Reviews stay on each book page
// (the "praise wall"); this file powers the dedicated /press route only.
//
// Two items were deliberately left out: the Rue Morgue "Sickness in the Six"
// interview (its href was unrecoverable on the live page — we don't fabricate
// URLs) and the SplitLip "Interview with Chana Porter" (that one is conducted
// BY Andrew, not about him). Add them later if the links surface.

export type PressItem = {
  title: string;
  outlet: string;
  url: string;
  date?: string;
};

/** Grouped by book — the slug matches a book in books.ts, so the press
 *  component reads the cover, title and accent straight from there. */
export type PressGroupData = { slug: string; items: PressItem[] };

export const interviews: PressGroupData[] = [
  {
    slug: 'the-marigold',
    items: [
      {
        title: `Toronto Apocalypse? Andrew Sullivan on his new horror book The Marigold, an oozing life form and the terror of alienation and isolation`,
        outlet: 'Toronto Star',
        url: 'https://www.thestar.com/entertainment/books/2023/04/19/toronto-apocalypse-andrew-sullivan-on-his-new-horror-book-the-marigold-an-oozing-life-form-and-the-terror-of-alienation-and-isolation.html',
        date: 'April 2023',
      },
      {
        title: `The Marigold paints a dour future world in novel set in Toronto`,
        outlet: 'The Globe & Mail',
        url: 'https://www.theglobeandmail.com/arts/books/article-the-marigold-paints-a-dour-future-world-in-novel-set-in-toronto/',
      },
      {
        title: `A New Novel Captures the Precarious State of Cities`,
        outlet: 'Metropolis',
        url: 'https://metropolismag.com/viewpoints/andrew-f-sullivans-the-marigold-captures-the-precarious-state-of-cities/',
      },
      {
        title: `Hamilton Reads Andrew F. Sullivan`,
        outlet: 'Hamilton City Magazine',
        url: 'https://hamiltoncitymagazine.ca/hamilton-reads-3/',
      },
      {
        title: `Andrew F. Sullivan Explores a Literally Toxic Future Toronto in His Crackling New Horror Novel The Marigold`,
        outlet: 'Open Book',
        url: 'https://open-book.ca/News/Andrew-F.-Sullivan-Explores-a-Literally-Toxic-Future-Toronto-in-His-Crackling-New-Horror-Novel-The-Marigold',
      },
      {
        title: `Spotlight on Andrew F. Sullivan`,
        outlet: 'Dragonfly',
        url: 'https://dragonfly.eco/spotlight-andrew-f-sullivan/',
      },
      {
        title: `Interview with Andrew F. Sullivan`,
        outlet: 'Hypes and Archetypes',
        url: 'https://ivygrimes.substack.com/p/interview-with-andrew-f-sullivan',
      },
      {
        title: `Andrew F. Sullivan: Exploring the Dark Places`,
        outlet: 'Trode',
        url: 'https://www.trode.ca/andrew-f-sullivan-exploring-the-dark-places/',
      },
      {
        title: `Exclusive Interview: The Marigold author Andrew F. Sullivan`,
        outlet: 'Paul Semel',
        url: 'https://paulsemel.com/exclusive-interview-the-marigold-author-andrew-f-sullivan/',
      },
      {
        title: `Andrew F. Sullivan`,
        outlet: 'Nothing in Particular',
        url: 'https://www.nothinginparticular.online/interviews-/andrew-f-sullivan',
      },
      {
        title: `Dark Matter Magazine, Issue 014`,
        outlet: 'Dark Matter Magazine',
        url: 'https://darkmattermagazine.shop/collections/issue-014',
      },
    ],
  },
  {
    slug: 'the-handyman-method',
    items: [
      {
        title: `Exclusive: Nick Cutter and Andrew F. Sullivan Talk The Handyman Method`,
        outlet: 'Horror Geek Life',
        url: 'https://www.horrorgeeklife.com/2023/08/08/exclusive-nick-cutter-andrew-f-sullivan-the-handyman-method/',
        date: 'August 2023',
      },
      {
        title: `Exclusive Interview: The Handyman Method Co-Authors Nick Cutter & Andrew F. Sullivan`,
        outlet: 'Paul Semel',
        url: 'https://paulsemel.com/exclusive-interview-the-handyman-method-co-authors-nick-cutter-andrew-f-sullivan/',
      },
      {
        title: `The Handyman Method Authors Nick Cutter and Andrew F. Sullivan on Their New Algorithmic Horror Novel`,
        outlet: 'Dread Central',
        url: 'https://www.dreadcentral.com/interviews/459791/the-handyman-method-authors-nick-cutter-and-andrew-f-sullivan-on-their-new-algorithmic-horror-novel/',
      },
      {
        title: `Conversations in Character with Handyman Hank`,
        outlet: 'Fresh Fiction',
        url: 'https://blog.freshfiction.com/nick-cutter-and-andrew-f-sullivan-conversations-in-character-with-handyman-hank/',
      },
    ],
  },
  {
    slug: 'waste',
    items: [
      {
        title: `Interview with Andrew Sullivan, author of Waste`,
        outlet: 'Canadian Notes & Queries',
        url: 'http://notesandqueries.ca/interviews/interview-with-andrew-sullivan-author-of-waste/',
      },
      {
        title: `Awful People Still Exist (Part One): Andrew F. Sullivan in Conversation`,
        outlet: 'Open Book Toronto',
        url: 'http://www.openbooktoronto.com/jess_taylor/blog/awful_people_still_exist_part_one_andrew_f_sullivan_conversation',
      },
      {
        title: `The Novel is Not a Moral Compass: An Exchange Between Andrew Sullivan and E Martin Nolan`,
        outlet: 'The Puritan',
        url: 'http://puritan-magazine.com/novel-not-a-moral-compass-an-exchange-between-andrew-sullivan-and-e-martin-nolan/',
      },
      {
        title: `Writers on Writing — Andrew F. Sullivan`,
        outlet: 'Ryerson Folio',
        url: 'http://ryersonfolio.com/writers-on-writing-andrew-f-sullivan/',
      },
      {
        title: `An Interview with Waste author Andrew F. Sullivan`,
        outlet: 'The Fiddlehead',
        url: 'http://thefiddleheadnews.blogspot.ca/2016/03/an-interview-with-waste-author-andrew-f.html',
      },
      {
        title: `Andrew F. Sullivan: The TNB Self-Interview`,
        outlet: 'The Nervous Breakdown',
        url: 'http://www.thenervousbreakdown.com/tnbfiction/2016/03/andrew-f-sullivan-the-tnb-self-interview/',
      },
      {
        title: `Proust Questionnaire with Andrew Sullivan`,
        outlet: 'Open Book Toronto',
        url: 'http://www.openbooktoronto.com/news/proust_questionnaire_with_andrew_sullivan',
      },
    ],
  },
  {
    slug: 'all-we-want-is-everything',
    items: [
      {
        title: `Smoke and Mirrors: An Interview with Andrew F. Sullivan`,
        outlet: 'SmokeLong Quarterly',
        url: 'http://www.smokelong.com/smoke-and-mirrors-an-interview-with-andrew-f-sullivan/',
      },
      {
        title: `An Interview with Andrew F. Sullivan`,
        outlet: 'PRISM International',
        url: 'http://prismmagazine.ca/2014/01/24/an-interview-with-andrew-f-sullivan/',
        date: 'January 2014',
      },
      {
        title: `Moments of Crisis: An Interview with Andrew F. Sullivan`,
        outlet: 'The Winnipeg Review',
        url: 'http://www.winnipegreview.com/wp/2013/09/moments-of-crisis-an-interview-with-andrew-f-sullivan/',
        date: 'September 2013',
      },
      {
        title: `Nine Questions with Andrew F. Sullivan`,
        outlet: 'Currently — Trevor Corkum',
        url: 'http://trevorcorkum.com/2013/08/04/nine-questions-with-andrew-f-sullivan/',
        date: 'August 2013',
      },
      {
        title: `Storybrain: Seven Questions for Andrew F. Sullivan`,
        outlet: 'Alix Hawley',
        url: 'http://www.alixhawley.com/blog/storybrain-seven-questions-for-andrew-f-sullivan',
      },
      {
        title: `Here, Read This with Andrew F. Sullivan`,
        outlet: 'Echolocation',
        url: 'http://echolocationmag.com/?p=1486#more-1486',
      },
      {
        title: `Andrew F. Sullivan, Fiction Writer`,
        outlet: 'The Rusty Toque',
        url: 'http://www.therustytoque.com/3/post/2013/10/andrew-f-sullivan-fiction-writer.html',
      },
      {
        title: `An Interview with Andrew F. Sullivan`,
        outlet: 'David E. Burga',
        url: 'http://davidburga.wordpress.com/2014/01/12/an-interview-with-andrew-f-sullivan/',
        date: 'January 2014',
      },
      {
        title: `All We Want is More Andrew Sullivan`,
        outlet: 'The Book Fridge',
        url: 'http://kerricull.wordpress.com/2013/11/25/969/',
        date: 'November 2013',
      },
      {
        title: `I wanted to write a Canadian book that dealt with violence`,
        outlet: 'Pacific Tranquility',
        url: 'https://pacifictranquility.wordpress.com/2016/09/03/i-wanted-to-write-a-canadian-book-that-dealt-with-violence-small-scale-but-very-real-violence-we-often-ignore-or-dont-read-about-its-a-currency-we-trade-with-each-other-qa-with-auth/',
        date: 'September 2016',
      },
      {
        title: `Andrew F. Sullivan's Would You Rather?`,
        outlet: 'The Next Best Book Blog',
        url: 'http://thenextbestbookblog.blogspot.ca/2013/10/andrew-f-sullivans-would-you-rather.html',
        date: 'October 2013',
      },
    ],
  },
];

export const podcasts: PressGroupData[] = [
  {
    slug: 'the-marigold',
    items: [
      {
        title: `The Marigold`,
        outlet: 'Talking Scared',
        url: 'https://open.spotify.com/episode/5Pgr0fX89L7sSUnSkGyfJk',
      },
      {
        title: `Episode 213: The Marigold ft. Andrew F. Sullivan`,
        outlet: 'Podside Picnic',
        url: 'https://soundcloud.com/user-733327042/episode-213-the-marigold-ft-andrew-f-sullivan',
      },
      {
        title: `To Colonize the Fungal City: Andrew F. Sullivan's The Marigold`,
        outlet: 'Death // Sentence',
        url: 'https://soundcloud.com/death-sentence-pod/to-colonize-the-fungal-city-andrew-f-sullivans-the-marigold',
      },
      {
        title: `Episode 56: Weird Era feat. Andrew Sullivan`,
        outlet: 'Weird Era',
        url: 'https://podcasts.apple.com/ca/podcast/episode-56-weird-era-feat-andrew-sullivan/id1550801304?i=1000617211599',
      },
      {
        title: `Gentrified Horror`,
        outlet: 'Rite Gud',
        url: 'https://kittysneezes.com/gentrified-horror/',
      },
      {
        title: `Ep 383: Andrew F. Sullivan`,
        outlet: 'Spooked!',
        url: 'https://thesonarnetwork.com/spooked/episode/ep-383-andrew-f-sullivan/',
      },
      {
        title: `116: Can't Lit — Andrew F. Sullivan`,
        outlet: "Can't Lit",
        url: 'https://cantlit.libsyn.com/116-cant-lit-andrew-f-sullivan?tdest_id=201220',
      },
      {
        title: `E339 with Andrew F. Sullivan`,
        outlet: 'Get Lit!',
        url: 'https://www.jamietennant.ca/index.php/2023/05/18/e339-with-andrew-f-sullivan/',
        date: 'May 2023',
      },
      {
        title: `Episode 34: Interview with Andrew F. Sullivan`,
        outlet: 'We Bleed Orange and Black',
        url: 'https://webobpodcast.com/2023/05/15/episode-34-interview-with-andrew-f-sullivan/',
        date: 'May 2023',
      },
      {
        title: `Bestselling Authors Amy Jones + Andrew F. Sullivan`,
        outlet: 'NEWSTALK 1010 — Richard Crouse',
        url: 'https://richardcrouse.ca/newstalk-1010-bestselling-authors-amy-jones-andrew-f-sullivan/',
      },
      {
        title: `David Demchuk: Three Favourite Spring Reads`,
        outlet: 'The Next Chapter, CBC',
        url: 'https://www.cbc.ca/listen/live-radio/1-67-the-next-chapter/clip/15985795-david-demchuk-three-favourite-spring-reads',
      },
      {
        title: `The Lonely Writer Podcast — Andrew F. Sullivan`,
        outlet: 'The Lonely Writer',
        url: 'https://www.instagram.com/p/CrRCDVuLor-/',
      },
    ],
  },
  {
    slug: 'the-handyman-method',
    items: [
      {
        title: `TIH 517: Nick Cutter and Andrew F. Sullivan on The Handyman Method, Successful Collaborations, and Story Pacing`,
        outlet: 'This Is Horror',
        url: 'https://www.thisishorror.co.uk/tih-517-nick-cutter-and-andrew-f-sullivan-on-the-handyman-method-successful-collaborations-and-story-pacing/',
      },
      {
        title: `Episode 226: The Handyman Method ft. Andrew F. Sullivan & Nick Cutter`,
        outlet: 'Podside Picnic',
        url: 'https://soundcloud.com/user-733327042/episode-226-the-handyman-method-ft-andrew-f-sullivan-nick-cutter',
      },
      {
        title: `Nick Cutter and Andrew F. Sullivan — The Handyman Method`,
        outlet: 'Narrative Species',
        url: 'https://narrativespecies.wordpress.com/2023/08/18/nick-cutter-and-andrew-f-sullivan-the-handyman-method/',
        date: 'August 2023',
      },
      {
        title: `The One Where Nick Cutter and Andrew F. Sullivan`,
        outlet: 'Writers, Ink',
        url: 'https://podcasts.apple.com/us/podcast/the-one-where-nick-cutter-and-andrew-f-sullivan/id1489852600?i=1000622888565',
      },
    ],
  },
  {
    slug: 'waste',
    items: [
      {
        title: `How Andrew F. Sullivan turned tough-guy tall tales into a very violent novel`,
        outlet: 'The Next Chapter, CBC',
        url: 'http://www.cbc.ca/radio/thenextchapter/robert-sawyer-kateri-akiwenzie-damm-summer-mystery-picks-1.3634162/how-andrew-f-sullivan-turned-tough-guy-tall-tales-into-a-very-violent-novel-1.3634169',
      },
    ],
  },
];
