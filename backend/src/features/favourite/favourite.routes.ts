import { Router } from "express";
import { getFavouriteHandler, toggleFavouriteHandler } from "./favourite.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/projects/:projectId/favourite",
  authenticate,
  getFavouriteHandler,
);

router.patch(
  "/projects/:projectId/favourite",
  authenticate,
  toggleFavouriteHandler,
);

export default router;