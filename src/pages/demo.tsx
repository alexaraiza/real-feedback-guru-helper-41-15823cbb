import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ReviewCard } from "@/components/ReviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Upload, Image, Receipt } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const DemoPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [reviewText, setReviewText] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReceiptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('review_photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('review_photos')
        .getPublicUrl(filePath);

      setReceiptUrl(publicUrl);
      analyzeReceipt(publicUrl);
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Error",
        description: "Failed to upload receipt",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeReceipt = async (imageUrl: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-receipt', {
        body: { imageUrl },
      });

      if (error) throw error;

      setAnalysisResult(data.analysis);
      
      // Generate initial review from receipt data
      const items = data.analysis.items.map((item: any) => item.name).join(", ");
      const initialReview = `I had a wonderful dining experience and enjoyed ${items}. The total came to $${data.analysis.total_amount}.`;
      setReviewText(initialReview);

      toast({
        title: "Success",
        description: "Receipt analyzed successfully",
      });
    } catch (error) {
      console.error('Error analyzing receipt:', error);
      toast({
        title: "Error",
        description: "Failed to analyze receipt",
        variant: "destructive",
      });
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          Experience EatUP! Demo
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Upload a receipt, get an AI-powered review, and earn rewards instantly. See how easy it is to share your dining experience!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review & Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <label className="relative flex flex-col items-center justify-center h-32 rounded-lg border-2 border-dashed border-primary/20 bg-white/50 hover:bg-white/80 transition-colors cursor-pointer">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-10 w-10 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop your receipt
                      </p>
                    </div>
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={triggerFileInput}
                    >
                      <Image className="h-4 w-4" />
                      Choose from Library
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={triggerFileInput}
                    >
                      <Camera className="h-4 w-4" />
                      Take a Photo
                    </Button>
                  </div>
                </div>

                {analysisResult && (
                  <div className="bg-secondary/5 p-4 rounded-lg space-y-4">
                    <h3 className="font-semibold">Receipt Analysis</h3>
                    <div className="space-y-2">
                      <p><strong>Total Amount:</strong> ${analysisResult.total_amount}</p>
                      <div>
                        <strong>Items:</strong>
                        <ul className="list-disc list-inside">
                          {analysisResult.items?.map((item: any, index: number) => (
                            <li key={index}>{item.name} - ${item.price}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Review</label>
                  <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your dining experience..."
                    className="min-h-[150px]"
                  />
                </div>

                <ReviewCard
                  businessName="Demo Restaurant"
                  businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
                  onTakeAiSurvey={() => {}}
                />
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <div className="sticky top-24 space-y-6">
              <img
                src="/lovable-uploads/f790e463-d057-4fec-b168-02e376930c1c.png"
                alt="Restaurant experience"
                className="rounded-xl shadow-xl"
              />
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  Create your own restaurant page and start collecting valuable customer feedback.
                </p>
                <Button
                  onClick={() => navigate("/restaurants/onboard")}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Create Your Restaurant Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;