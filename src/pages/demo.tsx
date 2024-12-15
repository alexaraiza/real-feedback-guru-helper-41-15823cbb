import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ReviewCard } from "@/components/ReviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Receipt, Share2 } from "lucide-react";

const DemoPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReceiptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
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
    }
  };

  const analyzeReceipt = async (imageUrl: string) => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-receipt', {
        body: { imageUrl },
      });

      if (error) throw error;

      setAnalysisResult(data.analysis);
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
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAiSurvey = () => {
    // Implement AI survey logic
    toast({
      title: "Coming Soon",
      description: "AI survey feature is coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          Experience EatUP! Demo
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Try our innovative review system and receipt analysis feature. Upload a receipt to get instant insights, or leave a review to see how our AI-powered system works.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Receipt Analysis Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleReceiptUpload}
                    className="flex-1"
                  />
                  <Button disabled={isAnalyzing}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>

                {analysisResult && (
                  <div className="bg-secondary/5 p-4 rounded-lg space-y-4">
                    <h3 className="font-semibold">Analysis Results</h3>
                    <div className="space-y-2">
                      <p><strong>Total Amount:</strong> ${analysisResult.total_amount}</p>
                      <div>
                        <strong>Items:</strong>
                        <ul className="list-disc list-inside">
                          {analysisResult.items.map((item: any, index: number) => (
                            <li key={index}>{item.name} - ${item.price}</li>
                          ))}
                        </ul>
                      </div>
                      {analysisResult.tax_amount && (
                        <p><strong>Tax:</strong> ${analysisResult.tax_amount}</p>
                      )}
                      {analysisResult.discounts && (
                        <p><strong>Discounts:</strong> ${analysisResult.discounts}</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share Your Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewCard
                  businessName="Demo Restaurant"
                  businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
                  onTakeAiSurvey={handleAiSurvey}
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