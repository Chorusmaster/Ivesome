import { Router } from "express";
import authRoutes from "../features/auth/auth.routes.js";
import userRoutes from "../features/user/user.routes.js";
import projectRoutes from "../features/project/project.routes.js";
import favouriteRoutes from "../features/favourite/favourite.routes.js";
import upvoteRoutes from "../features/upvote/upvote.routes.js";
import commentRoutes from "../features/comment/comment.routes.js";
import participationRequestRoutes from "../features/participation-request/participation-request.routes.js";
import conversationRoutes from "../features/conversation/conversation.routes.js";
import workspaceRoutes from "../features/workspace/workspace.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use(userRoutes);
router.use(favouriteRoutes);
router.use(upvoteRoutes);
router.use(commentRoutes);
router.use(participationRequestRoutes);
router.use(conversationRoutes);
router.use("/workspaces", workspaceRoutes);

export default router;
