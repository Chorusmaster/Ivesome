import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { requireAdmin } from "../../middlewares/admin.middleware.js";
import {
  updateProfileHandler,
  getUserHandler,
  updateUserStatusHandler,
} from "./user.controller.js";
import { upload } from "../storage/storage.service.js";

const router = Router();

router.put(
  "/profile",
  authenticate,
  upload.single("avatar"),
  updateProfileHandler,
);

router.get("/user/:id", getUserHandler);

router.patch(
  "/users/:userId/status",
  authenticate,
  requireAdmin,
  updateUserStatusHandler,
);

export default router;
