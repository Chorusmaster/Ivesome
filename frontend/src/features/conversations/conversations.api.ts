import { api } from "@/api/axios";
import type { 
  ConversationUser,
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