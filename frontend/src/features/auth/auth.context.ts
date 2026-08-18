import { createContext, useContext } from "react";
import type { User } from "@/features/auth/auth.types"
import type { UpdateProfileData } from "../profile/profile.types";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  register: (login: string, email: string, password: string, passwordConfirm: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}