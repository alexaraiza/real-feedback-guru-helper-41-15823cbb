import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Settings, Share2, BarChart } from "lucide-react";
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

const RestaurantDashboard = () => {
  const [activeSection, setActiveSection] = useState("share");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurantData, setRestaurantData] = useState<any>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: restaurant, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("owner_id", user.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Could not fetch restaurant data",
          variant: "destructive",
        });
        return;
      }

      setRestaurantData(restaurant);
    };

    fetchRestaurantData();
  }, [navigate, toast]);

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
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
      </div>
    </SidebarProvider>
  );
};

export default RestaurantDashboard;