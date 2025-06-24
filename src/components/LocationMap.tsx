import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  lat: number;
  lng: number;
  title: string;
  description?: string;
  markerColor?: string;
  height?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  lat, 
  lng, 
  title, 
  description, 
  markerColor = '#1E40AF',
  height = 'h-64'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userToken, setUserToken] = useState(import.meta.env.VITE_MAPBOX_TOKEN || '');

  useEffect(() => {
    if (!mapContainer.current || !userToken) return;

    mapboxgl.accessToken = userToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15,
    });

    // Adicionar controles de navegação
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Adicionar marcador
    const marker = new mapboxgl.Marker({
      color: markerColor
    })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Adicionar popup se houver descrição
    if (description) {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm mb-1">${title}</h3>
            <p class="text-xs text-gray-600">${description}</p>
          </div>
        `);
      
      marker.setPopup(popup);
    }

    return () => {
      map.current?.remove();
    };
  }, [userToken, lat, lng, title, description, markerColor]);

  if (!userToken) {
    return (
      <div className={`${height} bg-muted rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">
            Token do Mapbox necessário
          </p>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Insira seu token do Mapbox"
              value={userToken}
              onChange={(e) => setUserToken(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-xs"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={mapContainer} className={`${height} rounded-lg shadow-sm border`} />
  );
};

export default LocationMap;