import { api } from "@/api/axios";
import type {
  CreateReportPayload,
  Report,
  ReportStatus,
} from "./reports.types";

export async function getReports(status?: ReportStatus): Promise<Report[]> {
  const { data } = await api.get<Report[]>("/reports", {
    params: status ? { status } : undefined,
  });

  return data;
}

export async function getReport(reportId: string): Promise<Report> {
  const { data } = await api.get<Report>(`/reports/${reportId}`);
  return data;
}

export async function createReport(
  payload: CreateReportPayload,
): Promise<Report> {
  const { data } = await api.post<Report>("/reports", payload);
  return data;
}

export async function updateReport(
  reportId: string,
  status: ReportStatus,
): Promise<Report> {
  const { data } = await api.patch<Report>(`/reports/${reportId}`, { status });
  return data;
}

export async function deleteReport(reportId: string): Promise<void> {
  await api.delete(`/reports/${reportId}`);
}
