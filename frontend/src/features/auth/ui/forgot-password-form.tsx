import { AlertCircle, CheckCircle, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";

type ForgotPasswordFormVariant = "request" | "sent" | "invalid";

const content = {
  request: {
    title: "Forgot your password?",
    description: "Enter your email address and we'll send you a reset link.",
  },
  sent: {
    title: "Check your email",
    description: "We've sent a password reset link to",
  },
  invalid: {
    title: "Reset link invalid",
    description: "The password reset link is invalid or has expired.",
  },
};

type ForgotPasswordFormProps = {
  variant?: ForgotPasswordFormVariant;
  email?: string | null;
  error?: string;
  onSubmit?: (email: string) => Promise<void> | void;
  onResendEmail?: () => Promise<void> | void;
};

function ForgotPasswordForm({
  variant = "request",
  email = "",
  error = content["invalid"].title,
  onSubmit,
  onResendEmail,
}: ForgotPasswordFormProps) {
  const [inputEmail, setInputEmail] = useState(email ?? "");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => 
  {
    e.preventDefault();
    setEmailError("");
    setGeneralError("");

    if (!onSubmit) return;

    try {
      setIsLoading(true);
      await onSubmit(inputEmail.trim());
    } catch (requestError: unknown) {
      if (axios.isAxiosError(requestError)) {
        const message = requestError.response?.data?.message;
        const fieldErrors = requestError.response?.data?.errors;

        if (fieldErrors?.email) {
          setEmailError(fieldErrors.email);
          return;
        }

        setGeneralError(message ?? "Unable to send reset email.");
        return;
      }

      setGeneralError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="flex flex-col items-center">
          <div
            className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
              variant === "request" ? "bg-primary/10": 
              variant === "sent" ? "bg-success/15" : 
              "bg-danger/15"
            }`}
          >
            {variant === "request" ? (
              <KeyRound className="size-8 text-primary" />
            ) : variant === "sent" ? (
              <CheckCircle className="size-8 text-success" />
            ) : (
              <AlertCircle className="size-8 text-danger" />
            )}
          </div>

          <h2 className="text-heading font-heading text-text-primary">
            {variant === "invalid" ? error : content[variant].title}
          </h2>

          <p className="mt-3 text-small text-text-secondary">
            {content[variant].description}
          </p>
          {(variant === "sent" || variant === "invalid") && (
            <p className="mt-1 font-medium text-text-primary">
              {email || "your email"}
            </p>
          )}

          {variant === "request" ? (
            <form method="post" onSubmit={handleSubmit} className="mt-6 w-full">
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                autoComplete="email"
                value={inputEmail}
                onChange={(event) => setInputEmail(event.target.value)}
                error={emailError}
              />

              {generalError && (
                <p className="mt-4 rounded-input bg-danger/10 px-3 py-2 text-small text-danger">
                  {generalError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="button mt-6 w-full cursor-pointer bg-primary text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          ) : (
            <div className="mt-4 w-full">
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={isLoading}
                className="button bg-primary hover:bg-primary-hover text-white w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Sending..." : "Send new reset link"}
              </button>

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
          )}
        </div>
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;

export type { ForgotPasswordFormVariant };
