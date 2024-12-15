import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import RestaurantDetails from "@/pages/restaurants/[id]";
import RestaurantList from "@/pages/restaurants/index";
import CreateReviewPage from "@/pages/restaurants/create-review-page";
import RestaurantOnboard from "@/pages/restaurants/onboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/restaurants",
    element: <RestaurantList />,
  },
  {
    path: "/restaurants/create-review-page",
    element: <CreateReviewPage />,
  },
  {
    path: "/restaurants/onboard",
    element: <RestaurantOnboard />,
  },
  {
    path: "/restaurants/:id",
    element: <RestaurantDetails />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}