import { useState } from "react";
import axios from "axios";

import ForgotPasswordForm from "@/features/auth/ui/forgot-password-form";
import {
  forgotPassword,
  resendPasswordResetEmail,
} from "@/features/auth/auth.api";
import type { ForgotPasswordFormVariant } from "@/features/auth/ui/forgot-password-form";

function ForgotPasswordPage() {
  const email = sessionStorage.getItem("email") ?? "";
  const [variant, setVariant] = useState<ForgotPasswordFormVariant>("request");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (email: string) => {
    try {
      await forgotPassword({ email });
      sessionStorage.setItem("email", email);
      setVariant("sent");
      setError(undefined);
    } catch (error: unknown) {
      setVariant("invalid");
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ?? "Unable to send reset link.",
        );
        return;
      }

      setError("Something went wrong. Please try again later.");
    }
  };

  const handleResendEmail = async () => {
    try {
      await resendPasswordResetEmail({ email: email });
      setVariant("sent");
      setError(undefined);
    } catch (resendError: unknown) {
      setVariant("invalid");
      if (axios.isAxiosError(resendError)) {
        setError(
          resendError.response?.data?.message ?? "Unable to resend reset link.",
        );
        return;
      }

      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <ForgotPasswordForm
      variant={variant}
      email={email || undefined}
      error={error}
      onSubmit={handleSubmit}
      onResendEmail={handleResendEmail}
    />
  );
}

export default ForgotPasswordPage;
