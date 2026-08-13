import transporter from "./email.transporter.js";
import { env } from "../../config/env.js";

export async function sendVerificationEmail(
    email: string,
    token: string
  ) {
    await transporter.sendMail({
      from: env.SMTPUser,
      to: email,
      subject: "Verify your email",
      html: `
        <h1>Verify your email</h1>
        <a href="${env.frontendUrl}/verify?token=${token}">
          Verify
        </a>
      `,
    });
  }