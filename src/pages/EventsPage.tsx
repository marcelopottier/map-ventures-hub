
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Plus, Edit, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockEvents = [
  {
    id: 1,
    name: "Workshop de Inovação",
    description: "Evento sobre novas tecnologias e tendências do mercado",
    date: "2024-07-15",
    time: "14:00",
    location: "Centro de Convenções - São Paulo",
    category: "Tecnologia",
    capacity: 200,
    registered: 156,
    price: "Gratuito",
    organizer: "Tech Solutions"
  },
  {
    id: 2,
    name: "Feira de Sustentabilidade",
    description: "Exposição de produtos e soluções sustentáveis",
    date: "2024-07-20",
    time: "09:00",
    location: "Expo Center Norte - São Paulo",
    category: "Sustentabilidade",
    capacity: 500,
    registered: 234,
    price: "R$ 50,00",
    organizer: "Green Energy Corp"
  },
  {
    id: 3,
    name: "Festival Gastronômico",
    description: "Degustação de pratos especiais e workshops culinários",
    date: "2024-07-25",
    time: "18:00",
    location: "Parque Ibirapuera - São Paulo",
    category: "Gastronomia",
    capacity: 300,
    registered: 89,
    price: "R$ 80,00",
    organizer: "Food & Co"
  }
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredEvents = mockEvents.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="h-8 w-8 text-event-purple" />
            Eventos
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os eventos da plataforma
          </p>
        </div>
        <Button onClick={() => navigate('/events/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      {/* Barra de pesquisa */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar eventos por nome ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de eventos */}
      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-event-purple to-purple-600 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{event.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">
                          {event.category}
                        </Badge>
                        <Badge variant="outline" className="text-green-600">
                          {event.price}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(event.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className={`h-4 w-4 ${getStatusColor(event.registered, event.capacity)}`} />
                      <span className={getStatusColor(event.registered, event.capacity)}>
                        {event.registered}/{event.capacity} inscritos
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-muted-foreground">
                    Organizado por: {event.organizer}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/events/${event.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum evento encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar os termos de pesquisa ou cadastre um novo evento.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsPage;
