import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";

type ResetPasswordFormProps = {
  onSubmit?: (password: string, passwordConfirm: string) => Promise<void> | void;
  token?: string | null;
};

function ResetPasswordForm({ onSubmit, token }: ResetPasswordFormProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!onSubmit) return;

    setPasswordError("");
    setPasswordConfirmError("");
    setGeneralError("");

    if (!token) {
      setGeneralError(t("auth.resetPassword.errors.missingToken"));
      return;
    }

    if (password.length < 8) {
      setPasswordError(t("auth.resetPassword.errors.passwordTooShort"));
      return;
    }

    if (passwordConfirm !== password) {
      setPasswordConfirmError(t("auth.resetPassword.errors.passwordsDoNotMatch"));
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit(password, passwordConfirm);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        if (errorResponse?.errors) {
          if (errorResponse.errors.password) {
            setPasswordError(errorResponse.errors.password);
          }
          if (errorResponse.errors.passwordConfirm) {
            setPasswordConfirmError(errorResponse.errors.passwordConfirm);
          }
          return;
        }

        setGeneralError(errorResponse?.message ?? t("auth.resetPassword.errors.unableToReset"));
        return;
      }

      setGeneralError(t("auth.common.errors.unexpected"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full p-8">
      <div className="mb-8">
        <h2 className="text-heading font-heading text-text-primary">
          {t("auth.resetPassword.title")}
        </h2>
        <p className="mt-2 text-small text-text-secondary">
          {t("auth.resetPassword.subtitle")}
        </p>
      </div>

      <form method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Input
            id="password"
            type="password"
            label={t("auth.common.labels.newPassword")}
            placeholder={t("auth.common.placeholders.newPassword")}
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError}
          />
          <Input
            id="passwordConfirm"
            type="password"
            label={t("auth.common.labels.confirmPassword")}
            placeholder={t("auth.common.placeholders.confirmNewPassword")}
            autoComplete="new-password"
            onChange={(event) => setPasswordConfirm(event.target.value)}
            error={passwordConfirmError}
          />
        </div>

        <div className="mt-6">
          {generalError && (
            <p className="mb-3 rounded-input bg-danger/10 px-3 py-2 text-small text-danger">
              {generalError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !token}
            className="button w-full cursor-pointer bg-primary text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary-hover"
          >
            {isLoading ? t("auth.common.actions.updating") : t("auth.resetPassword.submitButton")}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default ResetPasswordForm;