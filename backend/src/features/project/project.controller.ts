import type { Request, Response } from "express";
import {
  getProject,
  listProjects,
  listUserProjects,
  listPublicProjects,
  listFavouriteProjects,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "./project.service.js";
import type { CreateProjectData, UpdateProjectData } from "./project.types.js";
import { ApiError } from "../../types/error.types.js";
import { getParam } from "../../utils/validation.js";

function getUploadedFiles(req: Request) {
  if (!req.files || Array.isArray(req.files)) {
    return { mediaLinks: [], logoLink: undefined };
  }

  return {
    mediaLinks: (req.files.media ?? []).map(
      (file) => `/uploads/images/${file.filename}`,
    ),
    logoLink: req.files.logo?.[0]
      ? `/uploads/images/${req.files.logo[0].filename}`
      : undefined,
  };
}

function parseArrayField(value: unknown): string[] | undefined {
  if (typeof value !== "string") {
    return value as string[] | undefined;
  }

  return JSON.parse(value) as string[];
}

export async function getProjectHandler(req: Request, res: Response) {
  if (!req.params.projectId || typeof req.params.projectId !== "string") {
    throw new ApiError(422, "Invalid project id");
  }

  const project = await getProject(req.params.projectId, req.user?.id);

  res.json(project);
}

export async function listProjectsHandler(req: Request, res: Response) {
  const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
  const take = req.query.take ? parseInt(req.query.take as string) : undefined;
  const projects = await listProjects(skip, take);
  res.json(projects);
}

export async function listUserProjectsHandler(req: Request, res: Response) {
  if (!req.params.userId || typeof req.params.userId !== "string") {
    throw new ApiError(422, "Invalid user id");
  }

  const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
  const take = req.query.take ? parseInt(req.query.take as string) : undefined;
  const projects = await listUserProjects(req.params.userId, skip, take);
  res.json(projects);
}

export async function listPublicProjectsHandler(req: Request, res: Response) {
  const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
  const take = req.query.take ? parseInt(req.query.take as string) : undefined;
  const projects = await listPublicProjects(skip, take);
  res.json(projects);
}

export async function listFavouriteProjectsHandler(req: Request, res: Response) {
  const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
  const take = req.query.take ? parseInt(req.query.take as string) : undefined;
  const projects = await listFavouriteProjects(getParam(req.user?.id, "user id"), skip, take);
  res.json(projects);
}

export async function createProjectHandler(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { mediaLinks, logoLink } = getUploadedFiles(req);
  const data: CreateProjectData = {
    ...req.body,
    tags: parseArrayField(req.body.tags),
    mediaLinks,
    ...(logoLink !== undefined && { logoLink }),
    status: req.body.status ?? "ACTIVE",
  };

  const project = await createProject(data, userId);
  res.status(201).json(project);
}

export async function updateProjectHandler(req: Request, res: Response) {
  if (!req.params.id || typeof req.params.id !== "string") {
    throw new ApiError(422, "Invalid project id");
  }
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const project = await getProject(req.params.id, userId);
  const { mediaLinks, logoLink } = getUploadedFiles(req);

  const data: UpdateProjectData = {
    ...req.body,
    ...(req.body.tags !== undefined && {
      tags: parseArrayField(req.body.tags),
    }),
    ...(mediaLinks.length > 0 && { mediaLinks }),
    ...(logoLink !== undefined && { logoLink }),
  };

  const updatedProject = await updateProject(req.params.id, userId, data);
  res.json(updatedProject);
}

export async function deleteProjectHandler(req: Request, res: Response) {
  if (!req.params.id || typeof req.params.id !== "string") {
    throw new ApiError(422, "Invalid project id");
  }
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const project = await getProject(req.params.id, userId);

  await deleteProject(req.params.id, userId);
  res.status(204).send();
}

export async function addMemberHandler(req: Request, res: Response) {
  if (!req.params.projectId || typeof req.params.projectId !== "string") {
    throw new ApiError(422, "Invalid project id");
  }

  if (!req.params.userId || typeof req.params.userId !== "string") {
    throw new ApiError(422, "Invalid user id");
  }

  const { role } = req.body;

  const member = await addMember(
    req.params.projectId,
    req.params.userId,
    role || "MEMBER",
  );
  res.status(201).json(member);
}

export async function removeMemberHandler(req: Request, res: Response) {
  if (!req.params.projectId || typeof req.params.projectId !== "string") {
    throw new ApiError(422, "Invalid project id");
  }

  if (!req.params.userId || typeof req.params.userId !== "string") {
    throw new ApiError(422, "Invalid user id");
  }

  await removeMember(req.params.projectId, req.params.userId);
  res.status(204).send();
}
