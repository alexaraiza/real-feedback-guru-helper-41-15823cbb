import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import RestaurantDirectory from "@/pages/restaurants";
import RestaurantDetails from "@/pages/restaurants/[id]";
import RestaurantOnboard from "@/pages/restaurants/onboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/restaurants" element={<RestaurantDirectory />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/restaurants/onboard" element={<RestaurantOnboard />} />
      </Routes>
    </Router>
  );
}

export default App;
