import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        Your EatUP! Rewards Journey:
      </h4>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300">
        <div>
          <h4 className="font-semibold text-xl text-gray-800 mb-4">How It Works:</h4>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="bg-gray-50 p-3 rounded-lg text-gray-600 block">
                💌 For each of your first 4 visits to the restaurant:
                <ol className="list-decimal ml-6 mt-2 space-y-2">
                  <li>Send your receipt to EatUP! via email</li>
                  <li>We'll send you back that day's special reward</li>
                  <li>Show the reward email to your server to redeem</li>
                </ol>
              </span>
            </p>
            <p className="text-sm text-gray-500 italic">
              Each reward is based on the restaurant's special offer of the day for your visit!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};