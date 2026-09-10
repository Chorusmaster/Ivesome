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
  const skills = data.skills 
    ? [...new Set(JSON.parse(data.skills))] as string[] 
    : undefined;

  const interests = data.interests 
    ? [...new Set(JSON.parse(data.interests))] as string[]
    : undefined;

  return await updateUser(userId, {
    ...data,
    skills,
    interests,
    links: data.links ? JSON.parse(data.links) : undefined,
    avatarLink: avatarLink,
  });
}
