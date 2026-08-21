import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { updateProfileHandler } from "./user.controller.js";
import { upload } from "../storage/storage.service.js";
import { getUserHandler } from "./user.controller.js";

const router = Router();

router.put(
  "/profile",
  authenticate,
  upload.single("avatar"),
  updateProfileHandler,
);

router.get(
  "/user/:id",
  getUserHandler
)

export default router;
