import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n";
import Card from "@/shared/ui/card";
import Select from "@/shared/ui/select";
import SettingsEntry from "../ui/settings-entry";
import Toggle from "@/shared/ui/toggle";
import {
  getSettings,
  updateSettings,
  type UpdateSettingsData,
  type UserSettings,
} from "../settings.api";
import { DeleteProfileDialog } from "../ui/delete-profile-dialog";

export default function UserSettingsPage() {
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());
  const [settingsError, setSettingsError] = useState<"load" | "save" | null>(
    null,
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState(false);

  useEffect(() => {
    if (!user) return;

    let isCurrent = true;
    setIsSettingsLoading(true);
    setSettingsError(null);

    getSettings()
      .then((result) => {
        if (isCurrent) setSettings(result);
      })
      .catch(() => {
        if (isCurrent) setSettingsError("load");
      })
      .finally(() => {
        if (isCurrent) setIsSettingsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [user?.id]);

  async function handleSettingsChange(changes: UpdateSettingsData) {
    if (!settings) return;

    const keysToUpdate = Object.keys(changes);
    const previousSettings = { ...settings };

    setSettings((prev) => (prev ? { ...prev, ...changes } : null));
    setSettingsError(null);

    setSavingKeys((prev) => {
      const next = new Set(prev);
      keysToUpdate.forEach((k) => next.add(k));
      return next;
    });

    try {
      await updateSettings(changes);
    } catch {
      setSettings(previousSettings);
      setSettingsError("save");
    } finally {
      setSavingKeys((prev) => {
        const next = new Set(prev);
        keysToUpdate.forEach((k) => next.delete(k));
        return next;
      });
    }
  }

  async function handleDeleteProfile() {
    setIsDeletingAccount(true);
    setDeleteAccountError(false);
    try {
      await deleteAccount();
      setDeleteDialogOpen(false);
      navigate("/login");
    } catch {
      setDeleteAccountError(true);
    } finally {
      setIsDeletingAccount(false);
    }
  }

  if (!user) {
    navigate("/register");
    return;
  }

  sessionStorage.setItem("email", user.email);

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
              (settings?.publicProfile ?? true)
                ? t("settings.privacy.publicProfileVisible")
                : t("settings.privacy.publicProfileHidden")
            }
            action={
              <Toggle
                checked={settings?.publicProfile ?? true}
                disabled={
                  isSettingsLoading ||
                  !settings ||
                  savingKeys.has("publicProfile")
                }
                onChange={(value) =>
                  void handleSettingsChange({ publicProfile: value })
                }
              />
            }
          />

          <hr className="border-border" />

          <SettingsEntry
            title={t("settings.privacy.showEmail")}
            description={
              (settings?.showEmail ?? true)
                ? t("settings.privacy.emailVisible")
                : t("settings.privacy.emailHidden")
            }
            action={
              <Toggle
                checked={settings?.showEmail ?? true}
                disabled={
                  isSettingsLoading || !settings || savingKeys.has("showEmail")
                }
                onChange={(value) =>
                  void handleSettingsChange({ showEmail: value })
                }
              />
            }
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
                  settings?.notifyProject === true &&
                  settings.notifyParticipationRequest &&
                  settings.notifyComment &&
                  settings.notifyConversation &&
                  settings.notifyReport &&
                  settings.notifyOther
                }
                disabled={isSettingsLoading || !settings || savingKeys.size > 0}
                onChange={(value) =>
                  void handleSettingsChange({
                    notifyProject: value,
                    notifyParticipationRequest: value,
                    notifyComment: value,
                    notifyConversation: value,
                    notifyReport: value,
                    notifyOther: value,
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
                checked={settings?.notifyProject ?? false}
                disabled={
                  isSettingsLoading ||
                  !settings ||
                  savingKeys.has("notifyProject")
                }
                onChange={(value) =>
                  void handleSettingsChange({ notifyProject: value })
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
                checked={settings?.notifyParticipationRequest ?? false}
                disabled={
                  isSettingsLoading ||
                  !settings ||
                  savingKeys.has("notifyParticipationRequest")
                }
                onChange={(value) =>
                  void handleSettingsChange({
                    notifyParticipationRequest: value,
                  })
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
                checked={settings?.notifyComment ?? false}
                disabled={
                  isSettingsLoading ||
                  !settings ||
                  savingKeys.has("notifyComment")
                }
                onChange={(value) =>
                  void handleSettingsChange({ notifyComment: value })
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
                checked={settings?.notifyConversation ?? false}
                disabled={
                  isSettingsLoading ||
                  !settings ||
                  savingKeys.has("nofityConversation")
                }
                onChange={(value) =>
                  void handleSettingsChange({ notifyConversation: value })
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
                checked={settings?.notifyReport ?? false}
                disabled={
                  isSettingsLoading ||
                  !settings ||
                  savingKeys.has("notifyReport")
                }
                onChange={(value) =>
                  void handleSettingsChange({ notifyReport: value })
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
                checked={settings?.notifyOther ?? false}
                disabled={
                  isSettingsLoading ||
                  !settings ||
                  savingKeys.has("notifyOther")
                }
                onChange={(value) =>
                  void handleSettingsChange({ notifyOther: value })
                }
              />
            }
          />
        </Card>

        <Card>
          <h2 className="subheading">{t("settings.security.title")}</h2>

          <div className="flex gap-2">
            <Link
              to="/forgot-password"
              className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2"
            >
              {t("settings.security.changePassword")}
            </Link>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2"
            >
              {t("settings.security.logOut")}
            </button>
          </div>
        </Card>

        <Card className="border-2 border-danger/50 bg-danger/5!">
          <h2 className="subheading text-danger">
            {t("settings.dangerZone.title")}
          </h2>

          <button
            onClick={() => {
              setDeleteAccountError(false);
              setDeleteDialogOpen(true);
            }}
            className="button bg-danger hover:bg-danger-hover text-white"
          >
            {t("settings.dangerZone.deleteAccount")}
          </button>

          <DeleteProfileDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            submitting={isDeletingAccount}
            error={deleteAccountError ? t("settings.deleteProfileDialog.error") : undefined}
            onSubmit={handleDeleteProfile}
          />
        </Card>
      </div>
    </div>
  );
}
