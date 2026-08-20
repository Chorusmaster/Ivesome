import DiscoveryCard from "@/features/search/ui/discovery-card";
import FiltersCard from "@/features/search/ui/filters-card";
import { getProjects } from "@/features/projects/projects.api";
import { useState, useEffect } from "react";
import type { Project } from "@/features/projects/projects.types";
import { filePathToUrl } from "@/shared/lib/utils";

function SearchPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
      console.log(projects);
    };

    loadProjects();
  }, []);

  return (
    <div className="main-container-narrow">
      <h1 className="font-heading pb-2 text-text-primary text-title">Search ideas</h1>
      <div className="text-text-secondary">Formed based on your preferences and interactions with the platform</div>

      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer select-none">All</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">Ideas</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">Startups</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">People</button>
        </div>
        <div>Sorted: <span className="font-bold">By rating</span></div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="col-span-3 flex flex-col gap-6">
          {projects.length == 0 ? 
            <div className="text-muted text-subheading">Nothing has been found :/</div> :
            projects.map((project) => (
              <DiscoveryCard
                project={project}
              />
          ))}
        </div>
        <aside>
          {
            projects.length > 0 && <FiltersCard></FiltersCard>
          }
        </aside>
      </div>
    </div>
    );
}

export default SearchPage;