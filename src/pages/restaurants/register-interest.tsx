import { RestaurantNav } from "@/components/navigation/RestaurantNav";
import { VdaRegistrationForm } from "@/components/restaurants/VdaRegistrationForm";

export default function RegisterInterest() {
  return (
    <>
      <RestaurantNav />
      <div className="mt-16">
        <VdaRegistrationForm />
      </div>
    </>
  );
}