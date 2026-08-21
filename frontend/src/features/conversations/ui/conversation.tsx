import Avatar from "@/shared/ui/avatar";
import { formatMessageDate } from "@/shared/lib/utils";
import type { ConversationMessage } from "../conversations.types";
import { useAuth } from "@/features/auth/auth.context";

type ConversationProps = {
  messages: ConversationMessage[];
};

function Conversation({ messages }: ConversationProps) {
  const { user } = useAuth();
 
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-4">
      {messages.map((message) => (
        (message.author?.id == user?.id) ?
        <div key={message.id} className="flex justify-start items-end gap-2">
          <Avatar size="md" user={message.author} />
          <div className="max-w-[70%]">
            <div className="bg-primary text-white rounded-2xl rounded-br-sm px-4 py-2">
              <p>{message.content}</p>
            </div>
            <div className={`flex items-center "justify-end gap-2 mt-1 text-xs text-muted`}>
              <span>You</span>
              <span>·</span>
              <span>{formatMessageDate(message.createdAt)}</span>
            </div>
          </div>
        </div> :
        <div key={message.id} className="flex justify-end items-end gap-2">
          <Avatar size="md" user={message.author} />
          <div className="max-w-[70%]">
            <div className="bg-primary border border-border rounded-2xl rounded-bl-sm px-4 py-2">
              <p>{message.content}</p>
            </div>
            <div className={`flex items-center "justify-start gap-2 mt-1 text-xs text-muted`}>
              <span>{message.author?.login ?? "Anonymous user"}</span>
              <span>·</span>
              <span>{formatMessageDate(message.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Conversation;