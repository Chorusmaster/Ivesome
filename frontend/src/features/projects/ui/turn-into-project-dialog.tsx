import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Rocket, AlertTriangle } from "lucide-react";

type ProjectActionsProps = {
  submitting: boolean;
  onSubmit: () => void;
};

export function TurnIntoProjectDialog({submitting, onSubmit}: ProjectActionsProps) {
  return (
    <Dialog>
      <DialogTrigger className="button text-white bg-primary disabled:bg-primary-hover hover:bg-primary-hover flex gap-2 justify-center items-center w-full">
        Turn into project
      </DialogTrigger>

      <DialogContent className="bg-surface border border-border ring-border sm:max-w-md">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Rocket size={20} />
            </div>

            <div>
              <DialogTitle className="text-lg">
                Turn idea into project
              </DialogTitle>
              <DialogDescription className="mt-1">
                This will create a project workspace and move it to the{" "}
                <span className="font-medium text-text text-primary">
                  Team Building
                </span>{" "}
                stage.
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
                  This action is irreversible
                </p>
                <p className="text-sm text-text-secondary">
                  Once converted, this idea will become a project and cannot be
                  reverted back.
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="flex-row bg-surface border-none justify-end gap-3">
          <DialogClose
            render={
              <button
                type="button"
                className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition"
              >
                Cancel
              </button>
            }
          />

          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="button bg-primary text-white hover:bg-primary-hover disabled:opacity-50 transition"
          >
            {submitting ? "Converting..." : "Turn into project"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
