import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RestaurantDirectory from "./pages/restaurants/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/restaurants" element={<RestaurantDirectory />} />
      </Routes>
    </Router>
  );
}

export default App;