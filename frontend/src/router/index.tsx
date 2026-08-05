import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import MainLayout from "@/layouts/MainLayout";
import FormLayout from "@/layouts/FormLayout";

import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import SearchPage from "@/pages/SearchPage";
import DashboardPage from "@/pages/DashboardPage";
import ProjectPage from "@/pages/ProjectPage";

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