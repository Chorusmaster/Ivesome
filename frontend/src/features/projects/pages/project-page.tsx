import { Link, useParams } from "react-router-dom";
import Tags from "@/shared/ui/tags";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import Card from "@/shared/ui/card";
import ItemLogo from "@/shared/ui/item-logo";
import Avatar from "@/shared/ui/avatar";
import Comment from "@/features/projects/ui/comment";
import { Users, Triangle, Share2, Bookmark, Flag } from "lucide-react";
import { filePathToUrl } from "@/shared/lib/utils";
import { useProject } from "../use-project";
import Loading from "@/shared/ui/loading";
import { toSentenceCase } from "@/shared/lib/utils";
import { useAuth } from "@/features/auth/auth.context";
import { useEffect, useState } from "react";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
  type ProjectComment,
} from "../comments.api";
import { createParticipationRequest, getMyParticipationRequests } from "../participation-requests.api";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/shared/ui/dialog"
import Textarea from "@/shared/ui/textarea";

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
        request => request.projectId === projectId
      );
      setRequestSent(isSentRequest);
    }

    loadComments();
    loadParticipationRequests();
  }, [id]);

  async function handleCreateComment(event: React.FormEvent<HTMLFormElement>) {
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
              replies: [
                ...comment.replies,
                reply,
              ],
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
      <div className="px-16 py-12 bg-surface border-b border-border">
        <div className="text-text-secondary">
          <Link to="/search" className="hover:text-text-primary">
            Feed
          </Link>{" "}
          / {project.title}
        </div>

        <div className="flex justify-between items-start gap-8 mt-4">
          <div>
            <div className="flex gap-4 mb-1 items-center">
              <div
                className={`rounded-full ${project.stage == "IDEA" ? "bg-accent-light text-text-accent" : "bg-primary-light text-primary"} px-2 py-0.5`}
              >
                {toSentenceCase(project.stage)}
              </div>
              <div className="text-muted text-small">
                Published{" "}
                {formatDistanceToNowStrict(project.createdAt, {
                  locale: enUS,
                  addSuffix: true,
                })}
              </div>
            </div>
            <h1 className="text-display font-heading mb-4 font-sans">
              {project.title}
            </h1>
            <div className="text-text-secondary text-body mb-4">
              {project.shortDescription}
            </div>
            <Tags list={project.tags} />
          </div>

          <ItemLogo
            imageUrl={filePathToUrl(project.logoLink) ?? undefined}
            type={project.stage}
            size="lg"
          />
        </div>
      </div>

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          {project.mediaLinks.length > 0 && (
            <Card>
              <h2 className="heading">Galery</h2>
              <div className="px-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.mediaLinks.map((src, index) => (
                      <CarouselItem
                        key={`${src}-${index}`}
                        className="basis-1/3"
                      >
                        <img
                          src={filePathToUrl(src)}
                          alt=""
                          className="h-56 w-full object-cover border border-border rounded-card"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </Card>
          )}

          <Card>
            <h2 className="heading">About idea</h2>
            <p className="text-text-secondary whitespace-pre-line">
              {project.description}
            </p>
          </Card>

          <Card>
            <div className="flex justify-between items-baseline">
              <h2 className="heading">Discussion</h2>
              <div className="text-text-secondary">
                {comments.length +
                  comments.reduce(
                    (count, comment) => count + comment.replies.length,
                    0,
                  )}{" "}
                comments
              </div>
            </div>
            {user ? (
              <div className="flex gap-4">
                <Avatar user={user ?? undefined} theme="accent" />
                <form className="flex-1" onSubmit={handleCreateComment}>
                  <textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    className="bg-background border border-border rounded-card w-full min-h-24 p-2"
                    placeholder="Leave a comment or question for the author..."
                    maxLength={2000}
                  />
                  <button
                    disabled={commentSubmitting || !commentText.trim()}
                    className="button bg-primary hover:bg-primary-hover text-white mt-2 disabled:opacity-50"
                  >
                    Publish
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-text-secondary">
                Sign in to join the discussion.
              </p>
            )}

            {commentsLoading && (
              <p className="text-text-secondary mt-6">Loading discussion...</p>
            )}
            {commentsError && (
              <p className="text-danger mt-6">{commentsError}</p>
            )}
            {!commentsLoading && !commentsError && comments.length === 0 && (
              <p className="text-text-secondary mt-6">No comments yet.</p>
            )}
            {!commentsLoading &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  currentUserId={user?.id}
                  onReply={handleReply}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
          </Card>
        </div>
        <aside className="flex flex-col gap-4">
          <Card>
            <div className="flex flex-col gap-4 justify-center">
              <Dialog>
                <DialogTrigger
                  disabled={requestSent}
                  className="button text-white bg-primary disabled:bg-primary-hover hover:bg-primary-hover flex gap-2 justify-center items-center"
                >
                  <Users /> {requestSent ? "Request sent" : "Send participation request"}
                </DialogTrigger>
                <DialogContent className="bg-surface ring-border">
                  <DialogHeader>
                    <DialogTitle>Send participation request</DialogTitle>
                    <DialogDescription>
                      Tell the project owner why you'd like to join their team.
                    </DialogDescription>
                    {<Textarea
                      value={requestMessage}
                      onChange={(event) => setRequestMessage(event.target.value)}
                      className="min-h-16 max-h-32"
                      maxLength={2000}
                    />}
                    {requestError && <p className="text-danger">{requestError}</p>}
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start bg-surface border-0 -mt-4">
                    <div className="flex w-full gap-4 justify-end">
                      <DialogClose render={<button type="button" className="hover:text-text-secondary">Close</button>} />
                      <button
                        type="button"
                        onClick={handleParticipationRequest}
                        disabled={requestSubmitting}
                        className="hover:text-text-secondary disabled:opacity-50"
                      >
                        {requestSubmitting ? "Sending..." : "Send request"}
                      </button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleUpvote}
                  className={`button w-18 border transition flex items-center gap-2 ${isUpvoted ? "text-primary border-primary" : "border-border text-muted hover:text-primary hover:border-primary"}`}
                >
                  <Triangle
                    size={20}
                    fill={isUpvoted ? "currentColor" : "none"}
                  />{" "}
                  {upvotes}
                </button>
                <button
                  onClick={handleShare}
                  className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary active:bg-muted/10 transition"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={toggleFavourite}
                  className={`button border hover:text-accent hover:border-accent transition ${isFavourite ? "text-accent border-accent" : "border-border text-muted"}`}
                >
                  <Bookmark 
                    size={20} 
                    fill={isFavourite ? "currentColor" : "none"}
                  />
                </button>
                <button className="button border border-border text-muted hover:text-danger hover:border-danger transition">
                  <Flag size={20} />
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="subheading">Team</h2>
            <div className="flex flex-col gap-2">
              {project.members.map((member) => (
                <div key={member.user.id} className="flex gap-2">
                  <Avatar user={member.user} theme="primary_light" />
                  <div>
                    <div className="text-body">
                      {member.user.firstName && member.user.lastName
                        ? `${member.user.firstName} ${member.user.firstName}`
                        : member.user.login}
                    </div>
                    <div className="text-caption text-muted">
                      {toSentenceCase(member.role)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default ProjectPage;
