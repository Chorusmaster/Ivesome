import type { Request, Response } from "express";
import { getParam } from "../../utils/validation.js";
import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from "./task.service.js";

export async function listTasksHandler(req: Request, res: Response) {
  const workspaceId = getParam(req.params.workspaceId, "workspace id");
  res.json(await listTasks(workspaceId, req.user.id));
}

export async function createTaskHandler(req: Request, res: Response) {
  const workspaceId = getParam(req.params.workspaceId, "workspace id");
  res.status(201).json(await createTask(workspaceId, req.user.id, req.body));
}

export async function updateTaskHandler(req: Request, res: Response) {
  const taskId = getParam(req.params.taskId, "task id");
  res.json(await updateTask(taskId, req.user.id, req.body));
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const taskId = getParam(req.params.taskId, "task id");
  await deleteTask(taskId, req.user.id);
  res.status(204).send();
}