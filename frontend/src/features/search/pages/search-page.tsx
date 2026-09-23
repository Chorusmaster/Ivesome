import DiscoveryCard from "@/features/search/ui/discovery-card";
import FiltersCard from "@/features/search/ui/filters-card";
import { getProjects } from "@/features/projects/projects.api";
import { useState, useEffect } from "react";
import type { Project, ProjectSort } from "@/features/projects/projects.types";
import type { ProjectFilters } from "@/features/search/ui/filters-card";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SearchPage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [sort, setSort] = useState<ProjectSort>("relevant");
  const [filters, setFilters] = useState<ProjectFilters>({});

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? undefined;

  useEffect(() => {
    const loadProjects = async () => {
      const projects = await getProjects(query, sort, filters);
      setProjects(projects);
    };

    loadProjects();
  }, [sort, filters, query]);

  return (
    <div className="main-container-narrow">
      <h1 className="font-heading pb-2 text-text-primary text-title">
        {t("search.title")}
      </h1>
      <div className="text-text-secondary">
        {t("search.subtitle")}
      </div>

      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer select-none">
            {t("search.categories.all")}
          </button>
          <button className="bg-surface text-text-primary px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">
            {t("search.categories.projects")}
          </button>
          <button className="bg-surface text-text-primary px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">
            {t("search.categories.ideas")}
          </button>
          <button className="bg-surface text-text-primary px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">
            {t("search.categories.people")}
          </button>
        </div>
        <div className="flex items-center">
          <span>{t("search.sort.label")}&nbsp;</span>
          <select
            onChange={(e) => setSort(e.target.value as ProjectSort)}
            className="px-1 text-primary focus:outline-none"
            value={sort}
          >
            <option value="relevant" className="text-black hover:bg-background">
              {t("search.sort.options.relevant")}
            </option>
            <option value="newest" className="text-black hover:bg-background">
              {t("search.sort.options.newest")}
            </option>
            <option value="popular" className="text-black hover:bg-background">
              {t("search.sort.options.popular")}
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="col-span-3 flex flex-col gap-6">
          {projects.length === 0 ? (
            <div className="text-muted text-subheading">
              {t("search.emptyState")}
            </div>
          ) : (
            projects.map((project) => (
              <DiscoveryCard key={project.id} project={project} />
            ))
          )}
        </div>
        <aside>
          <FiltersCard onChange={(f) => setFilters(f)} />
        </aside>
      </div>
    </div>
  );
}

export default SearchPage;