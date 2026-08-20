import { prisma } from "../../config/database.js";

export async function getUpvote(userId: string, projectId: string) {
  return prisma.upvote.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  });
}

export async function countUpvotes(projectId: string) {
  return prisma.upvote.count({ where: { projectId } });
}

export async function addUpvote(userId: string, projectId: string) {
  return prisma.upvote.create({ data: { userId, projectId } });
}

export async function removeUpvote(userId: string, projectId: string) {
  return prisma.upvote.delete({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  });
}
