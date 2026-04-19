import LoginPage from "@/pages/auth/login";
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoute";
import TransactionsPage from "@/pages/transactions";
import DetailPaketPage from "@/pages/detail-paket";
import RegisterPage from "@/pages/auth/register";
import SuccessPage from "@/pages/transactions/success";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/detail-paket/:id",
    element: (
      <ProtectedRoute>
        <DetailPaketPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute>
        <TransactionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions/success",
    element: (
      <ProtectedRoute>
        <SuccessPage />
      </ProtectedRoute>
    ),
  },
]);
