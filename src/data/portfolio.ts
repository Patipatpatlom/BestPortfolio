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
    title: 'RealorCake (Full-Stack E-commerce Web App)',
    description:
      'Developed an end-to-end e-commerce application for a customized cake shop, managing everything from database schema design to responsive frontend rendering. Implemented complex interactive components, including custom calendar logic for advance cake booking and an optimized checkout flow with dynamic order success screens. Ensured system stability and secure user access by writing robust unit tests for core business and authentication logic using Vitest.',
    tech: ['React.js', 'Node.js', 'Express', 'Prisma', 'Vitest', 'TailwindCSS'],
    role: 'Full-Stack Developer',
    year: '2025',
    color: 'rgba(0, 245, 255, 0.08)',
    accentColor: '#00f5ff',
    links: {
      github: 'https://github.com/Patipatpatlom',
      live: 'https://realorcake.vercel.app/login',
    },
    featured: true,
  },
  {
    id: '4b1k',
    title: '4B1K Community Concert (Interactive Community Platform)',
    description:
      'Engineered real-time communication features using Socket.io to power live community feeds, group/private chat flows, and dynamic "typing" indicators. Developed central modules for centralized concert listings and artist biographies, focusing on a high-performance, clean, and engaging user interface. Collaborated effectively within a development team using Git for version control, managing divergent branches, code reviews, and seamless merges.',
    tech: ['React.js', 'Node.js', 'Socket.io', 'Git', 'TailwindCSS'],
    role: 'Full-Stack Developer',
    year: '2024',
    color: 'rgba(255, 107, 53, 0.08)',
    accentColor: '#ff6b35',
    links: {
      github: 'https://github.com/Patipatpatlom',
      live: 'https://4b1k.vercel.app/',
    },
    featured: true,
  },
];

export const SKILLS: Skill[] = [
  // Language
  { name: 'HTML',        level: 90, category: 'language', color: '#e34f26' },
  { name: 'CSS',         level: 90, category: 'language', color: '#1572b6' },
  { name: 'JavaScript',  level: 95, category: 'language', color: '#f7df1e' },
  { name: 'TypeScript',  level: 90, category: 'language', color: '#3178c6' },
  
  // Frameworks & Library
  { name: 'Node.js',     level: 88, category: 'backend',  color: '#68a063' },
  { name: 'Express.js',  level: 85, category: 'backend',  color: '#ffffff' },
  { name: 'React.js',    level: 95, category: 'frontend', color: '#61dafb' },
  { name: 'TailwindCSS', level: 90, category: 'frontend', color: '#38bdf8' },
  { name: 'Zustand',     level: 85, category: 'frontend', color: '#ffb347' },
  { name: 'Socket.io',   level: 85, category: 'backend',  color: '#ffffff' },
  { name: 'Fastify',     level: 80, category: 'backend',  color: '#ffffff' },
  { name: 'Next.js',     level: 85, category: 'frontend', color: '#ffffff' },
  { name: 'Nest.js',     level: 80, category: 'backend',  color: '#ea2845' },
  { name: 'JWT',         level: 85, category: 'backend',  color: '#ffffff' },
  { name: 'Bcrypt',      level: 85, category: 'backend',  color: '#ffffff' },
  { name: 'Figma',       level: 85, category: 'design',   color: '#f24e1e' },
  { name: 'Git & GitHub',level: 92, category: 'devops',   color: '#f05032' },
  { name: 'Postman',     level: 90, category: 'devops',   color: '#ff6c37' },
  { name: 'Axios',       level: 90, category: 'frontend', color: '#5a29e4' },
  { name: 'Swagger',     level: 85, category: 'devops',   color: '#85ea2d' },
  
  // Database
  { name: 'MySQL',       level: 85, category: 'backend',  color: '#4479a1' },
  { name: 'Prisma',      level: 90, category: 'backend',  color: '#2d3748' },
  { name: 'PostgreSQL',  level: 85, category: 'backend',  color: '#336791' },
  
  // DevOps / Deployment
  { name: 'Docker',      level: 75, category: 'devops',   color: '#2496ed' },
  { name: 'Vercel',      level: 85, category: 'devops',   color: '#ffffff' },
];

export const CONTACT_INFO: ContactInfo = {
  email: 'patipatpatlom@gmail.com',
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/Patipatpatlom',
      icon: 'github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/patipat-patlom',
      icon: 'linkedin',
    },
    {
      platform: 'Portfolio',
      url: '#',
      icon: 'link',
    },
  ],
};

export const BIO_LINES = [
  "Dedicated professional with fine dining and culinary experience, now making a transition into Full Stack Development.",
  "Brings a strong foundation of precision, creativity, and problem-solving honed in high-pressure environments.",
  "Driven to build clean, functional digital products and dedicated to continuous growth as a developer."
];
