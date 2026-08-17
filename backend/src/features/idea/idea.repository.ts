import { prisma } from "../../config/database.js";
import type { CreateIdeaData } from "./idea.types.js";

export async function createIdeas(ideas: CreateIdeaData[]) {
  return prisma.$transaction(async (tx) => {
    const createdProjects = await Promise.all(
      ideas.map(async (idea) => {
        const project = await tx.project.create({
          data: {
            title: idea.title,
            shortDescription: idea.shortDescription,
            description: idea.fullDescription ?? idea.shortDescription,
            stage: "IDEA",
            visibility: idea.visibility,
            status:
              idea.status === "DRAFT" || idea.status === "PUBLISHED"
                ? "ACTIVE"
                : "BLOCKED",
          },
        });

        await tx.projectMember.create({
          data: {
            projectId: project.id,
            userId: idea.authorId,
            role: "OWNER",
          },
        });

        return project;
      }),
    );

    return createdProjects;
  });
}

export async function deleteAllIdeas() {
  return prisma.project.deleteMany({});
}
