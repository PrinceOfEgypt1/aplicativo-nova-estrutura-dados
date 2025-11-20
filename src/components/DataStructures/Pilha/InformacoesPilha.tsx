/**
 * Componente InformacoesPilha
 *
 * @remarks
 * Exibe informações educacionais sobre a Pilha (Stack) e lista todos os métodos disponíveis
 * com suas descrições e requisitos.
 */

import { metodosInfo } from './metodosPilha';

/**
 * Componente que renderiza informações sobre a estrutura Pilha
 *
 * @returns Elemento React com informações e documentação da Pilha
 */
export function InformacoesPilha() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Pilha (Stack)</h2>
      <p className="text-gray-300">
        Pilha é uma estrutura de dados linear que segue o princípio LIFO (Last In, First Out).
        O último elemento inserido é o primeiro a ser removido, como uma pilha de pratos.
        Todas as operações principais (push e pop) ocorrem no topo da pilha.
      </p>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Características Principais</h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          <li>Acesso restrito: apenas o topo é acessível</li>
          <li>Operações em tempo constante O(1)</li>
          <li>Ideal para backtracking e chamadas de função</li>
          <li>Uso comum em navegadores (histórico de volta)</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Métodos Disponíveis</h3>
        <ul className="space-y-2">
          {Object.entries(metodosInfo).map(([chave, metodo]) => (
            <li key={chave} className="border-l-4 border-rose-500 pl-4 bg-gray-800/50 p-3 rounded">
              <h4 className="font-mono font-bold text-rose-400">{metodo.titulo}</h4>
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
        <h3 className="text-xl font-semibold text-white">Casos de Uso</h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          <li>Avaliação de expressões matemáticas</li>
          <li>Algoritmos de backtracking (DFS)</li>
          <li>Gerenciamento de chamadas de função (call stack)</li>
          <li>Verificação de balanceamento de parênteses</li>
          <li>Histórico de navegação (undo/redo)</li>
        </ul>
      </div>
    </div>
  );
}
