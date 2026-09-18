import { ApiError } from "../../types/error.types.js";
import type {
  ReportStatus,
  ReportTargetType,
} from "../../generated/prisma/client.js";
import {
  createReport as createReportDb,
  deleteReport as deleteReportDb,
  getReportById,
  listReports as listReportsDb,
  updateReport as updateReportDb,
} from "./report.repository.js";

export async function listReports(status?: ReportStatus) {
  return listReportsDb(status);
}

export async function getReport(reportId: string) {
  const report = await getReportById(reportId);

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return report;
}

export async function createReport(
  reporterId: string,
  data: {
    targetType: ReportTargetType;
    targetId: string;
    reason: string;
  },
) {
  return createReportDb({ reporterId, ...data });
}

export async function updateReport(reportId: string, status: ReportStatus) {
  await getReport(reportId);
  return updateReportDb(reportId, status);
}

export async function deleteReport(reportId: string) {
  await getReport(reportId);
  await deleteReportDb(reportId);
}
