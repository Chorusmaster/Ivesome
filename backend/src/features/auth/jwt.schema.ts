import z from 'zod';

export const accessJwtSchema = z.object({
  sub: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  type: z.literal("access"),
});

export type AccessJWTPayload = z.infer<typeof accessJwtSchema>;

export const refreshJwtSchema = z.object({
  sub: z.string(),
  jti: z.string(),
  type: z.literal("refresh"),
});

export type RefreshJWTPayload = z.infer<typeof refreshJwtSchema>;

