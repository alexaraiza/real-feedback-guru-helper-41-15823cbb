import { Link } from "react-router-dom";
import { Star, DollarSign, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Restaurant } from "./types";

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

export const RestaurantHero = ({ restaurant }: RestaurantHeroProps) => {
  return (
    <>
      <Link to="/">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4">
          <Home className="h-6 w-6" />
        </Button>
      </Link>

      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
        <img
          src={restaurant.cover_photo_url || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-4">
            <img
              src={restaurant.logo_url || "/placeholder.svg"}
              alt={`${restaurant.name} logo`}
              className="w-20 h-20 rounded-xl border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>{restaurant.average_rating?.toFixed(1) || "New"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-5 h-5" />
                  <span>{restaurant.price_range || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};