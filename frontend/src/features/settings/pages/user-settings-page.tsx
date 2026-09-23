import { useAuth } from "@/features/auth/auth.context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n";
import Card from "@/shared/ui/card";
import Select from "@/shared/ui/select";

export default function UserSettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!user) {
    navigate("/register");
    return;
  }

  return (
    <div className="main-container-narrow">
      <h1 className="font-heading pb-2 text-text-primary text-title">
        {t("settings.title")}
      </h1>
      <div className="text-text-secondary mb-4">
        {t("settings.description")}
      </div>

      <Card>
        <h2 className="subheading">{t("settings.preferences")}</h2>
        <div className="flex flex-col gap-4">
          <Select
            onChange={(e) => {
              const theme = e.target.value;

              document.documentElement.classList.toggle(
                "dark",
                theme === "dark",
              );

              localStorage.setItem("theme", theme);
            }}
            label={t("settings.theme")}
            defaultValue={
              document.documentElement.classList.contains("dark")
                ? "dark"
                : "light"
            }
            options={[
              { value: "light", label: t("settings.light") },
              { value: "dark", label: t("settings.dark") },
            ]}
          />

          <Select
            onChange={(e) => {
              const language = e.target.value;

              localStorage.setItem("language", language);
              void i18n.changeLanguage(language);
            }}
            label={t("settings.language")}
            defaultValue={localStorage.getItem("language") ?? "en"}
            options={[
              { value: "en", label: "EN" },
              { value: "sk", label: "SK" },
              { value: "ua", label: "UA" },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
