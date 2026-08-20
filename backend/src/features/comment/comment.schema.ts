import z from "zod";

export const createCommentSchema = z.object({
  content: z.string().trim().min(1).max(2000),
  parentCommentId: z.uuid().optional(),
});

export const updateCommentSchema = z.object({
  content: z.string().trim().min(1).max(2000),
});
