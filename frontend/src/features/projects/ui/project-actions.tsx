import { Bookmark, Share2, Triangle, Flag } from "lucide-react";
import Card from "@/shared/ui/card";
import { Link } from "react-router-dom";
import type { Project } from "../projects.types";
import { TurnIntoProjectDialog } from "./turn-into-project-dialog";
import { ReportDialog } from "@/shared/ui/report-dialog";
import { ParticipationRequestDialog } from "./participation-request-dialog";
import { useTranslation } from "react-i18next";

type ProjectActionsProps = {
  projectRole: string | null;
  project: Project;
  requestSent: boolean;
  requestMessage: string;
  requestSubmitting: boolean;
  requestError: string;
  reportReason: string;
  reportSubmitting: boolean;
  reportError: string;
  isUpvoted: boolean;
  upvotes: number;
  isFavourite: boolean;
  statusChanging: boolean;
  reportOpen: boolean;
  onRequestMessageChange: (value: string) => void;
  onParticipationRequest: () => void;
  onReportReasonChange: (value: string) => void;
  onReportSubmit: () => void;
  onUpvote: () => void;
  onShare: () => void;
  onFavourite: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
  setReportOpen: (value: boolean) => void;
};

function ProjectActions({
  projectRole,
  project,
  requestSent,
  requestMessage,
  requestSubmitting,
  requestError,
  reportReason,
  reportSubmitting,
  reportError,
  isUpvoted,
  upvotes,
  isFavourite,
  statusChanging,
  reportOpen,
  onRequestMessageChange,
  onParticipationRequest,
  onReportReasonChange,
  onReportSubmit,
  onUpvote,
  onShare,
  onFavourite,
  onDelete,
  onStatusChange,
  setReportOpen,
}: ProjectActionsProps) {
  const { t } = useTranslation();

  return projectRole ? (
    <Card>
      {project.stage === "IDEA" ? (
        <TurnIntoProjectDialog
          onSubmit={onStatusChange}
          submitting={statusChanging}
        />
      ) : (
        <Link
          to={`/workspace/${project?.workspace?.id}`}
          className="button text-white bg-primary disabled:bg-primary-hover hover:bg-primary-hover flex gap-2 justify-center items-center"
        >
          {t("projects.projectActions.openWorkspace")}
        </Link>
      )}
      {projectRole === "OWNER" && (
        <div className="flex gap-2 mt-2">
          <Link
            to={`/project/${project.id}/edit`}
            className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition flex-1 text-center"
          >
            {t("projects.projectActions.edit")}
          </Link>
          <button
            type="button"
            onClick={onDelete}
            className="button border border-border text-muted hover:text-danger hover:border-danger transition flex-1 text-center"
          >
            {t("projects.projectActions.delete")}
          </button>
        </div>
      )}
    </Card>
  ) : (
    <Card>
      <div className="flex flex-col gap-4 justify-center">
        <ParticipationRequestDialog
          requestSent={requestSent}
          requestMessage={requestMessage}
          requestError={requestError}
          requestSubmitting={requestSubmitting}
          onRequestMessageChange={(value) => onRequestMessageChange(value)}
          onParticipationRequest={onParticipationRequest}
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={onUpvote}
            className={`button w-18 border transition flex items-center gap-2 ${
              isUpvoted
                ? "text-primary border-primary"
                : "border-border text-muted hover:text-primary hover:border-primary"
            }`}
          >
            <Triangle size={20} fill={isUpvoted ? "currentColor" : "none"} />{" "}
            {upvotes}
          </button>
          <button
            onClick={onShare}
            className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary active:bg-muted/10 transition"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={onFavourite}
            className={`button border hover:text-accent hover:border-accent transition ${
              isFavourite
                ? "text-accent border-accent"
                : "border-border text-muted"
            }`}
          >
            <Bookmark size={20} fill={isFavourite ? "currentColor" : "none"} />
          </button>

          <button
            onClick={() => setReportOpen(true)}
            className="button border border-border text-muted hover:text-danger hover:border-danger transition"
          >
            <Flag size={20} />
          </button>

          <ReportDialog
            open={reportOpen}
            onOpenChange={setReportOpen}
            value={reportReason}
            onChange={onReportReasonChange}
            submitting={reportSubmitting}
            error={reportError}
            onSubmit={onReportSubmit}
          />
        </div>
      </div>
    </Card>
  );
}

export default ProjectActions;
