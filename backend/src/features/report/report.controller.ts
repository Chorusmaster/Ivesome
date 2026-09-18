import type { Request, Response } from "express";
import { ApiError } from "../../types/error.types.js";
import { getParam } from "../../utils/validation.js";
import {
  createReport,
  deleteReport,
  getReport,
  listReports,
  updateReport,
} from "./report.service.js";

export async function listReportsHandler(req: Request, res: Response) {
  const statusParam = req.query.status;
  if (
    statusParam !== undefined &&
    statusParam !== "PENDING" &&
    statusParam !== "RESOLVED"
  ) {
    throw new ApiError(422, "Invalid report status");
  }

  const status = statusParam as "PENDING" | "RESOLVED" | undefined;
  res.json(await listReports(status));
}

export async function getReportHandler(req: Request, res: Response) {
  res.json(await getReport(getParam(req.params.reportId, "report id")));
}

export async function createReportHandler(req: Request, res: Response) {
  const report = await createReport(req.user.id, req.body);
  res.status(201).json(report);
}

export async function updateReportHandler(req: Request, res: Response) {
  const report = await updateReport(
    getParam(req.params.reportId, "report id"),
    req.body.status,
  );
  res.json(report);
}

export async function deleteReportHandler(req: Request, res: Response) {
  await deleteReport(getParam(req.params.reportId, "report id"));
  res.status(204).send();
}
