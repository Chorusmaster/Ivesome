import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/app/layouts/root-layout";
import MainLayout from "@/app/layouts/main-layout";
import FormLayout from "@/app/layouts/form-layout";
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

import NewIdeaPage from "@/features/projects/pages/project-editor-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
          }
        ]
      },
      {
        element: <ProtectedLayout />,
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
            element: <NewIdeaPage />,
          },
          {
            path: "conversations",
            element: <ConversationsPage />,
          },
          {
            path: "conversations/:conversationId",
            element: <ConversationsPage />,
          },
        ],
      },
      {
        element: <FormLayout />,
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
      }
    ],
  },
]);