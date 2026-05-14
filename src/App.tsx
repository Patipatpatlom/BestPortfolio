import { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import './index.css';
import Cursor from './components/Cursor/Cursor';
import StarField from './components/StarField/StarField';
import Bubbles from './components/Bubbles/Bubbles';
import PhotoBooth from './components/PhotoBooth/PhotoBooth';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Noise from './components/Noise/Noise';
import Orbs from './components/Orbs/Orbs';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import HandTracker from './components/HandTracker/HandTracker';

export default function App() {
  const [displacement, setDisplacement] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Track Scroll Velocity for 3D Effects
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      setScrollVelocity(velocity);
    });

    // 3. Mouse Interaction for Liquid Distortion
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const targetScale = Math.min(100, velocity * 1.5);
      setDisplacement(targetScale);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      setDisplacement(prev => prev * 0.9);
      setScrollVelocity(prev => prev * 0.95);
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lenis.destroy();
    };
  }, []);

  // Calculate 3D perspective based on scroll velocity (Apply this to inner sections if needed)
  // For now, we remove it from the main container to fix Sticky scroll
  
  return (
    <>
      <LoadingScreen />
      <Noise />
      <Orbs />

      {/* Background canvas */}
      <StarField />
      <Bubbles />

      {/* Interactive Floating Widgets */}
      <PhotoBooth />

      {/* Custom cursor */}
      <Cursor />

      {/* AI Air Gestures Mode */}
      <HandTracker />

      {/* Navigation */}
      <Navbar />

      {/* Main content - NO TRANSFORM HERE to keep Sticky working */}
      <main className="liquid-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* SVG Liquid Filter Definition */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}>
        <filter id="liquid-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.012 0.008" numOctaves="1" result="noisedist" />
          <feDisplacementMap in="SourceGraphic" in2="noisedist" scale={displacement} />
        </filter>
      </svg>
    </>
  );
}
