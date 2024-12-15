import { Card, CardContent } from "@/components/ui/card";
import { RestaurantOffer } from "./types";

interface RestaurantOffersProps {
  offers: RestaurantOffer[];
}

export const RestaurantOffers = ({ offers }: RestaurantOffersProps) => {
  if (!offers || offers.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Special Offers</h2>
      <div className="space-y-4">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold">
                  {offer.discount_value}
                </span>
                {offer.valid_until && (
                  <span className="text-sm text-gray-500">
                    Valid until{" "}
                    {new Date(offer.valid_until).toLocaleDateString()}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};