import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "@/pages/Index";
import RestaurantDetails from "@/pages/restaurants/[id]";
import RestaurantList from "@/pages/restaurants/index";
import CreateReviewPage from "@/pages/restaurants/create-review-page";
import RestaurantOnboard from "@/pages/restaurants/onboard";
import LoginPage from "@/pages/auth/LoginPage";

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
    element: <Index />,
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
    path: "/restaurants/create-review-page",
    element: (
      <ProtectedRoute>
        <CreateReviewPage />
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
    path: "/restaurants/:id",
    element: <RestaurantDetails />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}