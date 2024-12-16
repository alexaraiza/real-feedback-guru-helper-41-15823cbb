import { ExternalLink } from "lucide-react";

interface RewardsListProps {
  hasUploadedReceipt?: boolean;
}

export const RewardsList = ({ hasUploadedReceipt }: RewardsListProps) => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        Join EatUP! Receipt Rewards 🎟️
      </h4>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300 space-y-8">
        {/* First Visit Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            1️⃣ Today's Reward
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• Share your experience on Google</p>
            <p>• Show your review to your server</p>
            <p>• Get your reward on the spot! 🎁</p>
          </div>
        </div>

        {/* Progressive Rewards Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            🎯 Progressive Rewards (Visits 2-4)
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p className="font-medium text-primary">How it works:</p>
            <p>1. Sign up to EatUP! using the form above</p>
            <p>2. Send your receipt in the signup email</p>
            <p>3. Get personalized rewards for visits 2-4!</p>
            <p className="italic mt-2">Each visit's reward is tailored to your dining preferences! 🎉</p>
          </div>
        </div>

        {/* Why Join Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            🏆 Benefits of Joining
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-3">
            <div>
              <p className="font-medium text-primary">Personalized Rewards</p>
              <p>Each reward is based on your dining preferences!</p>
            </div>
            <div>
              <p className="font-medium text-primary">Easy to Redeem</p>
              <p>Just show your unique code to your server</p>
            </div>
            <div>
              <p className="font-medium text-primary">Better with Each Visit</p>
              <p>Rewards improve up to your 4th visit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};