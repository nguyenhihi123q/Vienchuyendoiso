// ==========================================
// CORE DATA TYPES FOR HU-IDTER WEBSITE
// ==========================================

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface Profile {
  name: string;
  shortName: string;
  slogan: string;
  mission: string;
  vision: string;
  contact: ContactInfo;
  socialLinks: SocialLink[];
  stats: Stat[];
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
  description: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  degree: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  partner: string;
  tag: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  partner: string;
  target: string;
  tags: string[];
  content: string[];
  image: string;
  featured: boolean;
}

export interface Program {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  target: string;
  duration: string;
  level: string;
  description: string;
  objectives: string[];
  curriculum: CurriculumItem[];
  outcomes: string[];
  icon: string;
  badge: string;
  badgeColor: string;
  featured: boolean;
}

export interface CurriculumItem {
  module: string;
  topics: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: ResourceType;
  tags: string[];
  downloadUrl: string;
  fileSize: string;
  publishDate: string;
  author: string;
  icon: string;
  featured: boolean;
}

export type ResourceCategory =
  | 'ai-application'
  | 'digital-skills'
  | 'admin-docs'
  | 'research';

export type ResourceType = 'pdf' | 'doc' | 'video' | 'slide' | 'guide';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PromptTemplate {
  id: string;
  label: string;
  prompt: string;
  response: string;
  icon: string;
  category: string;
}

export interface ContactFormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}
