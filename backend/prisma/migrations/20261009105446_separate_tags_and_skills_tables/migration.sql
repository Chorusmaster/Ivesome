-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectToSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProjectToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SkillToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SkillToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TagToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TagToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_ProjectToSkill_B_index" ON "_ProjectToSkill"("B");

-- CreateIndex
CREATE INDEX "_ProjectToTag_B_index" ON "_ProjectToTag"("B");

-- CreateIndex
CREATE INDEX "_SkillToUser_B_index" ON "_SkillToUser"("B");

-- CreateIndex
CREATE INDEX "_TagToUser_B_index" ON "_TagToUser"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToSkill" ADD CONSTRAINT "_ProjectToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToSkill" ADD CONSTRAINT "_ProjectToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTag" ADD CONSTRAINT "_ProjectToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTag" ADD CONSTRAINT "_ProjectToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD CONSTRAINT "_TagToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD CONSTRAINT "_TagToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Copy existing array values into the normalized taxonomy tables.
INSERT INTO "Skill" ("id", "name")
SELECT gen_random_uuid()::text, names."name"
FROM (
    SELECT unnest("skills") AS "name" FROM "Project"
    UNION
    SELECT unnest("skills") AS "name" FROM "User"
) AS names
WHERE btrim(names."name") <> ''
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Tag" ("id", "name")
SELECT gen_random_uuid()::text, names."name"
FROM (
    SELECT unnest("tags") AS "name" FROM "Project"
    UNION
    SELECT unnest("interests") AS "name" FROM "User"
) AS names
WHERE btrim(names."name") <> ''
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "_ProjectToSkill" ("A", "B")
SELECT project."id", skill."id"
FROM "Project" AS project
CROSS JOIN LATERAL unnest(project."skills") AS project_skill("name")
JOIN "Skill" AS skill ON skill."name" = project_skill."name"
WHERE btrim(project_skill."name") <> ''
ON CONFLICT ("A", "B") DO NOTHING;

INSERT INTO "_ProjectToTag" ("A", "B")
SELECT project."id", tag."id"
FROM "Project" AS project
CROSS JOIN LATERAL unnest(project."tags") AS project_tag("name")
JOIN "Tag" AS tag ON tag."name" = project_tag."name"
WHERE btrim(project_tag."name") <> ''
ON CONFLICT ("A", "B") DO NOTHING;

INSERT INTO "_SkillToUser" ("A", "B")
SELECT skill."id", "user"."id"
FROM "User" AS "user"
CROSS JOIN LATERAL unnest("user"."skills") AS user_skill("name")
JOIN "Skill" AS skill ON skill."name" = user_skill."name"
WHERE btrim(user_skill."name") <> ''
ON CONFLICT ("A", "B") DO NOTHING;

INSERT INTO "_TagToUser" ("A", "B")
SELECT tag."id", "user"."id"
FROM "User" AS "user"
CROSS JOIN LATERAL unnest("user"."interests") AS user_interest("name")
JOIN "Tag" AS tag ON tag."name" = user_interest."name"
WHERE btrim(user_interest."name") <> ''
ON CONFLICT ("A", "B") DO NOTHING;

-- Drop the old columns only after their values are linked to the new tables.
ALTER TABLE "Project" DROP COLUMN "skills",
DROP COLUMN "tags";

ALTER TABLE "User" DROP COLUMN "interests",
DROP COLUMN "skills";
