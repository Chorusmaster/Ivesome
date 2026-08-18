import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  profilePut,
} from "../features/user/user.controller.js";
import { upload } from "../features/storage/storage.service.js";

const router = Router();

router.put(
  "/profile",
  authenticate,
  upload.single("avatar"),
  profilePut
)

export default router;