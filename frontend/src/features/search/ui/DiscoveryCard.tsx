import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import Card from "@/shared/ui/Card";
import { Triangle, MessageCircle, Clock } from 'lucide-react';
import DiscoveryCardLogo from "./DiscoveryCardLogo";

type DiscoveryCardProps = {
  title: string;
  description: string;
  tags: Array<string>;
  upvotes: number;
  comments: number;
  publishedAt: Date;
  type?: "idea" | "project";
}

function DiscoveryCard({ title, description, tags=[], upvotes, comments, publishedAt, type = "idea" }: DiscoveryCardProps) {
  return (
    <Card hoverable>
      <div className="flex gap-4">
        <DiscoveryCardLogo type={type}></DiscoveryCardLogo>

        <div className="min-w-0">
          <div className="flex pb-4 justify-between items-start">
            <div className="w-[90%]">
              <h2 className={`font-heading text-heading cursor-pointer mb-3 ${type == "idea" ? "hover:text-text-accent" : "hover:text-primary"} transition`}>{title}</h2>
              <div className="text-text-secondary">{description}</div>
            </div>
            <div className={`rounded-full ${type === "idea" ? "bg-accent-light text-text-accent" : "bg-primary-light text-primary"} px-2 py-0.5`}>
              {type === "idea" ? "Idea" : "Project"}
            </div>
          </div>

          <div className="flex gap-2">
            {tags.map((tag) => (
              <div key={tag} className="rounded-md text-sm px-2 py-1 font-mono text-muted bg-background border border-border">
                #{tag}
              </div>
            ))}
          </div>

          <hr className="border-border mt-6 mb-6"></hr>

          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <div className="flex">
                <div className="rounded-full bg-primary-light border-2 border-white text-xs text-primary w-6 h-6 flex items-center justify-center select-none">MK</div>
                <div className="rounded-full bg-primary-light border-2 border-white text-xs text-primary w-6 h-6 flex items-center justify-center -ml-2 select-none">MD</div>
                <div className="rounded-full bg-primary-light border-2 border-white text-xs text-primary w-6 h-6 flex items-center justify-center -ml-2 select-none">YB</div>
                <div className="rounded-full bg-primary-light border-2 border-white text-xs text-primary w-6 h-6 flex items-center justify-center -ml-2 select-none">+2</div>
              </div>
              <div className="text-muted text-sm">Team formation</div>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-1 items-center text-text-secondary">
                <button><Triangle size={16} /></button>
                {upvotes}
              </div>
              <div className="flex gap-1 items-center text-text-secondary">
                <button><MessageCircle size={16} /></button>
                {comments}
              </div>
              <div className="flex gap-1 items-center text-text-secondary">
                <Clock size={16} />
                {formatDistanceToNowStrict(publishedAt, { locale: enUS, addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
    );
}

export default DiscoveryCard;