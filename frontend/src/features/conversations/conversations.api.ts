import { api } from "@/api/axios";
import type { 
  ConversationMessage,
  Conversation
} from "./conversations.types";

export async function getConversations() {
  const { data } = await api.get<Conversation[]>("/conversations");
  return data;
}

export async function getConversation(conversationId: string) {
  const { data } = await api.get<Conversation>(`/conversations/${conversationId}`);
  return data;
}

export async function createConversation(userId: string) {
  const { data } = await api.post<Conversation>("/conversations", {userId});
  return data;
}

export async function createMessage(
  conversationId: string,
  content: string,
  parentMessageId?: string,
) {
  const { data } = await api.post<ConversationMessage>(
    `/conversations/${conversationId}/messages`,
    { content, ...(parentMessageId && { parentMessageId }) },
  );
  return data;
}

export async function updateMessage(messageId: string, content: string) {
  const { data } = await api.patch<ConversationMessage>(`/messages/${messageId}`, { content });
  return data;
}

export async function deleteMessage(messageId: string) {
  await api.delete(`/messages/${messageId}`);
}