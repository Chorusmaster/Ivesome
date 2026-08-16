import { api } from "@/api/axios";
import type { 
  RegisterPayload, 
  LoginPayload, 
  VerifyEmailPayload,
  ForgotPasswordPayload,
  ChangePasswordPayload 
} from "./auth.types";

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const refresh = async () => {
  const { data } = await api.post("/auth/refresh");
  return data;
}

export const verifyEmail = async (payload: VerifyEmailPayload) => {
  const { data }= await api.post("/auth/verify-email", payload);
  return data;
}

export const resendVerificationEmail = async () => {
  const { data }= await api.post("/auth/verify-email/resend");
  return data;
}

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data }= await api.post("/auth/forgot-password", payload);
  return data;
}

export const resendPasswordResetEmail = async (payload: ForgotPasswordPayload) => {
  const { data }= await api.post("/auth/forgot-password/resend", payload);
  return data;
}

export const resetPassword = async (payload: ChangePasswordPayload) => {
  const { data }= await api.post("/auth/reset-password", payload);
  return data;
}