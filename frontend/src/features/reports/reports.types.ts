import type { User } from "@/features/auth/auth.types";

export type ReportTargetType = "PROJECT" | "USER" | "COMMENT";
export type ReportStatus = "PENDING" | "RESOLVED";

export type Report = {
  id: string;
  reporterId?: string | null;
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  status: ReportStatus;
  reporter?: Pick<
    User,
    "id" | "login" | "firstName" | "lastName" | "avatarLink"
  > | null;
};

export type CreateReportPayload = {
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
};

export type UpdateReportPayload = {
  status: ReportStatus;
};
