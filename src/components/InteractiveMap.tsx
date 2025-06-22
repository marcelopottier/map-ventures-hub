
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Calendar, MapPin, Phone, Globe, X } from 'lucide-react';
import { companiesApi, eventsApi } from '@/services/mockApi';

interface MapProps {
  mapboxToken?: string;
}

const InteractiveMap: React.FC<MapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [userToken, setUserToken] = useState(mapboxToken || '');

  // Buscar dados reais das APIs
  const { data: companies = [] } = useQuery({
    queryKey: ['companies'],
    queryFn: companiesApi.getAll
  });

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: eventsApi.getAll
  });

  useEffect(() => {
    if (!mapContainer.current || !userToken) return;

    mapboxgl.accessToken = userToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-48.8487, -26.3044], // Joinville
      zoom: 13,
    });

    // Adicionar controles de navegação
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Adicionar marcadores para empresas
    companies.forEach(company => {
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
    events.forEach(event => {
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
  }, [userToken, companies, events]);

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
            
            <Button 
              className="w-full mt-4"
              onClick={() => {
                const path = selectedItem.type === 'company' 
                  ? `/companies/${selectedItem.data.id}` 
                  : `/events/${selectedItem.data.id}`;
                window.open(path, '_blank');
              }}
            >
              Ver detalhes
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveMap;
