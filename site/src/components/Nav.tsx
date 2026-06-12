import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  // Books and Bio live on the homepage; Contact (the footer) exists on
  // every page, so it always scrolls locally.
  const A = ({ hash, children }: { hash: string; children: string }) =>
    onHome ? (
      <a href={`#${hash}`}>{children}</a>
    ) : (
      <Link to={`/#${hash}`} viewTransition>
        {children}
      </Link>
    );

  return (
    <header className="nav">
      <Link className="nav__brand" to="/" viewTransition>
        <img
          className="nav__lockup"
          src="/images/brand/name-lockup.png"
          alt="Andrew F. Sullivan"
          decoding="async"
        />
      </Link>
      <nav className="nav__links" aria-label="Site">
        <A hash="books">Books</A>
        <A hash="bio">Bio</A>
        <Link to="/clippings" viewTransition>
          Clippings
        </Link>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
