
import InteractiveMap from '@/components/InteractiveMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, MapPin, TrendingUp } from 'lucide-react';

const MapPage = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-company-blue/10 flex items-center justify-center">
                <Building className="h-5 w-5 text-company-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Empresas Cadastradas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-event-purple/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-event-purple" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Eventos Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-map-green/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-map-green" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Visualizações Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
