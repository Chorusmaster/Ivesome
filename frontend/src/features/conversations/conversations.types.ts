export type ConversationUser = {
  id: string;
  login: string;
  firstName?: string;
  lastName?: string;
  avatarLink?: string;
};

export type ConversationMessage = {
  id: string;
  conversationId: string;
  authorId?: string;
  content: string;
  createdAt: string;
  editedAt?: string;
  author?: ConversationUser;
};

export type Conversation = {
  id: string;
  workspaceId?: string;
  members: { conversationId: string; userId: string; user: ConversationUser }[];
  messages: ConversationMessage[];
};