import type { Request, Response } from "express";
import {
  getProject,
  listProjects,
  listUserProjects,
  listPublicProjects,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "./project.service.js";
import type { CreateProjectData, UpdateProjectData } from "./project.types.js";
import { ApiError } from "../../types/error.types.js";

export async function getProjectHandler(req: Request, res: Response) {
  if (!req.params.id || typeof req.params.id !== "string") {
    throw new ApiError(422, "Invalid project id");
  }

  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const project = await getProject(req.params.id, req.user.id);

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
    throw new ApiError(422, "Invalid project id");
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

export async function createProjectHandler(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const data: CreateProjectData = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    stage: req.body.stage,
    visibility: req.body.visibility,
    status: req.body.status || "ACTIVE",
    media: req.body.media,
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

  const data: UpdateProjectData = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    stage: req.body.stage,
    visibility: req.body.visibility,
    status: req.body.status,
    media: req.body.media,
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

  const member = await addMember(req.params.projectId, req.params.userId, role || "MEMBER");
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
