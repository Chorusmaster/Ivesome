import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { requireAdmin } from "../../middlewares/admin.middleware.js";
import {
  getProjectHandler,
  listUserProjectsHandler,
  listPublicProjectsHandler,
  createProjectHandler,
  updateProjectHandler,
  turnIdeaIntoProjectHandler,
  deleteProjectHandler,
  addMemberHandler,
  removeMemberHandler,
  listFavouriteProjectsHandler,
  updateProjectStatusHandler,
} from "./project.controller.js";
import { upload } from "../storage/storage.service.js";
import { optionalAuth } from "../../middlewares/optional-auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  addProjectMemberSchema,
  createProjectSchema,
  updateProjectSchema,
  updateProjectStatusSchema,
} from "./project.schema.js";

const router = Router();

router.get(
  "/", 
  optionalAuth, 
  listPublicProjectsHandler
);

router.get(
  "/user/:userId", 
  optionalAuth, 
  listUserProjectsHandler
);

router.get(
  "/favourite",
  authenticate,
  listFavouriteProjectsHandler,
);

router.patch(
  "/:projectId/status",
  authenticate,
  requireAdmin,
  validate(updateProjectStatusSchema),
  updateProjectStatusHandler,
);

router.get(
  "/:projectId", 
  optionalAuth, 
  getProjectHandler
);

router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "media", maxCount: 10 },
    { name: "logo", maxCount: 1 },
  ]),
  validate(createProjectSchema),
  createProjectHandler,
);

router.post(
  "/:id/turn-into-project",
  authenticate,
  turnIdeaIntoProjectHandler,
);

router.put(
  "/:id",
  authenticate,
  upload.fields([
    { name: "media", maxCount: 10 },
    { name: "logo", maxCount: 1 },
  ]),
  validate(updateProjectSchema),
  updateProjectHandler,
);

router.delete("/:id", authenticate, deleteProjectHandler);

router.post(
  "/:projectId/members/:userId",
  authenticate,
  validate(addProjectMemberSchema),
  addMemberHandler,
);

router.delete("/:projectId/members/:userId", authenticate, removeMemberHandler);

export default router;
