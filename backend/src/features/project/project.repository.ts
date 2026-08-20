import { prisma } from "../../config/database.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { Project } from "../../generated/prisma/client.js";
import type { CreateProjectData, ProjectRole, UpdateProjectData } from "./project.types.js";

export async function getProjectById(id: string): Promise<Project | null> {
  return prisma.project.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          favourites: true,
          upvotes: true,
          comments: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              login: true,
              email: true,
              firstName: true,
              lastName: true,
              avatarLink: true,
            },
          },
        },
      },
    },
  });
}

export async function getAllProjects({
  where,
  skip,
  take,
  orderBy,
}: {
  where?: Prisma.ProjectWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.ProjectOrderByWithRelationInput;
}): Promise<Project[]> {
  return prisma.project.findMany({
    ...(where && { where }),
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
    ...(orderBy && { orderBy }),

    include: {
      _count: {
        select: {
          favourites: true,
          upvotes: true,
          comments: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              login: true,
              email: true,
              firstName: true,
              lastName: true,
              avatarLink: true,
            },
          },
        },
      },
    },
  });
}

export async function createProject(
  data: CreateProjectData,
  ownerId: string,
  tx: Prisma.TransactionClient | typeof prisma = prisma,
): Promise<Project> {
  return tx.project.create({
    data: {
      ...data,
      members: {
        create: {
          userId: ownerId,
          role: "OWNER",
        },
      },
    },
    include: {
      _count: {
        select: {
          favourites: true,
          upvotes: true,
          comments: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              login: true,
              email: true,
              firstName: true,
              lastName: true,
              avatarLink: true,
            },
          },
        },
      },
    },
  });
}

export async function updateProject(
  projectId: string,
  data: UpdateProjectData,
  tx: Prisma.TransactionClient | typeof prisma = prisma,
): Promise<Project> {
  return tx.project.update({
    where: { id: projectId },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.shortDescription !== undefined && {
        shortDescription: data.shortDescription,
      }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.stage !== undefined && { stage: data.stage }),
      ...(data.visibility !== undefined && { visibility: data.visibility }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.logoLink !== undefined && { logoLink: data.logoLink }),
      ...(data.mediaLinks !== undefined && {
        mediaLinks: data.mediaLinks as Prisma.InputJsonValue,
      }),
    },
    include: {
      _count: {
        select: {
          favourites: true,
          upvotes: true,
          comments: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              login: true,
              email: true,
              firstName: true,
              lastName: true,
              avatarLink: true,
            },
          },
        },
      },
    },
  });
}

export async function deleteProject(
  projectId: string,
  tx: Prisma.TransactionClient | typeof prisma = prisma,
): Promise<Project> {
  return tx.project.delete({
    where: { id: projectId },
  });
}

export async function addProjectMember(
  projectId: string,
  userId: string,
  role: "OWNER" | "MEMBER" = "MEMBER",
  tx: Prisma.TransactionClient | typeof prisma = prisma,
) {
  return tx.projectMember.create({
    data: {
      projectId,
      userId,
      role,
    },
  });
}

export async function removeProjectMember(
  projectId: string,
  userId: string,
  tx: Prisma.TransactionClient | typeof prisma = prisma,
) {
  return tx.projectMember.delete({
    where: {
      projectId_userId: { projectId, userId },
    },
  });
}

export async function getProjectMemberRole(
  projectId: string,
  userId: string,
): Promise<ProjectRole | null> {
  const member = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: { projectId, userId },
    },
    select: { role: true },
  });
  return member?.role ?? null;
}

export async function deleteAllProjects() {
  return prisma.project.deleteMany();
}