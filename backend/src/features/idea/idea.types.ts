export enum IdeaVisibility {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export enum IdeaStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  BLOCKED = "BLOCKED",
}

export interface CreateIdeaData {
  authorId: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  visibility: IdeaVisibility;
  status: IdeaStatus;
}