import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/index";
import RestaurantReviewPage from "./pages/restaurant-review";
import { AuthProvider } from "./components/auth/AuthProvider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/:slug" element={<RestaurantReviewPage />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;