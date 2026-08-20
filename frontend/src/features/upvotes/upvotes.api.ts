import { api } from "@/api/axios";

export interface UpvoteState {
  isUpvoted: boolean;
  upvotes: number;
}

export const getUpvote = async (projectId: string): Promise<UpvoteState> => {
  const { data } = await api.get<UpvoteState>(`/projects/${projectId}/upvote`);
  return data;
};

export const toggleUpvote = async (projectId: string): Promise<UpvoteState> => {
  const { data } = await api.patch<UpvoteState>(
    `/projects/${projectId}/upvote`,
  );
  return data;
};
