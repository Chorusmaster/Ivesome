export type ParticipationRequest = {
  id: string;
  projectId: string;
  userId: string;
  message?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  type: "APPLICATION" | "INVITATION";
  createdAt: string;
  user?: { id: string; login: string; firstName?: string; lastName?: string; avatarLink?: string };
  project?: { id: string; title: string };
};
