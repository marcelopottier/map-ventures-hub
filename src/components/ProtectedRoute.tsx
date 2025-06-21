
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // TODO: Implementar verificação real de autenticação quando conectar Supabase
  // Por enquanto, sempre permitir acesso para desenvolvimento
  const isAuthenticated = true // Simular usuário logado

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
