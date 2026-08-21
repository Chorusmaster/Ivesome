import { useEffect, useState } from "react";
import { Send } from "lucide-react";

import Input from "@/shared/ui/input";
import Conversation from "../ui/conversation";
import { getConversations } from "../conversations.api";
import type { Conversation as ConversationType } from "../conversations.types";  
import { useNavigate, useParams } from "react-router-dom";
import { formatMessageDate } from "@/shared/lib/utils";
import Avatar from "@/shared/ui/avatar";
import { useAuth } from "@/features/auth/auth.context";

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

      console.log(items)
      setConversations(items);
    }

    loadConversations();
  }, []);

  const selectedConversation = conversations.find(
    ({ id }) => id === conversationId
  );

  return (
    <div className="flex-1 grid grid-cols-5 h-[calc(100vh-138px)] min-h-0 overflow-hidden">
      <aside className="bg-surface col-span-1 border-r border-border overflow-y-auto">
        {conversations.map((conversation) => {
          const otherMember = conversation.members.find(
            (member) => member.userId !== user?.id
          );
          return(
          <button
            key={conversation.id}
            type="button"
            onClick={() => setConversation(conversation.id)}
            className="w-full text-left"
          >
            <div className={`${conversationId == conversation.id ? "bg-background" : "bg-surface"} flex items-center gap-3 border-b border-border p-3 hover:bg-background cursor-pointer`}>
              <Avatar user={otherMember?.user} />

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {
                    (otherMember?.user?.firstName && otherMember?.user?.lastName) ?
                    `${otherMember.user.firstName} ${otherMember.user.lastName}` :
                      otherMember?.user?.login ?
                      otherMember.user.login :
                      "Anonymous user"
                    }
                </p>

                <p className="truncate text-small text-text-secondary">
                  It's a very long messag...
                </p>
              </div>

              <div className="shrink-0 text-small text-muted">
                {formatMessageDate(new Date())}
              </div>
            </div>
          </button>
        )}
      )}
      </aside>

      <div className="col-span-4 flex flex-col min-h-0">
        {selectedConversation ? (
          <Conversation messages={selectedConversation.messages} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-text-secondary">
            Select a conversation
          </div>
        )}

        <form className="shrink-0 bg-surface border-t border-border py-4 px-8 flex items-center gap-4">
          <Input
            className="bg-background flex-1 min-w-0"
            placeholder="Type your message here"
          />

          <button
            type="submit"
            className="py-3 px-4 font-button rounded-button bg-primary hover:bg-primary-hover text-white shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConversationsPage;