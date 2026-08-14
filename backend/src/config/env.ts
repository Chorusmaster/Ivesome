import dotenv from "dotenv";

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

type Duration = `${number}${"s" | "m" | "h" | "d"}`;

function validateExpiresIn(value: string): Duration {
  const match = /^(\d+)(s|m|h|d)$/.exec(value);

  if (!match) {
    throw new Error("Invalid expiresIn format");
  }

  return value as Duration;
}

function durationToMs(value: Duration): number {
  const amount = Number(value.slice(0, -1));

  switch (value.slice(-1)) {
    case "s":
      return amount * 1000;
    case "m":
      return amount * 60_000;
    case "h":
      return amount * 3_600_000;
    case "d":
      return amount * 86_400_000;
    default:
      throw new Error("Invalid duration");
  }
}

dotenv.config();

export const env = {
  port: requiredEnv("PORT") || 5000,
  databaseUrl: requiredEnv("DATABASE_URL"),
  frontendUrl: requiredEnv("FRONTEND_URL"),

  jwtSecret: requiredEnv("JWT_SECRET"),
  accessJwtExpiresIn: validateExpiresIn(requiredEnv("ACCESS_JWT_EXPIRES_IN")),
  refreshJwtExpiresIn: validateExpiresIn(requiredEnv("REFRESH_JWT_EXPIRES_IN")),
  accessExpirationTime: durationToMs(validateExpiresIn(requiredEnv("ACCESS_JWT_EXPIRES_IN"))),
  refreshExpirationTime: durationToMs(validateExpiresIn(requiredEnv("REFRESH_JWT_EXPIRES_IN"))),
  emailVerificationExpirationTime: durationToMs(validateExpiresIn(requiredEnv("EMAIL_VERIFICATION_EXPIRES_IN"))),
  passwordResetExpirationTime: durationToMs(validateExpiresIn(requiredEnv("PASSWORD_RESET_EXPIRES_IN"))),

  SMTPPort: requiredEnv("SMTP_PORT"),
  SMTPHost: requiredEnv("SMTP_HOST"),
  SMTPUser: requiredEnv("SMTP_USER"),
  SMTPPassword: requiredEnv("SMTP_PASSWORD"),
  SMTPSenderName: requiredEnv("SMTP_SENDER_NAME"),
  SMTPSenderEmail: requiredEnv("SMTP_SENDER_EMAIL"),
};