import { useAtom } from "jotai";
import { FC, ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { authAtom } from "./atoms";
import { RootLayout } from "./components/root-layout";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth] = useAtom(authAtom);
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
