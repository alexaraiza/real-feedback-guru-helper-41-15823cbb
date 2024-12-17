import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PreviewSectionProps {
  restaurantName: string | null;
  googleMapsUrl: string | null;
  generatedUrl: string | null;
}

export const PreviewSection = ({ generatedUrl }: PreviewSectionProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

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

  if (!generatedUrl) return null;

  const fullUrl = `${window.location.origin}${generatedUrl}`;

  return (
    <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100">
      <h3 className="text-xl font-semibold mb-4">Your Review Page Details</h3>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-2">2. Your unique URL to share with customers:</p>
          <code className="block p-3 bg-gray-50 rounded-lg text-sm break-all">
            {fullUrl}
          </code>
        </div>
        {qrCodeUrl && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Your unique QR code to share with customers:</p>
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
    </div>
  );
};