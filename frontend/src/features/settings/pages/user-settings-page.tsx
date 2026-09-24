import { useState } from "react";
import { useAuth } from "@/features/auth/auth.context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n";
import Card from "@/shared/ui/card";
import Select from "@/shared/ui/select";
import SettingsEntry from "../ui/settings-entry";
import Toggle from "@/shared/ui/toggle";

interface NotificationsSettings {
  project: boolean;
  participationRequest: boolean;
  comment: boolean;
  conversation: boolean;
  report: boolean;
  other: boolean;
}

export default function UserSettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [publicProfile, setPublicProfile] = useState(true);
  const [showEmail, setShowEmail] = useState(true);

  const [notifications, setNotifications] = useState<NotificationsSettings>({
    project: false,
    participationRequest: false,
    comment: false,
    conversation: false,
    report: false,
    other: false,
  });

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

      <div className="flex flex-col gap-4">
        <Card>
          <h2 className="subheading">{t("settings.preferences.title")}</h2>

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
              label={t("settings.preferences.theme")}
              defaultValue={
                document.documentElement.classList.contains("dark")
                  ? "dark"
                  : "light"
              }
              options={[
                {
                  value: "light",
                  label: t("settings.preferences.light"),
                },
                {
                  value: "dark",
                  label: t("settings.preferences.dark"),
                },
              ]}
            />

            <Select
              onChange={(e) => {
                const language = e.target.value;

                localStorage.setItem("language", language);
                void i18n.changeLanguage(language);
              }}
              label={t("settings.preferences.language")}
              defaultValue={localStorage.getItem("language") ?? "en"}
              options={[
                { value: "en", label: "EN" },
                { value: "sk", label: "SK" },
                { value: "ua", label: "UA" },
              ]}
            />
          </div>
        </Card>

        <Card>
          <h2 className="subheading">{t("settings.privacy.title")}</h2>

          <SettingsEntry
            title={t("settings.privacy.publicProfile")}
            description={
              publicProfile
                ? t("settings.privacy.publicProfileVisible")
                : t("settings.privacy.publicProfileHidden")
            }
            action={
              <Toggle checked={publicProfile} onChange={setPublicProfile} />
            }
          />

          <hr className="border-border" />

          <SettingsEntry
            title={t("settings.privacy.showEmail")}
            description={
              showEmail
                ? t("settings.privacy.emailVisible")
                : t("settings.privacy.emailHidden")
            }
            action={<Toggle checked={showEmail} onChange={setShowEmail} />}
          />
        </Card>

        <Card>
          <h2 className="subheading">{t("settings.notifications.title")}</h2>

          <SettingsEntry
            title={t("settings.notifications.enableAll")}
            description={t("settings.notifications.enableAllDescription")}
            action={
              <Toggle
                checked={
                  notifications.project &&
                  notifications.participationRequest &&
                  notifications.comment &&
                  notifications.conversation &&
                  notifications.report &&
                  notifications.other
                }
                onChange={(value) =>
                  setNotifications({
                    project: value,
                    participationRequest: value,
                    comment: value,
                    conversation: value,
                    report: value,
                    other: value,
                  })
                }
              />
            }
            titleClassName="font-bold!"
            descriptionClassName="text-text-secondary!"
            className="pb-8"
          />

          <hr className="border-border" />

          <SettingsEntry
            title={t("settings.notifications.project")}
            description={t("settings.notifications.projectDescription")}
            action={
              <Toggle
                checked={notifications.project}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    project: value,
                  }))
                }
              />
            }
          />

          <hr className="border-border" />

          <SettingsEntry
            title={t("settings.notifications.participationRequests")}
            description={t(
              "settings.notifications.participationRequestsDescription",
            )}
            action={
              <Toggle
                checked={notifications.participationRequest}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    participationRequest: value,
                  }))
                }
              />
            }
          />

          <hr className="border-border" />

          <SettingsEntry
            title={t("settings.notifications.comments")}
            description={t("settings.notifications.commentsDescription")}
            action={
              <Toggle
                checked={notifications.comment}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    comment: value,
                  }))
                }
              />
            }
          />

          <hr className="border-border" />

          <SettingsEntry
            title={t("settings.notifications.conversations")}
            description={t("settings.notifications.conversationsDescription")}
            action={
              <Toggle
                checked={notifications.conversation}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    conversation: value,
                  }))
                }
              />
            }
          />

          <hr className="border-border" />

          <SettingsEntry
            title={t("settings.notifications.reports")}
            description={t("settings.notifications.reportsDescription")}
            action={
              <Toggle
                checked={notifications.report}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    report: value,
                  }))
                }
              />
            }
          />

          <hr className="border-border" />

          <SettingsEntry
            title={t("settings.notifications.other")}
            description={t("settings.notifications.otherDescription")}
            action={
              <Toggle
                checked={notifications.other}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    other: value,
                  }))
                }
              />
            }
          />
        </Card>

        <Card>
          <h2 className="subheading">{t("settings.security.title")}</h2>

          <div className="flex gap-2">
            <button className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2">
              {t("settings.security.changePassword")}
            </button>

            <button className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2">
              {t("settings.security.logOut")}
            </button>
          </div>
        </Card>

        <Card className="border-2 border-danger/50 bg-danger/5!">
          <h2 className="subheading text-danger">
            {t("settings.dangerZone.title")}
          </h2>

          <button className="button bg-danger hover:bg-danger-hover text-white">
            {t("settings.dangerZone.deleteAccount")}
          </button>
        </Card>
      </div>
    </div>
  );
}
