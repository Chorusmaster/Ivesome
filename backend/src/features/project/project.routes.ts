import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  getProjectHandler,
  listUserProjectsHandler,
  listPublicProjectsHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
  addMemberHandler,
  removeMemberHandler,
} from "./project.controller.js";
import { upload } from "../storage/storage.service.js";

const router = Router();

router.get("/", listPublicProjectsHandler);

router.get("/user/:userId", listUserProjectsHandler);

router.get("/:projectId", getProjectHandler);

router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "media", maxCount: 10 },
    { name: "logo", maxCount: 1 },
  ]),
  createProjectHandler,
);

router.put(
  "/:id",
  authenticate,
  upload.fields([
    { name: "media", maxCount: 10 },
    { name: "logo", maxCount: 1 },
  ]),
  updateProjectHandler,
);

router.delete("/:id", authenticate, deleteProjectHandler);

router.post("/:projectId/members/:userId", authenticate, addMemberHandler);

router.delete("/:projectId/members/:userId", authenticate, removeMemberHandler);

export default router;
