import { User } from "../../models/User.model.js";
import type { CreateUserData } from "./user.types.js";
import type { IUser } from "../../models/User.model.js";
import { Types, type HydratedDocument } from "mongoose";
import type { UserStatus } from "../user/user.types.js";
import type { ClientSession } from "mongoose";

export async function getUserById(
  id: string,
): Promise<HydratedDocument<IUser> | null> {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return User.findById(id);
}

export async function getUserByEmail(
  email: string,
): Promise<HydratedDocument<IUser> | null> {
  return User.findOne({ email });
}

export async function getUserAuthStatus(
  id: string,
): Promise<Pick<IUser, "status"> | null> {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return User.findById(id)
    .select("status")
    .lean();
}

export async function createUser(
  email: string,
  passwordHash: string,
): Promise<HydratedDocument<IUser>> {
  return User.create({ email, passwordHash });
}

export async function createUsers(
  users: CreateUserData[],
): Promise<HydratedDocument<IUser>[]> {
  return User.insertMany(users);
}

export async function getAllUsers(): Promise<HydratedDocument<IUser>[]> {
  return User.find();
}

export async function deleteAllUsers() {
  return User.deleteMany({});
}

export async function updateUserStatusWithSession(
  userId: string,
  newStatus: UserStatus,
  session: ClientSession
) {
  return User.findByIdAndUpdate(
    userId,
    { status: newStatus },
    {
      new: true,
      session: session,
    }
  );
}

export async function updateUserPassword(
  userId: string, 
  passwordHash: string,
  session: ClientSession
) {
  return User.findByIdAndUpdate(
    userId,
    { passwordHash: passwordHash },
    {
      new: true,
      session: session,
    }
  );
}
