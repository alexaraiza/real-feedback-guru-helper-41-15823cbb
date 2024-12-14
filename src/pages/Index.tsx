import { ReviewCard } from "@/components/ReviewCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4 fade-in">
          <h1 className="text-4xl font-bold tracking-tight">Share Your Experience</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your visit and help others discover great experiences. Your review will be
            refined by AI to capture the essence of your experience.
          </p>
        </div>

        <ReviewCard
          businessName="Sample Restaurant"
          businessImage="/placeholder.svg"
        />

        <div className="text-center text-sm text-muted-foreground fade-in">
          <p>
            By submitting a review, you agree to receive exclusive offers via email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;