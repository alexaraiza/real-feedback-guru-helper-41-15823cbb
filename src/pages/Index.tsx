import { ReviewCard } from "@/components/ReviewCard";
import { ExampleReviews } from "@/components/ExampleReviews";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4 fade-in">
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="EatUP! Logo" 
            className="h-24 mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold tracking-tight text-secondary">Share Your Experience</h1>
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
            Submit a review to unlock exclusive rewards and offers!
          </p>
        </div>

        <ExampleReviews />
      </div>
    </div>
  );
};

export default Index;