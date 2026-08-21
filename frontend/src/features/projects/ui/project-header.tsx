import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import Tags from "@/shared/ui/tags";
import ItemLogo from "@/shared/ui/item-logo";
import { filePathToUrl, toSentenceCase } from "@/shared/lib/utils";
import type { Project } from "../projects.types";

function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className="px-16 py-12 bg-surface border-b border-border">
      <div className="text-text-secondary">
        <Link to="/search" className="hover:text-text-primary">Feed</Link> / {project.title}
      </div>
      <div className="flex justify-between items-start gap-8 mt-4">
        <div>
          <div className="flex gap-4 mb-1 items-center">
            <div className={`rounded-full ${project.stage === "IDEA" ? "bg-accent-light text-text-accent" : "bg-primary-light text-primary"} px-2 py-0.5`}>
              {toSentenceCase(project.stage)}
            </div>
            <div className="text-muted text-small">
              Published {formatDistanceToNowStrict(project.createdAt, { locale: enUS, addSuffix: true })}
            </div>
          </div>
          <h1 className="text-display font-heading mb-4 font-sans">{project.title}</h1>
          <div className="text-text-secondary text-body mb-4">{project.shortDescription}</div>
          <Tags list={project.tags} />
        </div>
        <ItemLogo imageUrl={filePathToUrl(project.logoLink) ?? undefined} type={project.stage} size="lg" />
      </div>
    </div>
  );
}

export default ProjectHeader;