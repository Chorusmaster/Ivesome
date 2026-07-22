import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import MainLayout from "@/layouts/MainLayout";
import FormLayout from "@/layouts/FormLayout";

import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import HomePage from "@/pages/HomePage.tsx";

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