import { Router } from "express";
import { 
  login, 
  register, 
  me, 
  logout, 
  refresh, 
  verifyEmail 
} from "../features/auth/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { registerSchema } from "../features/auth/auth.schema.js";

const router = Router();
router.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

router.post(
  "/register", 
  validate(registerSchema),
  register
);

router.post("/login", login);

router.post("/logout", logout);
router.post("/refresh", refresh);

router.get(
  "/me",
  authenticate, 
  me
);

router.get(
  "/verify-email:token", 
  authenticate, 
  verifyEmail
);

export default router;
