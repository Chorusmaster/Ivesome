import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filePathToUrl(path?: string | null) {
  if (!path) return undefined;

  return `${import.meta.env.VITE_BACKEND_URL}${path}`;
}

export function toSentenceCase(value: string): string {
  const words = value.toLowerCase().split("_").filter(Boolean);

  if (!words.length) return "";

  return words
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(" ");
}