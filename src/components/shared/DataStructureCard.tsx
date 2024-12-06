// src/context/DataStructureContext.tsx
import { createContext, useContext } from 'react';

interface DataStructureContextType {
  activeStructure: string | null;
  setActiveStructure: (structure: string) => void;
  isReady: boolean;
}

const initialState: DataStructureContextType = {
  activeStructure: null,
  setActiveStructure: () => {},
  isReady: false,
};

export const DataStructureContext = createContext<DataStructureContextType>(initialState);

export const DataStructureProvider: React.FC<{}> = ({}) => (
  <DataStructureContext.Provider value={initialState}>
    {/* children */}
  </DataStructureContext.Provider>
);


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