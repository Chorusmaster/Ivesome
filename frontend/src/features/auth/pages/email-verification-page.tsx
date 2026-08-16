import EmailVerificationForm from "@/features/auth/ui/email-verification-form";
import type { EmailVerificationFormVariant } from "@/features/auth/ui/email-verification-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth.context";
import { resendVerificationEmail } from "../auth.api";

function EmailVerificationPage() {
  const email = sessionStorage.getItem("email");
  const token = new URLSearchParams(location.search).get("token");
  const [variant, setVariant] = useState<EmailVerificationFormVariant>("verify");
  const [error, setError] = useState<string | undefined>(undefined);
  const { verifyEmail } = useAuth();

  const navigate = useNavigate();

  const handleError = (error: unknown) => {
    setVariant("invalid");
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ?? "Invalid verification link"
        );
        return;
      }

      setError("Something went wrong");
  }

  const handleResendEmail = async () => {
    try {
      await resendVerificationEmail()
      setVariant("resent");
    } catch (error: unknown) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        await verifyEmail(token);
        navigate("/");
      } catch (error: unknown) {
        setVariant("invalid");
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ?? "Invalid verification link"
          );
          return;
        }

        setError("Something went wrong");
      }
    };

    void verify();
  }, [token, navigate]);

  return (
    <EmailVerificationForm
      variant={variant}
      email={email}
      error={error}
      onResendEmail={handleResendEmail}
    />
  );
}

export default EmailVerificationPage;
