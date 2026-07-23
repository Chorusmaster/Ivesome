import { User } from "../../models/User.model.js";
import bcrypt from "bcrypt";
import type { RegisterPayload } from "./auth.schema.js";

export async function registerUser(data: RegisterPayload) {
  const { email, password } = data;
  const passwordHash = await bcrypt.hash(password, 12);
  return User.create({ email, passwordHash });
}
