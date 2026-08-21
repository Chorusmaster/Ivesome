import Avatar from "@/shared/ui/avatar";
import type { User } from "@/features/auth/auth.types";
import Comment from "./comment";
import type { ProjectComment } from "../comments.api";

type ProjectDiscussionProps = {
  user?: User | null;
  comments: ProjectComment[];
  commentText: string;
  commentsLoading: boolean;
  commentsError: string;
  commentSubmitting: boolean;
  onCommentTextChange: (value: string) => void;
  onCreateComment: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onReply: (commentId: string, content: string) => Promise<void>;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
};

function ProjectDiscussion({
  user,
  comments,
  commentText,
  commentsLoading,
  commentsError,
  commentSubmitting,
  onCommentTextChange,
  onCreateComment,
  onReply,
  onEdit,
  onDelete,
}: ProjectDiscussionProps) {
  const commentCount = comments.length + comments.reduce((count, comment) => count + comment.replies.length, 0);

  return (
    <section>
      <div className="flex justify-between items-baseline">
        <h2 className="heading">Discussion</h2>
        <div className="text-text-secondary">{commentCount} comments</div>
      </div>
      {user ? (
        <div className="flex gap-4">
          <Avatar user={user} theme="accent" />
          <form className="flex-1" onSubmit={onCreateComment}>
            <textarea
              value={commentText}
              onChange={(event) => onCommentTextChange(event.target.value)}
              className="bg-background border border-border rounded-card w-full min-h-24 p-2"
              placeholder="Leave a comment or question for the author..."
              maxLength={2000}
            />
            <button disabled={commentSubmitting || !commentText.trim()} className="button bg-primary hover:bg-primary-hover text-white mt-2 disabled:opacity-50">
              Publish
            </button>
          </form>
        </div>
      ) : <p className="text-text-secondary">Sign in to join the discussion.</p>}
      {commentsLoading && <p className="text-text-secondary mt-6">Loading discussion...</p>}
      {commentsError && <p className="text-danger mt-6">{commentsError}</p>}
      {!commentsLoading && !commentsError && comments.length === 0 && <p className="text-text-secondary mt-6">No comments yet.</p>}
      {!commentsLoading && comments.map((comment) => (
        <Comment key={comment.id} comment={comment} currentUserId={user?.id} onReply={onReply} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}

export default ProjectDiscussion;