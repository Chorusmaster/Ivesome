import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth.context";

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";

import type { RegisterErrorResponse } from "@/features/auth/auth.types.ts";

function RegisterForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [login, setLogin] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      setEmailError("");
      setLoginError("");
      setPasswordError("");
      setPasswordConfirmError("");
      setGeneralError("");

      await register(login, email, password, passwordConfirm);
      sessionStorage.setItem("email", email);
      navigate("/verify-email");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse: RegisterErrorResponse = error.response?.data;
        if (errorResponse?.errors) {
          if (errorResponse.errors?.email) setEmailError(errorResponse.errors.email);
          if (errorResponse.errors?.password) setPasswordError(errorResponse.errors.password);
          if (errorResponse.errors?.passwordConfirm) setPasswordConfirmError(errorResponse.errors.passwordConfirm);
          if (errorResponse.errors?.login) setLoginError(errorResponse.errors.login);
        } else if (errorResponse?.message) {
          setGeneralError(errorResponse.message);
        }
      } else {
        setGeneralError(t("auth.common.errors.unexpected"));
      }
    }
  };

  return (
    <div>
      <Card className="w-full p-8">
        <div className="mb-8">
          <h2 className="text-heading font-heading text-text-primary">
            {t("auth.register.title")}
          </h2>
          <p className="mt-2 text-small text-text-secondary">
            {t("auth.register.subtitle")}
          </p>
        </div>

        <form method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <Input
              id="email"
              type="email"
              label={t("auth.common.labels.email")}
              placeholder={t("auth.common.placeholders.email")}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />
            <Input
              id="login"
              type="text"
              label={t("auth.common.labels.login")}
              placeholder={t("auth.common.placeholders.login")}
              autoComplete="login"
              onChange={(e) => setLogin(e.target.value)}
              error={loginError}
            />
            <Input
              id="password"
              type="password"
              label={t("auth.common.labels.password")}
              placeholder={t("auth.common.placeholders.createPassword")}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
            />
            <Input
              id="passwordConfirm"
              type="password"
              label={t("auth.common.labels.confirmPassword")}
              placeholder={t("auth.common.placeholders.confirmPassword")}
              autoComplete="new-password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
              className="button w-full cursor-pointer bg-primary text-white transition-colors hover:bg-primary-hover"
            >
              {t("auth.register.submitButton")}
            </button>
          </div>
        </form>
      </Card>

      <p className="mt-6 text-center text-small text-text-secondary">
        {t("auth.register.footerText")}{" "}
        <Link
          to="/login"
          className="font-button text-primary transition-colors hover:text-primary-hover"
        >
          {t("auth.common.actions.logIn")}
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;