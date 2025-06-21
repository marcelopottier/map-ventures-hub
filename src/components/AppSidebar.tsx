
import { MapPin, Building, Calendar, Users, LogOut, User, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: MapPin,
  },
  {
    title: "Empresas",
    url: "/admin/companies",
    icon: Building,
  },
  {
    title: "Eventos",
    url: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Perfil",
    url: "/admin/profile",
    icon: User,
  },
]

const publicMenuItems = [
  {
    title: "Ver Mapa Público",
    url: "/",
    icon: MapPin,
  },
  {
    title: "Ver Empresas Públicas",
    url: "/companies",
    icon: Building,
  },
  {
    title: "Ver Eventos Públicos",
    url: "/events",
    icon: Calendar,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    // TODO: Implementar logout real quando conectar Supabase
    navigate('/login')
  }

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-map-blue to-map-green flex items-center justify-center">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">MapVentures</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administração</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-accent transition-colors"
                  >
                    <button onClick={() => navigate(item.url)} className="w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Visualização Pública</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-accent transition-colors"
                  >
                    <button onClick={() => navigate(item.url)} className="w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="w-full gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
