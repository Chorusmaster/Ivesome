import { ApiError } from "../../types/error.types.js";
import {
  createNotification as createNotificationDb,
  deleteNotification as deleteNotificationDb,
  getNotificationById,
  listNotificationsByUserId,
  markNotificationAsRead,
  markAllUserNotificationsAsRead
} from "./notification.repository.js";
import { getUserById } from "../user/user.repository.js";
import { getSettingsByUserId } from "../settings/settings.repository.js";

export async function listNotifications(userId: string) {
  return listNotificationsByUserId(userId);
}

export async function createNotification(
  userId: string,
  data: {
    message: string;
    referenceType: "PROJECT" | "PARTICIPATION_REQUEST" | "COMMENT" | "CONVERSATION" | "REPORT" | "NONE";
    referenceId?: string | null;
    isRead?: boolean;
  },
) {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("User you are trying to notify doesn't exist");
  }

  let canSend = false;
  const settings = await getSettingsByUserId(userId);
  switch (data.referenceType) {
    case("PROJECT"):
      if (settings.notifyProject) canSend = true;
      break;
    case("PARTICIPATION_REQUEST"):
      if (settings.notifyParticipationRequest) canSend = true;
      break;
    case("COMMENT"):
      if (settings.notifyComment) canSend = true;
      break;
    case("CONVERSATION"):
      if (settings.notifyConversation) canSend = true;
      break;
    case("REPORT"):
      if (settings.notifyReport) canSend = true;
      break;
    default:
      if (settings.notifyOther) canSend = true;
      break;
  }

  if (canSend) {
    return createNotificationDb({
      userId,
      ...data,
    });
  }
}

export async function markAsRead(
  notificationId: string,
  userId: string,
) {
  const notification = await getNotificationById(notificationId);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (notification.userId !== userId) {
    throw new ApiError(403, "Forbidden");
  }

  return markNotificationAsRead(notificationId);
}

export async function markAllAsRead(
  userId: string,
) {
  return markAllUserNotificationsAsRead(userId);
}

export async function deleteNotification(notificationId: string, userId: string) {
  const notification = await getNotificationById(notificationId);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (notification.userId !== userId) {
    throw new ApiError(403, "Forbidden");
  }

  await deleteNotificationDb(notificationId);
}
