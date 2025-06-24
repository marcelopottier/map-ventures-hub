import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function RedirectToEdit() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && user?.companyId) {
      // Se o usuário estiver logado, redireciona para editar sua empresa
      navigate(`/companies/${user.companyId}/edit`, { replace: true })
    } else if (!isAuthenticated) {
      // Se não estiver logado, redireciona para login
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  // Mostra loading enquanto redireciona
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecionando...</p>
      </div>
    </div>
  )
}