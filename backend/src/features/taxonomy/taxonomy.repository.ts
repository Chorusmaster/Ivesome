import { prisma } from "../../config/database.js";
import { Prisma } from "../../generated/prisma/client.js";

export async function getSkills(search?: string) {
  return prisma.$queryRaw<{ id: string; name: string; usageCount: number }[]>(
    Prisma.sql`
      SELECT
        skill."id",
        skill."name",
        (
          SELECT COUNT(*)::int
          FROM "_SkillToUser" AS skill_user
          WHERE skill_user."A" = skill."id"
        ) + (
          SELECT COUNT(*)::int
          FROM "_ProjectToSkill" AS project_skill
          WHERE project_skill."B" = skill."id"
        ) AS "usageCount"
      FROM "Skill" AS skill
      WHERE skill."name" ILIKE '%' || ${search ?? ""} || '%'
      ORDER BY "usageCount" DESC, skill."name" ASC
      LIMIT 10
    `,
  );
}

export async function getTags(search?: string) {
  return prisma.$queryRaw<{ id: string; name: string; usageCount: number }[]>(
    Prisma.sql`
      SELECT
        tag."id",
        tag."name",
        (
          SELECT COUNT(*)::int
          FROM "_TagToUser" AS tag_user
          WHERE tag_user."A" = tag."id"
        ) + (
          SELECT COUNT(*)::int
          FROM "_ProjectToTag" AS project_tag
          WHERE project_tag."B" = tag."id"
        ) AS "usageCount"
      FROM "Tag" AS tag
      WHERE tag."name" ILIKE '%' || ${search ?? ""} || '%'
      ORDER BY "usageCount" DESC, tag."name" ASC
      LIMIT 10
    `,
  );
}
