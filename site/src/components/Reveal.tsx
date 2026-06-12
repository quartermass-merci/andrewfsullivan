import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * Scroll-reveal wrapper. Adds .is-in when the element enters the viewport.
 * The CSS transition only exists under prefers-reduced-motion: no-preference,
 * so with reduced motion this renders fully visible and static.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const T = Tag as 'div';
  return (
    <T
      ref={ref as never}
      className={`reveal ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </T>
  );
}
