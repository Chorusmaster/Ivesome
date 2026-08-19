import { useEffect, useState } from "react";
import { getProject } from "@/features/projects/projects.api";
import type { Project } from "@/features/projects/projects.types";

export function useProject(id?: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProject() {
      try {
        setLoading(true);
        setError(null);

        if (!id) return;
        const project = await getProject(id);
        setProject(project);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  return {
    project,
    loading,
    error,
  };
}