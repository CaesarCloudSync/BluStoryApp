export interface Project {
  projectId: number;
  name: string;
  createdAt: string;
  thumbnail: string;
  framesId: string;
}

export interface ProjectProps {
  project: Project;
}
export const project_key = 'project_';