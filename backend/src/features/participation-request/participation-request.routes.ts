import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  cancelParticipationRequestHandler,
  createParticipationRequestHandler,
  listMyRequestsHandler,
  listProjectRequestsHandler,
  updateParticipationRequestHandler,
} from "./participation-request.controller.js";
import { createParticipationRequestSchema, updateParticipationRequestSchema } from "./participation-request.schema.js";

const router = Router();

router.get(
  "/participation-requests/me", 
  authenticate, 
  listMyRequestsHandler
);

router.post(
  "/projects/:projectId/participation-requests",
  authenticate,
  validate(createParticipationRequestSchema),
  createParticipationRequestHandler,
);

router.get(
  "/projects/:projectId/participation-requests", 
  authenticate, 
  listProjectRequestsHandler
);

router.patch(
  "/participation-requests/:requestId",
  authenticate,
  validate(updateParticipationRequestSchema),
  updateParticipationRequestHandler,
);

router.delete(
  "/participation-requests/:requestId", 
  authenticate, 
  cancelParticipationRequestHandler
);

export default router;
