import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Calendar, MapPin, Phone, Globe, X } from 'lucide-react';

// Mock data para empresas e eventos
const mockCompanies = [
  {
    id: 1,
    name: "TechJoinville Solutions",
    description: "Desenvolvimento de software e sistemas web",
    category: "Tecnologia",
    phone: "(47) 3422-1234",
    website: "www.techjoinville.com.br",
    lat: -26.3044,
    lng: -48.8487
  },
  {
    id: 2,
    name: "Metalúrgica Norte SC",
    description: "Fundição e usinagem de peças industriais",
    category: "Metalurgia",
    phone: "(47) 3435-5678",
    website: "www.metalurgicnorte.com.br",
    lat: -26.2946,
    lng: -48.8397
  },
  {
    id: 3,
    name: "Agência Digital Joinville",
    description: "Marketing digital e design gráfico",
    category: "Marketing",
    phone: "(47) 3428-9876",
    website: "www.agenciadigital.com.br",
    lat: -26.3148,
    lng: -48.8588
  },
  {
    id: 4,
    name: "Construtora Cidade das Flores",
    description: "Construção civil e incorporação imobiliária",
    category: "Construção",
    phone: "(47) 3433-4567",
    website: "www.construtoraflores.com.br",
    lat: -26.2985,
    lng: -48.8456
  },
  {
    id: 5,
    name: "Auto Center Joinville",
    description: "Peças automotivas e serviços mecânicos",
    category: "Automotivo",
    phone: "(47) 3422-3344",
    website: "www.autocenterjville.com.br",
    lat: -26.3156,
    lng: -48.8321
  },
  {
    id: 6,
    name: "Padaria e Confeitaria Dona Francisca",
    description: "Panificação, confeitaria e café colonial",
    category: "Alimentação",
    phone: "(47) 3425-7890",
    website: "www.donafrancisca.com.br",
    lat: -26.3097,
    lng: -48.8523
  },
  {
    id: 7,
    name: "Consultoria Empresarial Joinville",
    description: "Consultoria em gestão e recursos humanos",
    category: "Consultoria",
    phone: "(47) 3427-1122",
    website: "www.consultoriajville.com.br",
    lat: -26.2891,
    lng: -48.8654
  },
  {
    id: 8,
    name: "Farmácia Central",
    description: "Medicamentos, dermocosméticos e manipulação",
    category: "Saúde",
    phone: "(47) 3433-5566",
    website: "www.farmaciacentral.com.br",
    lat: -26.3021,
    lng: -48.8412
  }
];
const mockEvents = [
  {
    id: 1,
    name: "Festival de Dança de Joinville",
    description: "O maior festival de dança do mundo",
    date: "2024-07-15",
    location: "Centreventos Cau Hansen",
    lat: -26.2985,
    lng: -48.8456
  },
  {
    id: 2,
    name: "Feira do Empreendedor",
    description: "Networking e oportunidades de negócio",
    date: "2024-08-20",
    location: "Expoville",
    lat: -26.2757,
    lng: -48.8234
  }
];

interface MapProps {
  mapboxToken?: string;
}

const InteractiveMap: React.FC<MapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [userToken, setUserToken] = useState(mapboxToken || '');

  useEffect(() => {
    if (!mapContainer.current || !userToken) return;

    mapboxgl.accessToken = userToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-48.8487, -26.3044]], // Joinville
      zoom: 13,
    });

    // Adicionar controles de navegação
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Adicionar marcadores para empresas
    mockCompanies.forEach(company => {
      const marker = new mapboxgl.Marker({
        color: '#1E40AF'
      })
        .setLngLat([company.lng, company.lat])
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        setSelectedItem({ type: 'company', data: company });
      });
    });

    // Adicionar marcadores para eventos
    mockEvents.forEach(event => {
      const marker = new mapboxgl.Marker({
        color: '#7C3AED'
      })
        .setLngLat([event.lng, event.lat])
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        setSelectedItem({ type: 'event', data: event });
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [userToken]);

  if (!userToken) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-8">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Token do Mapbox necessário</h3>
          <p className="text-muted-foreground mb-4">
            Insira seu token público do Mapbox para visualizar o mapa
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Insira seu token do Mapbox"
              value={userToken}
              onChange={(e) => setUserToken(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md"
            />
            <p className="text-xs text-muted-foreground">
              Obtenha seu token em{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mapbox.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      
      {selectedItem && (
        <Card className="absolute top-4 right-4 w-80 max-h-96 overflow-y-auto z-10 animate-scale-in">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {selectedItem.type === 'company' ? (
                  <Building className="h-5 w-5 text-company-blue" />
                ) : (
                  <Calendar className="h-5 w-5 text-event-purple" />
                )}
                <CardTitle className="text-lg">{selectedItem.data.name}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedItem(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {selectedItem.data.description}
            </p>
            
            {selectedItem.type === 'company' && (
              <>
                <Badge variant="secondary">
                  {selectedItem.data.category}
                </Badge>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedItem.data.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedItem.data.website}</span>
                  </div>
                </div>
              </>
            )}
            
            {selectedItem.type === 'event' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(selectedItem.data.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedItem.data.location}</span>
                </div>
              </div>
            )}
            
            <Button className="w-full mt-4">
              Ver detalhes
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveMap;
