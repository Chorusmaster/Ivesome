import type { ProjectStage, ProjectMember } from "../projects/projects.types";
import type { Conversation } from "../conversations/conversations.types";
import type { ParticipationRequest } from "../projects/participation-requests.api";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

export type WorkspaceTask = {
	id: string;
	workspaceId: string;
	title: string;
	description?: string | null;
	status: TaskStatus;
	deadline?: string | null;
};

export type TaskPayload = {
	title: string;
	description?: string;
	status?: WorkspaceTask["status"];
	deadline?: string;
};

export type Workspace = {
	id: string;
	projectId: string;
	project: {
		id: string;
		title: string;
		stage: ProjectStage;
    logoLink?: string;
		members: ProjectMember[];
    participationRequests: ParticipationRequest[];
	};
	tasks: WorkspaceTask[];
	conversation: Conversation | null;
};