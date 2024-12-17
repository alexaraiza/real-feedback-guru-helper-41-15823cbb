import { SimpleRestaurantForm } from "@/components/restaurants/SimpleRestaurantForm";
import { RestaurantNav } from "@/components/navigation/RestaurantNav";

const RestaurantOnboarding = () => {
  return (
    <>
      <RestaurantNav />
      <div className="mt-16">
        <SimpleRestaurantForm />
      </div>
    </>
  );
};

export default RestaurantOnboarding;