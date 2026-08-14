import { useEffect, useState } from "react";
import { getMe, logout as performLogout } from "./auth.api";
import { AuthContext } from "./auth.context";
import type { User } from "./auth.types";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshUser() {
    try {
      const user = await getMe();
      console.log(user);
      setUser(user);
    } catch {
      setUser(null);
    }
  }

  async function logout() {
    await performLogout()
    setUser(null);
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;