import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getMyParticipationRequests } from "../participation-requests.api";
import type { ParticipationRequest } from "../participation-requests.types";
import { formatDate } from "@/shared/lib/utils";
import Card from "@/shared/ui/card";

function ParticipationRequestsPage() {
  const { t } = useTranslation();
  const [requests, setRequests] = useState<ParticipationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadRequests() {
      try {
        setLoading(true);
        setError("");
        const data = await getMyParticipationRequests();
        if (isCurrent) setRequests(data);
      } catch {
        if (isCurrent) setError(t("participationRequests.errorLoading"));
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    void loadRequests();
    return () => {
      isCurrent = false;
    };
  }, [t]);

  return (
    <div className="main-container-narrow">
      <h1 className="font-heading text-title text-text-primary">
        {t("participationRequests.title")}
      </h1>
      <p className="mt-2 text-text-secondary">
        {t("participationRequests.description")}
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {loading ? (
          <p className="text-text-secondary">
            {t("participationRequests.loading")}
          </p>
        ) : error ? (
          <p role="alert" className="text-danger">
            {error}
          </p>
        ) : requests.length === 0 ? (
          <p className="text-text-secondary">
            {t("participationRequests.empty")}
          </p>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-medium text-text-primary">
                    {request.project ? (
                      <Link
                        to={`/project/${request.project.id}`}
                        className="hover:text-primary"
                      >
                        {request.project.title}
                      </Link>
                    ) : (
                      t("participationRequests.unknownProject")
                    )}
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    {t(`participationRequests.types.${request.type}`)}
                    {" · "}
                    {formatDate(request.createdAt)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    request.status === "PENDING"
                      ? "bg-primary/10 text-primary"
                      : request.status === "ACCEPTED"
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                  }`}
                >
                  {t(`participationRequests.statuses.${request.status}`)}
                </span>
              </div>
              {request.message && (
                <p className="mt-4 whitespace-pre-wrap text-text-secondary">
                  {request.message}
                </p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default ParticipationRequestsPage;
