import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        Join EatUP! Receipt Rewards 🎟️
      </h4>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300 space-y-8">
        {/* First Visit Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            1️⃣ First Visit – Instant Reward Today!
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• Share your experience and we'll help write a great review</p>
            <p>• Post your review on Google and show it to your server</p>
            <p>• Get today's special reward right away! 🎁</p>
            <p className="text-primary font-medium">Bonus: Submit your receipt to unlock a reward for your next visit!</p>
          </div>
        </div>

        {/* Progressive Rewards Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            2️⃣ Your 4-Visit Reward Journey
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p className="font-medium text-primary">For your 2nd, 3rd, and 4th visits:</p>
            <p>• Take a photo of your receipt after each visit</p>
            <p>• Send it to EatUP! to unlock your next personalized reward</p>
            <p>• Show your reward code to your server on your next visit</p>
            <p className="italic">Each reward is tailored based on your dining preferences! 🎯</p>
          </div>
        </div>

        {/* Why Join Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            🏆 Why Join EatUP! Receipt Rewards?
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-3">
            <div>
              <p className="font-medium text-primary">Instant First Reward</p>
              <p>Get rewarded right away for sharing your Google review</p>
            </div>
            <div>
              <p className="font-medium text-primary">Seamless Rewards Process</p>
              <p>Just submit your receipt after each visit to unlock new rewards</p>
            </div>
            <div>
              <p className="font-medium text-primary">Personalized to You</p>
              <p>Rewards are based on your preferences and improve over time</p>
            </div>
            <div>
              <p className="font-medium text-primary">4-Visit Journey</p>
              <p>Each visit unlocks better rewards as we learn what you love!</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 italic">
          💡 The more you visit, the better your rewards get!
        </div>
      </div>
    </div>
  );
};