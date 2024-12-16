import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        Your Review Journey with EatUP! 🎉
      </h4>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300 space-y-8">
        {/* First Visit Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            1️⃣ First Visit Reward – Get it Instantly!
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• Share your review on Google and show it to a staff member.</p>
            <p>• The staff will confirm your review and unlock today's special reward for you on the spot! 🎁</p>
          </div>
        </div>

        {/* Subsequent Visits Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            2️⃣, 3️⃣, and 4️⃣ Visit Rewards – Simple Steps with EatUP!
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600">
            <p className="font-medium mb-2">After each visit:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Take a photo of your receipt and send it to EatUP! via email.</li>
              <li>EatUP! will reply with the reward for your next visit.</li>
              <li>Show your reward email to your server during your next visit to redeem it.</li>
            </ul>
            <p className="mt-3 text-gray-500 italic">
              🔄 Repeat this process for your 2nd, 3rd, and 4th visits to continue unlocking the daily rewards!
            </p>
          </div>
        </div>

        {/* Why We Made It This Way Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            Why We Made It This Way:
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• <span className="font-medium">Instant Gratification for the First Visit:</span> We celebrate your review immediately with a special reward!</p>
            <p>• <span className="font-medium">Seamless Rewards for Future Visits:</span> EatUP! makes it easy to keep earning rewards – just send your receipt, and we'll take care of the rest.</p>
          </div>
        </div>
      </div>
    </div>
  );
};