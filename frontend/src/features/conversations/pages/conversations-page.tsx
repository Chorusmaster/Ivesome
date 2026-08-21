import { useEffect, useState } from "react";
import { Send, X } from "lucide-react";

import Input from "@/shared/ui/input";
import Conversation from "../ui/conversation";
import {
  createMessage,
  deleteMessage,
  getConversations,
  updateMessage,
} from "../conversations.api";
import type { Conversation as ConversationType } from "../conversations.types";
import { useNavigate, useParams } from "react-router-dom";
import { formatMessageDate } from "@/shared/lib/utils";
import Avatar from "@/shared/ui/avatar";
import { useAuth } from "@/features/auth/auth.context";
import type { ConversationMessage } from "../conversations.types";

function ConversationsPage() {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<ConversationMessage | null>(null);
  const { conversationId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  function setConversation(id: string) {
    navigate(`/conversations/${id}`, { replace: true });
  }

  useEffect(() => {
    async function loadConversations() {
      const items = await getConversations();

      console.log(items);
      setConversations(items);
    }

    loadConversations();
  }, []);

  const selectedConversation = conversations.find(
    ({ id }) => id === conversationId,
  );

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const content = messageContent.trim();
    if (!selectedConversation || !content) return;

    const message = await createMessage(
      selectedConversation.id,
      content,
      replyingTo?.id,
    );
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? { ...conversation, messages: [...conversation.messages, message] }
          : conversation,
      ),
    );
    setMessageContent("");
    setReplyingTo(null);
  }

  async function handleEditMessage(messageId: string, content: string) {
    const updatedMessage = await updateMessage(messageId, content);
    setConversations((current) => current.map((conversation) => ({
      ...conversation,
      messages: conversation.messages.map((message) =>
        message.id === messageId ? updatedMessage : message,
      ),
    })));
  }

  async function handleDeleteMessage(messageId: string) {
    await deleteMessage(messageId);
    setConversations((current) => current.map((conversation) => ({
      ...conversation,
      messages: conversation.messages.filter((message) => message.id !== messageId),
    })));
  }

  function processConversationList(current: ConversationType[]) {
    return current
      .map((conversation) => {
        const lastMessage = conversation.messages.reduce((latest, item) => {
          if (!latest) return item;

          return new Date(item.createdAt) > new Date(latest.createdAt)
            ? item
            : latest;
        });
        const otherMember = conversation.members.find(
          (member) => member.userId !== user?.id,
        );
        return {
          ...conversation,
          lastMessage: lastMessage,
          otherMember: otherMember,
          messages: [...conversation.messages],
        }}
      )
      .sort((latest, item) => {
        return new Date(item?.lastMessage.createdAt ?? 0).getTime()
          - new Date(latest?.lastMessage.createdAt ?? 0).getTime();
      })
  }

  return (
    <div className="flex-1 grid grid-cols-5 h-[calc(100vh-138px)] min-h-0 overflow-hidden">
      <aside className="bg-surface col-span-1 border-r border-border overflow-y-auto">
        {processConversationList(conversations).map((conversation) => {
          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => setConversation(conversation.id)}
              className="w-full text-left"
            >
              <div
                className={`${conversationId == conversation.id ? "bg-background" : "bg-surface"} flex items-center gap-3 border-b border-border p-3 hover:bg-background cursor-pointer`}
              >
                <Avatar user={conversation.otherMember?.user} />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {conversation.otherMember?.user?.firstName && conversation.otherMember?.user?.lastName
                      ? `${conversation.otherMember.user.firstName} ${conversation.otherMember.user.lastName}`
                      : conversation.otherMember?.user?.login
                        ? conversation.otherMember.user.login
                        : "Anonymous user"}
                  </p>

                  <p className="truncate text-small text-text-secondary">
                    {conversation.lastMessage?.content ?? ""}
                  </p>
                </div>

                <div className="shrink-0 text-small text-muted">
                  {formatMessageDate(conversation.lastMessage?.createdAt)}
                </div>
              </div>
            </button>
          );
        })}
      </aside>

      <div className="col-span-4 flex flex-col min-h-0">
        {selectedConversation ? (
          <Conversation
            messages={selectedConversation.messages}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
            onReply={setReplyingTo}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-text-secondary">
            Select a conversation
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="shrink-0 bg-surface border-t border-border py-4 px-8 flex items-end gap-4"
        >
          <div className="flex-1 min-w-0">
            {replyingTo && (
              <div className="flex items-center justify-between text-small text-text-secondary mb-1">
                <span>Replying to {replyingTo.author?.login ?? "Anonymous user"}</span>
                <button type="button" aria-label="Cancel reply" onClick={() => setReplyingTo(null)}>
                  <X size={14} />
                </button>
              </div>
            )}
            <Input
              autoComplete="off"
              className="bg-background"
              placeholder="Type your message here"
              value={messageContent}
              onChange={(event) => setMessageContent(event.target.value)}
              disabled={!selectedConversation}
            />
          </div>

          <button
            type="submit"
            disabled={!selectedConversation || !messageContent.trim()}
            className="py-3 px-4 mb-0.5 font-button rounded-button bg-primary hover:bg-primary-hover text-white shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConversationsPage;
