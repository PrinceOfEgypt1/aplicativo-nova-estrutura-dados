/**
 * Componente InformacoesArvoreBinaria
 *
 * @remarks
 * Exibe informações educacionais sobre a Árvore Binária de Busca
 */

import * as React from 'react';

/**
 * Componente de informações da Árvore Binária
 */
const InformacoesArvoreBinaria: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-3 text-purple-400">Sobre a Árvore Binária de Busca</h3>

      <div className="space-y-3 text-gray-300">
        <p>
          <strong className="text-white">Definição:</strong> Uma Árvore Binária de Busca (BST) é uma
          estrutura de dados hierárquica onde cada nó possui no máximo dois filhos, e para todo nó:
        </p>

        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Valores na subárvore esquerda são menores</li>
          <li>Valores na subárvore direita são maiores</li>
          <li>Não há valores duplicados</li>
        </ul>

        <div className="mt-4">
          <strong className="text-white">Complexidade de Tempo:</strong>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Busca: O(log n) médio, O(n) pior caso</li>
            <li>Inserção: O(log n) médio, O(n) pior caso</li>
            <li>Remoção: O(log n) médio, O(n) pior caso</li>
            <li>Travessia: O(n)</li>
          </ul>
        </div>

        <div className="mt-4">
          <strong className="text-white">Casos de Uso:</strong>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Implementação de dicionários e conjuntos</li>
            <li>Sistemas de indexação de bancos de dados</li>
            <li>Algoritmos de busca eficiente</li>
            <li>Ordenação de dados dinâmicos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformacoesArvoreBinaria;
