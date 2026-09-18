import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { requireAdmin } from "../../middlewares/admin.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createReportHandler,
  deleteReportHandler,
  getReportHandler,
  listReportsHandler,
  updateReportHandler,
} from "./report.controller.js";
import { createReportSchema, updateReportSchema } from "./report.schema.js";

const router = Router();

router.post(
  "/reports",
  authenticate,
  validate(createReportSchema),
  createReportHandler,
);

router.use("/reports", authenticate, requireAdmin);

router.get("/reports", listReportsHandler);
router.get("/reports/:reportId", getReportHandler);

router.patch(
  "/reports/:reportId",
  validate(updateReportSchema),
  updateReportHandler,
);

router.delete("/reports/:reportId", deleteReportHandler);

export default router;
