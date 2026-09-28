import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  getSettingsHandler,
  updateSettingsHandler,
} from "./settings.controller.js";
import { updateSettingsSchema } from "./settings.schema.js";

const router = Router();

router.use(authenticate);

router.get("/settings", getSettingsHandler);
router.patch("/settings", validate(updateSettingsSchema), updateSettingsHandler);

export default router;