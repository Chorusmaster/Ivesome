import { Link } from "react-router-dom";
import Card from "@/shared/ui/card";
import DiscoveryCard from "@/features/search/ui/discovery-card";
import type { Project } from "@/features/projects/projects.types";

function ProfileProjects({ projects }: { projects: Project[] }) {
  return (
    <Card>
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-heading font-heading text-text-primary">Ideas & projects</h2>
        <Link to="/search" className="text-small text-primary hover:text-primary-hover">Browse feed</Link>
      </div>
      <div className="flex flex-col gap-4">
        {projects.length > 0 ? projects.map((project) => <DiscoveryCard key={project.id} project={project} />) : <p>No projects yet</p>}
      </div>
    </Card>
  );
}

export default ProfileProjects;