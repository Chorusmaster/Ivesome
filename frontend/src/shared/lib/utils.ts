import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filePathToUrl(path?: string | null) {
  if (!path) return undefined;

  return `${import.meta.env.VITE_BACKEND_URL}${path}`;
}