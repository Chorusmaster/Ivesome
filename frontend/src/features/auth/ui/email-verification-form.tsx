import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import Card from "@/shared/ui/card";

type EmailVerificationFormVariant = "verify" | "resent" | "invalid";

const content = {
  verify: {
    title: "Verify your email",
    description: "We've sent the verification link to",
    hint: "Please click the link in the email to verify your account. The link will expire in 24 hours.",
  },
  resent: {
    title: "Email resent successfully",
    description: "We've resent the verification link to",
    hint: "Please click the link in the email to verify your account. If you don't see it, check your spam folder.",
  },
  invalid: {
    title: "Invalid link",
    description:
      "The verification link is invalid, expired or has already been used.",
    hint: "You can request a new verification link below. We'll send it to your registered email address.",
  },
};

type EmailVerificationFormProps = {
  variant?: EmailVerificationFormVariant;
  email?: string | null;
  onResendEmail?: () => Promise<void> | void;
  onRequestNewLink?: () => Promise<void> | void;
};

function EmailVerificationForm({
  variant = "verify",
  email = "your email",
  onResendEmail,
  onRequestNewLink,
}: EmailVerificationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = async () => {
    if (!onResendEmail) return;

    setIsLoading(true);
    try {
      await onResendEmail();
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestNewLink = async () => {
    if (!onRequestNewLink) return;

    setIsLoading(true);
    try {
      await onRequestNewLink();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="w-full p-8">
        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full 
            ${
              variant == "verify"
                ? "bg-primary/10"
                : variant == "resent"
                  ? "bg-success/15"
                  : "bg-danger/15"
            }`}
          >
            {variant == "verify" ? (
              <Mail className="size-8 text-primary" />
            ) : variant == "resent" ? (
              <CheckCircle className="size-8 text-success" />
            ) : (
              <AlertCircle className="size-8 text-danger" />
            )}
          </div>

          <h2 className="text-heading font-heading text-text-primary">
            {content[variant].title}
          </h2>
          <p className="mt-3 text-small text-text-secondary">
            {content[variant].description}
          </p>

          {(variant == "verify" || variant == "resent") && (
            <p className="mt-1 font-medium text-text-primary">{email || "your email"}</p>
          )}

          <div className="mt-6 w-full rounded-lg bg-primary-light p-4">
            <p className="text-xs text-primary">{content[variant].hint}</p>
          </div>

          <div className="mt-4 w-full">
            {variant == "verify" || variant == "resent" ? (
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full button bg-primary hover:bg-primary-hover text-white"
              >
                {isLoading ? "Sending..." : "Resend verification email"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRequestNewLink}
                disabled={isLoading}
                className="button bg-primary hover:bg-primary-hover text-white w-full"
              >
                {isLoading ? "Sending..." : "Send new verification link"}
              </button>
            )}

            <div className="mt-4 w-full">
              <Link to="/login">
                <button
                  type="button"
                  className="w-full text-small text-muted hover:text-text-secondary"
                >
                  Return to login
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
