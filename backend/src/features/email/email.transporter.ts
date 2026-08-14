//Email sending utility
import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTPHost,
  port: Number(env.SMTPPort),
  secure: false,
  auth: {
    user: env.SMTPUser,
    pass: env.SMTPPassword,
  },
});

export default transporter;