import { useEffect, useState } from "react";
import { 
  getMe, 
  register as performRegister, 
  login as performLogin, 
  logout as performLogout, 
  verifyEmail as performEmailVerification 
} from "./auth.api";
import { AuthContext } from "./auth.context";
import type { User } from "./auth.types";
import { refresh } from "./auth.api";
import { updateProfile as performProfileUpdate } from "../profile/profile.api";
import type { UpdateProfileData } from "../profile/profile.types";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshUser() {
    try {
      const user = await getMe();
      setUser(user);
    } 
    catch {
      try {
        await refresh();
        const user = await getMe();
        setUser(user);
      } 
      catch {
        setUser(null);
      }
    }
  }

  async function verifyEmail(token: string) {
    setIsLoading(true);
    const user = await performEmailVerification({ token });
    setIsLoading(false);
    setUser(user);
  }

  async function register(login: string, email: string, password: string, passwordConfirm: string) {
    setIsLoading(true);
    const user = await performRegister({ login, email, password, passwordConfirm });
    setIsLoading(false);
    setUser(user);
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    const user = await performLogin({ email, password });
    setIsLoading(false);
    setUser(user);
  }

  async function logout() {
    setIsLoading(true);
    await performLogout();
    setIsLoading(false);
    setUser(null);
  }

  async function updateProfile(data: UpdateProfileData) {
    setIsLoading(true);
    const user = await performProfileUpdate(data);
    setIsLoading(false);
    setUser(user);
  }

  useEffect(() => {
    async function initializeAuth() {
      try {
        const user = await getMe();
        setUser(user);
        console.log(user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        refreshUser,
        register,
        login,
        logout,
        verifyEmail,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;