import React, { createContext, useState, ReactNode } from 'react';  // removido useContext que não é usado

interface DataStructureContextType {
  activeStructure: string | null;
  setActiveStructure: React.Dispatch<React.SetStateAction<string | null>>;
  isReady: boolean;
}

interface DataStructureProviderProps {
  children: ReactNode;
}

const initialState: DataStructureContextType = {
  activeStructure: null,
  setActiveStructure: () => {},
  isReady: true,
};

export const DataStructureContext = createContext<DataStructureContextType>(initialState);

export const DataStructureProvider: React.FC<DataStructureProviderProps> = ({ children }) => {
  const [activeStructure, setActiveStructure] = useState<string | null>(null);
  const [isReady] = useState(true);

  const value = {
    activeStructure,
    setActiveStructure,
    isReady,
  };

  return (
    <DataStructureContext.Provider value={value}>
      {children}
    </DataStructureContext.Provider>
  );
};