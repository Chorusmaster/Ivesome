import { ApiError } from "../../types/error.types.js";
import { getConversationById } from "../conversation/conversation.repository.js";
import {
  createMessage as createMessageDb,
  deleteMessage as deleteMessageDb,
  getMessageById,
  getMessageDetailsById,
  getMessagesByConversationId,
  updateMessage as updateMessageDb,
} from "./message.repository.js";
import { assertMessageAuthor } from "./message.authorization.js";

async function assertConversationMember(
  conversationId: string,
  userId: string,
) {
  const conversation = await getConversationById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  if (!conversation.members.some((member) => member.userId === userId)) {
    throw new ApiError(403, "You are not a member of this conversation");
  }
}

export async function listMessages(conversationId: string, userId: string) {
  await assertConversationMember(conversationId, userId);
  return getMessagesByConversationId(conversationId);
}

export async function getMessage(messageId: string, userId: string) {
  const message = await getMessageById(messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  await assertConversationMember(message.conversationId, userId);
  return getMessageDetailsById(messageId);
}

export async function createMessage(
  conversationId: string,
  authorId: string,
  content: string,
  parentMessageId?: string,
) {
  await assertConversationMember(conversationId, authorId);

  if (parentMessageId) {
    const parent = await getMessageById(parentMessageId);
    if (!parent || parent.conversationId !== conversationId) {
      throw new ApiError(404, "Parent message not found");
    }
  }

  return createMessageDb({
    conversationId,
    authorId,
    content,
    ...(parentMessageId !== undefined && { parentMessageId }),
  });
}

export async function updateMessage(
  messageId: string,
  authorId: string,
  content: string,
) {
  const message = await getMessageById(messageId);
  assertMessageAuthor(message, authorId);
  return updateMessageDb(messageId, content);
}

export async function deleteMessage(messageId: string, authorId: string) {
  const message = await getMessageById(messageId);
  assertMessageAuthor(message, authorId);
  await deleteMessageDb(messageId);
}
