import z from 'zod';

export const jwtSchema = z.object({
  id: z.string(),
  role: z.enum(["USER", "ADMIN"])
});

export type JwtAuthPayload = z.infer<typeof jwtSchema>;