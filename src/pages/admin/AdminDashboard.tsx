
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building, Calendar, MapPin, TrendingUp, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Gerencie suas empresas e eventos</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-company-blue/10 flex items-center justify-center">
                <Building className="h-5 w-5 text-company-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Empresas Cadastradas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-event-purple/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-event-purple" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Eventos Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-map-green/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-map-green" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Visualizações Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-company-blue" />
              Gerenciar Empresas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Cadastre novas empresas, edite informações e gerencie o catálogo.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/admin/companies/new')} className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Empresa
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/companies')}>
                Ver Todas
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-event-purple" />
              Gerenciar Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Crie novos eventos, gerencie agendas e acompanhe participações.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/admin/events/new')} className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Evento
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/events')}>
                Ver Todos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
