import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { getDateLocale } from "@/shared/lib/utils";
import Tags from "@/shared/ui/tags";
import ItemLogo from "@/shared/ui/item-logo";
import { filePathToUrl } from "@/shared/lib/utils";
import type { Project } from "../projects.types";
import { useTranslation } from "react-i18next";

function ProjectHeader({ project }: { project: Project }) {
  const { t } = useTranslation();

  const formattedStage = t(`projects.projectStages.${project.stage.toLowerCase()}`, {
    defaultValue: project.stage,
  });

  const timeAgo = formatDistanceToNowStrict(new Date(project.createdAt), {
    locale: getDateLocale(),
    addSuffix: true,
  });

  return (
    <div className="px-16 py-12 bg-surface border-b border-border">
      <div className="text-text-secondary">
        <Link to="/search" className="hover:text-text-primary">
          {t("projects.projectHeader.feed")}
        </Link>{" "}
        / {project.title}
      </div>
      <div className="flex justify-between items-start gap-8 mt-4">
        <div>
          <div className="flex gap-4 mb-1 items-center">
            <div
              className={`rounded-full ${
                project.stage === "IDEA"
                  ? "bg-accent-light text-text-accent"
                  : "bg-primary-light text-primary"
              } px-2 py-0.5`}
            >
              {formattedStage}
            </div>
            <div className="text-muted text-small">
              {t("projects.projectHeader.published", { timeAgo })}
            </div>
          </div>
          <h1 className="text-display font-heading mb-4 font-sans text-text-primary">
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
  );
}

export default ProjectHeader;
