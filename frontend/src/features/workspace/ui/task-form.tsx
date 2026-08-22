import type { WorkspaceTask, TaskStatus } from "../workspace.types";
import Textarea from "@/shared/ui/textarea";
import Select from "@/shared/ui/select";
import Input from "@/shared/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { STATUS_LABELS } from "../workspace.types";

export type TaskFormState = {
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string;
};

type TaskFormProps = {
  dialogOpen: boolean,
  editingTask: WorkspaceTask | null,
  saving: boolean,
  formError: string,
  formState: TaskFormState,
  setDialogOpen: (open: boolean) => void,
  handleTaskSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void,
  setFormState: (data: TaskFormState) => void
}

function TaskForm({dialogOpen, editingTask, saving, formError, formState, setDialogOpen, handleTaskSubmit, setFormState}: TaskFormProps) {

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="bg-surface border border-border ring-border sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingTask ? "Edit task" : "Add task"}</DialogTitle>
          <DialogDescription>
            {editingTask
              ? "Update the task details and save your changes"
              : "Create a task"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleTaskSubmit} className="space-y-4">
          <div>
            <Input
              label="Title"
              id="task-title"
              required
              maxLength={200}
              value={formState.title}
              onChange={(event) => setFormState({ ...formState, title: event.target.value })}
            />
          </div>

          <Textarea
            label="Description"
            maxLength={5000}
            className="min-h-32 max-h-128"
            value={formState.description}
            onChange={(event) => setFormState({ ...formState, description: event.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Select
                id="task-status"
                options={Object.entries(STATUS_LABELS).map(([value, label]) => ({value, label}))}
                label="Status"
                value={formState.status}
                onChange={(event) => setFormState({ ...formState, status: event.target.value as TaskStatus })}
              />
            </div>

            <div>
              <Input
                label="Deadline"
                id="task-deadline"
                type="datetime-local"
                value={formState.deadline}
                onChange={(event) => setFormState({ ...formState, deadline: event.target.value })}
              />
            </div>
          </div>

          {formError && <p className="text-sm text-danger">{formError}</p>}

          <DialogFooter className="flex-row bg-surface border-none justify-end gap-3 pb-4 px-4">
            <DialogClose
              render={<button type="button" className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition" />}
            >
              Cancel
            </DialogClose>
            <button
              type="submit"
              disabled={saving}
              className="button bg-primary text-white hover:bg-primary-hover disabled:opacity-50 transition"
            >
              {saving ? "Saving..." : editingTask ? "Save changes" : "Add task"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
      
export default TaskForm;