import { prisma } from "../../config/database.js";
import { conversationInclude } from "../conversation/conversation.repository.js";

const userIncludes = {
  select: {
    id: true,
    login: true,
    email: true,
    firstName: true,
    lastName: true,
    avatarLink: true,
  },
} as const;

export async function getWorkspaceByID(id: string) {
  return prisma.workspace.findUnique({
    where: { id },
    include: {
      project: {
        include: {
          members: {
            select: {
              role: true,
              user: userIncludes,
            },
          },
          participationRequests: {
            select: {
              id: true,
              message: true,
              status: true,
              createdAt: true,
              type: true,
              user: userIncludes,
            },
          },
        },
      },
      tasks: true,
      conversation: {
        include: conversationInclude,
      },
    },
  });
}