// src/context/DataStructureContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Definimos uma interface mais completa para o contexto
interface DataStructureContextType {
  activeStructure: string | null;
  setActiveStructure: (structure: string) => void;
  // Adicionamos uma função para verificar se o provider está presente
  isReady: boolean;
}

// Melhoramos o estado inicial com um valor para isReady
const initialState: DataStructureContextType = {
  activeStructure: null,
  setActiveStructure: () => {
    console.warn('DataStructureContext not initialized');
  },
  isReady: false
};

// Criamos um símbolo único para verificar se o contexto já foi criado
const DataStructureSymbol = Symbol('DataStructureContext');

// Criamos o contexto com o estado inicial melhorado
export const DataStructureContext = createContext<DataStructureContextType>(initialState);

// Adicionamos um guard para evitar múltiplas instâncias do provider
let isProviderMounted = false;

export function DataStructureProvider({ children }: { children: ReactNode }) {
  // Verificamos se o provider já está montado
  if (isProviderMounted) {
    console.error('DataStructureProvider is already mounted. Avoid using multiple instances.');
    // Retornamos apenas os children para não quebrar a aplicação
    return <>{children}</>;
  }

  const [activeStructure, setActiveStructure] = useState<string | null>(null);
  const location = useLocation();

  // Marcamos que o provider está montado
  useEffect(() => {
    isProviderMounted = true;
    return () => {
      isProviderMounted = false;
    };
  }, []);

  // Atualizamos a estrutura ativa baseado na URL
  useEffect(() => {
    const path = location.pathname;
    const match = path.match(/\/estrutura\/(.+)/);
    if (match) {
      setActiveStructure(match[1]);
    } else {
      setActiveStructure(null);
    }
  }, [location.pathname]);

  const value = {
    activeStructure,
    setActiveStructure,
    isReady: true
  };

  // Adicionamos uma chave única ao provider para garantir uma única instância
  return (
    <DataStructureContext.Provider value={value} key={DataStructureSymbol.toString()}>
      {children}
    </DataStructureContext.Provider>
  );
}

// Melhoramos o hook useDataStructure com verificações mais robustas
export const useDataStructure = () => {
  const context = useContext(DataStructureContext);
  
  if (!context) {
    throw new Error(
      'useDataStructure must be used within a DataStructureProvider. ' +
      'Ensure it is wrapped in the component hierarchy.'
    );
  }

  if (!context.isReady) {
    throw new Error(
      'DataStructureContext is not ready yet. ' +
      'Ensure you are using it after the provider has been initialized.'
    );
  }

  return context;
};