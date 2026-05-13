import { useState } from 'react';
import { useInView } from '../../hooks/useScrollProgress';
import { SKILLS } from '../../data/portfolio';
import type { Skill } from '../../types';
import styles from './Skills.module.css';

type Category = 'all' | Skill['category'];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend' },
  { key: 'devops',   label: 'DevOps' },
  { key: 'design',   label: 'Design' },
  { key: 'language', label: 'Languages' },
];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getBubbleSize(level: number): number {
  // map level 60-95 → 72px-120px
  return Math.round(72 + ((level - 60) / 35) * 48);
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const { ref: headerRef, inView: headerVisible } = useInView(0.2);
  const { ref: cloudRef, inView: cloudVisible } = useInView(0.1);

  const filtered = activeTab === 'all'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`${styles.header} ${styles.reveal} ${headerVisible ? styles.visible : ''}`}
        >
          <p className={styles.label}>What I Work With</p>
          <h2 className={styles.heading}>Skills</h2>
          <p className={styles.subheading}>
            Technologies that orbit my daily workflow.
          </p>
        </div>

        {/* Category tabs */}
        <div className={styles.tabs} role="tablist" aria-label="Skill categories">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeTab === key}
              className={`${styles.tab} ${activeTab === key ? styles.active : ''}`}
              onClick={() => setActiveTab(key)}
              data-hover
            >
              {label}
            </button>
          ))}
        </div>

        {/* Bubble cloud */}
        <div
          ref={cloudRef}
          className={`${styles.cloud} ${styles.reveal} ${cloudVisible ? styles.visible : ''}`}
          role="list"
          aria-label="Skills list"
        >
          {filtered.map((skill, i) => {
            const size = getBubbleSize(skill.level);
            const fontSize = size < 90 ? '0.65rem' : size < 108 ? '0.75rem' : '0.85rem';
            const dur = 4 + (i % 5) * 0.8;
            const delay = (i * 0.3) % 3;

            return (
              <div
                key={skill.name}
                role="listitem"
                className={styles.bubble}
                title={`${skill.name} — ${skill.level}%`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle at 35% 35%, ${hexToRgba(skill.color, 0.18)}, ${hexToRgba(skill.color, 0.04)})`,
                  border: `1px solid ${hexToRgba(skill.color, 0.35)}`,
                  boxShadow: `0 0 ${size * 0.3}px ${hexToRgba(skill.color, 0.12)}, inset 0 0 ${size * 0.2}px ${hexToRgba(skill.color, 0.05)}`,
                  ['--dur' as string]: `${dur}s`,
                  ['--delay' as string]: `${delay}s`,
                  transitionDelay: `${i * 0.04}s`,
                }}
              >
                <span
                  className={styles.bubbleName}
                  style={{ color: skill.color, fontSize }}
                >
                  {skill.name}
                </span>
                <span
                  className={styles.bubbleLevel}
                  style={{ color: skill.color }}
                >
                  {skill.level}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
