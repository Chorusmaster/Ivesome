import type { RawUpdateUserData } from "./user.types.js";
import { getUserById, updateUser } from "./user.repository.js";

export async function getUser(userId: string) {
  return await getUserById(userId);
}

export async function updateProfile(
  userId: string,
  data: RawUpdateUserData,
  avatarLink?: string,
) {
  return await updateUser(userId, {
    ...data,
    skills: data.skills ? JSON.parse(data.skills) : undefined,
    links: data.links ? JSON.parse(data.links) : undefined,
    avatarLink: avatarLink,
  });
}
