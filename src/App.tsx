
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { AdminLayout } from "@/components/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import MapPage from "./pages/MapPage";
import CompaniesPage from "./pages/CompaniesPage";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota de login sem layout */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas públicas com layout público */}
          <Route path="/" element={
            <PublicLayout>
              <MapPage />
            </PublicLayout>
          } />
          
          <Route path="/companies" element={
            <PublicLayout>
              <CompaniesPage />
            </PublicLayout>
          } />
          
          <Route path="/events" element={
            <PublicLayout>
              <EventsPage />
            </PublicLayout>
          } />
          
          <Route path="/companies/:id" element={
            <PublicLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Perfil da Empresa</h1>
                <p className="text-muted-foreground">Página será implementada em breve</p>
              </div>
            </PublicLayout>
          } />
          
          <Route path="/events/:id" element={
            <PublicLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Detalhes do Evento</h1>
                <p className="text-muted-foreground">Página será implementada em breve</p>
              </div>
            </PublicLayout>
          } />
          
          {/* Rotas administrativas protegidas com layout admin */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/companies" element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Gerenciar Empresas</h1>
                  <p className="text-muted-foreground">Página será implementada em breve</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/companies/new" element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Nova Empresa</h1>
                  <p className="text-muted-foreground">Formulário será implementado em breve</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/companies/:id/edit" element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Editar Empresa</h1>
                  <p className="text-muted-foreground">Formulário será implementado em breve</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/events" element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Gerenciar Eventos</h1>
                  <p className="text-muted-foreground">Página será implementada em breve</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/events/new" element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Novo Evento</h1>
                  <p className="text-muted-foreground">Formulário será implementado em breve</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/events/:id/edit" element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>
                  <p className="text-muted-foreground">Formulário será implementado em breve</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/profile" element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
                  <p className="text-muted-foreground">Página em desenvolvimento</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
