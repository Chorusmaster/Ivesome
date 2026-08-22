import { ApiError } from "../../types/error.types.js";
import { assertProjectPermission } from "../project/project.authorization.js";
import { getWorkspaceByID } from "./workspace.repository.js";

export async function getWorkspace(workspaceId: string, userId: string) {
  const workspace = await getWorkspaceByID(workspaceId);

  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  await assertProjectPermission(workspace.projectId, userId, ["OWNER", "MEMBER"]);

  return workspace;
}