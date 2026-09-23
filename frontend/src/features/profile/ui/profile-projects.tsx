import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/shared/ui/card";
import DiscoveryCard from "@/features/search/ui/discovery-card";
import type { Project } from "@/features/projects/projects.types";

function ProfileProjects({ projects }: { projects: Project[] }) {
  const { t } = useTranslation();

  return (
    <Card>
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-heading font-heading text-text-primary">
          {t("profile.projects.title")}
        </h2>
        <Link
          to="/search"
          className="text-small text-primary hover:text-primary-hover"
        >
          {t("profile.projects.browseFeed")}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <DiscoveryCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-text-primary">{t("profile.projects.empty")}</p>
        )}
      </div>
    </Card>
  );
}

export default ProfileProjects;
