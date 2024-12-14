import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RestaurantCardProps {
  id: string;
  name: string;
  description: string | null;
  address: string;
  coverPhotoUrl: string | null;
  logoUrl: string | null;
  averageRating: number | null;
  cuisineType: string[] | null;
}

export const RestaurantCard = ({
  id,
  name,
  description,
  address,
  coverPhotoUrl,
  logoUrl,
  averageRating,
  cuisineType,
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurants/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <img
            src={coverPhotoUrl || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl || "/placeholder.svg"}
                alt={`${name} logo`}
                className="w-12 h-12 rounded-lg border-2 border-white shadow-lg"
              />
              <div>
                <h3 className="font-semibold text-white">{name}</h3>
                {averageRating && (
                  <div className="flex items-center gap-1 text-white/90">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{averageRating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start gap-2 text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mt-1 shrink-0" />
            <span className="text-sm line-clamp-1">{address}</span>
          </div>
          {cuisineType && cuisineType.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cuisineType.slice(0, 3).map((cuisine) => (
                <span
                  key={cuisine}
                  className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                >
                  {cuisine}
                </span>
              ))}
              {cuisineType.length > 3 && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                  +{cuisineType.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};