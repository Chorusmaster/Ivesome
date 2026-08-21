import { useParams } from "react-router-dom";
import Card from "@/shared/ui/card";
import ProjectHeader from "@/features/projects/ui/project-header";
import ProjectGallery from "@/features/projects/ui/project-gallery";
import ProjectAbout from "@/features/projects/ui/project-about";
import ProjectActions from "@/features/projects/ui/project-actions";
import ProjectTeam from "@/features/projects/ui/project-team";
import ProjectDiscussion from "@/features/projects/ui/project-discussion";
import { useProject } from "../use-project";
import Loading from "@/shared/ui/loading";
import { useAuth } from "@/features/auth/auth.context";
import { useEffect, useState } from "react";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
  type ProjectComment,
} from "../comments.api";
import {
  createParticipationRequest,
  getMyParticipationRequests,
} from "../participation-requests.api";


function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const {
    project,
    loading,
    error,
    isFavourite,
    toggleFavourite,
    isUpvoted,
    upvotes,
    toggleUpvote,
  } = useProject(id);
  const { user } = useAuth();
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestError, setRequestError] = useState("");

  const ownProject = project?.members.some(
    (member) => member.role === "OWNER" && member.user.id === user?.id
  );

  useEffect(() => {
    if (!id) return;
    const projectId = id;

    async function loadComments() {
      try {
        setCommentsLoading(true);
        setCommentsError("");
        setComments(await getComments(projectId));
      } catch {
        setCommentsError("Unable to load discussion");
      } finally {
        setCommentsLoading(false);
      }
    }

    async function loadParticipationRequests() {
      const requests = await getMyParticipationRequests();
      const isSentRequest = requests.some(
        (request) => request.projectId === projectId,
      );
      setRequestSent(isSentRequest);
    }

    loadComments();
    loadParticipationRequests();
  }, [id]);

  async function handleCreateComment(
    event: React.SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    if (!id || !commentText.trim()) return;

    setCommentSubmitting(true);
    try {
      const comment = await createComment(id, commentText.trim());
      setComments((current) => [
        ...current,
        { ...comment, replies: comment.replies ?? [] },
      ]);
      setCommentText("");
    } finally {
      setCommentSubmitting(false);
    }
  }

  async function handleReply(commentId: string, content: string) {
    if (!id) return;
    const reply = await createComment(id, content, commentId);
    setComments((current) =>
      current.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...comment.replies, reply],
            }
          : comment,
      ),
    );
  }

  async function handleEdit(commentId: string, content: string) {
    const updated = await updateComment(commentId, content);
    setComments((current) =>
      current.map((comment) =>
        comment.id === commentId
          ? { ...comment, ...updated }
          : {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId ? { ...reply, ...updated } : reply,
              ),
            },
      ),
    );
  }

  async function handleDelete(commentId: string) {
    await deleteComment(commentId);
    setComments((current) =>
      current
        .filter((comment) => comment.id !== commentId)
        .map((comment) => ({
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== commentId),
        })),
    );
  }

  if (loading) {
    return <Loading fullScreen={true} text="Loading data..."></Loading>;
  }

  if (!id || !project) {
    return <div>Project not found</div>;
  }

  if (error) {
    console.error(error);
    return <div className="text-danger">Error while loading project data</div>;
  }

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  const handleParticipationRequest = async () => {
    setRequestSubmitting(true);
    setRequestError("");
    try {
      await createParticipationRequest(id, requestMessage.trim());
      setRequestSent(true);
      setRequestMessage("");
    } catch {
      setRequestError("Unable to send participation request");
    } finally {
      setRequestSubmitting(false);
    }
  };

  return (
    <div>
      <ProjectHeader project={project} />

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <ProjectGallery mediaLinks={project.mediaLinks} />
          <ProjectAbout description={project.description} />

          <Card>
            <ProjectDiscussion
              user={user}
              comments={comments}
              commentText={commentText}
              commentsLoading={commentsLoading}
              commentsError={commentsError}
              commentSubmitting={commentSubmitting}
              onCommentTextChange={setCommentText}
              onCreateComment={handleCreateComment}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Card>
        </div>
        <aside className="flex flex-col gap-4">
          <ProjectActions
            ownProject={ownProject ?? false}
            project={project}
            requestSent={requestSent}
            requestMessage={requestMessage}
            requestSubmitting={requestSubmitting}
            requestError={requestError}
            isUpvoted={isUpvoted}
            upvotes={upvotes}
            isFavourite={isFavourite}
            onRequestMessageChange={setRequestMessage}
            onParticipationRequest={handleParticipationRequest}
            onUpvote={toggleUpvote}
            onShare={handleShare}
            onFavourite={toggleFavourite}
          />
          <ProjectTeam members={project.members} />
        </aside>
      </div>
    </div>
  );
}

export default ProjectPage;
