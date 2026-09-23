import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Card from "@/shared/ui/card";

type EmailVerificationFormVariant = "verify" | "resent" | "invalid";

type EmailVerificationFormProps = {
  variant?: EmailVerificationFormVariant;
  email?: string | null;
  error?: string;
  onResendEmail?: () => Promise<void> | void;
};

function EmailVerificationForm({
  variant = "verify",
  email,
  error,
  onResendEmail,
}: EmailVerificationFormProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const displayEmail = email || t("auth.common.fallbackEmail");
  const displayTitle =
    variant === "invalid"
      ? error || t("auth.emailVerification.invalid.title")
      : t(`auth.emailVerification.${variant}.title`);

  const handleResendEmail = async () => {
    if (!onResendEmail) return;

    setIsLoading(true);
    try {
      await onResendEmail();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="w-full p-8">
        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
              variant === "verify"
                ? "bg-primary/10"
                : variant === "resent"
                  ? "bg-success/15"
                  : "bg-danger/15"
            }`}
          >
            {variant === "verify" ? (
              <Mail className="size-8 text-primary" />
            ) : variant === "resent" ? (
              <CheckCircle className="size-8 text-success" />
            ) : (
              <AlertCircle className="size-8 text-danger" />
            )}
          </div>

          <h2 className="text-heading font-heading text-text-primary">
            {displayTitle}
          </h2>
          <p className="mt-3 text-small text-text-secondary">
            {t(`auth.emailVerification.${variant}.description`)}
          </p>

          {(variant === "verify" || variant === "resent") && (
            <p className="mt-1 font-medium text-text-primary">{displayEmail}</p>
          )}

          <div className="mt-6 w-full rounded-lg bg-primary-light p-4">
            <p className="text-xs text-primary">
              {t(`auth.emailVerification.${variant}.hint`)}
            </p>
          </div>

          <div className="mt-4 w-full">
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={isLoading}
              className="button bg-primary hover:bg-primary-hover text-white w-full"
            >
              {isLoading
                ? t("auth.common.actions.sending")
                : t("auth.emailVerification.resendButton")}
            </button>

            <div className="mt-4 w-full">
              <Link to="/login">
                <button
                  type="button"
                  className="w-full text-small text-muted hover:text-text-secondary"
                >
                  {t("auth.common.actions.returnToLogin")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default EmailVerificationForm;
export type { EmailVerificationFormVariant };