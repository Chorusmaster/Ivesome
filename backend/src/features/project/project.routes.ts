import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  getProjectHandler,
  listProjectsHandler,
  listUserProjectsHandler,
  listPublicProjectsHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
  addMemberHandler,
  removeMemberHandler,
} from "./project.controller.js";

const router = Router();

router.get("/", listPublicProjectsHandler);

router.get("/user/:userId", listUserProjectsHandler);

router.get("/:id", getProjectHandler);

router.post(
  "/", 
  authenticate, 
  createProjectHandler
);

router.put(
  "/:id", 
  authenticate, 
  updateProjectHandler
);

router.delete(
  "/:id", 
  authenticate, 
  deleteProjectHandler
);

router.post(
  "/:projectId/members/:userId", 
  authenticate, 
  addMemberHandler
);

router.delete(
  "/:projectId/members/:userId", 
  authenticate, 
  removeMemberHandler
);

export default router;
