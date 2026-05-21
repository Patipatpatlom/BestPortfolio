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
          <p className={styles.label}>Summary</p>

          <h2 className={styles.heading}>
            Precision, Creativity &<br /><em>Problem-Solving</em>.
          </h2>

          <p className={styles.bioIntro}>
            Dedicated professional with fine dining and culinary experience, now making a transition into Full Stack Development.
          </p>

          <p className={styles.bioBody}>
            Brings a strong foundation of precision, creativity, and problem-solving honed in high-pressure environments. Driven to build clean, functional digital products and dedicated to continuous growth as a developer.
          </p>

          <h3 style={{fontFamily: 'var(--font-display)', marginTop: '2.5rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontSize: '1.5rem'}}>Work Experience</h3>
          <div style={{marginBottom: '2rem'}}>
            <p style={{fontWeight: '700', color: 'var(--cyan)', fontSize: '1.1rem'}}>Pastry Chef | Mia Restaurant (1 Michelin Star)</p>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.05em'}}>April 2025 – July 2025</p>
            <ul style={{listStyleType: 'disc', paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6'}}>
              <li style={{marginBottom: '0.5rem'}}><strong style={{color: 'var(--text-primary)'}}>Exceptional Precision & Standards:</strong> Maintained the highest level of culinary excellence in a 1-Michelin-starred environment, requiring extreme attention to detail and adherence to complex formulas—a discipline that mirrors writing precise and bug-free code.</li>
              <li style={{marginBottom: '0.5rem'}}><strong style={{color: 'var(--text-primary)'}}>Scientific Approach to Problem Solving:</strong> Utilized a methodical and logic-based approach to pastry creation, managing delicate ratios and technical processes to ensure consistent output under high-pressure conditions.</li>
              <li><strong style={{color: 'var(--text-primary)'}}>Quality Assurance:</strong> Upheld rigorous quality control standards, ensuring every component met specific requirements before delivery, similar to performing thorough code reviews and testing.</li>
            </ul>
            
            <p style={{fontWeight: '700', color: 'var(--cyan)', fontSize: '1.1rem', marginTop: '1.5rem'}}>Chef de Partie | Fat Lamb BKK</p>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.05em'}}>April 2024 – April 2025</p>
            <ul style={{listStyleType: 'disc', paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6'}}>
              <li style={{marginBottom: '0.5rem'}}><strong style={{color: 'var(--text-primary)'}}>Station Management & Optimization:</strong> Managed and supervised a specific kitchen section, optimizing workflows to ensure maximum efficiency during peak hours—demonstrating a strong grasp of process management and system logic.</li>
              <li style={{marginBottom: '0.5rem'}}><strong style={{color: 'var(--text-primary)'}}>Agile Team Collaboration:</strong> Collaborated closely with a large kitchen brigade to ensure seamless service delivery, utilizing clear communication and real-time coordination to achieve team goals, much like working within a cross-functional development team.</li>
              <li><strong style={{color: 'var(--text-primary)'}}>Inventory & Resource Management:</strong> Responsible for ingredient preparation and inventory tracking (Mise en Place), showcasing organizational skills and the ability to manage complex dependencies effectively.</li>
            </ul>
          </div>

          <h3 style={{fontFamily: 'var(--font-display)', marginTop: '2.5rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontSize: '1.5rem'}}>Education</h3>
          <div>
            <p style={{fontWeight: '700', color: 'var(--cyan)', fontSize: '1.1rem'}}>CodeCamp Thailand | Jan 2026 – May 2026</p>
            <p style={{fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem', fontWeight: '500'}}>Fullstack Developer Bootcamp (# 22)</p>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6'}}>
              Intensive 4-month software engineering bootcamp focusing on modern web technologies (MERN Stack, Prisma, TailwindCSS) and best practices.
            </p>

            <p style={{fontWeight: '700', color: 'var(--cyan)', fontSize: '1.1rem'}}>Dusit Thani College | 2015 – 2019</p>
            <p style={{fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem', fontWeight: '500'}}>Bachelor of Business Administration (B.B.A.)</p>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6'}}>
              Major: Culinary Arts and Kitchen Management
            </p>
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
