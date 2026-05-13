import type { Project, Skill, ContactInfo, NavItem } from '../types';

// ============================================================
// Portfolio Data — Patipat Patlom
// ============================================================

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero',     label: 'Home',     href: '#hero' },
  { id: 'about',   label: 'About',    href: '#about' },
  { id: 'projects',label: 'Projects', href: '#projects' },
  { id: 'skills',  label: 'Skills',   href: '#skills' },
  { id: 'contact', label: 'Contact',  href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 'realorcake',
    title: 'RealOrCake',
    description:
      'An AI-powered image analysis platform that determines whether food photos are authentic or artificially generated. Features real-time inference, confidence scoring, and a slick comparison UI.',
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'TensorFlow', 'PostgreSQL'],
    role: 'Full-Stack Developer',
    year: '2024',
    color: 'rgba(0, 245, 255, 0.08)',
    accentColor: '#00f5ff',
    links: {
      github: 'https://github.com/patipat',
      live: '#',
    },
    featured: true,
  },
  {
    id: '4b1k',
    title: '4B1K Community Concert',
    description:
      'A social platform for live-music lovers — community chat rooms, event discovery, real-time seat reservations, and artist profiles. Built with WebSocket-driven real-time features.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'JWT', 'Tailwind'],
    role: 'Full-Stack & UX Lead',
    year: '2024',
    color: 'rgba(255, 107, 53, 0.08)',
    accentColor: '#ff6b35',
    links: {
      github: 'https://github.com/patipat/4b1k-frontend',
      live: '#',
    },
    featured: true,
  },
  {
    id: 'gravityui',
    title: 'GravityUI Design System',
    description:
      'A zero-dependency, physics-inspired component library. Includes floating cards, orbital menus, gravity-repel cursors, and micro-interaction primitives — all typed in TypeScript.',
    tech: ['TypeScript', 'Vite', 'Framer Motion', 'CSS Modules', 'Storybook'],
    role: 'Design System Architect',
    year: '2025',
    color: 'rgba(184, 255, 87, 0.07)',
    accentColor: '#b8ff57',
    links: {
      github: 'https://github.com/patipat/gravityui',
    },
    featured: false,
  },
  {
    id: 'orbitchat',
    title: 'OrbitChat',
    description:
      'A minimal, privacy-first encrypted messenger. End-to-end encryption with Ed25519 keys, ephemeral rooms, and a data-minimalist philosophy — no logs, no tracking.',
    tech: ['React', 'TypeScript', 'WebRTC', 'Node.js', 'libsodium', 'Redis'],
    role: 'Backend & Security Lead',
    year: '2025',
    color: 'rgba(0, 245, 255, 0.06)',
    accentColor: '#7c3aed',
    links: {
      github: 'https://github.com/patipat/orbitchat',
    },
    featured: false,
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React',       level: 95, category: 'frontend', color: '#61dafb' },
  { name: 'TypeScript',  level: 90, category: 'frontend', color: '#3178c6' },
  { name: 'Next.js',     level: 85, category: 'frontend', color: '#00f5ff' },
  { name: 'Framer Motion', level: 80, category: 'frontend', color: '#ff4d88' },
  { name: 'CSS / SCSS',  level: 88, category: 'frontend', color: '#f06292' },
  { name: 'Vite',        level: 85, category: 'frontend', color: '#b8ff57' },
  // Backend
  { name: 'Node.js',     level: 88, category: 'backend',  color: '#68a063' },
  { name: 'FastAPI',     level: 78, category: 'backend',  color: '#059669' },
  { name: 'PostgreSQL',  level: 80, category: 'backend',  color: '#336791' },
  { name: 'MongoDB',     level: 82, category: 'backend',  color: '#4db33d' },
  { name: 'Socket.io',   level: 85, category: 'backend',  color: '#ff6b35' },
  { name: 'Redis',       level: 72, category: 'backend',  color: '#dc382d' },
  // DevOps
  { name: 'Docker',      level: 75, category: 'devops',   color: '#2496ed' },
  { name: 'Git',         level: 92, category: 'devops',   color: '#f05032' },
  { name: 'CI/CD',       level: 70, category: 'devops',   color: '#00f5ff' },
  // Design
  { name: 'Figma',       level: 85, category: 'design',   color: '#f24e1e' },
  { name: 'UX Research', level: 78, category: 'design',   color: '#b8ff57' },
  // Languages
  { name: 'JavaScript',  level: 93, category: 'language', color: '#f7df1e' },
  { name: 'Python',      level: 80, category: 'language', color: '#3572a5' },
  { name: 'Go',          level: 60, category: 'language', color: '#00acd7' },
];

export const CONTACT_INFO: ContactInfo = {
  email: 'patipat.patlom@gmail.com',
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/patipat',
      icon: 'github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/patipat-patlom',
      icon: 'linkedin',
    },
    {
      platform: 'X / Twitter',
      url: 'https://x.com/patipat_dev',
      icon: 'twitter',
    },
  ],
};

export const BIO_LINES = [
  "I build things that feel alive.",
  "Full-Stack Developer & UX/UI Designer based in Bangkok, Thailand.",
  "I specialise in React + TypeScript frontends with physics-inspired micro-interactions, backed by Node.js and Python APIs. When I'm not shipping features, I'm obsessing over scroll choreography, colour systems, and the fine line between a good interface and a great one.",
  "Currently open to full-time roles and freelance collaborations.",
];
