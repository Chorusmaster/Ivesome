import { prisma } from "../../config/database.js";

export async function getFavourite(userId: string, projectId: string) {
  return prisma.favourite.findUnique({ 
    where: { 
      userId_projectId: {
        userId,
        projectId,
      }
    }
  });
}

export async function addFavourite(userId: string, projectId: string) {
  return prisma.favourite.create({ 
    data: { 
      userId,
      projectId,
    }
  });
}

export async function removeFavourite(userId: string, projectId: string) {
  return prisma.favourite.delete({ 
    where: { 
      userId_projectId: {
        userId,
        projectId,
      }
    }
  });
}