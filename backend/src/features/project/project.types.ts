export interface CreateProjectData {
  title: string;
  shortDescription: string;
  description?: string;
  stage: ProjectStage;
  visibility: ProjectVisibility;
  status?: ProjectStatus;
  tags?: string[];
  logoLink?: string;
  mediaLinks?: string[];
}

export interface UpdateProjectData {
  title?: string;
  shortDescription: string;
  description?: string;
  stage?: ProjectStage;
  visibility?: ProjectVisibility;
  status?: ProjectStatus;
  tags?: string[];
  logoLink?: string;
  mediaLinks?: string[];
}

export const PROJECT_STAGE_VALUES = [
  "IDEA",
  "TEAM_BUILDING",
  "DEVELOPMENT",
  "LAUNCHED",
] as const;
export type ProjectStage = (typeof PROJECT_STAGE_VALUES)[number];

export const PROJECT_VISIBILITY_VALUES = ["PRIVATE", "PUBLIC"] as const;
export type ProjectVisibility = (typeof PROJECT_VISIBILITY_VALUES)[number];

export const PROJECT_STATUS_VALUES = ["ACTIVE", "BLOCKED", "ARCHIVED"] as const;
export type ProjectStatus = (typeof PROJECT_STATUS_VALUES)[number];

export const PROJECT_ROLE_VALUES = ["OWNER", "MEMBER"] as const;
export type ProjectRole = (typeof PROJECT_ROLE_VALUES)[number];
