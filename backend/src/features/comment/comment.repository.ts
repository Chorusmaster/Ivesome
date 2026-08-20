import { prisma } from "../../config/database.js";

const authorSelect = {
  id: true,
  login: true,
  firstName: true,
  lastName: true,
  avatarLink: true,
} as const;

export async function getCommentsByProjectId(projectId: string) {
  return prisma.comment.findMany({
    where: { projectId, parentCommentId: null },
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: authorSelect },
      replies: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: authorSelect } },
      },
    },
  });
}

export async function getCommentById(id: string) {
  return prisma.comment.findUnique({
    where: { id },
    select: {
      id: true,
      projectId: true,
      authorId: true,
      parentCommentId: true,
    },
  });
}

export async function createComment(data: {
  projectId: string;
  authorId: string;
  content: string;
  parentCommentId?: string;
}) {
  return prisma.comment.create({
    data,
    include: { user: { select: authorSelect } },
  });
}

export async function updateComment(id: string, content: string) {
  return prisma.comment.update({
    where: { id },
    data: { content, editedAt: new Date() },
    include: { user: { select: authorSelect } },
  });
}

export async function deleteComment(id: string) {
  return prisma.comment.delete({ where: { id } });
}
