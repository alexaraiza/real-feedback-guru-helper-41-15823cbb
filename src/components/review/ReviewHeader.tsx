import { FC } from "react";

interface ReviewHeaderProps {
  businessName: string;
  businessImage?: string;
}

export const ReviewHeader: FC<ReviewHeaderProps> = ({ businessName, businessImage }) => {
  return (
    <div className="flex items-center space-x-6">
      {businessImage && (
        <img
          src={businessImage}
          alt={businessName}
          className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/10 shadow-lg"
        />
      )}
      <div>
        <h2 className="text-2xl font-bold text-secondary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {businessName}
        </h2>
        <p className="text-muted-foreground">Share your positive dining experience!</p>
      </div>
    </div>
  );
};