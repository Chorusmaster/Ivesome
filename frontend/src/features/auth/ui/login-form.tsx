import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth.context";

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";

import type { LoginErrorResponse } from "@/features/auth/auth.types.js";

function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      setEmailError("");
      setPasswordError("");
      setGeneralError("");
      sessionStorage.setItem("email", email);

      await login(email, password);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse: LoginErrorResponse = error.response?.data;
        if (errorResponse.errors) {
          if (errorResponse.errors.email)
            setEmailError(errorResponse.errors.email);
          if (errorResponse.errors.password)
            setPasswordError(errorResponse.errors.password);
        } else if (errorResponse.message) {
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
            {t("auth.login.title")}
          </h2>
          <p className="mt-2 text-small text-text-secondary">
            {t("auth.login.subtitle")}
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
              id="password"
              type="password"
              label={t("auth.common.labels.password")}
              placeholder={t("auth.common.placeholders.enterPassword")}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
            />
          </div>

          <div className="mt-6">
            {generalError && (
              <p className="mb-3 rounded-input bg-danger/10 px-3 py-2 text-small text-danger">
                {generalError}
              </p>
            )}

            <div className="mb-4 flex justify-end">
              <Link
                to="/forgot-password"
                className="text-small text-primary transition-colors hover:text-primary-hover"
              >
                {t("auth.login.forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              className="button w-full cursor-pointer bg-primary text-white transition-colors hover:bg-primary-hover"
            >
              {t("auth.login.submitButton")}
            </button>
          </div>
        </form>
      </Card>

      <p className="mt-6 text-center text-small text-text-secondary">
        {t("auth.login.footerText")}{" "}
        <Link
          to="/register"
          className="font-button text-primary transition-colors hover:text-primary-hover"
        >
          {t("auth.common.actions.createOne")}
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
