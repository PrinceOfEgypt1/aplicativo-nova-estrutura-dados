// src/components/DataStructures/Vetor/VectorCell.tsx
import * as React from 'react';

interface VectorCellProps {
    value?: number;
    indice: number;
    destacado: boolean;
}

const VectorCell: React.FC<VectorCellProps> = ({ value, indice, destacado }) => {
    return (
        <div
            className={`w-14 h-14 rounded relative flex items-center justify-center
            ${value !== undefined ? 'bg-purple-600' : 'bg-gray-700'}
            ${destacado ? 'ring-2 ring-blue-400' : ''}
            `}

            data-testid={`vector-cell-${indice}`} // Adicione data-testid para testes
        >
            <span className="absolute top-1 left-1 text-xs">{indice}</span>
            {value}
        </div>
    );
};


export default VectorCell;