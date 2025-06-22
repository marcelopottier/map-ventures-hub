
import { MapPin, Building, Calendar, LogIn, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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

          {/* Login/Profile */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user?.type === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    Dashboard Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/login')} className="gap-2">
              <LogIn className="h-4 w-4" />
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
