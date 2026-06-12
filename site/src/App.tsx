import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book';
import Clippings from './pages/Clippings';
import ShadowField from './components/ShadowField';

/** Scroll to top on route change; honour in-page #hash targets. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ShadowField />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:slug" element={<Book />} />
        <Route path="/clippings" element={<Clippings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
