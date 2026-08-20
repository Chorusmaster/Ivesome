import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import Card from "@/shared/ui/card";
import { Triangle, MessageCircle, Clock, Bookmark } from "lucide-react";
import ItemLogo from "../../../shared/ui/item-logo";
import { Link } from "react-router-dom";
import Tags from "@/shared/ui/tags";
import AvatarGroup from "@/shared/ui/avatar-group";
import { toSentenceCase, filePathToUrl } from "@/shared/lib/utils";
import type { Project } from "@/features/projects/projects.types";

type DiscoveryCardProps = {
  project: Project
};

function DiscoveryCard({
  project
}: DiscoveryCardProps) {
  return (
    <Card hoverable>
      <div className="flex gap-4">
        <ItemLogo imageUrl={filePathToUrl(project.logoLink)} type={project.stage}></ItemLogo>

        <div className="min-w-0 w-full">
          <div className="flex pb-4 justify-between items-start">
            <div className="w-[90%]">
              <Link to={`/project/${project.id}`}>
                <h2
                  className={`font-heading text-heading cursor-pointer mb-3 ${project.stage == "IDEA" ? "hover:text-text-accent" : "hover:text-primary"} transition`}
                >
                  {project.title}
                </h2>
              </Link>
              <div className="text-text-secondary">{project.shortDescription}</div>
            </div>
            <div
              className={`rounded-full ${project.stage === "IDEA" ? "bg-accent-light text-text-accent" : "bg-primary-light text-primary"} px-2 py-0.5`}
            >
              {project.stage === "IDEA" ? "Idea" : "Project"}
            </div>
          </div>

          <Tags list={project.tags}></Tags>

          <hr className="border-border mt-6 mb-6"></hr>

          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <AvatarGroup
                users={project.members.map((member) => member.user)}
                size="xs"
                theme="primary_light"
                maxVisible={3}
              />
              <div className="text-muted text-sm">{toSentenceCase(project.stage)}</div>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-1 items-center text-text-secondary">
                <button>
                  <Bookmark size={16} />
                </button>
                {project._count.favourites}
              </div>
              <div className="flex gap-1 items-center text-text-secondary">
                <button>
                  <Triangle size={16} />
                </button>
                {project._count.upvotes}
              </div>
              <div className="flex gap-1 items-center text-text-secondary">
                <button>
                  <MessageCircle size={16} />
                </button>
                {project._count.comments}
              </div>
              <div className="flex gap-1 items-center text-text-secondary">
                <Clock size={16} />
                {formatDistanceToNowStrict(project.createdAt, {
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
