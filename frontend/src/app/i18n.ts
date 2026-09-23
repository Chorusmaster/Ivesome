import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import appEn from "@/app/locales/en.json";
import sharedEn from "@/shared/locales/en.json";
import adminEn from "@/features/admin/locales/en.json";
import searchEn from "@/features/search/locales/en.json";
import authEn from "@/features/auth/locales/en.json";
import settingsEn from "@/features/settings/locales/en.json";
import conversationsEn from "@/features/conversations/locales/en.json";
import favouritesEn from "@/features/favourites/locales/en.json";
import notificationsEn from "@/features/notifications/locales/en.json";
import profileEn from "@/features/profile/locales/en.json";
import projectsEn from "@/features/projects/locales/en.json";
import workspaceEn from "@/features/workspace/locales/en.json";

import appSk from "@/app/locales/sk.json";
import sharedSk from "@/shared/locales/sk.json";
import searchSk from "@/features/search/locales/sk.json";
import authSk from "@/features/auth/locales/sk.json";
import settingsSk from "@/features/settings/locales/sk.json";
import conversationsSk from "@/features/conversations/locales/sk.json";
import favouritesSk from "@/features/favourites/locales/sk.json";
import notificationsSk from "@/features/notifications/locales/sk.json";
import profileSk from "@/features/profile/locales/sk.json";
import projectsSk from "@/features/projects/locales/sk.json";
import workspaceSk from "@/features/workspace/locales/sk.json";
import adminSk from "@/features/admin/locales/sk.json";

import appUa from "@/app/locales/ua.json";
import sharedUa from "@/shared/locales/ua.json";
import searchUa from "@/features/search/locales/ua.json";
import authUa from "@/features/auth/locales/ua.json";
import settingsUa from "@/features/settings/locales/ua.json";
import conversationsUa from "@/features/conversations/locales/ua.json";
import favouritesUa from "@/features/favourites/locales/ua.json";
import notificationsUa from "@/features/notifications/locales/ua.json";
import profileUa from "@/features/profile/locales/ua.json";
import projectsUa from "@/features/projects/locales/ua.json";
import workspaceUa from "@/features/workspace/locales/ua.json";
import adminUa from "@/features/admin/locales/ua.json";

const resources = {
  en: {
    translation: {
      app: appEn,
      shared: sharedEn,
      auth: authEn,
      admin: adminEn,
      search: searchEn,
      favourites: favouritesEn,
      conversations: conversationsEn,
      notifications: notificationsEn,
      profile: profileEn,
      projects: projectsEn,
      workspace: workspaceEn,
      settings: settingsEn
    },
  },
  sk: {
    translation: {
      app: appSk,
      shared: sharedSk,
      auth: authSk,
      admin: adminSk,
      search: searchSk,
      favourites: favouritesSk,
      conversations: conversationsSk,
      notifications: notificationsSk,
      profile: profileSk,
      projects: projectsSk,
      workspace: workspaceSk,
      settings: settingsSk
    },
  },
  ua: {
    translation: {
      app: appUa,
      shared: sharedUa,
      auth: authUa,
      admin: adminUa,
      search: searchUa,
      favourites: favouritesUa,
      conversations: conversationsUa,
      notifications: notificationsUa,
      profile: profileUa,
      projects: projectsUa,
      workspace: workspaceUa,
      settings: settingsUa
    },
  }
};

const savedLanguage = localStorage.getItem("language");
const language = savedLanguage ?? "en";

void i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
