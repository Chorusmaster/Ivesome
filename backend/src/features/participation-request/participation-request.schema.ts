import z from "zod";

export const createParticipationRequestSchema = z.object({
  message: z.string().trim().max(2000).optional(),
});

export const updateParticipationRequestSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED"]),
});
