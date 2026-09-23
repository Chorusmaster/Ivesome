import { useEffect, useState } from "react";
import Card from "@/shared/ui/card";
import { getReports, updateReport } from "@/features/reports/reports.api";
import type { Report, ReportStatus } from "@/features/reports/reports.types";
import { useNavigate } from "react-router-dom";
import { getComment } from "@/features/projects/comments.api";
import { ReportResolutionDialog } from "../ui/report-resolution-dialog";
import { useTranslation } from "react-i18next";
import { FilterPills } from "@/shared/ui/filter-pills";

function AdminDashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "ALL">("ALL");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        const nextReports = await getReports(
          statusFilter === "ALL" ? undefined : statusFilter,
        );
        setReports(nextReports);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [statusFilter]);

  const handleMarkAsResolved = async (reportId: string) => {
    try {
      const updatedReport = await updateReport(reportId, "RESOLVED");
      setReports((current) =>
        current.map((report) =>
          report.id === reportId ? { ...report, ...updatedReport } : report,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewReport = async (report: Report) => {
    switch (report.targetType) {
      case "PROJECT":
        navigate(`/project/${report.targetId}`);
        break;
      case "USER":
        navigate(`/users/${report.targetId}`);
        break;
      case "COMMENT":
        const comment = await getComment(report.targetId);
        navigate(`/project/${comment.projectId}/${report.targetId}`);
        break;
      default:
        console.error("Unknown report target type:", report.targetType);
    }
  };

  return (
    <div className="main-container-narrow">
      <h1 className="font-heading pb-2 text-text-primary text-title">
        {t("admin.pageTitle")}
      </h1>
      <div className="text-text-secondary">
        {t("admin.pageDescription")}
      </div>

      <Card className="mt-8">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <h2 className="text-subheading font-heading text-text-primary">
            {t("admin.reports.heading")}
          </h2>
          <FilterPills
            options={["ALL", "PENDING", "RESOLVED"]}
            value={statusFilter}
            onChange={setStatusFilter}
            labels={{
              ALL: t("admin.reports.filters.all"),
              PENDING: t("admin.reports.filters.pending"),
              RESOLVED: t("admin.reports.filters.resolved"),
            }}
          />
        </div>

        <div className="mt-8 w-full overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead className="bg-surface">
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  {t("admin.reports.table.headings.reportedBy")}
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  {t("admin.reports.table.headings.contentType")}
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  {t("admin.reports.table.headings.reason")}
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  {t("admin.reports.table.headings.status")}
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  {t("admin.reports.table.headings.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(odd)]:bg-background [&>tr:nth-child(even)]:bg-surface">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-small text-text-secondary"
                  >
                    {t("admin.reports.loading")}
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-small text-text-secondary"
                  >
                    {t("admin.reports.noReports")}
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-border align-center"
                  >
                    <td className="px-4 py-2 text-small text-text-primary">
                      {report.reporter
                        ? report.reporter?.firstName &&
                          report.reporter?.lastName
                          ? `${report.reporter.firstName} ${report.reporter.lastName}`
                          : (report.reporter.login ?? "Anonymous")
                        : "Unknown"}
                    </td>
                    <td className="px-4 py-2 text-small text-text-primary">
                      {report.targetType}
                    </td>
                    <td className="px-4 py-2 text-small text-text-primary max-w-xs wrap-break-word">
                      {report.reason}
                    </td>
                    <td className="px-4 py-2 text-small text-text-primary">
                      {report.status}
                    </td>
                    <td className="px-4 py-2 text-small text-text-primary w-px whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition"
                          onClick={() => handleViewReport(report)}
                        >
                          {t("admin.reports.actions.view")}
                        </button>
                        {report.status !== "RESOLVED" && (
                          <ReportResolutionDialog
                            onResolve={handleMarkAsResolved}
                            report={report}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboardPage;
