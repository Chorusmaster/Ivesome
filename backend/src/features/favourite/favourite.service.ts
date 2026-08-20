import {getFavourite as getFavouriteDb, addFavourite, removeFavourite} from "./favourite.repository.js"

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

  return {
    isFavourite: true,
  };
}