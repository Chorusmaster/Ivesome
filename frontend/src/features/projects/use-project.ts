import { useEffect, useState } from "react";
import { getProject } from "@/features/projects/projects.api";
import type { Project } from "@/features/projects/projects.types";
import {
  getFavourite,
  toggleFavourite as toggleFavouriteApi,
} from "../favourites/favourites.api";
import {
  getUpvote,
  toggleUpvote as toggleUpvoteApi,
} from "../upvotes/upvotes.api";

export function useProject(id?: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const [isFavourite, setIsFavourite] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);

  async function toggleFavourite() {
    if (!project?.id) return;

    const result = await toggleFavouriteApi(project.id);
    setIsFavourite(result);
  }

  async function toggleUpvote() {
    if (!project?.id) return;

    const result = await toggleUpvoteApi(project.id);
    setIsUpvoted(result.isUpvoted);
    setUpvotes(result.upvotes);
  }

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
        const favourite = await getFavourite(id);
        const upvote = await getUpvote(id);

        setProject(project);
        setIsFavourite(favourite);
        setIsUpvoted(upvote.isUpvoted);
        setUpvotes(upvote.upvotes);
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
    isFavourite,
    toggleFavourite,
    isUpvoted,
    upvotes,
    toggleUpvote,
  };
}
