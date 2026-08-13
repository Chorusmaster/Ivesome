import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";
import { ApiError } from "../../types/error.types.js";
import {
  getUserByEmail,
  createUser,
} from "../user/user.repository.js";

export async function registerUser(
  email: string,
  password: string,
) {
  if (await getUserByEmail(email)) {
    throw new ApiError(409, "Validation failed", {email: 'User with this email already exist'});
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await createUser(email, passwordHash);

  const token = generateToken(
    user._id.toString(),
    user.role
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ApiError(422, "Password or email is invalid");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new ApiError(422, "Password or email is invalid");
  }

  const token = generateToken(
    user._id.toString(),
    user.role
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
}