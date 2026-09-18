import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import Avatar from "@/shared/ui/avatar";
import type { ProjectComment } from "../comments.api";
import { Link } from "react-router-dom";
import { createReport } from "@/features/reports/reports.api";
import { ReportDialog } from "@/shared/ui/report-dialog";

type CommentProps = {
  comment: ProjectComment;
  currentUserId?: string;
  onReply: (commentId: string, content: string) => Promise<void>;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
};

function Comment({
  comment,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportError, setReportError] = useState("");
  const authorName = comment.user
    ? comment.user.firstName && comment.user.lastName
      ? `${comment.user.firstName} ${comment.user.lastName}`
      : comment.user.login
    : "Deleted user";

  async function submitEdit() {
    if (!content.trim()) return;
    setBusy(true);
    try {
      await onEdit(comment.id, content.trim());
      setIsEditing(false);
    } finally {
      setBusy(false);
    }
  }

  async function submitReply() {
    if (!reply.trim()) return;
    setBusy(true);
    try {
      await onReply(comment.id, reply.trim());
      setReply("");
      setIsReplying(false);
    } finally {
      setBusy(false);
    }
  }

  async function submitReport() {
    if (!reportReason.trim()) return;

    setReportSubmitting(true);
    setReportError("");

    try {
      await createReport({
        targetType: "COMMENT",
        targetId: comment.id,
        reason: reportReason.trim(),
      });
      setReportReason("");
      setReportOpen(false);
    } catch {
      setReportError("Unable to submit report. Please try again.");
    } finally {
      setReportSubmitting(false);
    }
  }

  return (
    <div id={comment.id} className="border-t border-border mt-6 pt-6">
      <div className="flex gap-4">
        <Link to={`/users/${comment?.user?.id}`}>
          <Avatar user={comment.user ?? undefined} theme="primary_light" />
        </Link>
        <div className="min-w-0 flex-1 flex flex-col gap-1 text-text-secondary">
          <div className="text-small">
            <Link
              className="hover:text-primary text-text-primary font-medium"
              to={`/users/${comment?.user?.id}`}
            >
              {authorName}
            </Link>
            {" · "}
            {formatDistanceToNowStrict(new Date(comment.createdAt), {
              locale: enUS,
              addSuffix: true,
            })}
            {comment.editedAt && <span className="text-muted"> · edited</span>}
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-2 mt-1">
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="bg-background border border-border rounded-card w-full min-h-20 p-2"
                maxLength={2000}
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={submitEdit}
                  disabled={busy}
                  className="button bg-primary text-white disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContent(comment.content);
                    setIsEditing(false);
                  }}
                  className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="whitespace-pre-line wrap-break-word">
              {comment.content}
            </div>
          )}

          <div className="flex gap-3 text-small text-muted">
            {!comment.parentCommentId && !isEditing && (
              <button
                type="button"
                onClick={() => setIsReplying(!isReplying)}
                className="hover:text-text-primary"
              >
                Reply
              </button>
            )}
            {currentUserId === comment.authorId && !isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="hover:text-text-primary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      await onDelete(comment.id);
                    } finally {
                      setBusy(false);
                    }
                  }}
                  className="hover:text-danger disabled:opacity-50"
                >
                  Delete
                </button>
              </>
            )}
            {currentUserId &&
              currentUserId !== comment.authorId &&
              !isEditing && (
                <button
                  type="button"
                  onClick={() => setReportOpen(true)}
                  className="flex items-center gap-1 hover:text-danger"
                  aria-label="Report comment"
                >
                  Report
                </button>
              )}
          </div>

          <ReportDialog
            open={reportOpen}
            onOpenChange={setReportOpen}
            value={reportReason}
            onChange={setReportReason}
            submitting={reportSubmitting}
            error={reportError}
            onSubmit={submitReport}
          />

          {isReplying && (
            <div className="flex flex-col gap-2 mt-2">
              <textarea
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Write a reply..."
                className="bg-background border border-border rounded-card w-full min-h-20 p-2"
                maxLength={2000}
              />
              <div className="flex gap-2 items-end">
                <button
                  type="button"
                  onClick={submitReply}
                  disabled={busy || !reply.trim()}
                  className="button bg-primary text-white disabled:opacity-50 mt-2"
                >
                  Publish reply
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsReplying(false);
                  }}
                  className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-14">
          {comment.replies.map((replyComment) => (
            <Comment
              key={replyComment.id}
              comment={replyComment}
              currentUserId={currentUserId}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
