import { api } from "@/api/axios";
import type { Workspace, WorkspaceTask, TaskPayload } from "./workspace.types";

export async function getWorkspace(workspaceId: string) {
	const { data } = await api.get<Workspace>(`/workspaces/${workspaceId}`);
	return data;
}

export async function getTasks(workspaceId: string) {
	const { data } = await api.get<WorkspaceTask[]>(`/workspaces/${workspaceId}/tasks`);
	return data;
}

export async function createTask(workspaceId: string, payload: TaskPayload) {
	const { data } = await api.post<WorkspaceTask>(
		`/workspaces/${workspaceId}/tasks`,
		payload,
	);
	return data;
}

export async function updateTask(taskId: string, payload: Partial<TaskPayload>) {
	const { data } = await api.patch<WorkspaceTask>(`/workspaces/tasks/${taskId}`, payload);
	return data;
}

export async function deleteTask(taskId: string) {
	await api.delete(`/workspaces/tasks/${taskId}`);
}
