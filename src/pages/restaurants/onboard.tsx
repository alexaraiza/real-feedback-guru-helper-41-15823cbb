import { SimpleRestaurantForm } from "@/components/restaurants/SimpleRestaurantForm";
import { RestaurantNav } from "@/components/navigation/RestaurantNav";

export default function RestaurantOnboard() {
  return (
    <>
      <RestaurantNav />
      <div className="mt-16">
        <SimpleRestaurantForm />
      </div>
    </>
  );
}