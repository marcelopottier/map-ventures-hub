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
    name: "Tech Solutions",
    description: "Empresa de desenvolvimento de software",
    category: "Tecnologia",
    phone: "(11) 99999-9999",
    website: "www.techsolutions.com",
    lat: -23.550520,
    lng: -46.633308
  },
  {
    id: 2,
    name: "Green Energy Corp",
    description: "Soluções em energia renovável",
    category: "Energia",
    phone: "(11) 88888-8888",
    website: "www.greenenergy.com",
    lat: -23.560520,
    lng: -46.643308
  }
];

const mockEvents = [
  {
    id: 1,
    name: "Workshop de Inovação",
    description: "Evento sobre novas tecnologias",
    date: "2024-07-15",
    location: "Centro de Convenções",
    lat: -23.545520,
    lng: -46.628308
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
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-46.633308, -23.550520], // São Paulo
      zoom: 12,
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
