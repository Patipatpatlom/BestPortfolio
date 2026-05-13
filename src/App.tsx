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

export default function App(): JSX.Element {
  return (
    <>
      <Noise />
      <Orbs />

      {/* Background canvas */}
      <StarField />
      <Bubbles />

      {/* Interactive Floating Widgets */}
      <PhotoBooth />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
