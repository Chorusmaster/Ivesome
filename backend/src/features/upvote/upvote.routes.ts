import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getUpvoteHandler, toggleUpvoteHandler } from "./upvote.controller.js";

const router = Router();

router.get("/projects/:projectId/upvote", authenticate, getUpvoteHandler);
router.patch("/projects/:projectId/upvote", authenticate, toggleUpvoteHandler);

export default router;
