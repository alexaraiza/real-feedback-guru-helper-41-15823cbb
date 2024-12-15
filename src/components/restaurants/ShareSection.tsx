import { useState } from "react";
import { Share2, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ShareSectionProps {
  restaurantId: string;
  customUrl?: string;
}

export function ShareSection({ restaurantId, customUrl }: ShareSectionProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const baseUrl = window.location.origin;
  const shareUrl = customUrl ? `${baseUrl}/r/${customUrl}` : `${baseUrl}/restaurants/${restaurantId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast({
        title: "Success",
        description: "Link copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share Your Restaurant Page
        </CardTitle>
        <CardDescription>
          Share your restaurant page with customers and collect reviews
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 border rounded-md bg-muted"
          />
          <Button onClick={handleCopyLink} variant="outline">
            {isCopied ? (
              "Copied!"
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => window.open(shareUrl, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Page
        </Button>
      </CardContent>
    </Card>
  );
}