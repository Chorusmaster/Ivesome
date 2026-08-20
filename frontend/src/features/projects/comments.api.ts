import { api } from "@/api/axios";

export type CommentAuthor = {
  id: string;
  login: string;
  firstName?: string;
  lastName?: string;
  avatarLink?: string;
};

export type ProjectComment = {
  id: string;
  projectId: string;
  authorId: string | undefined;
  parentCommentId: string | undefined;
  content: string;
  createdAt: string;
  editedAt: string | undefined;
  user: CommentAuthor | undefined;
  replies: ProjectComment[];
};

export async function getComments(projectId: string) {
  const { data } = await api.get<ProjectComment[]>(
    `/projects/${projectId}/comments`,
  );
  return data;
}

export async function createComment(
  projectId: string,
  content: string,
  parentCommentId?: string,
) {
  const { data } = await api.post<ProjectComment>(
    `/projects/${projectId}/comments`,
    { content, ...(parentCommentId && { parentCommentId }) },
  );
  return data;
}

export async function updateComment(commentId: string, content: string) {
  const { data } = await api.patch<ProjectComment>(`/comments/${commentId}`, {
    content,
  });
  return data;
}

export async function deleteComment(commentId: string) {
  await api.delete(`/comments/${commentId}`);
}
