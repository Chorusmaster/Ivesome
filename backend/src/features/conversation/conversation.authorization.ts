import { getConversationById } from "../conversation/conversation.repository.js";
import { getProjectByWorkspaceId } from "../project/project.repository.js";
import { ApiError } from "../../types/error.types.js";

export async function assertConversationMember(
  conversationId: string,
  userId: string,
) {
  const conversation = await getConversationById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  if (conversation.workspaceId) {
    const project = await getProjectByWorkspaceId(conversation.workspaceId);
    if (!project) {
      throw new ApiError(404, "Related project not found");
    }
    
    if (!project.members.some((member) => member.userId === userId)) {
      throw new ApiError(403, "You are not a member of this conversation");
    }
  } 
  else {
    if (!conversation.members.some((member) => member.userId === userId)) {
      throw new ApiError(403, "You are not a member of this conversation");
    }
  }
}