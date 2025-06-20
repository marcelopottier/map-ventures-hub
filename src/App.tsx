
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import MapPage from "./pages/MapPage";
import CompaniesPage from "./pages/CompaniesPage";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout wrapper para páginas com sidebar
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-4">
          <SidebarTrigger className="lg:hidden" />
        </div>
        {children}
      </main>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota de login sem sidebar */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas do dashboard com sidebar */}
          <Route path="/" element={
            <DashboardLayout>
              <MapPage />
            </DashboardLayout>
          } />
          
          <Route path="/companies" element={
            <DashboardLayout>
              <CompaniesPage />
            </DashboardLayout>
          } />
          
          <Route path="/events" element={
            <DashboardLayout>
              <EventsPage />
            </DashboardLayout>
          } />
          
          <Route path="/profile" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
                <p className="text-muted-foreground">Página em desenvolvimento</p>
              </div>
            </DashboardLayout>
          } />
          
          {/* Páginas de formulário - serão implementadas em iterações futuras */}
          <Route path="/companies/new" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Nova Empresa</h1>
                <p className="text-muted-foreground">Formulário será implementado em breve</p>
              </div>
            </DashboardLayout>
          } />
          
          <Route path="/companies/:id" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Perfil da Empresa</h1>
                <p className="text-muted-foreground">Página será implementada em breve</p>
              </div>
            </DashboardLayout>
          } />
          
          <Route path="/companies/:id/edit" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Editar Empresa</h1>
                <p className="text-muted-foreground">Formulário será implementado em breve</p>
              </div>
            </DashboardLayout>
          } />
          
          <Route path="/events/new" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Novo Evento</h1>
                <p className="text-muted-foreground">Formulário será implementado em breve</p>
              </div>
            </DashboardLayout>
          } />
          
          <Route path="/events/:id" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Detalhes do Evento</h1>
                <p className="text-muted-foreground">Página será implementada em breve</p>
              </div>
            </DashboardLayout>
          } />
          
          <Route path="/events/:id/edit" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>
                <p className="text-muted-foreground">Formulário será implementado em breve</p>
              </div>
            </DashboardLayout>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
