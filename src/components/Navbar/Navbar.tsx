import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { NAV_ITEMS } from '../../data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#hero" className={styles.logo} onClick={() => handleNav('#hero')}>
          PP<span>.DEV</span>
        </a>

        <ul className={styles.links}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={active === item.id ? styles.active : ''}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.rightActions}>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>

          <a
            href="#contact"
            className={styles.ctaBtn}
            data-hover
          onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
        >
            Hire Me
          </a>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <ul className={styles.mobileMenu}>
          <button className={styles.closeBtn} onClick={() => setMobileOpen(false)} aria-label="Close menu">×</button>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={item.href} onClick={(e) => { e.preventDefault(); handleNav(item.href); }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
