// src/components/DataStructures/ArvoreBinaria/VisualizacaoArvoreBinaria.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Interface para definir a estrutura de um nó da árvore
interface No {
  valor: number;
  esquerda: No | null;
  direita: No | null;
}

// Props que nosso componente receberá
interface VisualizacaoArvoreBinariaProps {
  raiz: No | null;
  // Podemos adicionar mais props conforme necessário
}

// Componente para renderizar um único nó da árvore
const No: React.FC<{ valor: number }> = ({ valor }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
    >
      {valor}
    </motion.div>
  );
};

// Componente para renderizar uma aresta (linha conectando os nós)
const Aresta: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({
  x1,
  y1,
  x2,
  y2,
}) => {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="white"
      strokeWidth="2"
    />
  );
};

// Componente principal de visualização da árvore
export const VisualizacaoArvoreBinaria: React.FC<VisualizacaoArvoreBinariaProps> = ({ raiz }) => {
  // Se não houver raiz, mostramos uma mensagem informativa
  if (!raiz) {
    return (
      <div className="flex items-center justify-center h-64 text-white">
        Árvore vazia. Adicione alguns nós para começar.
      </div>
    );
  }

  // Função recursiva para renderizar a árvore
  const renderizarArvore = (no: No | null, nivel: number, posicaoX: number): JSX.Element | null => {
    if (!no) return null;

    const espacamento = 80; // Espaçamento entre nós
    const espacamentoVertical = 60; // Espaçamento vertical entre níveis

    return (
      <g key={`${no.valor}-${nivel}-${posicaoX}`}>
        {/* Renderiza as arestas para os filhos */}
        {no.esquerda && (
          <Aresta
            x1={posicaoX}
            y1={nivel * espacamentoVertical}
            x2={posicaoX - espacamento}
            y2={(nivel + 1) * espacamentoVertical}
          />
        )}
        {no.direita && (
          <Aresta
            x1={posicaoX}
            y1={nivel * espacamentoVertical}
            x2={posicaoX + espacamento}
            y2={(nivel + 1) * espacamentoVertical}
          />
        )}

        {/* Posiciona o nó atual */}
        <foreignObject
          x={posicaoX - 24}
          y={nivel * espacamentoVertical - 24}
          width="48"
          height="48"
        >
          <No valor={no.valor} />
        </foreignObject>

        {/* Renderiza os filhos recursivamente */}
        {renderizarArvore(no.esquerda, nivel + 1, posicaoX - espacamento)}
        {renderizarArvore(no.direita, nivel + 1, posicaoX + espacamento)}
      </g>
    );
  };

  return (
    <div className="w-full overflow-auto">
      <svg
        width="100%"
        height="400"
        viewBox="-200 0 400 300"
        preserveAspectRatio="xMidYMid meet"
      >
        {renderizarArvore(raiz, 1, 0)}
      </svg>
    </div>
  );
};