import z from "zod";

export const createReportSchema = z.object({
  targetType: z.enum(["PROJECT", "USER", "COMMENT"]),
  targetId: z.uuid(),
  reason: z.string().trim().min(1).max(2000),
});

export const updateReportSchema = z.object({
  status: z.enum(["PENDING", "RESOLVED"]),
});