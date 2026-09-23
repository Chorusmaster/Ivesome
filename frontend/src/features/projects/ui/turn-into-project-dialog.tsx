import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Rocket, AlertTriangle } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

type TurnIntoProjectDialogProps = {
  submitting: boolean;
  onSubmit: () => void;
};

export function TurnIntoProjectDialog({
  submitting,
  onSubmit,
}: TurnIntoProjectDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger className="button bg-primary text-white hover:bg-primary-hover transition flex w-full items-center justify-center gap-2">
        {t("projects.turnIntoProjectDialog.button")}
      </DialogTrigger>

      <DialogContent className="bg-surface border border-border ring-border sm:max-w-md gap-2">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Rocket size={20} />
            </div>

            <div>
              <DialogTitle className="text-lg">
                {t("projects.turnIntoProjectDialog.title")}
              </DialogTitle>

              <DialogDescription className="mt-1">
                <Trans
                  i18nKey="turnIntoProjectDialog.description"
                  components={{
                    1: <span className="font-medium text-primary" />,
                  }}
                />
              </DialogDescription>
            </div>
          </div>

          <div className="rounded-lg border border-danger/30 bg-danger/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle
                size={20}
                className="mt-0.5 shrink-0 text-danger"
              />

              <div className="space-y-1">
                <p className="font-medium text-danger">
                  {t("projects.turnIntoProjectDialog.warningTitle")}
                </p>

                <p className="text-sm text-text-secondary">
                  {t("projects.turnIntoProjectDialog.warningDescription")}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="flex-row justify-end gap-3 bg-surface border-none">
          <DialogClose
            render={
              <button
                type="button"
                className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition"
              >
                {t("projects.turnIntoProjectDialog.cancel")}
              </button>
            }
          />

          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="button bg-primary text-white hover:bg-primary-hover disabled:opacity-50 transition"
          >
            {submitting
              ? t("projects.turnIntoProjectDialog.converting")
              : t("projects.turnIntoProjectDialog.submit")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
