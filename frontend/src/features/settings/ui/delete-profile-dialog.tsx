import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Input from "@/shared/ui/input";
import { useState } from "react";

type DeleteProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submitting?: boolean;
  error?: string;
  onSubmit: () => void;
};

const DELETE_CONFIRMATION = "DELETE PROFILE";

export function DeleteProfileDialog({
  open,
  onOpenChange,
  submitting = false,
  error,
  onSubmit,
}: DeleteProfileDialogProps) {
  const { t } = useTranslation();

  const [value, setValue] = useState("");
  const isConfirmed = value === DELETE_CONFIRMATION;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border border-border ring-border sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
              <Trash2 size={20} />
            </div>

            <div>
              <DialogTitle className="text-lg">
                {t("settings.deleteProfileDialog.title")}
              </DialogTitle>

              <DialogDescription className="mt-1">
                {t("settings.deleteProfileDialog.description")}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm text-text-secondary">
            {t("settings.deleteProfileDialog.confirmationLabel")}
          </p>

          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={DELETE_CONFIRMATION}
            maxLength={DELETE_CONFIRMATION.length}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {error && <p className="text-small text-danger">{error}</p>}

        <DialogFooter className="flex-row justify-end gap-3 bg-surface border-none pt-0">
          <DialogClose
            render={
              <button
                type="button"
                className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition"
              >
                {t("settings.deleteProfileDialog.cancel")}
              </button>
            }
          />

          <button
            type="button"
            onClick={() => {
              if (value === DELETE_CONFIRMATION) onSubmit();
            }}
            disabled={submitting || !isConfirmed}
            className="button bg-danger text-white hover:bg-danger/90 disabled:opacity-50 transition"
          >
            {submitting
              ? t("settings.deleteProfileDialog.submitting")
              : t("settings.deleteProfileDialog.submit")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}