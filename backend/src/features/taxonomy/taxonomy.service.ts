import {
  getSkills as getSkillsDb,
  getTags as getTagsDb,
} from "./taxonomy.repository.js";

export async function getSkills(search?: string) {
  return getSkillsDb(search?.trim() || undefined);
}

export async function getTags(search?: string) {
  return getTagsDb(search?.trim() || undefined);
}
