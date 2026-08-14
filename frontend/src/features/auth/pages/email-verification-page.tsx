import EmailVerificationForm from "@/features/auth/ui/email-verification-form";
import type { EmailVerificationFormVariant } from "@/features/auth/ui/email-verification-form";
import { useState } from "react";

function EmailVerificationPage() {
  const email = sessionStorage.getItem("email");
  const [variant, setVariant] = useState<EmailVerificationFormVariant>("verify");

  const handleResendEmail = async () => {
    setVariant("resent");

  };

  const handleRequestNewLink = async () => {
    
  };

  return (
    <EmailVerificationForm
      variant={variant}
      email={email}
      onResendEmail={handleResendEmail}
      onRequestNewLink={handleRequestNewLink}
    />
  );
}

export default EmailVerificationPage;
