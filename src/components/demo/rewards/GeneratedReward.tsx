interface GeneratedRewardProps {
  rewardCode: string | null;
}

export const GeneratedReward = ({ rewardCode }: GeneratedRewardProps) => {
  if (!rewardCode) return null;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 shadow-lg text-center space-y-4">
      <div className="text-2xl font-bold text-gray-900">
        🎉 Congratulations!
      </div>
      <p className="text-gray-600">
        Show this screen to your server to receive today's special reward!
      </p>
      <div className="bg-pink-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500 mb-2">Your Unique Code:</p>
        <p className="text-xl font-mono font-bold text-primary">{rewardCode}</p>
      </div>
      <p className="text-sm text-gray-500 italic">
        Valid only for today's visit
      </p>
    </div>
  );
};