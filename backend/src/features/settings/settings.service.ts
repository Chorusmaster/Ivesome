import {
  getSettingsByUserId,
  updateSettingsByUserId,
} from "./settings.repository.js";
import type { UpdateSettingsData } from "./settings.schema.js";

export async function getSettings(userId: string) {
  return getSettingsByUserId(userId);
}

export async function updateSettings(
  userId: string,
  data: UpdateSettingsData,
) {
  return updateSettingsByUserId(userId, data);
}