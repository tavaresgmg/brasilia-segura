"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthContextType, LoginCredentials, RegisterData } from '@/lib/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

// Usuários mockados
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@brasilia.gov.br',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin' as const,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'joao@gmail.com',
    password: '123456',
    name: 'João Silva',
    role: 'citizen' as const,
    points: 150,
    level: 'Prata',
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '3',
    email: 'maria@hotmail.com',
    password: '123456',
    name: 'Maria Santos',
    role: 'citizen' as const,
    points: 320,
    level: 'Ouro',
    createdAt: new Date('2024-02-20'),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('brasilia-segura-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Recriar cookie se o usuário existir
      document.cookie = 'brasilia-segura-auth=true; path=/';
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!foundUser) {
      throw new Error('Email ou senha inválidos');
    }

    const { password, ...userWithoutPassword } = foundUser;
    const loggedUser = userWithoutPassword as User;
    
    setUser(loggedUser);
    localStorage.setItem('brasilia-segura-user', JSON.stringify(loggedUser));
    
    // Setar cookie para o middleware
    document.cookie = 'brasilia-segura-auth=true; path=/';
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar se email já existe
    if (MOCK_USERS.some(u => u.email === data.email)) {
      throw new Error('Email já cadastrado');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: 'citizen',
      points: 0,
      level: 'Bronze',
      createdAt: new Date(),
    };

    setUser(newUser);
    localStorage.setItem('brasilia-segura-user', JSON.stringify(newUser));
    
    // Setar cookie para o middleware
    document.cookie = 'brasilia-segura-auth=true; path=/';
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('brasilia-segura-user');
    
    // Remover cookie
    document.cookie = 'brasilia-segura-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}