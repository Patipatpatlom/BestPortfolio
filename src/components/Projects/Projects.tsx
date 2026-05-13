import { useRef, useCallback } from 'react';
import { useInView } from '../../hooks/useScrollProgress';
import { PROJECTS } from '../../data/portfolio';
import type { Project } from '../../types';
import styles from './Projects.module.css';

/* ---- Icons (inline SVG) ---- */
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

/* ---- Project Card ---- */
interface CardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: revealRef, inView } = useInView(0.1);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width;
    const dy = (e.clientY - rect.top) / rect.height;
    const rx = (dy - 0.5) * -14;
    const ry = (dx - 0.5) * 14;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
    card.style.setProperty('--mx', `${dx * 100}%`);
    card.style.setProperty('--my', `${dy * 100}%`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  return (
    <div
      ref={(el) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className={`${styles.card} ${styles.reveal} ${inView ? styles.visible : ''}`}
      style={{
        ['--cardAccent' as string]: project.accentColor,
        ['--cardBg' as string]: project.color,
        transitionDelay: `${index * 0.1}s`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.cardBg} />

      <div className={styles.cardTop}>
        <span className={styles.cardYear}>{project.year}</span>
        <div className={styles.cardLinks}>
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              data-hover
              aria-label={`${project.title} GitHub`}
            >
              <GitHubIcon />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              data-hover
              aria-label={`${project.title} live demo`}
            >
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>

      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardRole}>{project.role}</p>
      <p className={styles.cardDesc}>{project.description}</p>

      <div className={styles.techStack}>
        {project.tech.map((t) => (
          <span key={t} className={styles.techTag}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ---- Section ---- */
export default function Projects() {
  const { ref: headerRef, inView: headerVisible } = useInView(0.2);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div
          ref={headerRef}
          className={`${styles.header} ${styles.reveal} ${headerVisible ? styles.visible : ''}`}
        >
          <p className={styles.label}>Selected Work</p>
          <h2 className={styles.heading}>Projects</h2>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
