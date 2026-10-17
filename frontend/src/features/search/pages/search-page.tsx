import DiscoveryCard from "@/features/search/ui/discovery-card";
import FiltersCard from "@/features/search/ui/filters-card";
import { getProjects } from "@/features/projects/projects.api";
import { useState, useEffect } from "react";
import type { Project, ProjectSort } from "@/features/projects/projects.types";
import type { ProjectFilters } from "@/features/search/ui/filters-card";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/features/auth/auth.context";

type SearchSort = ProjectSort | "nearest";

function getDistance(
  first: { latitude: number; longitude: number },
  second: { latitude: number; longitude: number },
) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDifference = toRadians(second.latitude - first.latitude);
  const longitudeDifference = toRadians(second.longitude - first.longitude);
  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(first.latitude)) *
      Math.cos(toRadians(second.latitude)) *
      Math.sin(longitudeDifference / 2) ** 2;
  const boundedHaversine = Math.min(1, Math.max(0, haversine));

  return (
    2 * Math.atan2(Math.sqrt(boundedHaversine), Math.sqrt(1 - boundedHaversine))
  );
}

function SearchPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [sort, setSort] = useState<SearchSort>("relevant");
  const [filters, setFilters] = useState<ProjectFilters>({});

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? undefined;

  const [searchType, setSearchType] = useState<"PROJECTS" | "PEOPLE">(
    "PROJECTS",
  );
  const origin = user?.location;
  const hasOrigin =
    origin &&
    Number.isFinite(origin.latitude) &&
    Number.isFinite(origin.longitude);

  useEffect(() => {
    const loadProjects = async () => {
      const results = await getProjects(
        query,
        sort === "nearest" ? "popular" : sort,
        filters,
      );
      if (sort === "nearest" && hasOrigin) {
        setProjects(
          results
            .map((project, index) => ({
              project,
              index,
              distance:
                project.location &&
                Number.isFinite(project.location.latitude) &&
                Number.isFinite(project.location.longitude)
                  ? getDistance(origin, project.location)
                  : null,
            }))
            .sort((first, second) => {
              if (first.distance === null) {
                return second.distance === null
                  ? first.index - second.index
                  : 1;
              }
              if (second.distance === null) {
                return -1;
              }
              return (
                first.distance - second.distance || first.index - second.index
              );
            })
            .map(({ project }) => project),
        );
      } else {
        setProjects(results);
      }
    };

    loadProjects();
  }, [sort, filters, query, hasOrigin, origin]);

  return (
    <div className="main-container-narrow">
      <h1 className="font-heading pb-2 text-text-primary text-title">
        {t("search.title")}
      </h1>
      <div className="text-text-secondary">{t("search.subtitle")}</div>

      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSearchType("PROJECTS")}
            className={
              "px-4 py-1 rounded-full cursor-pointer select-none" +
              (searchType == "PROJECTS"
                ? " bg-primary text-white"
                : " text-text-primary bg-surface border border-border hover:border-primary transition")
            }
          >
            {t("search.categories.projects")}
          </button>
          <button
            onClick={() => setSearchType("PEOPLE")}
            className={
              "px-4 py-1 rounded-full cursor-pointer select-none" +
              (searchType == "PEOPLE"
                ? " bg-primary text-white"
                : " text-text-primary bg-surface border border-border hover:border-primary transition")
            }
          >
            {t("search.categories.people")}
          </button>
        </div>
        <div className="flex items-center">
          <span>{t("search.sort.label")}&nbsp;</span>
          <select
            onChange={(e) => setSort(e.target.value as SearchSort)}
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
            <option
              value="nearest"
              className="text-black hover:bg-background disabled:bg-muted/10 disabled:text-muted"
              disabled={!hasOrigin}
            >
              {t("search.sort.options.nearest")}
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
