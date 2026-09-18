import type { RawUpdateUserData, UserStatus } from "./user.types.js";
import { getUserById, updateUser } from "./user.repository.js";
import { ApiError } from "../../types/error.types.js";

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

export async function updateUserStatus(userId: string, status: UserStatus) {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return await updateUser(userId, { status });
}
