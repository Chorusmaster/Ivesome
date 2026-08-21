import { prisma } from "../../config/database.js";

const authorSelect = {
  id: true,
  login: true,
  firstName: true,
  lastName: true,
  avatarLink: true,
} as const;

const messageInclude = {
  author: { select: authorSelect },
  parent: {
    include: { author: { select: authorSelect } },
  },
} as const;

export async function getMessagesByConversationId(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: messageInclude,
  });
}

export async function getMessageById(id: string) {
  return prisma.message.findUnique({
    where: { id },
    select: { id: true, conversationId: true, authorId: true, parentMessageId: true },
  });
}

export async function getMessageDetailsById(id: string) {
  return prisma.message.findUnique({
    where: { id },
    include: messageInclude,
  });
}

export async function createMessage(data: {
  conversationId: string;
  authorId: string;
  content: string;
  parentMessageId?: string;
}) {
  return prisma.message.create({
    data,
    include: messageInclude,
  });
}

export async function updateMessage(id: string, content: string) {
  return prisma.message.update({
    where: { id },
    data: { content, editedAt: new Date() },
    include: messageInclude,
  });
}

export async function deleteMessage(id: string) {
  return prisma.message.delete({ where: { id } });
}