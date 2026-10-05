import type { RawUpdateUserData, UserStatus } from "./user.types.js";
import { deleteUserById, getUserById, updateUser } from "./user.repository.js";
import { ApiError } from "../../types/error.types.js";
import { getSettingsByUserId } from "../settings/settings.repository.js";

export async function getUser(userId: string) {
  const user = await getUserById(userId);

  if (!user) return null;

  const {
    id,
    login,
    email,
    firstName,
    lastName,
    avatarLink,
    location,
    bio,
    role,
    status,
    about,
    skills,
    interests,
    links,
    createdAt,
  } = user;

  return {
    id,
    login,
    email,
    firstName,
    lastName,
    avatarLink,
    location,
    bio,
    role,
    status,
    about,
    skills,
    interests,
    links,
    createdAt,
  };
}

export async function getUserProfile(userId: string, requesterId?: string) {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isOwner = requesterId === userId;
  const settings = await getSettingsByUserId(userId);

  if (!isOwner && !settings.publicProfile) {
    throw new ApiError(404, "User not found");
  }

  const {
    id,
    login,
    email,
    firstName,
    lastName,
    avatarLink,
    location,
    bio,
    about,
    skills,
    interests,
    links,
    createdAt,
  } = user;

  return {
    id,
    login,
    ...(isOwner || settings.showEmail ? { email } : {}),
    firstName,
    lastName,
    avatarLink,
    location,
    bio,
    about,
    skills,
    interests,
    links,
    createdAt,
  };
}

export async function deleteUser(userId: string) {
  return await deleteUserById(userId);
}

export async function updateProfile(
  userId: string,
  data: RawUpdateUserData,
  avatarLink?: string,
) {
  const skills = data.skills
    ? ([...new Set(JSON.parse(data.skills))] as string[])
    : undefined;

  const interests = data.interests
    ? ([...new Set(JSON.parse(data.interests))] as string[])
    : undefined;

  return await updateUser(userId, {
    login: data.login,
    firstName: data.firstName,
    lastName: data.lastName,
    location: data.location,
    bio: data.bio,
    about: data.about,
    skills,
    interests,
    links: data.links ? JSON.parse(data.links) : undefined,
    avatarLink,
  });
}

export async function updateUserStatus(userId: string, status: UserStatus) {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return await updateUser(userId, { status });
}
