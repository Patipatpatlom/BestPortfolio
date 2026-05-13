import { useState, useEffect, useRef } from 'react';
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
  const lastPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const targetScale = Math.min(100, velocity * 2.0);
      setDisplacement(targetScale);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      setDisplacement(prev => prev * 0.9);
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

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

      {/* Main content */}
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
          <feTurbulence type="turbulence" baseFrequency="0.015 0.01" numOctaves="2" result="noisedist" />
          <feDisplacementMap in="SourceGraphic" in2="noisedist" scale={displacement} />
        </filter>
      </svg>
    </>
  );
}
