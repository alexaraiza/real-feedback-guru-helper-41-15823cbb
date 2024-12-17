import { useToast } from "@/hooks/use-toast";

interface ShareSectionProps {
  restaurantId: string;
}

export const ShareSection = ({ restaurantId }: ShareSectionProps) => {
  const { toast } = useToast();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Share Your EatUP Page</h2>
      <div className="glass-card p-6 rounded-xl">
        <p className="text-lg mb-4">
          Your unique EatUP page URL:
        </p>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={`https://eatup.com/r/${restaurantId}`}
            readOnly
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://eatup.com/r/${restaurantId}`);
              toast({
                title: "Copied!",
                description: "Link copied to clipboard",
              });
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};