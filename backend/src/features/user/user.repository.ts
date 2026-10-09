import { prisma } from "../../config/database.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { Skill, Tag, User } from "../../generated/prisma/client.js";
import type { CreateUserData, UpdateUserData } from "./user.types.js";
import type { UserStatus } from "../user/user.types.js";

export type UserWithPreferences = User & {
  skills: Skill[];
  interests: Tag[];
};

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      skills: { select: { id: true, name: true } },
      interests: { select: { id: true, name: true } },
    },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserByLogin(login: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { login } });
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
  login: string,
  email: string,
  passwordHash: string,
): Promise<User> {
  return prisma.user.create({
    data: { login, email, passwordHash },
  });
}

export async function createUsers(users: CreateUserData[]): Promise<User[]> {
  return Promise.all(
    users.map(({ login, email, passwordHash, role, status }) =>
      prisma.user.create({
        data: { login, email, passwordHash, role, status },
      }),
    ),
  );
}

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function deleteAllUsers() {
  return prisma.user.deleteMany();
}

export async function deleteUserById(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
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

export async function updateUser(
  userId: string,
  data: UpdateUserData,
  tx: Prisma.TransactionClient | typeof prisma = prisma,
) {
  const skills =
    data.skills === undefined
      ? undefined
      : await Promise.all(
          [...new Set(data.skills.map((name) => name.trim()))].map((name) =>
            tx.skill.upsert({
              where: { name },
              update: {},
              create: { name },
              select: { id: true },
            }),
          ),
        );

  const interests =
    data.interests === undefined
      ? undefined
      : await Promise.all(
          [...new Set(data.interests.map((name) => name.trim()))].map((name) =>
            tx.tag.upsert({
              where: { name },
              update: {},
              create: { name },
              select: { id: true },
            }),
          ),
        );

  return tx.user.update({
    where: { id: userId },
    data: {
      ...(data.login !== undefined && { login: data.login }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.passwordHash !== undefined && { passwordHash: data.passwordHash, }),
      ...(data.role !== undefined && { role: data.role }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.firstName !== undefined && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.avatarLink !== undefined && { avatarLink: data.avatarLink, }),
      ...(data.location !== undefined && { location: data.location, }),
      ...(data.bio !== undefined && { bio: data.bio, }),
      ...(data.about !== undefined && { about: data.about, }),
      ...(skills !== undefined && {
        skills: { set: skills.map(({ id }) => ({ id })) },
      }),
      ...(interests !== undefined && {
        interests: { set: interests.map(({ id }) => ({ id })) },
      }),
      ...(data.links !== undefined && { 
          links: data.links as unknown as Prisma.InputJsonValue, 
        }),
    },
    include: {
      skills: { select: { id: true, name: true } },
      interests: { select: { id: true, name: true } },
    },
  });
}