
import InteractiveMap from '@/components/InteractiveMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

const MapPage = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Mapa principal */}
      <Card className="flex-1 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-map-blue" />
              Mapa Interativo
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1">
                <div className="h-2 w-2 rounded-full bg-company-blue"></div>
                Empresas
              </Badge>
              <Badge variant="outline" className="gap-1">
                <div className="h-2 w-2 rounded-full bg-event-purple"></div>
                Eventos
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 h-[600px]">
          <InteractiveMap />
        </CardContent>
      </Card>
    </div>
  );
};

export default MapPage;
