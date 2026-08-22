import z from "zod";

const taskStatus = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5000).optional(),
  status: taskStatus.optional(),
  deadline: z.iso.datetime().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();