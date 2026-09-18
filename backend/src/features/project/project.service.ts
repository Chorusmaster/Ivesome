import type {
  CreateProjectData,
  ProjectSort,
  ProjectStage,
  ProjectStatus,
  UpdateProjectData,
} from "./project.types.js";
import {
  getProjectById,
  listProjects as listProjectsDb,
  listUserProjects as listUserProjectsDb,
  listPublicProjects as listPublicProjectsDb,
  getFavouriteProjects as listFavouriteProjectsDb,
  createProject as createProjectDb,
  updateProject as updateProjectDb,
  turnIdeaIntoProject as turnIdeaIntoProjectDb,
  deleteProject as deleteProjectDb,
  addProjectMember,
  removeProjectMember,
  getProjectMemberRole,
} from "./project.repository.js";
import { 
  assertCanViewProject, 
  assertProjectPermission 
} from "./project.authorization.js";
import { ApiError } from "../../types/error.types.js";

export async function getProject(projectId: string, userId: string) {
  await assertCanViewProject(projectId, userId);
  return await getProjectById(projectId);
}

export async function listProjects(skip?: number, take?: number) {
  return await listProjectsDb({
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
  });
}

export async function listUserProjects(
  userId: string,
  skip?: number,
  take?: number,
) {
  return await listUserProjectsDb({
    userId,
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
  });
}

export async function listPublicProjects(
  skip?: number, 
  take?: number,
  query?: string, 
  sort?: ProjectSort, 
  stages?: ProjectStage[],
  tags?: string[],
  userId?: string
) {
  return await listPublicProjectsDb({
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
    ...(query !== undefined && { query }),
    ...(sort !== undefined && { sort }),
    ...(stages !== undefined && { stages }),
    ...(tags !== undefined && { tags }),
    ...(userId !== undefined && { userId }),
  });
}

export async function listFavouriteProjects(
  userId: string, 
  skip?: number, 
  take?: number
) {
  return await listFavouriteProjectsDb({
    userId,
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
  });
}

export async function createProject(data: CreateProjectData, ownerId: string) {
  const processedData = {
    title: data.title,
    shortDescription: data.shortDescription,
    ...(data.description !== undefined && {description: data.description}),
    stage: data.stage,
    visibility: data.visibility,
    ...(data.status !== undefined && {status: data.status}),
    ...(data.tags !== undefined && {tags: [...new Set(data.tags)]}),
    ...(data.skills !== undefined && {skills: [...new Set(data.skills)]}),
    ...(data.logoLink !== undefined && {logoLink: data.logoLink}),
    ...(data.mediaLinks !== undefined && {mediaLinks: data.mediaLinks}),
  }

  return await createProjectDb(processedData, ownerId);
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

  if (data.stage) {
    const project = await getProjectById(projectId);
    if (!project?.workspace?.id) {
      throw new ApiError(409, "Turn idea into project first to change stage")
    }
  }

  const processedData = {
    ...data.title !== undefined && { title: data.title },
    ...data.shortDescription !== undefined && { shortDescription: data.shortDescription },
    ...data.description !== undefined && { description: data.description },
    ...data.stage !== undefined && { stage: data.stage },
    ...data.visibility !== undefined && { visibility: data.visibility },
    ...data.status !== undefined && { status: data.status },
    ...data.tags !== undefined && { tags: [...new Set(data.tags)] },
    ...data.skills !== undefined && { skills: [...new Set(data.skills)] },
    ...data.logoLink !== undefined && { logoLink: data.logoLink },
    ...data.mediaLinks !== undefined && { mediaLinks: data.mediaLinks },
  };

  return await updateProjectDb(projectId, processedData);
}

export async function turnIdeaIntoProject(projectId: string, userId: string) {
  await assertProjectPermission(projectId, userId, ["OWNER"]);

  const existingProject = await getProjectById(projectId);

  if (!existingProject) {
    throw new ApiError(404, "Project not found");
  }

  if (existingProject.stage !== "IDEA") {
    throw new ApiError(409, "Project is not in idea stage");
  }

  if (existingProject.workspace) {
    throw new ApiError(409, "Project workspace already exists");
  }

  return turnIdeaIntoProjectDb(projectId);
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

export async function updateProjectStatus(
  projectId: string,
  status: ProjectStatus,
) {
  const existingProject = await getProjectById(projectId);

  if (!existingProject) {
    throw new ApiError(404, "Project not found");
  }

  return await updateProjectDb(projectId, { status });
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
