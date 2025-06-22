
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Edit, ArrowLeft } from 'lucide-react'
import { eventsApi } from '@/services/mockApi'
import { useAuth } from '@/contexts/AuthContext'

export default function EventDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { canEdit } = useAuth()

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventsApi.getById(id!),
    enabled: !!id
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Evento não encontrado</h1>
        <p className="text-muted-foreground">
          O evento que você está procurando não existe ou foi removido.
        </p>
      </div>
    )
  }

  const canUserEdit = canEdit('event', id!, event.ownerId)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/events')}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Calendar className="h-8 w-8 text-event-purple" />
              {event.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Detalhes completos do evento
            </p>
          </div>
        </div>
        
        {canUserEdit && (
          <Button onClick={() => navigate(`/events/${id}/edit`)}>
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
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-event-purple to-purple-600 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{event.name}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  {new Date(event.date).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">
            {event.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Data do evento</p>
                  <p className="font-medium">
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Local</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Coordenadas</p>
                  <p className="font-medium text-xs">
                    {event.lat.toFixed(4)}, {event.lng.toFixed(4)}
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
          <CardTitle>Localização do Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Mapa interativo será exibido aqui
              </p>
              <p className="text-sm text-muted-foreground">
                {event.location}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
