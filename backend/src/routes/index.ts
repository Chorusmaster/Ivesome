import { Router } from "express";
import authRoutes from "../features/auth/auth.routes.js";
import userRoutes from "../features/user/user.routes.js";
import projectRoutes from "../features/project/project.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use(userRoutes);

export default router;
