import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, Star, FileText } from "lucide-react";

export const VdaSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
            Verified Dining Audit (VDA)
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional dining evaluations that help restaurants excel and diners discover exceptional experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Reviews</h3>
            <p className="text-muted-foreground">
              Comprehensive evaluations by trained professionals covering every aspect of the dining experience
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Detailed Reports</h3>
            <p className="text-muted-foreground">
              Get actionable insights with photo evidence and specific recommendations for improvement
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Restaurant Growth</h3>
            <p className="text-muted-foreground">
              Transform feedback into growth opportunities and showcase your commitment to excellence
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/restaurants/register-interest">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#E94E87] to-[#F17BA3] hover:from-[#D13D73] hover:to-[#E94E87]"
            >
              <Building2 className="mr-2 h-5 w-5" />
              Register Your Restaurant for VDA
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};