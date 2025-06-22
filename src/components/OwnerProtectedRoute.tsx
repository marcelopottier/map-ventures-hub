
import { Navigate, useParams } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { companiesApi, eventsApi, Company, Event } from "@/services/mockApi"

interface OwnerProtectedRouteProps {
  children: React.ReactNode
  resourceType: 'company' | 'event'
}

export function OwnerProtectedRoute({ children, resourceType }: OwnerProtectedRouteProps) {
  const { id } = useParams<{ id: string }>()
  const { user, canEdit, isAuthenticated } = useAuth()

  // Usar tipos genéricos baseados no resourceType
  const { data: resource, isLoading } = useQuery({
    queryKey: [resourceType, id],
    queryFn: async (): Promise<Company | Event | null> => {
      if (resourceType === 'company') {
        return companiesApi.getById(id!)
      } else {
        return eventsApi.getById(id!)
      }
    },
    enabled: !!id && isAuthenticated
  })

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!resource) {
    return <Navigate to="/404" replace />
  }

  // Verificar se o usuário pode editar este recurso
  if (!canEdit(resourceType, id!, resource.ownerId)) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
        <p className="text-muted-foreground mb-4">
          Você não tem permissão para editar este {resourceType === 'company' ? 'empresa' : 'evento'}.
        </p>
        <p className="text-sm text-muted-foreground">
          Apenas o proprietário pode fazer alterações.
        </p>
      </div>
    )
  }

  return <>{children}</>
}
