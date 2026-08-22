import type { User } from "../auth/auth.types";

export type ProjectStage = "IDEA" | "TEAM_BUILDING" | "DEVELOPMENT" | "LAUNCHED";
export type ProjectVisibility = "PRIVATE" | "PUBLIC";
export type ProjectStatus = "ACTIVE" | "BLOCKED" | "ARCHIVED";
export type ProjectRole = "OWNER" | "MEMBER";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description?: string | null;
  stage: ProjectStage;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  logoLink?: string | null;
  mediaLinks: string[];
  tags: string[];
  members: ProjectMember[];
  _count: {
    favourites: number;
    upvotes: number;
    comments: number;
  };
}

export interface ProjectMember {
  projectId: string;
  userId: string;
  role: ProjectRole;
  joinedAt: string;
  user: User;
}

export interface CreateProjectPayload {
  title: string;
  shortDescription: string;
  description?: string;
  stage: ProjectStage;
  visibility: ProjectVisibility;
  status?: ProjectStatus;
  tags?: string[];
  logo?: File;
  media?: File[];
}

export interface UpdateProjectPayload {
  title?: string;
  shortDescription?: string;
  description?: string;
  stage?: ProjectStage;
  visibility?: ProjectVisibility;
  status?: ProjectStatus;
  tags?: string[];
  logo?: File;
  media?: File[];
}

export interface AddMemberPayload {
  role?: ProjectRole;
}

export const PROJECT_STAGES: ProjectStage[] = ["IDEA", "TEAM_BUILDING", "DEVELOPMENT", "LAUNCHED"];
export const PROJECT_VISIBILITIES: ProjectVisibility[] = ["PRIVATE", "PUBLIC"];
export const PROJECT_STATUSES: ProjectStatus[] = ["ACTIVE", "BLOCKED", "ARCHIVED"];
export const PROJECT_ROLES: ProjectRole[] = ["OWNER", "MEMBER"];