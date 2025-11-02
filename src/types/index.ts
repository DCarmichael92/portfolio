// TypeScript types define the structure of content you render across the site.
export type Link = { label: string; href: string };

export type Experience = {
  company: string; // Employer name
  role: string; // Your title
  location?: string; // City, State (optional)
  start: string; // ISO date, e.g., "2025-01"
  end?: string; // ISO date or undefined if current
  highlights: string[]; // Impactful bullet points
  tech?: string[]; // Technologies used
  links?: Link[]; // Case study or repo links
};

export type Project = {
  name: string; // Project title
  status: "completed" | "in-progress"; // Used for filtering
  description: string; // Short summary
  stack: string[]; // Technologies used
  repo?: string; // Repository URL if public
  demo?: string; // Live demo URL
  tags?: string[]; // Additional filters
  year?: number; // Build year
  impact?: string; // Quantified outcome if available
};

export type Hobby = {
  name: string; // Hobby label
  blurb: string; // One-liner about why you enjoy it
  links?: Link[]; // Optional related links
};
