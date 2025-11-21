/**
 * Componente QueueCell
 *
 * @remarks
 * Representa uma célula individual na visualização da Fila.
 * Diferente do StackCell (vertical), este componente é otimizado para layout horizontal
 * e destaca visualmente a frente e o final da fila.
 */

import React from 'react';

/**
 * Props do componente QueueCell
 */
export interface QueueCellProps {
  /** Valor numérico da célula */
  value: number;
  /** Índice da célula na fila (0 = frente, length-1 = final) */
  indice: number;
  /** Se a célula está destacada (para feedback visual de operações) */
  destacado: boolean;
  /** Se é o elemento da frente da fila */
  isFrente: boolean;
  /** Se é o elemento do final da fila */
  isFinal: boolean;
}

/**
 * Componente que renderiza uma célula da fila
 *
 * @param props - Propriedades do componente
 * @returns Elemento React representando a célula
 *
 * @example
 * ```tsx
 * <QueueCell
 *   value={42}
 *   indice={0}
 *   destacado={false}
 *   isFrente={true}
 *   isFinal={false}
 * />
 * ```
 */
const QueueCell: React.FC<QueueCellProps> = ({
  value,
  indice,
  destacado,
  isFrente,
  isFinal
}) => {
  return (
    <li
      className={`
        min-w-[80px] h-16
        rounded relative
        flex items-center justify-center
        text-white font-semibold text-lg
        transition-all duration-300
        bg-blue-600 hover:bg-blue-500
        ${destacado ? 'ring-4 ring-yellow-400 shadow-lg scale-105' : ''}
        ${isFrente ? 'ring-2 ring-green-400 font-bold' : ''}
        ${isFinal ? 'ring-2 ring-purple-400 font-bold' : ''}
      `}
      data-testid={`queue-cell-${indice}`}
      aria-label={`Elemento ${indice}, valor ${value}${isFrente ? ' (frente)' : ''}${isFinal ? ' (final)' : ''}`}
      role="listitem"
    >
      {/* Índice no canto superior esquerdo */}
      <span className="absolute top-1 left-2 text-xs text-blue-200 font-normal">
        {indice}
      </span>

      {/* Indicador de frente */}
      {isFrente && (
        <span className="absolute bottom-1 left-2 text-xs text-green-200 font-bold">
          FRENTE
        </span>
      )}

      {/* Indicador de final */}
      {isFinal && !isFrente && (
        <span className="absolute bottom-1 right-2 text-xs text-purple-200 font-bold">
          FINAL
        </span>
      )}

      {/* Valor principal */}
      <span className="text-center">{value}</span>
    </li>
  );
};

export default QueueCell;
