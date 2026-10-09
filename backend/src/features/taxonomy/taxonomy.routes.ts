import { Router } from "express";
import {
  getSkillsHandler,
  getTagsHandler,
} from "./taxonomy.controller.js";

const router = Router();

router.get("/skills", getSkillsHandler);
router.get("/tags", getTagsHandler);

export default router;
