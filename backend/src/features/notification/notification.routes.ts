import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  deleteNotificationHandler,
  listNotificationsHandler,
  markAsReadHandler,
  markAllAsReadHandler
} from "./notification.controller.js";
const router = Router();

router.use(authenticate);

router.get("/notifications", listNotificationsHandler);

router.patch(
  "/notifications/:notificationId/read",
  markAsReadHandler,
);

router.patch(
  "/notifications/read-all",
  markAllAsReadHandler,
);

router.delete("/notifications/:notificationId", deleteNotificationHandler);

export default router;
