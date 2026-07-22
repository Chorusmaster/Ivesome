export type LoginPayload = {
  email: string,
  password: string
};

export type LoginResponse = {
  success: boolean,
  error?: string
}

export type RegisterPayload = LoginPayload & {
  passwordConfirm: string
};