import { useState, useEffect, useRef } from 'react';
import type { ScrollProgress } from '../types';

/**
 * Tracks window scroll position, progress (0-1), and direction.
 */
export function useScrollProgress(): ScrollProgress {
  const [scroll, setScroll] = useState<ScrollProgress>({
    y: 0,
    progress: 0,
    direction: null,
  });
  const lastY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(y / max, 1) : 0;
      const direction = y > lastY.current ? 'down' : y < lastY.current ? 'up' : null;
      lastY.current = y;
      setScroll({ y, progress, direction });
      rafId.current = null;
    };

    const onScroll = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return scroll;
}

/**
 * Returns whether an element is currently in the viewport.
 * Used for scroll-triggered reveal animations.
 */
export function useInView(threshold = 0.15, once = true) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}
