import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Calendar, MapPin, Phone, Globe, X, Palette, Settings } from 'lucide-react';

// Mock data para empresas e eventos
const mockCompanies = [
  {
    id: 1,
    name: "Tech Solutions",
    description: "Empresa de desenvolvimento de software",
    category: "Tecnologia",
    phone: "(11) 99999-9999",
    website: "www.techsolutions.com",
    lat: -26.3044,
    lng: -48.8487
  },
  {
    id: 2,
    name: "Green Energy Corp",
    description: "Soluções em energia renovável",
    category: "Energia",
    phone: "(47) 88888-8888",
    website: "www.greenenergy.com",
    lat: -26.2946,
    lng: -48.8397
  },
  {
    id: 3,
    name: "Digital Marketing Pro",
    description: "Agência de marketing digital",
    category: "Marketing",
    phone: "(47) 77777-7777",
    website: "www.digitalmarketing.com",
    lat: -26.3148,
    lng: -48.8588
  }
];

const mockEvents = [
  {
    id: 1,
    name: "Workshop de Inovação",
    description: "Evento sobre novas tecnologias",
    date: "2024-07-15",
    location: "Centro de Convenções",
    lat: -26.2985,
    lng: -48.8456
  }
];

// Diferentes estilos de mapa disponíveis
const mapStyles = [
  { id: 'streets-v12', name: 'Streets (Colorido)', description: 'Mapa de ruas colorido padrão' },
  { id: 'outdoors-v12', name: 'Outdoors', description: 'Estilo outdoor com topografia' },
  { id: 'light-v11', name: 'Light', description: 'Estilo claro minimalista' },
  { id: 'dark-v11', name: 'Dark', description: 'Estilo escuro' },
  { id: 'satellite-v9', name: 'Satellite', description: 'Imagem de satélite' },
  { id: 'satellite-streets-v12', name: 'Satellite Streets', description: 'Satélite com ruas' },
  { id: 'navigation-day-v1', name: 'Navigation Day', description: 'Otimizado para navegação diurna' },
  { id: 'navigation-night-v1', name: 'Navigation Night', description: 'Otimizado para navegação noturna' }
];

interface MapProps {
  mapboxToken?: string;
}

const InteractiveMap: React.FC<MapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showStyleSelector, setShowStyleSelector] = useState(false);
  const [currentStyle, setCurrentStyle] = useState('streets-v12'); // Mudado para streets colorido
  const [userToken, setUserToken] = useState(mapboxToken || '');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Função para criar marcadores customizados
  const createCustomMarker = (type: string, color: string) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.cssText = `
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
    `;
    
    const icon = document.createElement('div');
    icon.innerHTML = type === 'company' ? '🏢' : '📅';
    icon.style.fontSize = '12px';
    el.appendChild(icon);
    
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.1)';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
    });
    
    return el;
  };

  useEffect(() => {
    if (!mapContainer.current || !userToken) return;

    // Carregar Mapbox GL JS dinamicamente
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.onload = () => {
      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // @ts-ignore
      window.mapboxgl.accessToken = userToken;
      
      // @ts-ignore
      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${currentStyle}`,
        center: [-48.8487, -26.3044], // Joinville, SC
        zoom: 12,
        attributionControl: false
      });

      // @ts-ignore
      map.current.addControl(new window.mapboxgl.NavigationControl(), 'top-right');
      // @ts-ignore
      map.current.addControl(new window.mapboxgl.AttributionControl({
        compact: true
      }), 'bottom-right');

      map.current.on('load', () => {
        setMapLoaded(true);
        addMarkers();
      });
    };
    
    document.head.appendChild(script);

    return () => {
      map.current?.remove();
    };
  }, [userToken]);

  // Função para adicionar marcadores
  const addMarkers = () => {
    if (!map.current) return;

    // Adicionar marcadores para empresas
    mockCompanies.forEach(company => {
      const markerElement = createCustomMarker('company', '#3B82F6');
      
      // @ts-ignore
      const marker = new window.mapboxgl.Marker(markerElement)
        .setLngLat([company.lng, company.lat])
        .addTo(map.current);

      markerElement.addEventListener('click', () => {
        setSelectedItem({ type: 'company', data: company });
      });
    });

    // Adicionar marcadores para eventos
    mockEvents.forEach(event => {
      const markerElement = createCustomMarker('event', '#8B5CF6');
      
      // @ts-ignore
      const marker = new window.mapboxgl.Marker(markerElement)
        .setLngLat([event.lng, event.lat])
        .addTo(map.current);

      markerElement.addEventListener('click', () => {
        setSelectedItem({ type: 'event', data: event });
      });
    });
  };

  // Função para trocar estilo do mapa
  const changeMapStyle = (styleId: string) => {
    if (map.current && mapLoaded) {
      map.current.setStyle(`mapbox://styles/mapbox/${styleId}`);
      setCurrentStyle(styleId);
      setShowStyleSelector(false);
      
      // Re-adicionar marcadores após mudança de estilo
      map.current.on('styledata', () => {
        addMarkers();
      });
    }
  };

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
      
      {/* Botão para trocar estilo do mapa */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowStyleSelector(!showStyleSelector)}
          className="bg-white shadow-lg"
        >
          <Palette className="h-4 w-4 mr-2" />
          Estilo do Mapa
        </Button>
        
        {showStyleSelector && (
          <Card className="absolute top-12 left-0 w-64 max-h-80 overflow-y-auto animate-in slide-in-from-top-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Escolha o Estilo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mapStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => changeMapStyle(style.id)}
                  className={`w-full text-left p-2 rounded-md transition-colors ${
                    currentStyle === style.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="font-medium text-sm">{style.name}</div>
                  <div className="text-xs text-muted-foreground">{style.description}</div>
                </button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      
      {selectedItem && (
        <Card className="absolute top-4 right-4 w-80 max-h-96 overflow-y-auto z-10 animate-in slide-in-from-right-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {selectedItem.type === 'company' ? (
                  <Building className="h-5 w-5 text-blue-600" />
                ) : (
                  <Calendar className="h-5 w-5 text-purple-600" />
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
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
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

      {/* Legenda */}
      <Card className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur">
        <CardContent className="p-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
              <span>Empresas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow"></div>
              <span>Eventos</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveMap;
