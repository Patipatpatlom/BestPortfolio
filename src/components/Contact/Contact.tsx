import { useState, type FormEvent } from 'react';
import { useInView } from '../../hooks/useScrollProgress';
import { CONTACT_INFO } from '../../data/portfolio';
import styles from './Contact.module.css';

/* ---- Social icon map ---- */
const SOCIAL_ICONS: Record<string, JSX.Element> = {
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

const SOCIAL_COLORS: Record<string, string> = {
  github: 'rgba(255,255,255,0.08)',
  linkedin: 'rgba(0,119,181,0.15)',
  twitter: 'rgba(29,155,240,0.12)',
};

const SOCIAL_HANDLES: Record<string, string> = {
  github: 'github.com/patipat',
  linkedin: 'linkedin.com/in/patipat-patlom',
  twitter: '@patipat_dev',
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export default function Contact(): JSX.Element {
  const { ref: infoRef, inView: infoVisible } = useInView(0.15);
  const { ref: formRef, inView: formVisible } = useInView(0.15);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, send to an API. Here we just simulate.
    setSubmitted(true);
  };

  return (
    <>
      <section id="contact" className={styles.section}>
        <div className={styles.inner}>
          {/* ---- Left: Info ---- */}
          <div
            ref={infoRef}
            className={`${styles.info} ${styles.reveal} ${infoVisible ? styles.visible : ''}`}
          >
            <p className={styles.label}>Let's Talk</p>
            <h2 className={styles.heading}>
              Launch a<br /><em>conversation</em>
            </h2>
            <p className={styles.desc}>
              Whether you have a project in mind, a role to fill, or just want to geek out
              about design systems and zero-gravity interfaces — my inbox is always open.
            </p>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className={styles.emailLink}
              data-hover
            >
              <span className={styles.emailIcon}><EmailIcon /></span>
              {CONTACT_INFO.email}
            </a>

            <div className={styles.socials}>
              {CONTACT_INFO.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                  data-hover
                >
                  <span
                    className={styles.socialIcon}
                    style={{ background: SOCIAL_COLORS[s.icon] || 'rgba(255,255,255,0.06)' }}
                  >
                    {SOCIAL_ICONS[s.icon]}
                  </span>
                  <span className={styles.socialMeta}>
                    <span className={styles.socialPlatform}>{s.platform}</span>
                    <span className={styles.socialHandle}>{SOCIAL_HANDLES[s.icon]}</span>
                  </span>
                  <span className={styles.arrowIcon}><ArrowIcon /></span>
                </a>
              ))}
            </div>
          </div>

          {/* ---- Right: Form ---- */}
          <div
            ref={formRef}
            className={`${styles.reveal} ${formVisible ? styles.visible : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <div className={styles.formWrap}>
              {submitted ? (
                <p className={styles.successMsg}>
                  ✦ Message received.<br />I'll be in orbit shortly.
                </p>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className={styles.formTitle}>
                    Send a <span>transmission</span>
                  </h3>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-name" className={styles.formLabel}>Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className={styles.formInput}
                      placeholder="Buzz Aldrin"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email" className={styles.formLabel}>Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      className={styles.formInput}
                      placeholder="you@mission.control"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message" className={styles.formLabel}>Message</label>
                    <textarea
                      id="contact-message"
                      className={styles.formTextarea}
                      placeholder="Tell me about your project, idea, or mission..."
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className={styles.formBtn} data-hover id="contact-submit">
                    Launch Message ↗
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          Designed &amp; built by <span>Patipat Patlom</span> — defying gravity since{' '}
          {new Date().getFullYear()}.
        </p>
      </footer>
    </>
  );
}
