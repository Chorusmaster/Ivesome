import { Router } from "express";
import {
  loginHandler,
  registerHandler,
  getMeHandler,
  logoutHandler,
  refreshHandler,
  verifyEmailHandler,
  resendEmailVerificationLinkHandler,
  resendPasswordResetLinkHandler,
  forgotPasswordHandler,
  changePasswordHandler,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  emailVerificationSchema,
  loginSchema,
  forgotPasswordSchema,
  passwordResetSchema,
  registerSchema,
} from "./auth.schema.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

router.post("/register", validate(registerSchema), registerHandler);

router.post("/login", validate(loginSchema), loginHandler);

router.post("/logout", logoutHandler);
router.post("/refresh", refreshHandler);

router.get("/me", authenticate, getMeHandler);

router.post(
  "/verify-email",
  validate(emailVerificationSchema),
  authenticate,
  verifyEmailHandler,
);

router.post(
  "/verify-email/resend",
  authenticate,
  resendEmailVerificationLinkHandler,
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPasswordHandler,
);

router.post(
  "/forgot-password/resend",
  validate(forgotPasswordSchema),
  resendPasswordResetLinkHandler,
);

router.post(
  "/reset-password",
  validate(passwordResetSchema),
  changePasswordHandler,
);

export default router;
