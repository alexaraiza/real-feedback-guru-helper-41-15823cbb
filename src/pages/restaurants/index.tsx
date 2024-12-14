import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Star, List, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortOrder = "rating-desc" | "rating-asc" | "name-asc" | "name-desc";

const RestaurantDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("rating-desc");

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants", sortOrder, selectedCuisine],
    queryFn: async () => {
      let query = supabase
        .from("restaurants")
        .select("*")
        .eq("status", "approved");

      if (selectedCuisine) {
        query = query.contains("cuisine_type", [selectedCuisine]);
      }

      switch (sortOrder) {
        case "rating-desc":
          query = query.order("average_rating", { ascending: false });
          break;
        case "rating-asc":
          query = query.order("average_rating", { ascending: true });
          break;
        case "name-asc":
          query = query.order("name", { ascending: true });
          break;
        case "name-desc":
          query = query.order("name", { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const filteredRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Discover Great Restaurants
          </h1>
          <p className="text-muted-foreground">
            Find and review the best dining experiences in your area
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr]">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <Input
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cuisine Type</label>
                  <Select
                    value={selectedCuisine}
                    onValueChange={setSelectedCuisine}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All cuisines" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All cuisines</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating-desc">
                        Highest Rated First
                      </SelectItem>
                      <SelectItem value="rating-asc">
                        Lowest Rated First
                      </SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Restaurant Grid */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">Loading restaurants...</div>
            ) : filteredRestaurants?.length === 0 ? (
              <div className="text-center py-12">
                No restaurants found matching your criteria
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRestaurants?.map((restaurant) => (
                  <Card
                    key={restaurant.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={
                          restaurant.cover_photo_url ||
                          "https://placehold.co/600x400?text=Restaurant"
                        }
                        alt={restaurant.name}
                        className="object-cover w-full h-full"
                      />
                      {restaurant.logo_url && (
                        <div className="absolute bottom-4 left-4">
                          <img
                            src={restaurant.logo_url}
                            alt={`${restaurant.name} logo`}
                            className="w-16 h-16 rounded-full border-4 border-white"
                          />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            {restaurant.average_rating.toFixed(1)}
                          </div>
                        </div>
                        {restaurant.cuisine_type && (
                          <div className="flex flex-wrap gap-2">
                            {restaurant.cuisine_type.map((cuisine) => (
                              <span
                                key={cuisine}
                                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                              >
                                {cuisine}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {restaurant.description}
                      </p>
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() =>
                          window.location.href = `/restaurants/${restaurant.id}`
                        }
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDirectory;