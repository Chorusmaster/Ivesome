import { redirect } from "react-router-dom";
import { getProfile } from "@/features/auth/auth.api";

export async function authLoader() {
  try {
    const user = await getProfile();
    
    return user;
  } catch (err) {
    throw redirect("/login");
  }
}