import z from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  login: z.string()
  .min(3, "Login must be at least 3 characters")
  .max(30, "Login must be at most 30 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Login can contain only letters, numbers and underscores"
  ),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
})
  .refine(
    (data) => data.password === data.passwordConfirm,
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
);

export type RegisterPayload = z.infer<typeof registerSchema>;



export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type loginPayload = z.infer<typeof loginSchema>;



export const emailVerificationSchema = z.object({
  token: z.string(),
});

export type emailVerificationPayload = z.infer<typeof emailVerificationSchema>;



export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type forgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;



export const passwordResetSchema = z.object({
  password: z.string().min(8),
  token: z.string(),
});

export type passwordResetPayload = z.infer<typeof passwordResetSchema>;