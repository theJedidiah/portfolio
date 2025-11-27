// Project Types
export type ProjectRole = "product" | "engineering" | "both";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  role: ProjectRole;
  roleLabel: string;
  thumbnail: string;
  techStack: string[];
  tools: string[];
  featured: boolean;
  year: number;
  // Case Study Details
  problem?: string;
  solution?: string;
  outcome?: string;
  metrics?: string[];
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
  content?: string;
}

// Filter Types
export type FilterCategory = "all" | "product" | "engineering";

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  helpType: "strategy" | "dev" | "hello";
  message: string;
}

