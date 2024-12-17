import { Card } from "@/components/ui/card";

interface RestaurantHeaderProps {
  logoUrl: string;
  name: string;
  description: string;
}

export const RestaurantHeader = ({ logoUrl, name }: RestaurantHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8 md:mb-12">
      <img
        src="/lovable-uploads/0c4e8591-9bfd-412e-bec4-cf22da610b02.png"
        alt="EatUP! logo"
        className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto md:mx-0"
      />
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold text-primary">
          Leave a Review for {name}
        </h1>
      </div>
    </div>
  );
};