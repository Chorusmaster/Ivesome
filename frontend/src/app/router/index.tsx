import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/app/layouts/root-layout";
import MainLayout from "@/app/layouts/main-layout";
import FormLayout from "@/app/layouts/form-layout";

import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import HomePage from "@/pages/home-page";
import SearchPage from "@/pages/search-page";
import DashboardPage from "@/pages/dashboard-page";
import ProjectPage from "@/pages/project-page";
import ProfilePage from "@/pages/profile-page";

import NewIdeaPage from "@/pages/idea-editor-page";

import { authLoader } from "./auth.loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        loader: authLoader,
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
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "project/:slug",
            element: <ProjectPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "ideas/new",
            element: <NewIdeaPage />,
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
        ],
      }
    ],
  },
]);