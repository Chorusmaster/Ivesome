import { prisma } from "../../config/database.js";

export async function listNotificationsByUserId(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getNotificationById(id: string) {
  return prisma.notification.findUnique({ where: { id } });
}

export async function createNotification(data: {
  userId: string;
  message: string;
  referenceType: "PROJECT" | "PARTICIPATION_REQUEST" | "COMMENT" | "CONVERSATION" | "REPORT" | "NONE";
  referenceId?: string | null;
}) {
  return prisma.notification.create({ data });
}

export async function markNotificationAsRead(
  id: string,
) {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function markAllUserNotificationsAsRead(
  userId: string,
) {
  return prisma.notification.updateMany({
    where: { userId },
    data: { isRead: true },
  });
}

export async function deleteNotification(id: string) {
  return prisma.notification.delete({ where: { id } });
}
