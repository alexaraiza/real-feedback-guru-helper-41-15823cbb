import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";

type Restaurant = Tables<"restaurants">;
type SortOption = "rating" | "name";
type FilterOption = string[];

export default function RestaurantDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [selectedCuisines, setSelectedCuisines] = useState<FilterOption>([]);

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants", sortBy, selectedCuisines, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("restaurants")
        .select("*")
        .eq("status", "approved");

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      if (selectedCuisines.length > 0) {
        query = query.contains("cuisine_type", selectedCuisines);
      }

      if (sortBy === "rating") {
        query = query.order("average_rating", { ascending: false });
      } else {
        query = query.order("name");
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Restaurant[];
    },
  });

  const uniqueCuisines = Array.from(
    new Set(
      restaurants?.flatMap((r) => r.cuisine_type || []).filter(Boolean) || []
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Header */}
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold text-secondary">Restaurants</h1>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex gap-2">
            <select
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>

            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setSelectedCuisines([])}
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <div className="absolute right-0 top-12 z-10 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                {uniqueCuisines.map((cuisine) => (
                  <label
                    key={cuisine}
                    className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCuisines.includes(cuisine)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCuisines([...selectedCuisines, cuisine]);
                        } else {
                          setSelectedCuisines(
                            selectedCuisines.filter((c) => c !== cuisine)
                          );
                        }
                      }}
                    />
                    {cuisine}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="animate-pulse">
              <div className="h-48 bg-gray-200" />
              <CardContent className="p-4">
                <div className="h-6 w-3/4 bg-gray-200" />
                <div className="mt-2 h-4 w-1/2 bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants?.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="group overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.cover_photo_url || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {restaurant.logo_url && (
                  <img
                    src={restaurant.logo_url}
                    alt={`${restaurant.name} logo`}
                    className="absolute bottom-4 left-4 h-16 w-16 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                  {restaurant.average_rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{restaurant.average_rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                {restaurant.cuisine_type && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {restaurant.cuisine_type.map((cuisine) => (
                      <span
                        key={cuisine}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (!restaurants || restaurants.length === 0) && (
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold">No restaurants found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}