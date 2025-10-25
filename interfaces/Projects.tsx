export interface Project {
  name: string;
  thumbnailUrl?: string;
  email?: string;
  role?: string; // e.g. "owner", "manager", "developer", "viewer"
  avatarUrl?: string;
  joinedAt?: string; // ISO date
}

export interface ProjectProps {
  project: Project;
}