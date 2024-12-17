import { Card } from "@/components/ui/card";

interface RestaurantHeaderProps {
  logoUrl: string;
  name: string;
  description: string;
}

export const RestaurantHeader = ({ logoUrl, name, description }: RestaurantHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8 md:mb-12">
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-primary/10 shadow-lg mx-auto md:mx-0"
      />
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          {name}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-2">{description}</p>
        <p className="text-sm text-muted-foreground max-w-lg">
          Try our interactive demo to see how your customers will experience the review process. Enter your restaurant's name and Google Maps URL below to customize the demo. Watch how customers can enhance their reviews with receipt photos, mention their server's name, and receive instant rewards. They'll get their first reward code to show your staff, plus the option to sign up for EatUP! to earn more rewards on future visits.
        </p>
      </div>
    </div>
  );
};