import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RestaurantDirectory from "@/pages/restaurants";
import RestaurantDetails from "@/pages/restaurants/[id]";
import RestaurantOnboard from "@/pages/restaurants/onboard";
import { Home } from "lucide-react";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";

function MainLayout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/">
          <Button variant="ghost" size="icon" className="absolute top-4 left-4">
            <Home className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center">Restaurant Platform</h1>
      </div>
      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="directory">Directory & Reviews</TabsTrigger>
          <TabsTrigger value="offers">Restaurant Offers</TabsTrigger>
        </TabsList>
        <TabsContent value="directory">
          <RestaurantDirectory />
        </TabsContent>
        <TabsContent value="offers">
          <div className="grid gap-6">
            {/* We'll implement the offers view in the next iteration */}
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold mb-4">Restaurant Offers</h2>
              <p className="text-muted-foreground">
                Browse special offers from registered restaurants
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/restaurants/onboard" element={<RestaurantOnboard />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
      </Routes>
    </Router>
  );
}

export default App;