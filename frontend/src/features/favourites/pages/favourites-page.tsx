import DiscoveryCard from "@/features/search/ui/discovery-card";
import { getFavouriteProjects } from "@/features/projects/projects.api";
import { useState, useEffect } from "react";
import type { Project } from "@/features/projects/projects.types";
import { useTranslation } from "react-i18next";

function FavouritesPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);

  async function fetchProjects() {
    try {
      setLoading(true);
      const result = await getFavouriteProjects();
      setProjects(result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="main-container-narrow">
        <h1 className="font-heading pb-2 text-text-primary text-title">
          {t("favourites.title")}
        </h1>
        <div className="text-text-secondary">
          {t("favourites.description")}
        </div>

        <div className="flex flex-col gap-4 mt-8">
          {loading ? (
            <p className="text-text-primary">{t("favourites.loading")}</p>
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <DiscoveryCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-text-primary">{t("favourites.empty")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavouritesPage;