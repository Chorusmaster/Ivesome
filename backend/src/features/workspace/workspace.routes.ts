import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getWorkspaceHandler } from "./workspace.controller.js";
import {
  createTaskHandler,
  deleteTaskHandler,
  listTasksHandler,
  updateTaskHandler,
} from "../task/task.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../task/task.schema.js";

const router = Router();

router.use(authenticate);

router.get("/:workspaceId", getWorkspaceHandler);

router.get("/:workspaceId/tasks", listTasksHandler);

router.post(
  "/:workspaceId/tasks",
  validate(createTaskSchema),
  createTaskHandler,
);

router.patch("/tasks/:taskId", validate(updateTaskSchema), updateTaskHandler);

router.delete("/tasks/:taskId", deleteTaskHandler);

export default router;
