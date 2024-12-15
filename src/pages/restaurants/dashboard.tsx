import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Settings, Share2, BarChart, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RestaurantNav } from "@/components/navigation/RestaurantNav";

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

        // If restaurants array exists and has at least one restaurant
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

  const menuItems = [
    {
      title: "Share & Save",
      icon: Share2,
      id: "share",
    },
    {
      title: "Analytics",
      icon: BarChart,
      id: "analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      id: "settings",
    },
  ];

  return (
    <>
      <RestaurantNav />
      <div className="min-h-screen flex w-full mt-16">
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full ${
                            activeSection === item.id ? "bg-primary/10" : ""
                          }`}
                        >
                          <item.icon className="h-5 w-5 mr-2" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 p-8">
            <div className="max-w-5xl mx-auto">
              {activeSection === "share" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Share Your EatUP Page</h2>
                  <div className="glass-card p-6 rounded-xl">
                    <p className="text-lg mb-4">
                      Your unique EatUP page URL:
                    </p>
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={`https://eatup.com/r/${restaurantData?.id}`}
                        readOnly
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`https://eatup.com/r/${restaurantData?.id}`);
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
              )}

              {activeSection === "analytics" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                  <div className="glass-card p-6 rounded-xl">
                    <p className="text-lg text-muted-foreground">
                      Analytics dashboard coming soon...
                    </p>
                  </div>
                </div>
              )}

              {activeSection === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Settings</h2>
                  <div className="glass-card p-6 rounded-xl">
                    <p className="text-lg text-muted-foreground">
                      Settings panel coming soon...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
};

export default RestaurantDashboard;
