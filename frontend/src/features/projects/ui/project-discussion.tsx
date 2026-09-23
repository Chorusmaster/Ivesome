import Avatar from "@/shared/ui/avatar";
import type { User } from "@/features/auth/auth.types";
import Comment from "./comment";
import type { ProjectComment } from "../comments.api";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const commentCount =
    comments.length +
    comments.reduce((count, comment) => count + comment.replies.length, 0);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToComment) {
      if (commentsLoading) return;

      const targetId = window.location.hash.slice(1);
      if (!targetId) return;

      const element = document.getElementById(targetId);

      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [comments, commentsLoading, location.state]);

  return (
    <section>
      <div className="flex justify-between items-baseline">
        <h2 className="heading text-text-primary">
          {t("projects.projectDiscussion.title")}
        </h2>
        <div className="text-text-secondary">
          {t("projects.projectDiscussion.commentsCount", { count: commentCount })}
        </div>
      </div>
      {user ? (
        <div className="flex gap-4">
          <Avatar user={user} theme="accent" />
          <form className="flex-1" onSubmit={onCreateComment}>
            <textarea
              value={commentText}
              onChange={(event) => onCommentTextChange(event.target.value)}
              className="bg-background border border-border rounded-card w-full min-h-24 p-2"
              placeholder={t("projects.projectDiscussion.commentPlaceholder")}
              maxLength={2000}
            />
            <button
              disabled={commentSubmitting || !commentText.trim()}
              className="button bg-primary hover:bg-primary-hover text-white mt-2 disabled:opacity-50"
            >
              {t("projects.projectDiscussion.publish")}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-text-secondary">
          {t("projects.projectDiscussion.signInToJoin")}
        </p>
      )}
      {commentsLoading && (
        <p className="text-text-secondary mt-6">
          {t("projects.projectDiscussion.loading")}
        </p>
      )}
      {commentsError && <p className="text-danger mt-6">{commentsError}</p>}
      {!commentsLoading && !commentsError && comments.length === 0 && (
        <p className="text-text-secondary mt-6">
          {t("projects.projectDiscussion.noComments")}
        </p>
      )}
      {!commentsLoading &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUserId={user?.id}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </section>
  );
}

export default ProjectDiscussion;
