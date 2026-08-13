import { User } from "../../models/User.model.js";
import type { CreateUserData } from "./user.types.js";

export async function getUserByEmail(email: string) {
  return await User.findOne({ email });
}

export async function createUser(email: string, passwordHash: string) {
  return await User.create({ email, passwordHash });
}

export async function createUsers(users: CreateUserData[]) {
  return User.insertMany(users);
}

export async function getAllUsers() {
  return User.find();
}

export async function deleteAllUsers() {
  return User.deleteMany({});
}