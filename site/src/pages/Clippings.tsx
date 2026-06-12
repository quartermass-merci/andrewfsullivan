import { useEffect } from 'react';
import Nav from '../components/Nav';
import AnimatedFooter from '../components/AnimatedFooter';
import Reveal from '../components/Reveal';
import ClippingsGrid from '../components/ClippingsGrid';
import { interviews, podcasts } from '../content/press';

export default function Clippings() {
  useEffect(() => {
    document.title = 'Clippings — Andrew F. Sullivan';
  }, []);

  return (
    <div className="press page">
      <Nav />

      <main className="press__main">
        <header className="press__head">
          <h1 className="section-head" data-text="Clippings">
            Clippings
          </h1>
        </header>

        <section className="press__section" aria-labelledby="clip-interviews">
          <Reveal className="press__section-head">
            <h2 className="section-head" data-text="Interviews" id="clip-interviews">
              Interviews
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <ClippingsGrid groups={interviews} kind="interview" />
          </Reveal>
        </section>

        <section className="press__section" aria-labelledby="clip-podcasts">
          <Reveal className="press__section-head">
            <h2 className="section-head" data-text="Podcasts" id="clip-podcasts">
              Podcasts
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <ClippingsGrid groups={podcasts} kind="podcast" />
          </Reveal>
        </section>
      </main>

      <AnimatedFooter />
    </div>
  );
}
