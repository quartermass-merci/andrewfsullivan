import { useEffect } from 'react';
import Nav from '../components/Nav';
import AnimatedFooter from '../components/AnimatedFooter';
import Reveal from '../components/Reveal';
import BookSpotlight from '../components/BookSpotlight';
import { author, italicsToHtml } from '../content/site';
import { books, forthcoming } from '../content/books';

export default function Home() {
  useEffect(() => {
    document.title = 'Andrew F. Sullivan';
  }, []);

  return (
    <div className="home page">
      <Nav />

      <main>
        {/* ----- Hero: the mark alone, full bleed; the field moves behind
                  it and the only way on is down ----- */}
        <section className="hero" aria-label="Andrew F. Sullivan">
          <h1 className="hero__logo-wrap">
            <img
              className="hero__logo"
              src="/images/brand/hero-logo.png"
              alt="Andrew F. Sullivan"
              decoding="async"
              fetchPriority="high"
            />
          </h1>
          <a className="hero__enter" href="#books" aria-label="Enter — go to the books">
            <span className="hero__enter-label">Enter</span>
            <span className="hero__enter-arrow" aria-hidden="true">↓</span>
          </a>
        </section>

        {/* ----- Book module: each book as a full-width spotlight; no
                  section label — the spotlights carry themselves ----- */}
        <section className="wall" id="books" aria-label="Books">
          <div className="spot-list">
            {books.map((book, i) => (
              <Reveal key={book.slug} delay={i * 80}>
                <BookSpotlight book={book} index={i} />
              </Reveal>
            ))}

            {/* Forthcoming — no cover yet; a striped field holds the slot */}
            <Reveal delay={books.length * 80}>
              <div
                className="spot spot--forthcoming"
                aria-label={`${forthcoming.title} — forthcoming`}
              >
                <div className="spot__media">
                  <span className="framed">
                    <span className="pattern pattern--stripes" aria-hidden="true" />
                  </span>
                </div>
                <div className="spot__text">
                  <p className="spot__kicker">
                    <span className="spot__rule" aria-hidden="true" />
                    <span>
                      Forthcoming · {forthcoming.publisher} · {forthcoming.year}
                    </span>
                  </p>
                  <h3 className="spot__title display">{forthcoming.title}</h3>
                  <p className="spot__blurb">{forthcoming.blurb}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----- Bio (verbatim); no section label ----- */}
        <section className="bio" id="bio" aria-label="About Andrew F. Sullivan">
          <Reveal className="bio__portrait">
            <span className="framed">
              <img
                src={author.headshot.src}
                alt={author.headshot.alt}
                loading="lazy"
                decoding="async"
              />
            </span>
            <p className="bio__credit">{author.headshot.credit}</p>
          </Reveal>
          <Reveal delay={80}>
            {author.bio.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="bio__text"
                dangerouslySetInnerHTML={{ __html: italicsToHtml(para) }}
              />
            ))}
          </Reveal>
        </section>
      </main>

      <AnimatedFooter />
    </div>
  );
}
