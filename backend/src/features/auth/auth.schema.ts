import z from 'zod';

export const registerSchema = z.object({
  email: z.email(),
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
  email: z.email(),
  password: z.string().min(8),
});

export type emailVerificationPayload = z.infer<typeof emailVerificationSchema>;



export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type forgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;



export const passwordResetSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});

export type passwordResetPayload = z.infer<typeof passwordResetSchema>;