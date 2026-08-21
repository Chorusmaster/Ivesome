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
  parentMessageId?: string;
  content: string;
  createdAt: string;
  editedAt?: string;
  author?: ConversationUser;
  parent?: {
    id: string;
    content: string;
    author?: ConversationUser;
  };
};

export type Conversation = {
  id: string;
  workspaceId?: string;
  members: { conversationId: string; userId: string; user: ConversationUser }[];
  messages: ConversationMessage[];
};