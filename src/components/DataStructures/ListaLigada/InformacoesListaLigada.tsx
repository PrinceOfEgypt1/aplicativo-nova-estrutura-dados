/**
 * Componente InformacoesListaLigada
 *
 * @remarks
 * Exibe informações educacionais sobre a Lista Ligada (Linked List) e lista todos os métodos disponíveis
 * com suas descrições e requisitos.
 */

import { metodosInfo } from './metodosListaLigada';

/**
 * Componente que renderiza informações sobre a estrutura Lista Ligada
 *
 * @returns Elemento React com informações e documentação da Lista Ligada
 */
export function InformacoesListaLigada() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Lista Ligada (Linked List)</h2>
      <p className="text-gray-300">
        Lista Ligada é uma estrutura de dados dinâmica composta por nós conectados através de ponteiros.
        Cada nó contém um valor e uma referência (ponteiro) para o próximo nó da sequência.
        O primeiro nó é chamado de cabeça (head), e o último nó aponta para null.
      </p>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Características Principais</h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          <li>Tamanho dinâmico - cresce e diminui conforme necessário</li>
          <li>Inserção e remoção no início em tempo constante O(1)</li>
          <li>Inserção e remoção no final em tempo linear O(n)</li>
          <li>Acesso sequencial - navegação nó por nó</li>
          <li>Não requer memória contígua</li>
          <li>Ideal para inserções e remoções frequentes</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Métodos Disponíveis</h3>
        <ul className="space-y-2">
          {Object.entries(metodosInfo).map(([chave, metodo]) => (
            <li key={chave} className="border-l-4 border-green-500 pl-4 bg-gray-800/50 p-3 rounded">
              <h4 className="font-mono font-bold text-green-400">{metodo.titulo}</h4>
              <p className="text-sm text-gray-300">
                {metodo.descricao}
              </p>
              {metodo.requisitos.length > 0 && (
                <p className="text-sm font-mono text-gray-400 mt-1">
                  Parâmetros: {metodo.requisitos.join(', ')}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Complexidade de Tempo</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="bg-gray-800/50 p-2 rounded">
            <span className="font-semibold text-green-400">Inserir no início:</span> O(1)
          </li>
          <li className="bg-gray-800/50 p-2 rounded">
            <span className="font-semibold text-green-400">Inserir no fim:</span> O(n)
          </li>
          <li className="bg-gray-800/50 p-2 rounded">
            <span className="font-semibold text-green-400">Remover do início:</span> O(1)
          </li>
          <li className="bg-gray-800/50 p-2 rounded">
            <span className="font-semibold text-green-400">Remover do fim:</span> O(n)
          </li>
          <li className="bg-gray-800/50 p-2 rounded">
            <span className="font-semibold text-green-400">Buscar elemento:</span> O(n)
          </li>
          <li className="bg-gray-800/50 p-2 rounded">
            <span className="font-semibold text-green-400">Acesso por índice:</span> O(n)
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Casos de Uso</h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          <li>Implementação de outras estruturas (pilhas, filas)</li>
          <li>Gerenciamento de memória (listas de blocos livres)</li>
          <li>Histórico de navegação em browsers</li>
          <li>Listas de reprodução de música</li>
          <li>Tabelas hash com encadeamento</li>
          <li>Algoritmos de grafos (listas de adjacência)</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Vantagens vs Desvantagens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-900/20 p-3 rounded">
            <h4 className="font-semibold text-green-400 mb-2">Vantagens</h4>
            <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
              <li>Tamanho dinâmico</li>
              <li>Inserção/remoção eficiente no início</li>
              <li>Sem desperdício de memória</li>
              <li>Facilita reorganização</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-3 rounded">
            <h4 className="font-semibold text-red-400 mb-2">Desvantagens</h4>
            <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
              <li>Acesso sequencial apenas</li>
              <li>Memória extra para ponteiros</li>
              <li>Não permite acesso direto</li>
              <li>Cache locality ruim</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
