import { User } from "../../models/User.model.js";
import type { UserData, CreateUserData } from "./user.types.js";
import { Types } from "mongoose";
import { toUserData } from "./user.mapper.js"

export async function getUserById(id: string): Promise<UserData | null> {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  const user = await User.findById(id);

  if (!user) return null;

  return toUserData(user);
}

export async function getUserByEmail(email: string): Promise<UserData | null> {
  const user = await User.findOne({ email });

  if (!user) return null;

  return toUserData(user);
}

export async function createUser(
  email: string,
  passwordHash: string,
): Promise<UserData> {
  const user = await User.create({ email, passwordHash });

  return toUserData(user);
}

export async function createUsers(users: CreateUserData[]): Promise<UserData[]> {
  const createdUsers = await User.insertMany(users);

  return createdUsers.map((user) => toUserData(user));
}

export async function getAllUsers(): Promise<UserData[]> {
  const users = await User.find();

  return users.map((user) => toUserData(user));
}

export async function deleteAllUsers() {
  return User.deleteMany({});
}