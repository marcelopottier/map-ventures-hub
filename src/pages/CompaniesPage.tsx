import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Phone, Globe, X } from 'lucide-react';
import { companiesApi } from '@/services/mockApi';
import { useNavigate } from 'react-router-dom';

const CompaniesMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [userToken, setUserToken] = useState(import.meta.env.VITE_MAPBOX_TOKEN || '');
  const navigate = useNavigate();

  // Buscar dados das empresas
  const { data: companies = [] } = useQuery({
    queryKey: ['companies'],
    queryFn: companiesApi.getAll
  });

  useEffect(() => {
    if (!mapContainer.current || !userToken) return;

    mapboxgl.accessToken = userToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-48.8487, -26.3044], // Joinville
      zoom: 12,
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
        setSelectedCompany(company);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [userToken, companies]);

  if (!userToken) {
    return (
      <Card className="h-96">
        <CardContent className="h-full flex items-center justify-center p-8">
          <div className="text-center">
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
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-company-blue" />
            Mapa das Empresas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div ref={mapContainer} className="h-96 rounded-lg shadow-sm border" />
        </CardContent>
      </Card>
      
      {selectedCompany && (
        <Card className="absolute top-4 right-4 w-80 max-h-96 overflow-y-auto z-10 animate-scale-in">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-company-blue" />
                <CardTitle className="text-lg">{selectedCompany.name}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCompany(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {selectedCompany.description}
            </p>
            
            <Badge variant="secondary">
              {selectedCompany.category}
            </Badge>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{selectedCompany.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{selectedCompany.website}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{selectedCompany.address}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4"
              onClick={() => {
                navigate(`/companies/${selectedCompany.id}`);
              }}
            >
              Ver Perfil Completo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompaniesMap;