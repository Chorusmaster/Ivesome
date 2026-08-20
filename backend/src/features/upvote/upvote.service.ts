import {
  addUpvote,
  countUpvotes,
  getUpvote as getUpvoteDb,
  removeUpvote,
} from "./upvote.repository.js";

export async function getUpvote(userId: string, projectId: string) {
  const [upvote, upvotes] = await Promise.all([
    getUpvoteDb(userId, projectId),
    countUpvotes(projectId),
  ]);

  return { isUpvoted: !!upvote, upvotes };
}

export async function toggleUpvote(userId: string, projectId: string) {
  const upvote = await getUpvoteDb(userId, projectId);

  if (upvote) {
    await removeUpvote(userId, projectId);
  } else {
    await addUpvote(userId, projectId);
  }

  return getUpvote(userId, projectId);
}
