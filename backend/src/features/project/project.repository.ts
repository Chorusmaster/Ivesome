import { prisma } from "../../config/database.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { Project } from "../../generated/prisma/client.js";
import type {
  CreateProjectData,
  ProjectRole,
  ProjectSort,
  ProjectStage,
  UpdateProjectData,
} from "./project.types.js";

export async function getProjectById(id: string) {
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
      workspace: {
        select: {
          id: true
        }
      }
    },
  });
}

export async function getProjectByWorkspaceId(workspaceId: string) {
  return prisma.project.findFirst({
    where: { 
      workspace: {
        id: workspaceId,
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
      workspace: {
        select: {
          id: true
        }
      }
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

export async function listProjects({
  skip,
  take,
}: {
  skip?: number;
  take?: number;
}): Promise<Project[]> {
  return getAllProjects({
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
  });
}

export async function listUserProjects({
  userId,
  skip,
  take,
}: {
  userId: string;
  skip?: number;
  take?: number;
}): Promise<Project[]> {
  return getAllProjects({
    where: {
      members: {
        some: { userId },
      },
    },
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
  });
}

export async function listPublicProjects({
  skip,
  take,
  query,
  sort,
  stages = [],
  tags = [],
}: {
  skip?: number;
  take?: number;
  query?: string;
  sort?: ProjectSort;
  stages?: ProjectStage[];
  tags?: string[];
}): Promise<Project[]> {
  const orderBy: Prisma.ProjectOrderByWithRelationInput =
    sort === "popular"
      ? { upvotes: { _count: "desc" } }
      : { createdAt: "desc" };

  return getAllProjects({
    where: {
      visibility: "PUBLIC",

      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { shortDescription: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      }),
      
      ...(stages.length > 0 && {
        stage: { in: stages },
      }),

      ...(tags.length > 0 && {
        tags: { hasSome: tags },
      }),
    },
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
    orderBy,
  });
}

export async function listFavouriteProjects({
  userId,
  skip,
  take,
}: {
  userId: string;
  skip?: number;
  take?: number;
}): Promise<Project[]> {
  return getAllProjects({
    where: {
      favourites: {
        some: { userId },
      },
    },
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
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
      stage: "IDEA",
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

export async function turnIdeaIntoProject(
  projectId: string,
): Promise<Project> {
  return prisma.project.update({
    where: { id: projectId },
    data: {
      stage: "TEAM_BUILDING",
      workspace: {
        create: {
          conversation: {
            create: {},
          },
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