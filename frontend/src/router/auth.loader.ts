import { redirect } from "react-router-dom";
import { getProfile } from "@/features/auth/auth.api";

export async function authLoader() {
  const user = await getProfile();

  if (!user) {
    throw redirect("/login");
  }

  return user;
}