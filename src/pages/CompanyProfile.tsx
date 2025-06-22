
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, Phone, Globe, MapPin, Calendar, Users, Edit, ArrowLeft } from 'lucide-react'
import { companiesApi } from '@/services/mockApi'
import { useAuth } from '@/contexts/AuthContext'

export default function CompanyProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { canEdit } = useAuth()

  const { data: company, isLoading } = useQuery({
    queryKey: ['company', id],
    queryFn: () => companiesApi.getById(id!),
    enabled: !!id
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Empresa não encontrada</h1>
        <p className="text-muted-foreground">
          A empresa que você está procurando não existe ou foi removida.
        </p>
      </div>
    )
  }

  const canUserEdit = canEdit('company', id!, company.ownerId)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/companies')}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Building className="h-8 w-8 text-company-blue" />
              {company.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Perfil completo da empresa
            </p>
          </div>
        </div>
        
        {canUserEdit && (
          <Button onClick={() => navigate(`/companies/${id}/edit`)}>
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        )}
      </div>

      {/* Informações principais */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-company-blue to-blue-600 flex items-center justify-center">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{company.name}</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {company.category}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">
            {company.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{company.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <a 
                    href={`https://${company.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    {company.website}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Endereço</p>
                  <p className="font-medium">{company.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Funcionários</p>
                  <p className="font-medium">{company.employees} funcionários</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fundada em</p>
                  <p className="font-medium">{company.founded}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Coordenadas</p>
                  <p className="font-medium text-xs">
                    {company.lat.toFixed(4)}, {company.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Localização no mapa */}
      <Card>
        <CardHeader>
          <CardTitle>Localização</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Mapa interativo será exibido aqui
              </p>
              <p className="text-sm text-muted-foreground">
                {company.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
