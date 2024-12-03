// src/context/AppProvider.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from './AppContext';
import { DataStructureProvider } from './DataStructureContext';

// Interface que define as props aceitas pelo Provider
interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Hook de navegação do React Router
  let navigate;
try {
  navigate = useNavigate();
} catch {
  navigate = () => {
      console.warn("Navigation attempted outside of a Router context.");
    };
}
  
  // Estado para controle do tema
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Recupera o tema salvo no localStorage ou usa 'dark' como padrão
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
  });
  
  // Estado para controle da autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verifica se existe um token de autenticação no localStorage
    return !!localStorage.getItem('auth-token');
  });
  
  // Estado para dados do usuário (opcional)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  // Efeito para aplicar o tema ao documento HTML
  useEffect(() => {
    // Remove classes antigas e aplica o novo tema
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Salva o tema no localStorage para persistência
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Função para alternar entre temas claro e escuro
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Função para realizar o logout do usuário
  const logout = () => {
    // Remove dados de autenticação
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    
    // Atualiza o estado da aplicação
    setIsAuthenticated(false);
    setUser(undefined);
    
    // Redireciona para a página inicial
    navigate('/', { replace: true });
  };

  // Agrupamos todos os valores e funções que serão disponibilizados pelo contexto
  const contextValue: AppContextType = {
    theme,
    toggleTheme,
    isAuthenticated,
    logout,
    user
  };

  // O Provider disponibiliza o contexto para toda a árvore de componentes
  return (
    <AppContext.Provider value={contextValue}>
      <DataStructureProvider>
        {children}
      </DataStructureProvider>
    </AppContext.Provider>
  );
};