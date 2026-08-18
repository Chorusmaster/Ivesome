import type { ProfileLink } from "../profile/profile.types";

export type User = {
  id: string;
  email: string;
  login: string;
  role: "USER" | "ADMIN";
  status: "UNVERIFIED" | "ACTIVE" | "BLOCKED";
  firstName?: string,
  lastName?: string,
  bio?: string,
  about?: string,
  location?: string,
  skills?: string[],
  links?: ProfileLink[],
  avatarLink?: string,
  createdAt: string,
};

export type LoginPayload = {
  email: string,
  password: string
};

export type RegisterPayload = LoginPayload & {
  login: string,
  passwordConfirm: string
};

export type VerifyEmailPayload = {
  token: string,
}

export type ForgotPasswordPayload = {
  email: string,
}

export type ChangePasswordPayload = {
  password: string,
  token: string,
}

export type LoginSuccessResponse = {
  success: boolean,
  error?: string
}

export type LoginErrorResponse = {
  errors?: {
    email?: string,
    password?: string
  },
  message: string
}

export type RegisterErrorResponse = {
  errors?: {
    email?: string,
    login?: string,
    password?: string
    passwordConfirm?: string
  },
  message: string
}