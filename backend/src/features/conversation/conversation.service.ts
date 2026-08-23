import { ApiError } from "../../types/error.types.js";
import { prisma } from "../../config/database.js";
import {
  getConversationsByUserId,
  createConversation as createConversationDb,
  getConversationById,
  getDirectConversation,
  deleteConversation
} from "./conversation.repository.js";
import { assertConversationMember } from "./conversation.authorization.js";

export function listConversations(userId: string) {
  return getConversationsByUserId(userId);
}

export async function getConversation(conversationId: string, userId: string) {
  await assertConversationMember(conversationId, userId);
  
  const conversation = await getConversationById(conversationId);

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