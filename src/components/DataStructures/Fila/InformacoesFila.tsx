/**
 * Componente InformacoesFila
 *
 * @remarks
 * Exibe informações educacionais sobre a Fila (Queue) e lista todos os métodos disponíveis
 * com suas descrições e requisitos.
 */

import { metodosInfo } from './metodosFila';

/**
 * Componente que renderiza informações sobre a estrutura Fila
 *
 * @returns Elemento React com informações e documentação da Fila
 */
export function InformacoesFila() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Fila (Queue)</h2>
      <p className="text-gray-300">
        Fila é uma estrutura de dados linear que segue o princípio FIFO (First In, First Out).
        O primeiro elemento inserido é o primeiro a ser removido, como uma fila de atendimento.
        Os elementos entram por um lado (final) e saem pelo outro (frente).
      </p>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Características Principais</h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          <li>Acesso em ambas as pontas: frente e final</li>
          <li>Operações em tempo constante O(1)</li>
          <li>Ideal para processamento sequencial e agendamento</li>
          <li>Uso comum em sistemas de mensagens e buffers</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Métodos Disponíveis</h3>
        <ul className="space-y-2">
          {Object.entries(metodosInfo).map(([chave, metodo]) => (
            <li key={chave} className="border-l-4 border-blue-500 pl-4 bg-gray-800/50 p-3 rounded">
              <h4 className="font-mono font-bold text-blue-400">{metodo.titulo}</h4>
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
          <li>Sistemas de impressão (fila de trabalhos)</li>
          <li>Gerenciamento de processos no sistema operacional</li>
          <li>Algoritmos de busca em largura (BFS)</li>
          <li>Buffer de dados em streaming</li>
          <li>Fila de atendimento e agendamento de tarefas</li>
        </ul>
      </div>
    </div>
  );
}
