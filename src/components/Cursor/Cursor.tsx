import { useEffect, useRef } from 'react';
import WebGLFluid from 'webgl-fluid';
import styles from './Cursor.module.css';

export default function Cursor(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(hover: none)').matches;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize the WebGL fluid simulation
    WebGLFluid(canvas, {
      TRIGGER: 'hover',
      IMMEDIATE: false,
      AUTO: false,
      TRANSPARENT: true,
      SPLAT_RADIUS: 0.15,
      SPLAT_FORCE: 5000,
      COLORFUL: true,
      COLOR_UPDATE_SPEED: 10,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.8,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: true,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1.0,
    });

    // Since the canvas has `pointer-events: none` to let clicks pass through,
    // we need to manually capture mouse events on the window and dispatch them to the canvas
    // so the fluid simulation reacts to the mouse perfectly.
    const forwardEvent = (e: MouseEvent) => {
      const clonedEvent = new MouseEvent(e.type, {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        cancelable: true,
      });
      canvas.dispatchEvent(clonedEvent);
    };

    window.addEventListener('mousemove', forwardEvent);
    window.addEventListener('mousedown', forwardEvent);
    window.addEventListener('mouseup', forwardEvent);

    return () => {
      window.removeEventListener('mousemove', forwardEvent);
      window.removeEventListener('mousedown', forwardEvent);
      window.removeEventListener('mouseup', forwardEvent);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.fluidCanvas} />;
}
