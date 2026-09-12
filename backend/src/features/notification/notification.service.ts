import { ApiError } from "../../types/error.types.js";
import {
  createNotification as createNotificationDb,
  deleteNotification as deleteNotificationDb,
  getNotificationById,
  listNotificationsByUserId,
  markNotificationAsRead,
  markAllUserNotificationsAsRead
} from "./notification.repository.js";

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
  return createNotificationDb({
    userId,
    ...data,
  });
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
