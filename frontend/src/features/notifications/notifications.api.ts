import { api } from "@/api/axios";
import type { NotificationItem } from "./notifications.types";

export async function getNotifications(): Promise<NotificationItem[]> {
  const { data } = await api.get<NotificationItem[]>("/notifications");
  return data;
}

export async function markNotificationAsRead(
  notificationId: string,
): Promise<NotificationItem> {
  const { data } = await api.patch<NotificationItem>(
    `/notifications/${notificationId}/read`,
  );
  return data;
}

export async function markAllNotificationsAsRead(): Promise<{ count: number }> {
  const { data } = await api.patch<{ count: number }>(
    "/notifications/read-all",
  );
  return data;
}

export async function deleteNotification(
  notificationId: string,
): Promise<void> {
  await api.delete(`/notifications/${notificationId}`);
}
