import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import ErrorPage from './pages/ErrorPage';
import EmailVerificationPage from './pages/registration/pages/EmailVerificationPage';
import EmailActivationPage from './pages/registration/pages/EmailActivationPage';
import LoginPage from './pages/login/pages/LoginPage';
import RequestPasswordResetPage from './pages/login/pages/RequestPasswordResetPage';
import PasswordResetConfirmPage from './pages/login/pages/PasswordResetConfirmPage';
import RegistrationPage from './pages/registration/pages/RegistrationPage';
import ProtectedRoute from './protectedRoutes';
import { AuthProvider } from './components/authContext';
import ProfilePage from './pages/profile/pages/ProfilePage';
import PatientsDetailPage from './pages/profile/pages/PatientsDetailPage';
import BloodTestDetailPage from './pages/profile/pages/BloodTestDetailPage';
import PatientsRegistrationPage from './pages/profile/pages/PatientRegistrationPage';
import BloodTestResultDetailPage from './pages/profile/pages/BloodTestResultDetailPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';

// Define routes without authentication
const publicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: 'activate/:uid/:token', element: <EmailActivationPage /> },
  { path: 'request-reset-password', element: <RequestPasswordResetPage /> },
  { path: 'password-reset/:uid/:token', element: <PasswordResetConfirmPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/not-authorized', element: <NotAuthorizedPage /> },
];

// Define routes for authenticated users only
const authenticatedRoutes = [
  { path: 'patient-register', element: <PatientsRegistrationPage /> },
  { path: ':username/', element: <ProfilePage /> },
  { path: 'patient/:id', element: <PatientsDetailPage /> },
  { path: 'patients/:patientId/blood-test/:bloodTestId', element: <BloodTestDetailPage /> },
  { path: 'patients/:patientId/blood-test/:bloodTestId/result-detail', element: <BloodTestResultDetailPage /> },
];

// Define routes for authenticated users with additional authorization
const authorizedRoutes = [
  // Example route for admin or superuser
  { path: 'onboarding', element: <EmailVerificationPage /> },
  { path: 'register', element: <RegistrationPage /> },

];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...publicRoutes.map(route => ({
        path: route.path,
        element: route.element
      })),
      ...authenticatedRoutes.map(route => ({
        path: route.path,
        element: (
          <ProtectedRoute requireAuth>
            {route.element}
          </ProtectedRoute>
        )
      })),
      ...authorizedRoutes.map(route => ({
        path: route.path,
        element: (
          <ProtectedRoute requireAuth requireAdmin>
            {route.element}
          </ProtectedRoute>
        )
      })),
      { path: '*', element: <ErrorPage /> }
    ]
  }
]);

const AppRouter: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;
