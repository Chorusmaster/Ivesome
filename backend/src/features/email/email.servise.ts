import transporter from "./email.transporter.js";
import { env } from "../../config/env.js";
import type { AuthTokenType } from "../auth/auth.types.js";

export async function sendVerificationEmail(
    email: string,
    type: AuthTokenType,
    token: string
  ) {
    let info;
    if (type == 'EMAIL_VERIFICATION') {
      info = await transporter.sendMail({
        from: `"${env.SMTPSenderName}" <${env.SMTPSenderEmail}>`,
        to: email,
        subject: "Verify your email",
        html: `
          <h1>Verify your email</h1>
          <a href="${env.frontendUrl}/verify-email?token=${token}">
            Verify
          </a>
        `,
      });
      console.log("MAIL RESULT:", info);
    } else {
      await transporter.sendMail({
        from: `"${env.SMTPSenderName}" <${env.SMTPSenderEmail}>`,
        to: email,
        subject: "Confirm your password reset",
        html: `
          <h1>Your password reset link</h1>
          <a href="${env.frontendUrl}/reset-password?token=${token}">
            Reset
          </a>
        `,
      });
    }
  }