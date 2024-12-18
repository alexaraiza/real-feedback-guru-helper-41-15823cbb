import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PreviewSectionProps {
  restaurantName: string | null;
  googleMapsUrl: string | null;
  generatedUrl: string | null;
}

export const PreviewSection = ({ generatedUrl }: PreviewSectionProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (generatedUrl) {
      const fullUrl = `${window.location.origin}${generatedUrl}`;
      QRCode.toDataURL(fullUrl)
        .then(url => {
          setQrCodeUrl(url);
        })
        .catch(err => {
          console.error('Error generating QR code:', err);
        });
    }
  }, [generatedUrl]);

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'review-page-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyUrl = async () => {
    const fullUrl = `${window.location.origin}${generatedUrl}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({
        title: "URL copied!",
        description: "The URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the URL manually.",
        variant: "destructive",
      });
    }
  };

  if (!generatedUrl) return null;

  const fullUrl = `${window.location.origin}${generatedUrl}`;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Your unique URL to share with customers:</p>
        <div className="flex flex-col space-y-2">
          <div className="relative group">
            <code className="block p-4 bg-gray-50 rounded-lg text-sm break-all font-mono text-primary pr-12">
              {fullUrl}
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleCopyUrl}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      {qrCodeUrl && (
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Your unique QR code to share with customers:</p>
          <div className="bg-white p-4 rounded-lg inline-block">
            <img 
              src={qrCodeUrl} 
              alt="QR Code for review page" 
              className="w-32 h-32"
            />
            <Button 
              onClick={handleDownloadQR}
              variant="outline"
              className="w-full mt-3 text-sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};