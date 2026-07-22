import { api } from "@/api/axios";
import type { RegisterPayload, LoginPayload } from "./types";

export const getProfile = async () => {
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