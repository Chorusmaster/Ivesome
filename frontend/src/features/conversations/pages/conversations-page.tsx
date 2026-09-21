import { useEffect, useState } from "react";

import Conversation from "../ui/conversation";
import { getConversations } from "../conversations.api";
import type {
  Conversation as ConversationType,
  ConversationMessage,
} from "../conversations.types";
import { useNavigate, useParams } from "react-router-dom";
import { formatMessageDate } from "@/shared/lib/utils";
import Avatar from "@/shared/ui/avatar";
import { useAuth } from "@/features/auth/auth.context";
import Navbar from "@/shared/ui/navbar";

function ConversationsPage() {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
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

  function updateConversationMessages(
    conversationId: string,
    messages: ConversationType["messages"],
  ) {
    setConversations((current) =>
      current.map((conversation) => ({
        ...conversation,
        messages:
          conversation.id === conversationId ? messages : conversation.messages,
      })),
    );
  }

  function processConversationList(current: ConversationType[]) {
    return current
      .map((conversation) => {
        const lastMessage = conversation.messages.reduce(
          (latest, item) => {
            if (!latest) return item;

            return new Date(item.createdAt) > new Date(latest.createdAt)
              ? item
              : latest;
          },
          null as ConversationMessage | null,
        );
        const otherMember = conversation.members.find(
          (member) => member.userId !== user?.id,
        );
        return {
          ...conversation,
          lastMessage: lastMessage,
          otherMember: otherMember,
          messages: [...conversation.messages],
        };
      })
      .sort((latest, item) => {
        return (
          new Date(item?.lastMessage?.createdAt ?? 0).getTime() -
          new Date(latest?.lastMessage?.createdAt ?? 0).getTime()
        );
      });
  }

  return (
    <div className="h-screen bg-background">
      <Navbar />
      <div className="flex-1 grid grid-cols-5 min-h-0 h-[calc(100vh-66px)] overflow-hidden">
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
                    <p className="truncate font-medium text-text-primary">
                      {conversation.otherMember?.user?.firstName &&
                      conversation.otherMember?.user?.lastName
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
              conversationId={selectedConversation.id}
              messages={selectedConversation.messages}
              onMessagesChange={(messages) =>
                updateConversationMessages(selectedConversation.id, messages)
              }
            />
          ) : conversations.length == 0 ? (
            <div className="flex-1 flex items-center justify-center text-text-secondary">
              No conversations yet
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-secondary">
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConversationsPage;
