import { prisma } from "../../config/database.js";

export function getTasksByWorkspaceId(workspaceId: string) {
  return prisma.task.findMany({
    where: { workspaceId },
  });
}

export function getTaskById(id: string) {
  return prisma.task.findUnique({ where: { id } });
}

export function createTask(data: {
  workspaceId: string;
  title: string;
  description?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  deadline?: Date;
}) {
  return prisma.task.create({ data });
}

export function updateTask(
  id: string,
  data: {
    title?: string;
    description?: string | null;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    deadline?: Date | null;
  },
) {
  return prisma.task.update({ where: { id }, data });
}

export function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}