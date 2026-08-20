import { api } from "@/api/axios";

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

export async function createParticipationRequest(projectId: string, message: string) {
  const { data } = await api.post<ParticipationRequest>(`/projects/${projectId}/participation-requests`, { message });
  return data;
}

export async function getProjectParticipationRequests(projectId: string) {
  const { data } = await api.get<ParticipationRequest[]>(`/projects/${projectId}/participation-requests`);
  return data;
}

export async function getMyParticipationRequests() {
  const { data } = await api.get<ParticipationRequest[]>("/participation-requests/me");
  return data;
}

export async function updateParticipationRequest(requestId: string, status: "ACCEPTED" | "REJECTED") {
  const { data } = await api.patch<ParticipationRequest>(`/participation-requests/${requestId}`, { status });
  return data;
}

export async function cancelParticipationRequest(requestId: string) {
  await api.delete(`/participation-requests/${requestId}`);
}