import { z } from "zod";

export const updateSettingsSchema = z
  .object({
    publicProfile: z.boolean().optional(),
    showEmail: z.boolean().optional(),
    notifyProject: z.boolean().optional(),
    notifyParticipationRequest: z.boolean().optional(),
    notifyComment: z.boolean().optional(),
    notifyConversation: z.boolean().optional(),
    notifyReport: z.boolean().optional(),
    notifyOther: z.boolean().optional(),
  })
  .strict()
  .refine((settings) => Object.keys(settings).length > 0, {
    message: "At least one setting must be provided",
  });

export type UpdateSettingsData = z.infer<typeof updateSettingsSchema>;