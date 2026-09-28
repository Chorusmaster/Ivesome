import { prisma } from "../../config/database.js";
import type { UpdateSettingsData } from "./settings.schema.js";

export async function getSettingsByUserId(userId: string) {
  return prisma.settings.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });
}

export async function updateSettingsByUserId(
  userId: string,
  data: UpdateSettingsData,
) {
  const updateData = {
    ...(data.publicProfile !== undefined && {
      publicProfile: data.publicProfile,
    }),
    ...(data.showEmail !== undefined && {
      showEmail: data.showEmail,
    }),
    ...(data.notifyProject !== undefined && {
      notifyProject: data.notifyProject,
    }),
    ...(data.notifyParticipationRequest !== undefined && {
      notifyParticipationRequest: data.notifyParticipationRequest,
    }),
    ...(data.notifyComment !== undefined && {
      notifyComment: data.notifyComment,
    }),
    ...(data.notifyConversation !== undefined && {
      notifyConversation: data.notifyConversation,
    }),
    ...(data.notifyReport !== undefined && {
      notifyReport: data.notifyReport,
    }),
    ...(data.notifyOther !== undefined && {
      notifyOther: data.notifyOther,
    }),
  };

  return prisma.settings.upsert({
    where: { userId },
    create: {
      userId,
      ...updateData,
    },
    update: updateData,
  });
}
