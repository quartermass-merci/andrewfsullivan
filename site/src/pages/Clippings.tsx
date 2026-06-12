import { useEffect } from 'react';
import Nav from '../components/Nav';
import AnimatedFooter from '../components/AnimatedFooter';
import EvidenceWall from '../components/EvidenceWall';

export default function Clippings() {
  useEffect(() => {
    document.title = 'Clippings — Andrew F. Sullivan';
  }, []);

  return (
    <div className="press page">
      <Nav />

      <main className="press__main">
        {/* No visible label — the wall speaks for itself; heading kept for AT */}
        <h1 className="sr-only">
          Clippings — interviews &amp; podcast appearances
        </h1>
        <EvidenceWall />
      </main>

      <AnimatedFooter />
    </div>
  );
}
