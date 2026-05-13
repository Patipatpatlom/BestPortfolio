// ============================================================
// Global TypeScript Interfaces & Types
// ============================================================

export interface Project {
  id: string;
  title: string;
  titleTh?: string;
  description: string;
  tech: string[];
  role: string;
  year: string;
  color: string;
  accentColor: string;
  links: {
    github?: string;
    live?: string;
  };
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'language';
  color: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  socials: SocialLink[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export interface ScrollProgress {
  y: number;           // raw px scroll
  progress: number;    // 0-1 page progress
  direction: 'up' | 'down' | null;
}

export interface FloatConfig {
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}
