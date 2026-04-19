import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router";
import { routes } from "./lib/router/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "./components/ui/Toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toast />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>,
);
