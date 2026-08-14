export const IDEA_VISIBILITY_VALUES = ["PRIVATE", "PUBLIC"] as const;
export type IdeaVisibility = typeof IDEA_VISIBILITY_VALUES[number];

export const IDEA_STATUS_VALUES = ["DRAFT", "PUBLISHED", "BLOCKED"] as const;
export type IdeaStatus = typeof IDEA_STATUS_VALUES[number];

export interface CreateIdeaData {
  authorId: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  visibility: IdeaVisibility;
  status: IdeaStatus;
}
