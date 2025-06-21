
import { MapPin, Building, Calendar, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"

const navItems = [
  {
    title: "Mapa",
    url: "/",
    icon: MapPin,
  },
  {
    title: "Empresas",
    url: "/companies",
    icon: Building,
  },
  {
    title: "Eventos",
    url: "/events",
    icon: Calendar,
  },
]

export function PublicHeader() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-map-blue to-map-green flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MapVentures</h1>
              <p className="text-sm text-muted-foreground">Hub de Negócios</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.url)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.url
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>

          {/* Login Button */}
          <Button onClick={() => navigate('/login')} className="gap-2">
            <LogIn className="h-4 w-4" />
            Entrar
          </Button>
        </div>
      </div>
    </header>
  )
}
