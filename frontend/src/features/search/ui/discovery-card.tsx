import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import Card from "@/shared/ui/card";
import { Triangle, MessageCircle, Clock } from "lucide-react";
import ItemLogo from "../../../shared/ui/item-logo";
import { Link } from "react-router-dom";
import Tags from "@/shared/ui/tags";
import AvatarGroup from "@/shared/ui/avatar-group";
import type { ProjectMember } from "@/features/projects/projects.types";
import type { ProjectStage } from "@/features/projects/projects.types";
import { toSentenceCase } from "@/shared/lib/utils";

type DiscoveryCardProps = {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
  upvotes: number;
  comments: number;
  publishedAt: Date;
  stage?: ProjectStage;
  teamMembers?: ProjectMember[];
  logoUrl?: string;
};

function DiscoveryCard({
  id,
  title,
  description,
  tags = [],
  upvotes,
  comments,
  publishedAt,
  stage = "IDEA",
  teamMembers = [],
  logoUrl,
}: DiscoveryCardProps) {
  return (
    <Card hoverable>
      <div className="flex gap-4">
        <ItemLogo imageUrl={logoUrl} type={stage}></ItemLogo>

        <div className="min-w-0 w-full">
          <div className="flex pb-4 justify-between items-start">
            <div className="w-[90%]">
              <Link to={`/project/${id}`}>
                <h2
                  className={`font-heading text-heading cursor-pointer mb-3 ${stage == "IDEA" ? "hover:text-text-accent" : "hover:text-primary"} transition`}
                >
                  {title}
                </h2>
              </Link>
              <div className="text-text-secondary">{description}</div>
            </div>
            <div
              className={`rounded-full ${stage === "IDEA" ? "bg-accent-light text-text-accent" : "bg-primary-light text-primary"} px-2 py-0.5`}
            >
              {stage === "IDEA" ? "Idea" : "Project"}
            </div>
          </div>

          <Tags list={tags}></Tags>

          <hr className="border-border mt-6 mb-6"></hr>

          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <AvatarGroup
                users={teamMembers.map((member) => member.user)}
                size="xs"
                theme="primary_light"
                maxVisible={3}
              />
              <div className="text-muted text-sm">{toSentenceCase(stage)}</div>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-1 items-center text-text-secondary">
                <button>
                  <Triangle size={16} />
                </button>
                {upvotes}
              </div>
              <div className="flex gap-1 items-center text-text-secondary">
                <button>
                  <MessageCircle size={16} />
                </button>
                {comments}
              </div>
              <div className="flex gap-1 items-center text-text-secondary">
                <Clock size={16} />
                {formatDistanceToNowStrict(publishedAt, {
                  locale: enUS,
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DiscoveryCard;
