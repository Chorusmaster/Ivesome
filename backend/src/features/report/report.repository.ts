import { prisma } from "../../config/database.js";
import type {
  ReportStatus,
  ReportTargetType,
} from "../../generated/prisma/client.js";

const reporterSelect = {
  id: true,
  login: true,
  firstName: true,
  lastName: true,
  avatarLink: true,
} as const;

export async function listReports(status?: ReportStatus) {
  return prisma.report.findMany({
    ...(status ? { where: {status} } : {}),
    orderBy: { id: "desc" },
    include: { reporter: { select: reporterSelect } },
  });
}

export async function getReportById(id: string) {
  return prisma.report.findUnique({
    where: { id },
    include: { reporter: { select: reporterSelect } },
  });
}

export async function createReport(data: {
  reporterId: string;
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
}) {
  return prisma.report.create({
    data: { ...data, status: "PENDING" },
    include: { reporter: { select: reporterSelect } },
  });
}

export async function updateReport(id: string, status: ReportStatus) {
  return prisma.report.update({
    where: { id },
    data: { status },
    include: { reporter: { select: reporterSelect } },
  });
}

export async function deleteReport(id: string) {
  return prisma.report.delete({ where: { id } });
}
