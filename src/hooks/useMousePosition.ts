import { useState, useEffect, useRef, useCallback } from 'react';
import type { MousePosition } from '../types';

/**
 * Tracks the global mouse position and returns normalized (-1 to 1) coordinates.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const rafId = useRef<number | null>(null);
  const rawPos = useRef({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    setPosition({
      x: rawPos.current.x,
      y: rawPos.current.y,
      normalizedX: (rawPos.current.x / window.innerWidth) * 2 - 1,
      normalizedY: (rawPos.current.y / window.innerHeight) * 2 - 1,
    });
    rafId.current = null;
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updatePosition]);

  return position;
}

/**
 * Tracks mouse position relative to a specific element.
 * Returns tilt angles (rotateX, rotateY) and a hover boolean.
 */
export function useElementMouseTilt(maxAngle = 15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setTilt({
          rotateX: -dy * maxAngle,
          rotateY: dx * maxAngle,
          scale: 1.03,
        });
      });
    };

    const onLeave = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [maxAngle]);

  return { ref, tilt };
}
