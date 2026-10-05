import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { optionalAuth } from "../../middlewares/optional-auth.middleware.js";
import { requireAdmin } from "../../middlewares/admin.middleware.js";
import {
  updateProfileHandler,
  getUserHandler,
  deleteMeHandler,
  updateUserStatusHandler,
} from "./user.controller.js";
import { upload } from "../storage/storage.service.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  updateProfileSchema,
  updateUserStatusSchema,
} from "./user.schema.js";

const router = Router();

router.put(
  "/profile",
  authenticate,
  upload.single("avatar"),
  validate(updateProfileSchema),
  updateProfileHandler,
);

router.get("/user/:id", optionalAuth, getUserHandler);

router.delete("/users/me", authenticate, deleteMeHandler);

router.patch(
  "/users/:userId/status",
  authenticate,
  requireAdmin,
  validate(updateUserStatusSchema),
  updateUserStatusHandler,
);

export default router;
