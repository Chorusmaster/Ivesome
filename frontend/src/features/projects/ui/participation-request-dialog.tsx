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
import Textarea from "@/shared/ui/textarea";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

type ParticipationRequestDialogProps = {
  requestSent: boolean;
  requestMessage: string;
  requestError?: string;
  requestSubmitting: boolean;
  onRequestMessageChange: (message: string) => void;
  onParticipationRequest: () => void;
};

export function ParticipationRequestDialog({
  requestSent,
  requestMessage,
  requestError,
  requestSubmitting,
  onRequestMessageChange,
  onParticipationRequest,
}: ParticipationRequestDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger
        disabled={requestSent}
        className="button flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-hover disabled:bg-primary-hover transition"
      >
        <Users />
        {requestSent
          ? t("projects.participation.button.sent")
          : t("projects.participation.button.send")}
      </DialogTrigger>

      <DialogContent className="bg-surface border border-border ring-border sm:max-w-md gap-2">
        <DialogHeader className="space-y-4">
          <div>
            <DialogTitle className="text-lg">
              {t("projects.participation.dialog.title")}
            </DialogTitle>

            <DialogDescription className="mt-1">
              {t("projects.participation.dialog.description")}
            </DialogDescription>
          </div>

          <div className="space-y-2">
            <Textarea
              value={requestMessage}
              onChange={(event) => onRequestMessageChange(event.target.value)}
              className="min-h-16 max-h-32"
              maxLength={2000}
            />

            {requestError && (
              <p className="text-sm text-danger">{requestError}</p>
            )}
          </div>
        </DialogHeader>

        <DialogFooter className="flex-row justify-end gap-3 bg-surface border-none">
          <DialogClose
            render={
              <button
                type="button"
                className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition"
              >
                {t("projects.participation.dialog.close")}
              </button>
            }
          />

          <button
            type="button"
            onClick={onParticipationRequest}
            disabled={requestSubmitting}
            className="button bg-primary text-white hover:bg-primary-hover disabled:opacity-50 transition"
          >
            {requestSubmitting
              ? t("projects.participation.dialog.sending")
              : t("projects.participation.dialog.submit")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
