import { Card } from "@/components/ui/card";

interface RestaurantHeaderProps {
  logoUrl: string;
  name: string;
  description: string;
}

export const RestaurantHeader = ({ logoUrl, name, description }: RestaurantHeaderProps) => {
  return (
    <div className="flex items-center space-x-6 mb-12">
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/10 shadow-lg"
      />
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          {name}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};