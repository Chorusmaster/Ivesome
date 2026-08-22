import { ApiError } from "../../types/error.types.js";
import { assertProjectPermission } from "../project/project.authorization.js";
import { getWorkspaceByID } from "../workspace/workspace.repository.js";
import {
  createTask as createTaskDb,
  deleteTask as deleteTaskDb,
  getTaskById,
  getTasksByWorkspaceId,
  updateTask as updateTaskDb,
} from "./task.repository.js";

async function assertWorkspaceMember(workspaceId: string, userId: string) {
  const workspace = await getWorkspaceByID(workspaceId);

  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  await assertProjectPermission(workspace.projectId, userId, [
    "OWNER",
    "MEMBER",
  ]);
  return workspace;
}

async function assertCanModifyTask(taskId: string, userId: string) {
  const task = await getTaskById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await assertWorkspaceMember(task.workspaceId, userId);
  return task;
}

export async function listTasks(workspaceId: string, userId: string) {
  await assertWorkspaceMember(workspaceId, userId);
  return getTasksByWorkspaceId(workspaceId);
}

export async function createTask(
  workspaceId: string,
  userId: string,
  data: {
    title: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    deadline?: string;
  },
) {
  await assertWorkspaceMember(workspaceId, userId);
  return createTaskDb({
    workspaceId,
    title: data.title,
    ...(data.description !== undefined && { description: data.description }),
    ...(data.status !== undefined && { status: data.status }),
    ...(data.deadline !== undefined && { deadline: new Date(data.deadline) }),
  });
}

export async function updateTask(
  taskId: string,
  userId: string,
  data: {
    title?: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    deadline?: string;
  },
) {
  await assertCanModifyTask(taskId, userId);
  return updateTaskDb(taskId, {
    ...(data.title !== undefined && { title: data.title }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.status !== undefined && { status: data.status }),
    ...(data.deadline !== undefined && { deadline: new Date(data.deadline) }),
  });
}

export async function deleteTask(taskId: string, userId: string) {
  await assertCanModifyTask(taskId, userId);
  await deleteTaskDb(taskId);
}
