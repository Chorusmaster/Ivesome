import type { Project, User } from "../generated/prisma/client.js";
import { getFavouriteProjects, getUpvotedProjects } from "../features/project/project.repository.js";

export async function getRecommendations(user: User, projects: Project[]) {
  const upvotedProjects = await getUpvotedProjects({userId: user.id});
  const favouriteProjects = await getFavouriteProjects({userId: user.id});

  console.log(upvotedProjects)
  console.log(favouriteProjects)

  const recommendations = projects
  .map(project => ({
    project,
    score: calculateScore(user, project, upvotedProjects, favouriteProjects)
  }))
  .sort((a, b) => b.score - a.score);

  return recommendations.map(({ project }) => project);
}

function calculateScore(user: User, project: Project, upvotedProjects: Project[], favouriteProjects: Project[]) {
  const userSkillsMatch = calculateSimilarity(
    user.skills,
    project.skills
  );

  const userInterestsMatch = calculateSimilarity(
    user.interests,
    project.tags
  );

  const isUpvoted = upvotedProjects.some(p => p.id === project.id);
  const isFavourite = favouriteProjects.some(p => p.id === project.id);

  const upvotedSimilarity = isUpvoted
    ? 0
    : calculateProjectsSimilarity(upvotedProjects, project);

  const favouriteSimilarity = isFavourite
    ? 0
    : calculateProjectsSimilarity(favouriteProjects, project);

  const score = userSkillsMatch * 0.4
   + userInterestsMatch * 0.3
   + upvotedSimilarity * 0.15
   + favouriteSimilarity * 0.15;

  return score;
}

function normalizeString(str: string) {
  const trimmed = str.trim();

  return (
    trimmed.charAt(0).toUpperCase() +
    trimmed.slice(1).replaceAll(/_| /g, "").toLowerCase()
  );
}

function calculateProjectsSimilarity(
  projects: Project[],
  target: Project
) {
  if (projects.length === 0) return 0;

  return Math.max(
    ...projects.map(project =>
      calculateSimilarity(project.tags, target.tags)
    )
  );
}

function calculateSimilarity(
  itemsA: string[],
  itemsB: string[]
) {
  const setA = new Set(itemsA.map(normalizeString));
  const setB = new Set(itemsB.map(normalizeString));

  if (setA.size === 0 || setB.size === 0) return 0;

  const intersection = [...setA].filter(item => setB.has(item)).length;
  const union = new Set([...setA, ...setB]).size;

  return intersection / union;
}