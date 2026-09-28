import { api } from "@/api/axios";

export interface UserSettings {
  id: string;
  userId: string;
  publicProfile: boolean;
  showEmail: boolean;
  notifyProject: boolean;
  notifyParticipationRequest: boolean;
  notifyComment: boolean;
  notifyConversation: boolean;
  notifyReport: boolean;
  notifyOther: boolean;
}

export type UpdateSettingsData = Partial<
  Omit<UserSettings, "id" | "userId">
>;

export async function getSettings(): Promise<UserSettings> {
  const { data } = await api.get<UserSettings>("/settings");
  return data;
}

export async function updateSettings(
  changes: UpdateSettingsData,
): Promise<UserSettings> {
  const { data } = await api.patch<UserSettings>("/settings", changes);
  return data;
}