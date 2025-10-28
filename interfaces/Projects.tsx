import { z } from 'zod';
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
export interface CurrentProject {
  projectId: number;
}
export const CurrentProjectScheme = z.object({
    projectId: z.number(),
});
export const project_key = 'project_';