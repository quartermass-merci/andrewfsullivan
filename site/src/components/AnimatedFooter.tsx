import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { author } from '../content/site';

/**
 * Contact + the wave. The wave logic is adapted from a Tailwind/shadcn
 * snippet (stacked bars, cascading sine offsets, IntersectionObserver +
 * rAF) and re-clothed in this site's design system: bars print in the
 * page accent (--wave-color — red on the wall, the book's ink inside a
 * book world), type follows the screenprint language, and everything
 * gates on prefers-reduced-motion.
 */

const BAR_COUNT = 23;

export default function AnimatedFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  // Only animate while the footer is actually on screen.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let t = 0;
    const animate = () => {
      let offset = 0;
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        offset += Math.max(0, 18 * Math.sin((t + i) * 0.3));
        bar.style.transform = `translateY(${i + offset}px)`;
      });
      t += 0.1;
      rafRef.current = requestAnimationFrame(animate);
    };

    if (isVisible) {
      animate();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <footer className="afoot" id="contact" ref={footerRef}>
      <div className="afoot__inner">
        <img
          className="afoot__name"
          src="/images/brand/name-lockup.png"
          alt="Andrew F. Sullivan"
          loading="lazy"
          decoding="async"
        />

        <ul className="afoot__links" aria-label="Contact and navigation">
          <li>
            <a href={author.email.href}>Email</a>
          </li>
          {author.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} <small>{s.handle}</small>
              </a>
            </li>
          ))}
          <li>
            <a href={author.agent.href} target="_blank" rel="noopener noreferrer">
              Agent{' '}
              <small>
                {author.agent.name}, {author.agent.agency}
              </small>
            </a>
          </li>
          <li>{onHome ? <a href="#books">Books</a> : <Link to="/#books">Books</Link>}</li>
          <li>{onHome ? <a href="#bio">Bio</a> : <Link to="/#bio">Bio</Link>}</li>
        </ul>

        <div className="afoot__legal">
          <p>© {author.copyright}</p>
        </div>
      </div>

      <div className="afoot__wave" aria-hidden="true">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            className="bar"
            style={{ '--bar-h': `${i + 1}px` } as CSSProperties}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </footer>
  );
}
