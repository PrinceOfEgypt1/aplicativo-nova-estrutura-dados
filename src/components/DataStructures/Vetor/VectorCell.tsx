// src/components/DataStructures/Vetor/VectorCell.tsx
import * as React from 'react';

interface VectorCellProps {
  value?: number;
  indice: number;
  destacado: boolean;
}

const VectorCell: React.FC<VectorCellProps> = ({ value, indice, destacado }) => {
  return (
    <li
      className={`
        min-w-[3.5rem] h-14 
        rounded relative 
        flex items-center justify-center
        ${value !== undefined ? 'bg-purple-600' : 'bg-gray-700'}
        ${destacado ? 'ring-2 ring-blue-400' : ''}
      `}
      data-testid={`vector-cell-${indice}`}
      aria-label={`Célula ${indice}, valor ${value !== undefined ? value : 'vazio'}`}
    >
      <span className="absolute top-1 left-1 text-xs">{indice}</span>
      {value}
    </li>
  );
};

export default VectorCell;