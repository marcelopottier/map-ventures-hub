
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'admin' | 'company' | 'organizer' | 'visitor';
  companyId?: string; // Para usuários tipo 'company'
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  canEdit: (resourceType: 'company' | 'event', resourceId: string, ownerId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Geral',
    email: 'admin@admin.com',
    type: 'admin'
  },
  {
    id: '2',
    name: 'TechJoinville Solutions',
    email: 'contato@techjoinville.com.br',
    type: 'company',
    companyId: '1'
  },
  {
    id: '3',
    name: 'Metalúrgica Norte SC',
    email: 'contato@metalurgicnorte.com.br',
    type: 'company',
    companyId: '2'
  },
  {
    id: '4',
    name: 'Organizador de Eventos',
    email: 'organizador@eventos.com',
    type: 'organizer'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se existe usuário logado no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção seria uma chamada para API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === '123456') { // Password simples para mock
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const canEdit = (resourceType: 'company' | 'event', resourceId: string, ownerId?: string): boolean => {
    if (!user) return false;
    
    // Admin pode editar tudo
    if (user.type === 'admin') return true;
    
    // Empresa pode editar apenas sua própria empresa
    if (resourceType === 'company' && user.type === 'company') {
      return user.companyId === resourceId;
    }
    
    // Organizador pode editar apenas eventos que criou
    if (resourceType === 'event' && user.type === 'organizer') {
      return user.id === ownerId;
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      canEdit
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
