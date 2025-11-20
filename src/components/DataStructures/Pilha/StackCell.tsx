/**
 * Componente StackCell
 *
 * @remarks
 * Representa uma célula individual na visualização da Pilha.
 * Diferente do VectorCell, este componente é otimizado para layout vertical
 * e destaca visualmente o topo da pilha.
 */

import React from 'react';

/**
 * Props do componente StackCell
 */
export interface StackCellProps {
  /** Valor numérico da célula */
  value: number;
  /** Índice da célula na pilha (0 = fundo, length-1 = topo) */
  indice: number;
  /** Se a célula está destacada (para feedback visual de operações) */
  destacado: boolean;
  /** Se é o elemento do topo da pilha */
  isTopo: boolean;
}

/**
 * Componente que renderiza uma célula da pilha
 *
 * @param props - Propriedades do componente
 * @returns Elemento React representando a célula
 *
 * @example
 * ```tsx
 * <StackCell
 *   value={42}
 *   indice={0}
 *   destacado={false}
 *   isTopo={false}
 * />
 * ```
 */
const StackCell: React.FC<StackCellProps> = ({ value, indice, destacado, isTopo }) => {
  return (
    <li
      className={`
        w-full h-14
        rounded relative
        flex items-center justify-center
        text-white font-semibold text-lg
        transition-all duration-300
        bg-rose-600 hover:bg-rose-500
        ${destacado ? 'ring-4 ring-yellow-400 shadow-lg scale-105' : ''}
        ${isTopo ? 'ring-2 ring-blue-400 font-bold' : ''}
      `}
      data-testid={`stack-cell-${indice}`}
      aria-label={`Elemento ${indice}, valor ${value}${isTopo ? ' (topo)' : ''}`}
      role="listitem"
    >
      {/* Índice no canto inferior esquerdo */}
      <span className="absolute bottom-1 left-2 text-xs text-rose-200 font-normal">
        {indice}
      </span>

      {/* Indicador de topo */}
      {isTopo && (
        <span className="absolute top-1 right-2 text-xs text-blue-200 font-bold">
          TOPO
        </span>
      )}

      {/* Valor principal */}
      <span className="text-center">{value}</span>
    </li>
  );
};

export default StackCell;
