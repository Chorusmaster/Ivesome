import { ApiError } from "../../types/error.types.js";
import {
  assertProjectPermission,
  assertNotProjectMember,
} from "../project/project.authorization.js";
import { getProjectMemberRole } from "../project/project.repository.js";
import {
  createParticipationRequest as createParticipationRequestDb,
  deleteParticipationRequest as deleteParticipationRequestDb,
  getParticipationRequestById,
  getPendingParticipationRequest,
  listProjectParticipationRequests,
  listUserParticipationRequests,
  updateParticipationRequest as updateParticipationRequestDb,
} from "./participation-request.repository.js";

export async function createParticipationRequest(
  projectId: string,
  userId: string,
  message?: string,
) {
  if (await getProjectMemberRole(projectId, userId)) {
    throw new ApiError(409, "You are already a project member");
  }

  if (await getPendingParticipationRequest(projectId, userId)) {
    throw new ApiError(409, "A participation request is already pending");
  }

  return await createParticipationRequestDb(projectId, userId, message);
}

export async function listProjectRequests(projectId: string, userId: string) {
  await assertProjectPermission(projectId, userId, ["OWNER"]);
  return listProjectParticipationRequests(projectId);
}

export function listMyRequests(userId: string) {
  return listUserParticipationRequests(userId);
}

export async function updateParticipationRequest(
  requestId: string,
  userId: string,
  status: "ACCEPTED" | "REJECTED",
) {
  const request = await getParticipationRequestById(requestId);
  if (!request) throw new ApiError(404, "Participation request not found");

  await assertProjectPermission(request.projectId, userId, ["OWNER"]);
  if (request.status !== "PENDING") {
    throw new ApiError(409, "Participation request has already been processed");
  }

  return updateParticipationRequestDb(requestId, status);
}

export async function cancelParticipationRequest(
  requestId: string,
  userId: string,
) {
  const request = await getParticipationRequestById(requestId);
  if (!request) throw new ApiError(404, "Participation request not found");

  if (request.userId !== userId)
    throw new ApiError(403, "Insufficient permissions");
  if (request.status !== "PENDING")
    throw new ApiError(409, "Only pending requests can be cancelled");

  await deleteParticipationRequestDb(requestId);
}
