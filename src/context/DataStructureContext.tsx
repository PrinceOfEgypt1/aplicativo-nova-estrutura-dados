// src/context/DataStructureContext.tsx
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';

interface DataStructureContextType {
  activeStructure: string | null;
  setActiveStructure: (structure: string) => void;
  isReady: boolean;
}

const initialState: DataStructureContextType = {
  activeStructure: null,
  setActiveStructure: () => {
    console.warn('DataStructureContext not initialized');
  },
  isReady: false,
};

export const DataStructureContext =
  createContext<DataStructureContextType>(initialState);

export function DataStructureProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeStructure, setActiveStructure] = useState<string | null>(null);
  const location = useLocation();

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
    isReady: true,
  };

  return (
    <DataStructureContext.Provider value={value}>
      {children}
    </DataStructureContext.Provider>
  );
}

export const useDataStructure = () => {
  const context = useContext(DataStructureContext);
  if (!context) {
    throw new Error(
      'useDataStructure must be used within a DataStructureProvider.'
    );
  }
  if (!context.isReady) {
    throw new Error('DataStructureContext is not ready.');
  }
  return context;
};
