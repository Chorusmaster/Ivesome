import Conversation from "@/features/conversations/ui/conversation";
import { useEffect, useState } from "react";
import { getConversation } from "@/features/conversations/conversations.api";
import type { Conversation as ConversationType } from "@/features/conversations/conversations.types";

interface ChatTabProps {
  conversationId: string;
}

function ChatTab({conversationId}: ChatTabProps) {
  const [conversation, setConversation] = useState<ConversationType | undefined>();

  function updateConversationMessages(
    conversationId: string,
    messages: ConversationType["messages"],
  ) {
    setConversation((current) =>
      current
        ? {
            ...current,
            messages:
              current.id === conversationId
                ? messages
                : current.messages,
          }
        : current
    );
  }

  useEffect(() => {
    async function fetchData() {
      setConversation(await getConversation(conversationId));
    }
    
    fetchData();
  }, [])

  return (
    conversation &&
    <div className="h-[calc(100vh-132px)] flex">
      <Conversation 
        conversationId={conversationId}
        messages={conversation.messages}
        onMessagesChange={(messages) => updateConversationMessages(conversationId, messages)}
      />
    </div>
  )
}

export default ChatTab;