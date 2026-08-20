import { prisma } from "../../config/database.js";

const requestInclude = {
  user: {
    select: {
      id: true,
      login: true,
      firstName: true,
      lastName: true,
      avatarLink: true,
    },
  },
  project: {
    select: {
      id: true,
      title: true,
    },
  },
} as const;

export function getParticipationRequestById(id: string) {
  return prisma.participationRequest.findUnique({
    where: { id },
    include: requestInclude,
  });
}

export function getPendingParticipationRequest(
  projectId: string,
  userId: string,
) {
  return prisma.participationRequest.findFirst({
    where: { projectId, userId, status: "PENDING", type: "APPLICATION" },
  });
}

export function listProjectParticipationRequests(projectId: string) {
  return prisma.participationRequest.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    include: requestInclude,
  });
}

export function listUserParticipationRequests(userId: string) {
  return prisma.participationRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: requestInclude,
  });
}

export function createParticipationRequest(
  projectId: string,
  userId: string,
  message?: string,
) {
  return prisma.participationRequest.create({
    data: {
      projectId,
      userId,
      type: "APPLICATION",
      ...(message !== undefined && { message }),
    },
    include: requestInclude,
  });
}

export function deleteParticipationRequest(id: string) {
  return prisma.participationRequest.delete({ where: { id } });
}

export function updateParticipationRequest(
  id: string,
  status: "ACCEPTED" | "REJECTED",
) {
  return prisma.$transaction(async (tx) => {
    const request = await tx.participationRequest.update({
      where: { id },
      data: { status },
    });

    if (status !== "ACCEPTED") {
      return null;
    }

    const result = await tx.projectMember.upsert({
      where: {
        projectId_userId: {
          projectId: request.projectId,
          userId: request.userId,
        },
      },
      create: {
        projectId: request.projectId,
        userId: request.userId,
        role: "MEMBER",
      },
      update: {},
      include: requestInclude,
    });

    return result;
  });
}
