import { useInView } from '../../hooks/useScrollProgress';
import profileImg from '../../assets/portrait.jpg';
import styles from './About.module.css';

export default function About() {
  const { ref: textRef, inView: textVisible } = useInView(0.15);
  const { ref: avatarRef, inView: avatarVisible } = useInView(0.15);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        {/* ---- Text column ---- */}
        <div
          ref={textRef}
          className={`${styles.textCol} ${styles.reveal} ${textVisible ? styles.visible : ''}`}
        >
          <p className={styles.label}>About Me</p>

          <h2 className={styles.heading}>
            Escape <em>velocity</em><br />achieved.
          </h2>

          <p className={styles.bioIntro}>I build things that feel alive.</p>

          <p className={styles.bioBody}>
            Full-Stack Developer &amp; UX/UI Designer based in Bangkok, Thailand.
            I specialise in React + TypeScript frontends with physics-inspired micro-interactions,
            backed by Node.js and Python APIs. When I'm not shipping features, I'm obsessing
            over scroll choreography, colour systems, and the fine line between a good interface
            and a great one.
          </p>

          <p className={styles.bioBody}>
            From designing interactive concert platforms to AI-powered food-analysis tools,
            I thrive at the intersection of engineering precision and creative intuition.
            Every pixel I place is intentional. Every interaction is considered.
          </p>

          <p className={styles.bioFooter}>
            ✦ Currently open to full-time roles &amp; freelance collaborations.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>15+</span>
              <span className={styles.statLabel}>Projects Shipped</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>∞</span>
              <span className={styles.statLabel}>Coffee Consumed</span>
            </div>
          </div>
        </div>

        {/* ---- Avatar column ---- */}
        <div
          ref={avatarRef}
          className={`${styles.avatarCol} ${styles.reveal} ${avatarVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          <div className={styles.avatarFrame}>
            <div className={styles.avatarRingOuter}>
              <span className={styles.avatarDot} />
            </div>
            <div className={styles.avatarRingInner} />
            <img
              src={profileImg}
              alt="Patipat Patlom"
              className={styles.avatar}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
