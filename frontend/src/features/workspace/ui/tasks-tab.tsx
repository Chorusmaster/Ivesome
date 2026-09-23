import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { createTask, updateTask, deleteTask } from "../workspace.api";
import type { WorkspaceTask, TaskPayload } from "../workspace.types";
import type { TaskStatus } from "../workspace.types";
import { STATUS_LABELS } from "../workspace.types";
import type { TaskFormState } from "./task-form";
import TaskForm from "./task-form";
import { useTranslation } from "react-i18next";

type TasksTabProps = {
  workspaceId: string;
  tasks: WorkspaceTask[];
};

const EMPTY_FORM: TaskFormState = {
  title: "",
  description: "",
  status: "TODO",
  deadline: "",
};

function formFromTask(task: WorkspaceTask): TaskFormState {
  return {
    title: task.title,
    description: task.description ?? "",
    status: task.status,
    deadline: task.deadline
      ? new Date(task.deadline).toISOString().slice(0, 16)
      : "",
  };
}

function TasksTab({ workspaceId, tasks: initialTasks }: TasksTabProps) {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState(initialTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formState, setFormState] = useState<TaskFormState>(EMPTY_FORM);
  const [editingTask, setEditingTask] = useState<WorkspaceTask | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  function openCreateDialog() {
    setEditingTask(null);
    setFormState(EMPTY_FORM);
    setFormError("");
    setDialogOpen(true);
  }

  function openEditDialog(task: WorkspaceTask) {
    setEditingTask(task);
    setFormState(formFromTask(task));
    setFormError("");
    setDialogOpen(true);
  }

  async function handleTaskSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    const payload: TaskPayload = {
      title: formState.title,
      description: formState.description || undefined,
      status: formState.status,
      deadline: formState.deadline
        ? new Date(formState.deadline).toISOString()
        : undefined,
    };

    try {
      if (editingTask) {
        const savedTask = await updateTask(editingTask.id, payload);
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === savedTask.id ? savedTask : task,
          ),
        );
      } else {
        const savedTask = await createTask(workspaceId, payload);
        setTasks((currentTasks) => [...currentTasks, savedTask]);
      }
      setDialogOpen(false);
    } catch {
      setFormError(t("workspace.tasksTab.errorSave"));
    } finally {
      setSaving(false);
    }
  }

  async function changeTaskStatus(taskId: string, status: TaskStatus) {
    const previousTasks = tasks;
    try {
      const updatedTask = await updateTask(taskId, { status });

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch {
      setTasks(previousTasks);
    }
  }

  async function handleTaskDelete(taskId: string) {
    await deleteTask(taskId);
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  const sortedTasks = tasks.toSorted((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div className="main-container-narrow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-heading text-heading text-text-primary">
            {t("workspace.tasksTab.title")}
          </h2>

          <p className="text-sm text-text-secondary mt-1">
            {t("workspace.tasksTab.description")}
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateDialog}
          className="button bg-primary hover:bg-primary-hover text-white flex items-center gap-2"
        >
          <Plus size={16} />
          {t("workspace.tasksTab.addTask")}
        </button>
      </div>

      {sortedTasks.length > 0 && (
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between px-5 py-4 border-b border-border last:border-b-0 hover:bg-background transition"
            >
              <div className="min-w-0">
                <div>
                  <span
                    className={`${task.status == "DONE" && "line-through decoration-1"} text-text-primary font-medium`}
                  >
                    {task.title}
                  </span>
                  {task.deadline && (
                    <span className="text-small text-muted">
                      <span className="px-2">·</span>
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {task.description && (
                  <div className="mt-1 text-sm text-text-secondary truncate max-w-xl">
                    {task.description}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 ml-4 shrink-0">
                <select
                  value={task.status}
                  onChange={(e) =>
                    changeTaskStatus(task.id, e.target.value as TaskStatus)
                  }
                  className={`px-2.5 py-1 rounded-full mt-1 pr-1 text-sm border outline-none cursor-pointer
                    ${
                      task.status == "DONE"
                        ? "bg-muted/10 text-muted border-muted"
                        : task.status === "IN_PROGRESS"
                          ? "bg-accent/10 text-accent border-accent"
                          : "bg-primary/10 text-primary border-primary"
                    }
                  `}
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option
                      key={value}
                      value={value}
                      className="bg-surface text-text-primary"
                    >
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  title={t("workspace.tasksTab.editAction", { title: task.title })}
                  aria-label={t("workspace.tasksTab.editAction", { title: task.title })}
                  onClick={() => openEditDialog(task)}
                  className="text-text-secondary hover:text-primary transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  title={t("workspace.tasksTab.deleteAction", { title: task.title })}
                  aria-label={t("workspace.tasksTab.deleteAction", {
                    title: task.title,
                  })}
                  onClick={() => handleTaskDelete(task.id)}
                  className="text-text-secondary hover:text-primary transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedTasks.length === 0 && (
        <div className="bg-surface border border-border rounded-lg p-8 text-center text-text-secondary">
          {t("workspace.tasksTab.noTasks")}
        </div>
      )}

      <TaskForm
        dialogOpen={dialogOpen}
        editingTask={editingTask}
        saving={saving}
        formError={formError}
        formState={formState}
        setDialogOpen={setDialogOpen}
        handleTaskSubmit={handleTaskSubmit}
        setFormState={setFormState}
      />
    </div>
  );
}

export default TasksTab;
