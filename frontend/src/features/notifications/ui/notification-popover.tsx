import { useEffect, useMemo, useState } from "react";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Popover } from "../../../shared/ui/popover";
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/features/notifications/notifications.api";
import type {
  NotificationItem,
  NotificationReferenceType,
} from "@/features/notifications/notifications.types";
import { useNavigate } from "react-router-dom";
import { getComment } from "@/features/projects/comments.api";

function NotificationPopover() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  const fetchNotifications = async () => {
    setLoading(true);

    try {
      const data = await getNotifications();
      setNotifications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchNotifications();
  }, []);

  const handleNotificationReference = async (
    type: NotificationReferenceType,
    id: string | null | undefined,
  ) => {
    if (!id) {
      if (type !== "NONE") {
        throw new Error(t("notifications.invalidCommentError"));
      }
      return;
    }
    if (type === "COMMENT") {
      const comment = await getComment(id);
      navigate(`/project/${comment.projectId}#${comment.id}`, {
        state: { scrollToComment: true },
      });
    }
    if (type === "PROJECT") {
      navigate(`/project/${id}`);
    }
    if (type === "CONVERSATION") {
      navigate(`/conversations/${id}`);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((current) =>
        current.map((notification) => ({ ...notification, isRead: true })),
      );
    } catch {
      console.error(t("notifications.markAllReadError"));
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch {
      console.error(t("notifications.markReadError"));
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      setNotifications((current) =>
        current.filter((notification) => notification.id !== notificationId),
      );
    } catch {
      console.error(t("notifications.deleteError"));
    }
  };

  return (
    <Popover>
      <Popover.Trigger
        type="button"
        aria-label={t("notifications.openNotifications")}
        className="relative rounded-button p-2 transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <Bell size={24} className="text-muted" />
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-0.5 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Popover.Trigger>
      <Popover.Content className="w-96 p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-3">
          <h2 className="font-heading text-text-primary ml-6">
            {t("notifications.title")}
          </h2>
          {notifications.some((notification) => !notification.isRead) && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-1 text-small text-primary hover:text-primary-hover"
            >
              <CheckCheck size={14} />
              {t("notifications.markAllRead")}
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <p className="px-3 py-6 text-center text-small text-muted">
              {t("notifications.loading")}
            </p>
          ) : notifications.length === 0 ? (
            <p className="px-3 py-6 text-center text-small text-muted">
              {t("notifications.empty")}
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={
                    "flex gap-3 px-3 py-3 transition-colors " +
                    (notification.isRead ? "bg-surface" : "bg-background/80")
                  }
                >
                  <button
                    type="button"
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={
                      "mt-0.5 h-2.5 w-2.5 rounded-full " +
                      (notification.isRead ? "bg-transparent" : "bg-accent")
                    }
                    aria-label={
                      notification.isRead
                        ? t("notifications.isRead")
                        : t("notifications.markAsRead")
                    }
                  />

                  <div className="min-w-0 flex-1">
                    <button
                      className="text-small text-text-primary hover:text-primary-hover wrap-break-word"
                      onClick={async () => {
                        await handleNotificationReference(
                          notification.referenceType,
                          notification.referenceId,
                        );
                        handleMarkAsRead(notification.id);
                      }}
                    >
                      {notification.message}
                    </button>
                    <p className="mt-1 text-[11px] text-muted">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(notification.id)}
                    className="rounded-button w-6 h-6 text-muted transition-colors hover:bg-background hover:text-danger flex items-center justify-center"
                    aria-label={t("notifications.delete")}
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
}

export default NotificationPopover;