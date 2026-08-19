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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";

const comments = [
  {
    author: "John Doe",
    text: "That's a very good point. I recommend taking a look at onboarding — that's where most teams fall behind when it comes to these kinds of bots.",
    date: new Date("2024-06-01"),
  },
  {
    author: "John Doe",
    text: "That's a very good point. I recommend taking a look at onboarding — that's where most teams fall behind when it comes to these kinds of bots.",
    date: new Date("2024-06-01"),
  },
]

const handleShare = async () => {
  await navigator.clipboard.writeText(window.location.href);
};

function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { project, loading, error } = useProject(id);

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

  console.log(project);

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
              <div className={`rounded-full ${project.stage == "IDEA" ? "bg-accent-light text-text-accent" : "bg-primary-light text-primary"} px-2 py-0.5`}>
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

          <ItemLogo imageUrl={filePathToUrl(project.logoLink) ?? undefined} type={project.stage} size="lg" />
        </div>
      </div>

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          {
            project.mediaLinks.length > 0 &&
            <Card>
              <h2 className="heading">Galery</h2>
              <div className="px-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.mediaLinks.map((src, index) => (
                      <CarouselItem key={`${src}-${index}`} className="basis-1/3">
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
          }

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
                {10} comments
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar customText="Anonymous User" theme="accent" />
              <form className="flex-1">
                <textarea
                  className="bg-background border border-border rounded-card w-full min-h-24 p-2"
                  placeholder="Leave a comment or question for the author..."
                />
                <button className="button bg-primary hover:bg-primary-hover text-white mt-2">
                  Publish
                </button>
              </form>
            </div>

            {comments.map((comment, index) => (
              <Comment
                key={`${comment.author}-${index}`}
                author={comment.author}
                text={comment.text}
                date={comment.date}
              />
            ))}
          </Card>
        </div>
        <aside className="flex flex-col gap-4">
          <Card>
            <div className="flex flex-col gap-4 justify-center">
              <button className="button text-white bg-primary hover:bg-primary-hover flex gap-2 justify-center items-center">
                <Users /> Send participation request
              </button>
              <div className="flex gap-4">
                <button className="button border border-border text-muted hover:text-primary hover:border-primary transition flex items-center gap-2">
                  <Triangle size={20} /> {10}
                </button>
                <button onClick={handleShare} className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary active:bg-muted/10 transition">
                  <Share2 size={20} />
                </button>
                <button className="button border border-border text-muted hover:text-accent hover:border-accent transition">
                  <Bookmark size={20} />
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
                    <div className="text-body">{
                      (member.user.firstName && member.user.lastName) ? 
                      `${member.user.firstName} ${member.user.firstName}` :
                      member.user.login
                    }</div>
                    <div className="text-caption text-muted">{toSentenceCase(member.role)}</div>
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
