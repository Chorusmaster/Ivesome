import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Flag } from "lucide-react";
import type { ReportTargetType } from "@/features/reports/reports.types";
import type { Report } from "@/features/reports/reports.types";
import { useState } from "react";
import { deleteComment } from "@/features/projects/comments.api";
import { updateProjectStatus } from "@/features/projects/projects.api";
import { updateUserStatus } from "@/features/profile/profile.api";

type ReportResolutionDialogProps = {
  report: Report;
  onResolve: (reportId: string) => void;
};

const actionLabels: Record<
  ReportTargetType,
  {
    resolve: string;
    description: string;
  }
> = {
  COMMENT: {
    resolve: "Delete comment",
    description: "Delete the reported comment from the platform.",
  },
  PROJECT: {
    resolve: "Block project",
    description: "Block the project so no one will be able to see it anymore.",
  },
  USER: {
    resolve: "Block user",
    description: "Block the reported user from the platform.",
  },
};

export function ReportResolutionDialog({
  report,
  onResolve,
}: ReportResolutionDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const action = actionLabels[report.targetType];

  function handleKeep() {
    onResolve(report.id);
  }

  async function handleDeleteComment() {
    setSubmitting(true);

    try {
      await deleteComment(report.targetId);
      onResolve(report.id);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleBlockProject() {
    setSubmitting(true);

    try {
      await updateProjectStatus(report.targetId, "BLOCKED");
      onResolve(report.id);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleBlockUser() {
    setSubmitting(true);

    try {
      await updateUserStatus(report.targetId, "BLOCKED");
      onResolve(report.id);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="button bg-primary text-white hover:bg-primary-hover transition">
        Resolve
      </DialogTrigger>

      <DialogContent className="bg-surface border border-border ring-border sm:max-w-md gap-2">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Flag size={20} />
            </div>

            <div>
              <DialogTitle className="text-lg">Process report</DialogTitle>

              <DialogDescription className="mt-1">
                Choose relevant action for this case.
              </DialogDescription>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-1 text-sm font-medium text-text-primary">
              Moderation action
            </p>

            <p className="text-sm text-text-secondary">{action.description}</p>
          </div>
        </DialogHeader>

        <DialogFooter className="flex-row justify-end gap-3 bg-surface border-none">
          <button
            type="button"
            onClick={handleKeep}
            disabled={submitting}
            className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary disabled:opacity-50 transition"
          >
            Leave as is
          </button>

          <button
            type="button"
            onClick={
              report.targetType === "COMMENT"
                ? handleDeleteComment
                : report.targetType === "PROJECT"
                  ? handleBlockProject
                  : handleBlockUser
            }
            disabled={submitting}
            className="button bg-danger text-white hover:bg-danger/90 disabled:opacity-50 transition"
          >
            {submitting ? "Processing..." : action.resolve}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
