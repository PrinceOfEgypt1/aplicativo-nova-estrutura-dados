// src/context/AppContext.tsx
import { createContext } from 'react';

// Definimos a interface que descreve todos os valores e funções disponíveis no contexto
export interface AppContextType {
  // Controle do tema da aplicação
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Gerenciamento de autenticação e sessão
  isAuthenticated: boolean;
  logout: () => void;
  
  // Dados do usuário (opcional, pode ser expandido conforme necessidade)
  user?: {
    name: string;
    email: string;
  };
}

// Criamos o contexto com valores padrão que serão sobrescritos pelo Provider
export const AppContext = createContext<AppContextType>({
  // Valores iniciais do tema
  theme: 'dark', // Começamos com o tema escuro por padrão
  toggleTheme: () => {}, // Função vazia que será substituída pela implementação real
  
  // Valores iniciais de autenticação
  isAuthenticated: false,
  logout: () => {}, // Função vazia que será substituída pela implementação real
});