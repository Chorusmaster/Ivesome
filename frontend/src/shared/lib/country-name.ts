import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import skLocale from "i18n-iso-countries/langs/sk.json";
import ukLocale from "i18n-iso-countries/langs/uk.json";

countries.registerLocale(enLocale);
countries.registerLocale(skLocale);
countries.registerLocale(ukLocale);

const localeByLanguage: Record<string, string> = {
  en: "en",
  sk: "sk",
  ua: "uk",
};

export function getLocalizedCountryName(
  countryCode: string,
  language: string,
): string {
  const locale = localeByLanguage[language.split("-")[0]] ?? "en";
  return countries.getName(countryCode.toUpperCase(), locale) ?? countryCode;
}
