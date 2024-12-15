import { Link } from "react-router-dom";
import { Home, Utensils, PlusCircle, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";

export const RestaurantNav = () => {
  const session = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/restaurants">
              <Button variant="ghost" className="hover:bg-primary/5">
                <Utensils className="h-5 w-5 mr-2" />
                Restaurants
              </Button>
            </Link>
          </div>
          
          {session ? (
            <div className="flex items-center space-x-4">
              <Link to="/restaurants/onboard">
                <Button variant="ghost" className="hover:bg-primary/5">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Restaurant
                </Button>
              </Link>
              <Link to="/restaurants/dashboard">
                <Button variant="ghost" className="hover:bg-primary/5">
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="default">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};