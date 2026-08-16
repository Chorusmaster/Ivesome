import { useNavigate } from "react-router-dom";

import ResetPasswordForm from "@/features/auth/ui/reset-password-form";
import { resetPassword } from "@/features/auth/auth.api";

function ResetPasswordPage() {
  const token = new URLSearchParams(location.search).get("token");
  const navigate = useNavigate();

  const handleSubmit = async (password: string, _passwordConfirm: string) => {
    if (!token) {
      throw new Error("Missing reset token");
    }

    await resetPassword({ password, token });
    navigate("/login");
  };

  return (
    <div className="w-full max-w-md">
      <ResetPasswordForm onSubmit={handleSubmit} token={token} />
      {!token && (
        <div className="mt-4 rounded-input bg-danger/10 px-4 py-3 text-small text-danger">
          This password reset link is invalid or has expired.
        </div>
      )}
    </div>
  );
}

export default ResetPasswordPage;
