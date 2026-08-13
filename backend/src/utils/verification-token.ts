import crypto from "node:crypto";

export function createToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function encryptToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function verifyToken(token: string, hashedToken: string) {
  return crypto.createHash("sha256").update(token).digest("hex") === hashedToken;
}
