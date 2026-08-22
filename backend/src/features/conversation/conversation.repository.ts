import { prisma } from "../../config/database.js";

export const conversationInclude = {
  members: {
    include: {
      user: {
        select: {
          id: true,
          login: true,
          firstName: true,
          lastName: true,
          avatarLink: true,
        },
      },
    },
  },
  messages: {
    orderBy: { createdAt: "asc" as const },
    include: {
      author: {
        select: {
          id: true,
          login: true,
          firstName: true,
          lastName: true,
          avatarLink: true,
        },
      },
      parent: {
        include: {
          author: {
            select: {
              id: true,
              login: true,
              firstName: true,
              lastName: true,
              avatarLink: true,
            },
          },
        },
      },
    },
  },
};

export async function getConversationsByUserId(userId: string) {
  return prisma.conversation.findMany({
    where: { 
      members: { some: { userId } } 
    },
    include: conversationInclude,
  }); 
}

export async function getDirectConversation(userId: string, otherUserId: string) {
  return prisma.conversation.findFirst({
    where: {
      workspaceId: null,

      members: {
        every: {
          userId: {
            in: [userId, otherUserId],
          },
        },
      },

      AND: [
        { members: { some: { userId } } },
        { members: { some: { userId: otherUserId } } },
      ],
    },
    include: conversationInclude,
  });
}

export async function getConversationById(id: string) {
  return prisma.conversation.findUnique({
    where: { id },
    include: conversationInclude,
  });
}

export async function createConversation(
  memberIds: string[],
  workspaceId?: string,
) {
  return prisma.conversation.create({
    data: {
      ...(workspaceId !== undefined && { workspaceId }),
      members: { create: memberIds.map((userId) => ({ userId })) },
    },
    include: conversationInclude,
  });
}

export async function deleteConversation(id: string) {
  return prisma.conversation.delete({ where: { id } });
}
