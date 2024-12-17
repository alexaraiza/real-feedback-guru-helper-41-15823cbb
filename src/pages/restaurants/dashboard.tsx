import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RestaurantNav } from "@/components/navigation/RestaurantNav";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ShareSection } from "@/components/dashboard/ShareSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { SettingsSection } from "@/components/dashboard/SettingsSection";

const RestaurantDashboard = () => {
  const [activeSection, setActiveSection] = useState("share");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurantData, setRestaurantData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate("/login");
          return;
        }

        const { data: restaurants, error } = await supabase
          .from("restaurants")
          .select("*")
          .eq("owner_id", user.id);

        if (error) {
          toast({
            title: "Error",
            description: "Could not fetch restaurant data",
            variant: "destructive",
          });
          return;
        }

        if (restaurants && restaurants.length > 0) {
          setRestaurantData(restaurants[0]);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantData();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!restaurantData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Welcome to EatUP!</h2>
          <p className="text-muted-foreground">You haven't created a restaurant yet.</p>
          <Button onClick={() => navigate("/restaurants/onboard")} className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Create Your Restaurant
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <RestaurantNav />
      <div className="min-h-screen flex w-full mt-16">
        <SidebarProvider>
          <DashboardSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
          <main className="flex-1 p-8">
            <div className="max-w-5xl mx-auto">
              {activeSection === "share" && (
                <ShareSection restaurantId={restaurantData.id} />
              )}
              {activeSection === "analytics" && <AnalyticsSection />}
              {activeSection === "settings" && <SettingsSection />}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
};

export default RestaurantDashboard;