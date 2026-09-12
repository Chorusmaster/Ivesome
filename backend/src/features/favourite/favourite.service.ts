import {getFavourite as getFavouriteDb, addFavourite, removeFavourite} from "./favourite.repository.js"
import { createNotification } from "../notification/notification.service.js";
import { getProjectOwnerId } from "../project/project.repository.js";
import { getUser } from "../user/user.service.js";

export async function getFavourite(userId: string, projectId: string) {
  return await getFavouriteDb(userId, projectId);
}

export async function toggleFavourite(userId: string, projectId: string) {
  const favourite = await getFavourite(userId, projectId);

  if (favourite) {
    await removeFavourite(userId, projectId);

    return {
      isFavourite: false,
    };
  }

  await addFavourite(userId, projectId);

  const ownerId = await getProjectOwnerId(projectId);
  if (ownerId && ownerId !== userId) {
    const user = await getUser(userId);
    const actorName = user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.login
        ? `User ${user.login}`
        : "Someone";

    await createNotification(ownerId, {
      message: `${actorName} added your project to favourites`,
      referenceType: "PROJECT",
      referenceId: projectId,
    });
  }

  return {
    isFavourite: true,
  };
}