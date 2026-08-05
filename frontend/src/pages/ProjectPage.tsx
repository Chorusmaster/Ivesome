import { Link, useParams } from "react-router-dom";
import Tags from "@/shared/ui/Tags";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import Card from "@/shared/ui/Card";
import ItemLogo from "@/shared/ui/ItemLogo";
import Avatar from "@/shared/ui/Avatar";
import Comment from "@/features/project/ui/Comment";

import { Users } from "lucide-react";
import { Triangle } from "lucide-react";
import { Share2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Flag } from "lucide-react";

function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <div className="px-16 py-12 bg-surface border-b border-border">
        <div className="text-text-secondary"><Link to="/search" className="hover:text-text-primary">Feed</Link> / {slug?.at(0)?.toUpperCase() + slug?.slice(1).split('-').join(' ')}</div>
        
        <div className="flex justify-between items-center gap-8 mt-4">
          
          <div>
            <div className="flex gap-4 mb-1 items-center">
              <div className="rounded-full bg-accent-light text-text-accent px-2 py-0.5">
                Idea
              </div>
              <div className="text-muted text-small">
                Published {formatDistanceToNowStrict(new Date("2024-06-01"), { locale: enUS, addSuffix: true })}
              </div>
            </div>
            <h1 className="text-display font-heading mb-4 font-sans">Nudge — a habit tracker for remote development teams</h1>
            <div className="text-text-secondary text-body mb-4">A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings.</div>
            <Tags list={["productivity", "saas", "b2b"]}></Tags>
          </div>

          <ItemLogo size="xl"></ItemLogo>
        </div>
      </div>

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <Card>
            <h2 className="heading">About idea</h2>
            <p className="text-text-secondary">
              Nudge is a collaborative habit-building platform designed for remote software development teams. Instead of relying on lengthy daily stand-ups and manual check-ins, it encourages small, consistent actions through lightweight prompts delivered directly in Slack. Team members can track personal goals, share progress when they choose, and receive gentle reminders without interrupting their workflow.
              <br></br><br></br>
              The platform provides managers with anonymized productivity trends and engagement insights, helping them identify potential bottlenecks while respecting individual privacy. By combining habit tracking, asynchronous communication, and actionable analytics, Nudge aims to improve team consistency, reduce meeting fatigue, and foster healthier work routines for distributed teams.
            </p>
          </Card>

          <Card>
            <div className="flex justify-between items-baseline">
              <h2 className="heading">Discussion</h2>
              <div className="text-text-secondary">38 comments</div>
            </div>
            <div className="flex gap-4">
              <Avatar name="Anonymous User" theme="accent"></Avatar>
              <form className="flex-1">
                <textarea className="bg-background border border-border rounded-card w-full min-h-24 p-2" placeholder="Leave a comment or question for the author..."></textarea>
                <button className="button bg-primary hover:bg-primary-hover text-white mt-2">Publish</button>
              </form>
            </div>

            <Comment 
              author="John Doe" 
              text="That's a very good point. I recommend taking a look at onboarding — that's where most teams fall behind when it comes to these kinds of bots." 
              date={new Date("2024-06-01")}>
            </Comment>
            <Comment 
              author="John Doe" 
              text="That's a very good point. I recommend taking a look at onboarding — that's where most teams fall behind when it comes to these kinds of bots." 
              date={new Date("2024-06-01")}>
            </Comment>
            
          </Card>
        </div>
        <aside className="flex flex-col gap-4">
          <Card>
            <div className="flex flex-col gap-4 justify-center">
              <button className="button text-white bg-primary hover:bg-primary-hover flex gap-2 justify-center items-center"><Users></Users> Send participation request</button>
              <div className="flex gap-4">
                <button className="button border border-border text-muted hover:text-primary hover:border-primary transition flex items-center gap-2"><Triangle size={20}></Triangle> 142</button>
                <button className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition"><Share2 size={20}></Share2></button>
                <button className="button border border-border text-muted hover:text-accent hover:border-accent transition"><Bookmark size={20}></Bookmark></button>
                <button className="button border border-border text-muted hover:text-danger hover:border-danger transition"><Flag size={20}></Flag></button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="subheading">Team</h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Avatar name="Ferko Mrkvička" theme="primary_light"></Avatar>
                <div>
                  <div className="text-body">Ferko Mrkvička</div>
                  <div className="text-caption text-muted">Owner</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Avatar name="John Doe" theme="primary_light"></Avatar>
                <div>
                  <div className="text-body">John Doe</div>
                  <div className="text-caption text-muted">Frontend developer</div>
                </div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
    );
}

export default ProjectPage;