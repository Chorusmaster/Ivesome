import DiscoveryCard from "@/features/search/ui/discovery-card";
import FiltersCard from "@/features/search/ui/filters-card";
import { getProjects } from "@/features/projects/projects.api";
import { useState, useEffect } from "react";
import type { Project, ProjectSort } from "@/features/projects/projects.types";
import type { ProjectFilters } from "@/features/search/ui/filters-card";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
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
      <h1 className="font-heading pb-2 text-text-primary text-title">Search ideas</h1>
      <div className="text-text-secondary">Formed based on your preferences and interactions with the platform</div>

      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer select-none">All</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">Projects</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">Ideas</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">People</button>
        </div>
        <div className="flex items-center">
          <span>Sorted: </span>
          <select onChange={(e) => setSort(e.target.value as ProjectSort)} className="px-1 text-primary focus:outline-none">
            <option value={"relevant"} className="text-text-primary hover:bg-background">Relevant first</option>
            <option value={"newest"} className="text-text-primary hover:bg-background">Newest first</option>
            <option value={"popular"} className="text-text-primary hover:bg-background">Popular first</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="col-span-3 flex flex-col gap-6">
          {projects.length == 0 ? 
            <div className="text-muted text-subheading">Nothing has been found :/</div> :
            projects.map((project) => (
              <DiscoveryCard
                key={project.id}
                project={project}
              />
          ))}
        </div>
        <aside>
          <FiltersCard onChange={(f) => setFilters(f)} />
        </aside>
      </div>
    </div>
    );
}

export default SearchPage;