import type { CreateProjectData, UpdateProjectData } from "./project.types.js";
import {
  getProjectById,
  getAllProjects,
  createProject as createProjectDb,
  updateProject as updateProjectDb,
  deleteProject as deleteProjectDb,
  addProjectMember,
  removeProjectMember,
  getProjectMemberRole,
} from "./project.repository.js";
import { 
  assertCanViewProject, 
  assertProjectPermission 
} from "./project.authorization.js";

export async function getProject(projectId: string, userId: string) {
  await assertCanViewProject(projectId, userId);
  return await getProjectById(projectId);
}

export async function listProjects(skip?: number, take?: number) {
  return await getAllProjects({
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take })
  });
}

export async function listUserProjects(
  userId: string,
  skip?: number,
  take?: number,
) {
  return await getAllProjects({
    where: {
      members: {
        some: {
          userId: userId,
        },
      },
    },
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take })
  });
}

export async function listPublicProjects(skip?: number, take?: number) {
  return await getAllProjects({
    where: {
      visibility: "PUBLIC"
    },
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take })
  });
}

export async function createProject(data: CreateProjectData, ownerId: string) {
  return await createProjectDb(data, ownerId);
}

export async function updateProject(
  projectId: string,
  userId: string,
  data: UpdateProjectData,
) {
  await assertProjectPermission(
    projectId,
    userId,
    ["OWNER"],
  );

  return await updateProjectDb(projectId, data);
}

export async function deleteProject( 
  projectId: string,
  userId: string
) {
  await assertProjectPermission(
    projectId,
    userId,
    ["OWNER"],
  );

  return await deleteProjectDb(projectId);
}

export async function addMember(
  projectId: string,
  userId: string,
  role: "OWNER" | "MEMBER" = "MEMBER",
) {
  await assertProjectPermission(
    projectId,
    userId,
    ["OWNER"],
  );

  return await addProjectMember(projectId, userId, role);
}

export async function removeMember(projectId: string, userId: string) {
  await assertProjectPermission(
    projectId,
    userId,
    ["OWNER"],
  );

  return await removeProjectMember(projectId, userId);
}

export async function getMemberRole(projectId: string, userId: string) {
  return await getProjectMemberRole(projectId, userId);
}
