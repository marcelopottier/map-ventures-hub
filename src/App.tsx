
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { AdminLayout } from "@/components/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { OwnerProtectedRoute } from "@/components/OwnerProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import MapPage from "./pages/MapPage";
import CompaniesPage from "./pages/CompaniesPage";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CompanyForm from "./pages/CompanyForm";
import EventForm from "./pages/EventForm";
import CompanyProfile from "./pages/CompanyProfile";
import EventDetails from "./pages/EventDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
                <CompanyProfile />
              </PublicLayout>
            } />
            
            <Route path="/events/:id" element={
              <PublicLayout>
                <EventDetails />
              </PublicLayout>
            } />

            {/* Rotas de edição protegidas por propriedade */}
            <Route path="/companies/new" element={
              <ProtectedRoute>
                <PublicLayout>
                  <CompanyForm />
                </PublicLayout>
              </ProtectedRoute>
            } />

            <Route path="/companies/:id/edit" element={
              <OwnerProtectedRoute resourceType="company">
                <PublicLayout>
                  <CompanyForm />
                </PublicLayout>
              </OwnerProtectedRoute>
            } />

            <Route path="/events/new" element={
              <ProtectedRoute>
                <PublicLayout>
                  <EventForm />
                </PublicLayout>
              </ProtectedRoute>
            } />

            <Route path="/events/:id/edit" element={
              <OwnerProtectedRoute resourceType="event">
                <PublicLayout>
                  <EventForm />
                </PublicLayout>
              </OwnerProtectedRoute>
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
                  <CompanyForm />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/companies/:id/edit" element={
              <ProtectedRoute>
                <AdminLayout>
                  <CompanyForm />
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
                  <EventForm />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/events/:id/edit" element={
              <ProtectedRoute>
                <AdminLayout>
                  <EventForm />
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
