import { Link, useParams } from "react-router-dom";
import Tags from "@/shared/ui/tags";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import Card from "@/shared/ui/card";
import ItemLogo from "@/shared/ui/item-logo";
import Avatar from "@/shared/ui/avatar";
import Comment from "@/features/project/ui/comment";

import { Users, Triangle, Share2, Bookmark, Flag } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";

const project = {
  type: "idea" as const,
  title: "Nudge — a habit tracker for remote development teams",
  summary:
    "A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings.",
  about:
    "Nudge is a collaborative habit-building platform designed for remote software development teams. Instead of relying on lengthy daily stand-ups and manual check-ins, it encourages small, consistent actions through lightweight prompts delivered directly in Slack. Team members can track personal goals, share progress when they choose, and receive gentle reminders without interrupting their workflow.\n\nThe platform provides managers with anonymized productivity trends and engagement insights, helping them identify potential bottlenecks while respecting individual privacy. By combining habit tracking, asynchronous communication, and actionable analytics, Nudge aims to improve team consistency, reduce meeting fatigue, and foster healthier work routines for distributed teams.",
  tags: ["productivity", "saas", "b2b"],
  publishedAt: new Date("2024-06-01"),
  upvotes: 142,
  commentCount: 38,
  media: [
    "/media_example1.jpg",
    "/media_example2.jpg",
    "/media_example3.jpg",
    "/media_example1.jpg",
  ],
  team: [
    { name: "Ferko Mrkvička", role: "Owner" },
    { name: "John Doe", role: "Frontend developer" },
  ],
  comments: [
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
  ],
};

function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <div>Project not found</div>;
  }

  const breadcrumbLabel =
    slug.at(0)?.toUpperCase() + slug.slice(1).split("-").join(" ");

  return (
    <div>
      <div className="px-16 py-12 bg-surface border-b border-border">
        <div className="text-text-secondary">
          <Link to="/search" className="hover:text-text-primary">
            Feed
          </Link>{" "}
          / {breadcrumbLabel}
        </div>

        <div className="flex justify-between items-start gap-8 mt-4">
          <div>
            <div className="flex gap-4 mb-1 items-center">
              <div className="rounded-full bg-accent-light text-text-accent px-2 py-0.5">
                {project.type === "idea" ? "Idea" : "Project"}
              </div>
              <div className="text-muted text-small">
                Published{" "}
                {formatDistanceToNowStrict(project.publishedAt, {
                  locale: enUS,
                  addSuffix: true,
                })}
              </div>
            </div>
            <h1 className="text-display font-heading mb-4 font-sans">
              {project.title}
            </h1>
            <div className="text-text-secondary text-body mb-4">
              {project.summary}
            </div>
            <Tags list={project.tags} />
          </div>

          <ItemLogo type={project.type} size="lg" />
        </div>
      </div>

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <Card>
            <div className="mb-8 px-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {project.media.map((src, index) => (
                    <CarouselItem key={`${src}-${index}`} className="basis-1/3">
                      <img
                        src={src}
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

            <h2 className="heading">About idea</h2>
            <p className="text-text-secondary whitespace-pre-line">
              {project.about}
            </p>
          </Card>

          <Card>
            <div className="flex justify-between items-baseline">
              <h2 className="heading">Discussion</h2>
              <div className="text-text-secondary">
                {project.commentCount} comments
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar name="Anonymous User" theme="accent" />
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

            {project.comments.map((comment, index) => (
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
                  <Triangle size={20} /> {project.upvotes}
                </button>
                <button className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition">
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
              {project.team.map((member) => (
                <div key={member.name} className="flex gap-2">
                  <Avatar name={member.name} theme="primary_light" />
                  <div>
                    <div className="text-body">{member.name}</div>
                    <div className="text-caption text-muted">{member.role}</div>
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
