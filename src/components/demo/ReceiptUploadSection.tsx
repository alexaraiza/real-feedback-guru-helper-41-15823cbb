import { Input } from "@/components/ui/input";
import { Camera, Upload, Image, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReceiptUploadSectionProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAnalyzing: boolean;
  analysisResult?: any;
}

export const ReceiptUploadSection = ({ onFileSelect, isAnalyzing, analysisResult }: ReceiptUploadSectionProps) => {
  const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const isUploaded = !!analysisResult;

  return (
    <div className="grid gap-4">
      <label className={`relative flex flex-col items-center justify-center h-32 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
        isUploaded 
          ? 'border-green-500 bg-green-50 hover:bg-green-100/80' 
          : 'border-primary/20 bg-white/50 hover:bg-white/80'
      }`}>
        <Input
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isAnalyzing}
        />
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploaded ? (
            <>
              <CheckCircle2 className="h-10 w-10 text-green-500 mb-2" />
              <p className="text-sm text-green-600">
                Receipt uploaded successfully!
              </p>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop your receipt
              </p>
            </>
          )}
        </div>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={triggerFileInput}
          disabled={isAnalyzing}
        >
          <Image className="h-4 w-4" />
          Choose from Library
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={triggerFileInput}
          disabled={isAnalyzing}
        >
          <Camera className="h-4 w-4" />
          Take a Photo
        </Button>
      </div>
    </div>
  );
};