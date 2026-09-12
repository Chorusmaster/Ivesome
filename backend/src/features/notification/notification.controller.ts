import type { Request, Response } from "express";
import { getParam } from "../../utils/validation.js";
import {
  deleteNotification,
  listNotifications,
  markAsRead,
  markAllAsRead
} from "./notification.service.js";

export async function listNotificationsHandler(req: Request, res: Response) {
  res.json(await listNotifications(req.user.id));
}

export async function markAsReadHandler(req: Request, res: Response) {
  res.json(
    await markAsRead(
      getParam(req.params.notificationId, "notification id"),
      req.user.id,
    ),
  );
}

export async function markAllAsReadHandler(req: Request, res: Response) {
  res.json(
    await markAllAsRead(req.user.id),
  );
}

export async function deleteNotificationHandler(req: Request, res: Response) {
  await deleteNotification(
    getParam(req.params.notificationId, "notification id"),
    req.user.id,
  );
  res.status(204).send();
}
