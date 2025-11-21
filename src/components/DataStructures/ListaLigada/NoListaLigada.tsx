/**
 * Componente NoListaLigada
 *
 * @remarks
 * Representa um nó individual na visualização da Lista Ligada.
 * Inclui visualização da ligação (ponteiro) para o próximo nó.
 */

import React from 'react';

/**
 * Props do componente NoListaLigada
 */
export interface NoListaLigadaProps {
  /** Valor numérico do nó */
  value: number;
  /** Índice do nó na lista (0 = cabeça) */
  indice: number;
  /** Se o nó está destacado (para feedback visual de operações) */
  destacado: boolean;
  /** Se é o nó cabeça (primeiro da lista) */
  isCabeca: boolean;
  /** Se é o último nó da lista (aponta para null) */
  isUltimo: boolean;
}

/**
 * Componente que renderiza um nó da lista ligada
 *
 * @param props - Propriedades do componente
 * @returns Elemento React representando o nó
 *
 * @example
 * ```tsx
 * <NoListaLigada
 *   value={42}
 *   indice={0}
 *   destacado={false}
 *   isCabeca={true}
 *   isUltimo={false}
 * />
 * ```
 */
const NoListaLigada: React.FC<NoListaLigadaProps> = ({
  value,
  indice,
  destacado,
  isCabeca,
  isUltimo
}) => {
  return (
    <div className="flex items-center">
      {/* Nó */}
      <div
        className={`
          min-w-[80px] h-16
          rounded relative
          flex items-center justify-center
          text-white font-semibold text-lg
          transition-all duration-300
          bg-green-600 hover:bg-green-500
          ${destacado ? 'ring-4 ring-yellow-400 shadow-lg scale-105' : ''}
          ${isCabeca ? 'ring-2 ring-cyan-400 font-bold' : ''}
        `}
        data-testid={`node-cell-${indice}`}
        aria-label={`Nó ${indice}, valor ${value}${isCabeca ? ' (cabeça)' : ''}${isUltimo ? ' (último)' : ''}`}
        role="listitem"
      >
        {/* Índice no canto superior esquerdo */}
        <span className="absolute top-1 left-2 text-xs text-green-200 font-normal">
          {indice}
        </span>

        {/* Indicador de cabeça */}
        {isCabeca && (
          <span className="absolute bottom-1 left-2 text-xs text-cyan-200 font-bold">
            CABEÇA
          </span>
        )}

        {/* Valor principal */}
        <span className="text-center">{value}</span>
      </div>

      {/* Seta de ligação */}
      {!isUltimo ? (
        <div className="flex items-center mx-2">
          <span className="text-green-500 text-2xl font-bold">’</span>
        </div>
      ) : (
        <div className="flex items-center mx-2">
          <span className="text-gray-500 text-xl">’ null</span>
        </div>
      )}
    </div>
  );
};

export default NoListaLigada;
