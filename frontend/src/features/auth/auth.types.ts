export type User = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "UNVERIFIED" | "ACTIVE" | "BLOCKED";
  profile?: {
    firstName: string,
    lastName: string,
    avatar: string
  };
};

export type LoginPayload = {
  email: string,
  password: string
};

export type RegisterPayload = LoginPayload & {
  passwordConfirm: string
};

export type LoginSuccessResponse = {
  success: boolean,
  error?: string
}

export type LoginErrorResponse = {
  errors?: {
    email: string,
    password: string
  },
  message: string
}

export type RegisterErrorResponse = {
  errors?: {
    email: string,
    password: string
    passwordConfirm: string
  },
  message: string
}