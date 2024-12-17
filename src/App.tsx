import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DemoPage from "@/pages/demo";
import RestaurantDetails from "@/pages/restaurants/[id]";
import RestaurantList from "@/pages/restaurants/index";
import RestaurantOnboard from "@/pages/restaurants/onboard";
import RestaurantDashboard from "@/pages/restaurants/dashboard";
import CreateReviewPage from "@/pages/restaurants/create-review-page";
import LoginPage from "@/pages/auth/LoginPage";
import TermsPage from "@/pages/terms";

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  // Show nothing while we check the auth state
  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DemoPage />,
    errorElement: <div>Page not found</div>,
  },
  {
    path: "/terms",
    element: <TermsPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/restaurants",
    element: <RestaurantList />,
  },
  {
    path: "/restaurants/dashboard",
    element: (
      <ProtectedRoute>
        <RestaurantDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/restaurants/onboard",
    element: (
      <ProtectedRoute>
        <RestaurantOnboard />
      </ProtectedRoute>
    ),
  },
  {
    // Add this route before the :id route to ensure it takes precedence
    path: "/restaurants/create-review-page",
    element: (
      <ProtectedRoute>
        <CreateReviewPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/restaurants/:id",
    element: <RestaurantDetails />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}