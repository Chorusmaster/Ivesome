import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/app/layouts/main-layout";
import AuthLayout from "@/app/layouts/auth-layout";
import ProtectedLayout from "../layouts/protected-layout";

import LoginPage from "@/features/auth/pages/login-page";
import RegisterPage from "@/features/auth/pages/register-page";
import ForgotPasswordPage from "@/features/auth/pages/forgot-password-page";
import ResetPasswordPage from "@/features/auth/pages/reset-password-page";
import EmailVerificationPage from "@/features/auth/pages/email-verification-page";
import HomePage from "@/pages/home-page";
import SearchPage from "@/features/search/pages/search-page";
import DashboardPage from "@/pages/dashboard-page";
import ProjectPage from "@/features/projects/pages/project-page";
import ProfilePage from "@/features/profile/pages/profile-page";
import ProfileEditPage from "@/pages/profile-edit-page";
import FavouritesPage from "@/features/favourites/pages/favourites-page";
import ConversationsPage from "@/features/conversations/pages/conversations-page";
import WorkspacePage from "@/features/workspace/pages/workspace-page";

import ProjectEditorPage from "@/features/projects/pages/project-editor-page";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "search",
            element: <SearchPage />,
          },
          {
            path: "project/:id",
            element: <ProjectPage />,
          },
          {
            path: "users/:userId",
            element: <ProfilePage />,
          },
          {
            path: "favourites",
            element: <FavouritesPage />,
          },
        ],
      },

      {
        element: <ProtectedLayout />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "profile/edit",
                element: <ProfileEditPage />,
              },
              {
                path: "ideas/new",
                element: <ProjectEditorPage />,
              },
              {
                path: "project/:id/edit",
                element: <ProjectEditorPage />,
              },
            ],
          },
          {
            path: "conversations",
            element: <ConversationsPage />,
          },
          {
            path: "conversations/:conversationId",
            element: <ConversationsPage />,
          },
          {
            path: "workspace/:workspaceId",
            element: <WorkspacePage />,
          },
        ],
      },

      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "reset-password",
            element: <ResetPasswordPage />,
          },
          {
            path: "verify-email",
            element: <EmailVerificationPage />,
          },
        ],
      },
    ],
  },
]);