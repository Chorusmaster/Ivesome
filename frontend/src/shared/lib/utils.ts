import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isToday, isYesterday, isThisYear, format } from "date-fns";
import { enUS, sk, uk } from "date-fns/locale";
import i18n from "@/app/i18n";

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
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    )
    .join(" ");
}

const dateFormats = {
  en: {
    sameYear: "MMM d",
    otherYear: "MMM d, yyyy",
  },
  sk: {
    sameYear: "d. MMM",
    otherYear: "d. M. yyyy",
  },
  ua: {
    sameYear: "d MMM",
    otherYear: "dd.MM.yyyy",
  },
};

export function formatMessageDate(date: Date | string | undefined) {
  if (date === undefined) return "n/d";

  const value = new Date(date);
  const locale = getDateLocale();
  const language =
    (localStorage.getItem("language") as keyof typeof dateFormats) ?? "en";

  if (isToday(value)) {
    return format(value, "HH:mm", { locale });
  }

  if (isYesterday(value)) {
    return i18n.t("shared.yesterday");
  }

  if (isThisYear(value)) {
    return format(value, dateFormats[language].sameYear, { locale });
  }

  return format(value, dateFormats[language].otherYear, { locale });
}

export function getDateLocale() {
  const language = localStorage.getItem("language");

  switch (language) {
    case "sk":
      return sk;
    case "ua":
      return uk;
    case "en":
    default:
      return enUS;
  }
}
