import Avatar from "@/shared/ui/avatar";
import { formatMessageDate } from "@/shared/lib/utils";
import Input from "@/shared/ui/input";
import type { ConversationMessage } from "../conversations.types";
import { useAuth } from "@/features/auth/auth.context";
import { useState } from "react";
import {
  createMessage,
  deleteMessage,
  updateMessage,
} from "../conversations.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Check, MessageSquareReply, Send, SquarePen, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ConversationProps = {
  conversationId: string;
  messages: ConversationMessage[];
  onMessagesChange: (messages: ConversationMessage[]) => void;
};

function Conversation({
  conversationId,
  messages,
  onMessagesChange,
}: ConversationProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [messageContent, setMessageContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<ConversationMessage | null>(
    null,
  );
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
        <p className="font-medium text-text-primary">
          {message.parent?.author?.login ?? t("conversations.conversation.originalMessage")}
        </p>
        <p className="truncate text-text-primary">
          {message.parent?.content ?? t("conversations.conversation.messageUnavailable")}
        </p>
      </div>
    );
  }

  async function saveEditing(messageId: string) {
    const content = editingContent.trim();
    if (!content) return;

    setSavingMessageId(messageId);
    try {
      const updatedMessage = await updateMessage(messageId, content);
      onMessagesChange(
        messages.map((message) =>
          message.id === messageId ? updatedMessage : message,
        ),
      );
      setEditingMessageId(null);
    } finally {
      setSavingMessageId(null);
    }
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = messageContent.trim();
    if (!content) return;

    const message = await createMessage(
      conversationId,
      content,
      replyingTo?.id,
    );
    onMessagesChange([...messages, message]);
    setMessageContent("conversations.");
    setReplyingTo(null);
  }

  async function handleDeleteMessage(messageId: string) {
    await deleteMessage(messageId);
    onMessagesChange(messages.filter((message) => message.id !== messageId));
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto p-8 space-y-4">
        {messages.map((message) =>
          message.author?.id == user?.id ? (
            <div key={message.id} className="flex justify-end items-end gap-2">
              <div className="max-w-[70%]">
                {editingMessageId === message.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editingContent}
                      onChange={(event) =>
                        setEditingContent(event.target.value)
                      }
                      className="mt-0 bg-background text-text-primary"
                      autoFocus
                      disabled={savingMessageId === message.id}
                    />
                  </div>
                ) : (
                  <div className="bg-primary text-white rounded-2xl rounded-br-sm px-4 py-2 wrap-break-word">
                    {renderTargetMessage(message)}
                    <p className="text-white">{message.content}</p>
                  </div>
                )}

                {editingMessageId === message.id ? (
                  <div className="flex items-center justify-end gap-1 mt-1 text-xs text-muted">
                    <button
                      type="button"
                      aria-label={t("conversations.conversation.saveMessage")}
                      onClick={() => saveEditing(message.id)}
                    >
                      <Check
                        size={16}
                        className="text-muted/70 hover:text-muted mt-px"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label={t("conversations.conversation.cancelEditing")}
                      onClick={() => setEditingMessageId(null)}
                    >
                      <X
                        size={16}
                        className="text-muted/70 hover:text-muted mt-px"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-2 mt-1 text-xs text-muted">
                    <span>{formatMessageDate(message.createdAt)}</span>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <button
                            type="button"
                            aria-label={t("conversations.conversation.messageActions")}
                          >
                            <SquarePen
                              size={13}
                              className="text-muted/70 hover:text-muted mt-px"
                            />
                          </button>
                        }
                      />
                      <DropdownMenuContent className="ring-border bg-surface">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className="hover:bg-background! focus:bg-background!"
                            onClick={() => startEditing(message)}
                          >
                            {t("conversations.conversation.edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:bg-background! focus:bg-background!"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            {t("conversations.conversation.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              <Link to={`/users/${message?.author?.id}`}>
                <Avatar size="md" theme="accent" user={message.author} />
              </Link>
            </div>
          ) : (
            <div
              key={message.id}
              className="flex justify-start items-end gap-2"
            >
              <Link to={`/users/${message?.author?.id}`}>
                <Avatar size="md" user={message.author} />
              </Link>
              <div className="max-w-[70%]">
                <div className="bg-surface border border-border rounded-2xl rounded-bl-sm px-4 py-2 wrap-break-word">
                  {renderTargetMessage(message)}
                  <p className="text-text-primary">{message.content}</p>
                </div>
                <div
                  className={`flex items-center "justify-start gap-2 mt-1 text-xs text-muted`}
                >
                  <span>
                    {message.author?.login ?? t("conversations.conversation.anonymousUser")}
                  </span>
                  <span>·</span>
                  <span>{formatMessageDate(message.createdAt)}</span>
                  <span>·</span>
                  <span>
                    <button
                      type="button"
                      aria-label={t("conversations.conversation.replyToMessage")}
                      onClick={() => setReplyingTo(message)}
                    >
                      <MessageSquareReply
                        size={13}
                        className="text-muted/70 hover:text-muted mt-px"
                      />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="shrink-0 bg-surface border-t border-border py-4 px-8 flex items-end gap-4"
      >
        <div className="flex-1 min-w-0">
          {replyingTo && (
            <div className="flex items-center justify-between text-small text-text-secondary mb-1">
              <span>
                {t("conversations.conversation.replyingTo", {
                  name:
                    replyingTo.author?.login ?? t("conversations.conversation.anonymousUser"),
                })}
              </span>
              <button
                type="button"
                aria-label={t("conversations.conversation.cancelReply")}
                onClick={() => setReplyingTo(null)}
              >
                <X size={14} />
              </button>
            </div>
          )}
          <Input
            autoComplete="off"
            className="bg-background"
            placeholder={t("conversations.conversation.typeMessage")}
            value={messageContent}
            onChange={(event) => setMessageContent(event.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={!messageContent.trim()}
          className="py-3 px-4 mb-0.5 font-button rounded-button bg-primary hover:bg-primary-hover disabled:bg-primary-hover text-white shrink-0"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export default Conversation;
