import z from "zod";

const jsonStringArray = z.string().superRefine((value, ctx) => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(value);
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Must be valid JSON encoded value",
    });
    return;
  }

  if (
    !Array.isArray(parsed) ||
    !parsed.every((item) => typeof item === "string")
  ) {
    ctx.addIssue({
      code: "custom",
      message: "Must be valid JSON of strings",
    });
  }
});

const profileLinks = z.string().superRefine((value, ctx) => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(value);
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Profile links must be a JSON-encoded array of objects of type {type, link}",
    });
    return;
  }

  const result = z
    .array(
      z.object({
        type: z.enum(["GITHUB", "LINKEDIN", "UNKNOWN"]),
        link: z.string().trim().min(1),
      }),
    )
    .safeParse(parsed);

  if (!result.success) {
    ctx.addIssue({
      code: "custom",
      message: "Profile links must be a JSON-encoded array of objects of type {type, link}",
    });
  }
});

export const updateProfileSchema = z
  .object({
    login: z
      .string()
      .trim()
      .min(3, "Login must be at least 3 characters")
      .max(30, "Login must be at most 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Login can contain only letters, numbers and underscores",
      )
      .optional(),
    firstName: z.string().trim().max(100).optional(),
    lastName: z.string().trim().max(100).optional(),
    location: z.string().trim().max(200).optional(),
    bio: z.string().trim().max(500).optional(),
    about: z.string().trim().max(5000).optional(),
    skills: jsonStringArray.optional(),
    interests: jsonStringArray.optional(),
    links: profileLinks.optional(),
  })
  .strict();

export const updateUserStatusSchema = z
  .object({
    status: z.enum(["ACTIVE", "BLOCKED"]),
  })
  .strict();
