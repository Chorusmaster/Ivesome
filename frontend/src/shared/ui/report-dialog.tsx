import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Flag } from "lucide-react";
import Textarea from "./textarea";
import { useTranslation } from "react-i18next";

type ReportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  submitting?: boolean;
  error?: string;
  onSubmit: () => void;
};

export function ReportDialog({
  open,
  onOpenChange,
  value,
  onChange,
  submitting = false,
  error,
  onSubmit,
}: ReportDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border border-border ring-border sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
              <Flag size={20} />
            </div>

            <div>
              <DialogTitle className="text-lg">
                {t("shared.reportDialog.title")}
              </DialogTitle>

              <DialogDescription className="mt-1">
                {t("shared.reportDialog.description")}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("shared.reportDialog.placeholder")}
          className="min-h-24 max-h-48"
          maxLength={2000}
        />

        {error && <p className="text-small text-danger">{error}</p>}

        <DialogFooter className="flex-row justify-end gap-3 bg-surface border-none pt-0">
          <DialogClose
            render={
              <button
                type="button"
                className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition"
              >
                {t("shared.reportDialog.cancel")}
              </button>
            }
          />

          <button
            type="button"
            onClick={() => {onSubmit();}}
            disabled={submitting || !value.trim()}
            className="button bg-danger text-white hover:bg-danger/90 disabled:opacity-50 transition"
          >
            {submitting ? t("shared.reportDialog.submitting") : t("shared.reportDialog.submit")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
