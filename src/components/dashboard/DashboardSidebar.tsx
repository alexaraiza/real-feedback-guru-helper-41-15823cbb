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

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const DashboardSidebar = ({ activeSection, setActiveSection }: DashboardSidebarProps) => {
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
  );
};