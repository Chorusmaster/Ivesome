import { prisma } from "../../config/database.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { User } from "../../generated/prisma/client.js";
import type { CreateUserData } from "./user.types.js";
import type { UserStatus } from "../user/user.types.js";

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserAuthStatus(
  id: string,
): Promise<Pick<User, "status"> | null> {
  return prisma.user.findUnique({
    where: { id },
    select: { status: true },
  });
}

export async function createUser(
  email: string,
  passwordHash: string,
): Promise<User> {
  return prisma.user.create({
    data: { email, passwordHash },
  });
}

export async function createUsers(users: CreateUserData[]): Promise<User[]> {
  return Promise.all(
    users.map(({ email, passwordHash, role, status }) =>
      prisma.user.create({
        data: { email, passwordHash, role, status },
      }),
    ),
  );
}

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function deleteAllUsers() {
  return prisma.user.deleteMany({});
}

export async function updateUserStatusWithSession(
  userId: string,
  newStatus: UserStatus,
  tx: Prisma.TransactionClient | typeof prisma = prisma,
) {
  return tx.user.update({
    where: { id: userId },
    data: { status: newStatus },
  });
}

export async function updateUserPassword(
  userId: string,
  passwordHash: string,
  tx: Prisma.TransactionClient | typeof prisma = prisma,
) {
  return tx.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
}
