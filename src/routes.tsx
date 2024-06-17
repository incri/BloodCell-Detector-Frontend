import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import EmailVerificationPage from "./pages/registration/pages/EmailVerificationPage";
import EmailActivationPage from "./pages/registration/pages/EmailActivationPage";
import LoginPage from "./pages/login/pages/LoginPage";
import RequestPasswordResetPage from "./pages/login/pages/RequestPasswordResetPage";
import PasswordResetConfirmPage from "./pages/login/pages/PasswordResetConfirmPage";
import RegistrationPage from "./pages/registration/pages/RegistrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register", element: <RegistrationPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "onboarding", element: <EmailVerificationPage /> },
      { path: "activate/:uid/:token", element: <EmailActivationPage /> },
      { path: "request-reset-password", element: <RequestPasswordResetPage /> },
      {
        path: "password-reset/:uid/:token",
        element: <PasswordResetConfirmPage />,
      },
    ],
  },
]);

export default router;
