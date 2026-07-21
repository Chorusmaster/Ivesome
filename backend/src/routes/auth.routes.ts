import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js"

const router = Router();
router.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

export default router;