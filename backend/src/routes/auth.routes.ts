import { Router } from "express";
import { 
  login, 
  register, 
  me, 
  logout, 
  refresh, 
  verifyEmail,
  resendEmailVerificationLink,
  resendPasswordVerificationLink,
  forgotPassword,
  changePassword
} from "../features/auth/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { 
  emailVerificationSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  passwordResetSchema, 
  registerSchema 
} from "../features/auth/auth.schema.js";

const router = Router();
router.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

router.post(
  "/register", 
  validate(registerSchema),
  register
);

router.post(
  "/login", 
  validate(loginSchema),
  login
);

router.post("/logout", logout);
router.post("/refresh", refresh);

router.get(
  "/me",
  authenticate, 
  me
);

router.post(
  "/verify-email", 
  validate(emailVerificationSchema),
  authenticate,
  verifyEmail
);

router.post(
  "/verify-email/resend", 
  authenticate,
  resendEmailVerificationLink
);

router.post(
  "/forgot-password", 
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  "/forgot-password/resend", 
  validate(forgotPasswordSchema),
  resendPasswordVerificationLink
);

router.post(
  "/reset-password", 
  validate(passwordResetSchema),
  changePassword
);

export default router;
