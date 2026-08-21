import type { getMessageById } from "./message.repository.js";
import { ApiError } from "../../types/error.types.js";

export function assertMessageAuthor(
  message: Awaited<ReturnType<typeof getMessageById>>,
  authorId: string,
) {
  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  if (message.authorId !== authorId) {
    throw new ApiError(403, "You can only manage your own messages");
  }
}