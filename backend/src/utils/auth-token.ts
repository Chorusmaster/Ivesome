import crypto from "node:crypto";

export function createAuthToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function encryptAuthToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function verifyAuthToken(token: string, hashedToken: string) {
  return crypto.createHash("sha256").update(token).digest("hex") === hashedToken;
}
