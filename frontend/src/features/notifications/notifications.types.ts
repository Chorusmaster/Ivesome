export type NotificationReferenceType =
  | "PROJECT"
  | "PARTICIPATION_REQUEST"
  | "COMMENT"
  | "CONVERSATION"
  | "REPORT"
  | "NONE";

export type NotificationItem = {
  id: string;
  userId: string;
  message: string;
  referenceType: NotificationReferenceType;
  referenceId?: string | null;
  isRead: boolean;
  createdAt: string;
};
