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
            {hasUploadedReceipt && (
              <p className="text-primary font-medium mt-2">
                Receipt uploaded! Sign up above to unlock your next visit reward!
              </p>
            )}
          </div>
        </div>

        {/* Progressive Rewards Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            🎯 Progressive Rewards Journey
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-4">
            <div>
              <p className="font-medium text-primary">Second Visit:</p>
              <p>1. Sign up now to save your reward code</p>
              <p>2. Use the code on your next visit</p>
              <p>3. Get your second reward! 🎁</p>
            </div>
            <div>
              <p className="font-medium text-primary">Third Visit:</p>
              <p>1. Send your second visit receipt by email</p>
              <p>2. Receive a special reward for visit #3</p>
            </div>
            <div>
              <p className="font-medium text-primary">Fourth Visit:</p>
              <p>1. Send your third visit receipt</p>
              <p>2. Get your grand finale reward! 🎉</p>
            </div>
          </div>
        </div>

        {/* Why Join Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            🏆 Benefits of Joining
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-3">
            <div>
              <p className="font-medium text-primary">Instant Reward + Next Visit Reward</p>
              <p>Get rewarded today AND secure your next visit reward!</p>
            </div>
            <div>
              <p className="font-medium text-primary">Progressive Rewards</p>
              <p>Each visit unlocks a reward for your next one</p>
            </div>
            <div>
              <p className="font-medium text-primary">Personalized Experience</p>
              <p>Rewards are tailored based on your dining preferences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};