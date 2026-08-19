import { 
  getProjectById,
  getProjectMemberRole 
} from "./project.repository.js";
import { ApiError } from "../../types/error.types.js";
import type { ProjectRole } from "../../generated/prisma/enums.js";

export async function assertProjectPermission(
  projectId: string,
  userId: string,
  allowedRoles: ProjectRole[],
) {
  const role = await getProjectMemberRole(
    projectId,
    userId,
  );

  if (!role || !allowedRoles.includes(role)) {
    throw new ApiError(403, "Insufficient permissions");
  }
}

export async function assertCanViewProject(
  projectId: string,
  userId?: string,
) {
  const project = await getProjectById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.visibility === "PUBLIC") {
    return project;
  }

  if (!userId) {
    throw new ApiError(403, "Access denied");
  }

  const member = await getProjectMemberRole(
    projectId,
    userId,
  );

  if (!member) {
    throw new ApiError(403, "Access denied");
  }

  return project;
}