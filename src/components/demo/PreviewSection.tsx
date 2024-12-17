import { useState, useEffect } from "react";
import { ReviewCard } from "@/components/ReviewCard";

interface PreviewSectionProps {
  restaurantName: string | null;
  googleMapsUrl: string | null;
  generatedUrl: string | null;
}

export const PreviewSection = ({ restaurantName, googleMapsUrl, generatedUrl }: PreviewSectionProps) => {
  if (!generatedUrl) return null;

  const fullUrl = `${window.location.origin}${generatedUrl}`;

  return (
    <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100">
      <h3 className="text-xl font-semibold mb-4">Your Review Page Preview</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Your unique review page URL:</p>
        <code className="block p-3 bg-gray-50 rounded-lg text-sm break-all">
          {fullUrl}
        </code>
      </div>
      <ReviewCard
        businessName={restaurantName || "Your Restaurant"}
        businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
        onTakeAiSurvey={() => {}}
        googleMapsUrl={googleMapsUrl || "#"}
      />
    </div>
  );
};