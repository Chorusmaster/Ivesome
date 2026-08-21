import { ApiError } from "../../types/error.types.js";
import { prisma } from "../../config/database.js";
import {
  getConversationsByUserId,
  createConversation as createConversationDb,
  getConversationById,
  getDirectConversation,
  deleteConversation
} from "./conversation.repository.js";

export function listConversations(userId: string) {
  return getConversationsByUserId(userId);
}

export async function getConversation(conversationId: string, userId: string) {
  const conversation = await getConversationById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  if (!conversation.members.some((member) => member.userId === userId)) {
    throw new ApiError(403, "You are not a member of this conversation");
  }

  return conversation;
}

export async function createConversation(
  userId: string,
  otherUserId: string,
) {
  if (userId === otherUserId) {
    throw new ApiError(422, "Can't create conversation with yourself");
  }

  const existingConversation = await getDirectConversation(userId, otherUserId);
  if (existingConversation) return existingConversation;

  return createConversationDb([userId, otherUserId]);
}