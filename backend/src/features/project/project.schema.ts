import z from "zod";
import {
  PROJECT_STAGE_VALUES,
  PROJECT_STATUS_VALUES,
  PROJECT_VISIBILITY_VALUES,
  PROJECT_ROLE_VALUES,
} from "./project.types.js";

const stringArray = z.array(z.string().trim().min(1));

const jsonStringArray = z.string().superRefine((value, ctx) => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(value);
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Must be an array of strings or a JSON-encoded array of strings",
    });
    return;
  }

  if (!stringArray.safeParse(parsed).success) {
    ctx.addIssue({
      code: "custom",
      message: "Must be an array of strings or a JSON-encoded array of strings",
    });
  }
});

const stringArrayInput = z.union([stringArray, jsonStringArray]);

const projectFields = {
  title: z.string().trim().min(1).max(200),
  shortDescription: z.string().trim().min(1).max(500),
  description: z.string().trim().max(5000).optional(),
  stage: z.enum(PROJECT_STAGE_VALUES),
  visibility: z.enum(PROJECT_VISIBILITY_VALUES),
  status: z.enum(PROJECT_STATUS_VALUES).optional(),
  tags: stringArrayInput.optional(),
  skills: stringArrayInput.optional(),
  logoLink: z.string().trim().max(2048).optional(),
  mediaLinks: z.union([stringArray, jsonStringArray]).optional(),
};

export const createProjectSchema = z.object(projectFields).strict();

export const updateProjectSchema = z
  .object({
    ...projectFields,
    stage: z.enum(["TEAM_BUILDING", "DEVELOPMENT", "LAUNCHED"]).optional(),
    shortDescription: projectFields.shortDescription.optional(),
  })
  .partial()
  .strict();

export const updateProjectStatusSchema = z
  .object({
    status: z.enum(PROJECT_STATUS_VALUES),
  })
  .strict();

export const addProjectMemberSchema = z
  .object({
    role: z.enum(PROJECT_ROLE_VALUES).optional(),
  })
  .strict();
