import Avatar from "@/shared/ui/avatar";
import { formatMessageDate } from "@/shared/lib/utils";
import Input from "@/shared/ui/input";
import type { ConversationMessage } from "../conversations.types";
import { useAuth } from "@/features/auth/auth.context";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Check, MessageSquareReply, SquarePen, X } from "lucide-react";

type ConversationProps = {
  messages: ConversationMessage[];
  onEdit: (messageId: string, content: string) => Promise<void>;
  onDelete: (messageId: string) => Promise<void>;
  onReply: (message: ConversationMessage) => void;
};

function Conversation({ messages, onEdit, onDelete, onReply }: ConversationProps) {
  const { user } = useAuth();
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [savingMessageId, setSavingMessageId] = useState<string | null>(null);

  function startEditing(message: ConversationMessage) {
    setEditingMessageId(message.id);
    setEditingContent(message.content);
  }

  function renderTargetMessage(message: ConversationMessage) {
    if (!message.parentMessageId) return null;

    return (
      <div className="mb-2 border-l-2 bg-primary-light/20 px-2 text-xs text-text-secondary">
        <p className="font-medium">
          {message.parent?.author?.login ?? "Original message"}
        </p>
        <p className="truncate">{message.parent?.content ?? "Message unavailable"}</p>
      </div>
    );
  }

  async function saveEditing(messageId: string) {
    const content = editingContent.trim();
    if (!content) return;

    setSavingMessageId(messageId);
    try {
      await onEdit(messageId, content);
      setEditingMessageId(null);
    } finally {
      setSavingMessageId(null);
    }
  }
 
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-4">
      {messages.map((message) => (
        (message.author?.id == user?.id) ?
        (
          <div key={message.id} className="flex justify-end items-end gap-2">
            <div className="max-w-[70%]">
              {editingMessageId === message.id ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editingContent}
                    onChange={(event) => setEditingContent(event.target.value)}
                    className="mt-0 bg-background text-text-primary"
                    autoFocus
                    disabled={savingMessageId === message.id}
                  />
                </div>
              ) : (
                <div className="bg-primary text-white rounded-2xl rounded-br-sm px-4 py-2 wrap-break-word">
                  {renderTargetMessage(message)}
                  <p>{message.content}</p>
                </div>
              )}

              {editingMessageId === message.id ? 
              (
                <div className="flex items-center justify-end gap-1 mt-1 text-xs text-muted">
                  <button type="button" aria-label="Save message" onClick={() => saveEditing(message.id)}>
                    <Check size={16}  className="text-muted/70 hover:text-muted mt-px"/>
                  </button>
                  <button type="button" aria-label="Cancel editing" onClick={() => setEditingMessageId(null)}>
                    <X size={16}  className="text-muted/70 hover:text-muted mt-px"/>
                  </button>
                </div>
              ) :
              (
                <div className="flex items-center justify-end gap-2 mt-1 text-xs text-muted">
                  <span>{formatMessageDate(message.createdAt)}</span>
              
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <button type="button" aria-label="Message actions">
                        <SquarePen size={13} className="text-muted/70 hover:text-muted mt-px" />
                      </button>
                    } />
                    <DropdownMenuContent className="ring-border bg-surface">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className="hover:bg-background! focus:bg-background!"
                          onClick={() => startEditing(message)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-background! focus:bg-background!"
                          onClick={() => onDelete(message.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            <Avatar size="md" user={message.author} />
          </div>
        ) :
        (
          <div key={message.id} className="flex justify-start items-end gap-2">
            <Avatar size="md" user={message.author} />
            <div className="max-w-[70%]">
              <div className="bg-surface border border-border rounded-2xl rounded-bl-sm px-4 py-2 wrap-break-word">
                {renderTargetMessage(message)}
                <p>{message.content}</p>
              </div>
              <div className={`flex items-center "justify-start gap-2 mt-1 text-xs text-muted`}>
                <span>{message.author?.login ?? "Anonymous user"}</span>
                <span>·</span>
                <span>{formatMessageDate(message.createdAt)}</span>
                <span>·</span>
                <span>
                  <button type="button" aria-label="Reply to message" onClick={() => onReply(message)}>
                    <MessageSquareReply size={13} className="text-muted/70 hover:text-muted mt-px" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default Conversation;