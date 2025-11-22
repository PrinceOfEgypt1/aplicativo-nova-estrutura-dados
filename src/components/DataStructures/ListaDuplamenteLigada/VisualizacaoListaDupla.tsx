/**
 * Componente VisualizacaoListaDupla
 *
 * @remarks
 * Interface principal para visualização e manipulação da estrutura de dados Lista Duplamente Ligada.
 * Permite executar operações com feedback visual em tempo real.
 */

import * as React from 'react';
import { useListaDupla } from './useListaDupla';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { metodosDisponiveis, type MetodoListaDupla } from './metodosListaDupla';

interface HistoricoOperacao {
  operacao: string;
  timestamp: number;
  status: 'success' | 'error';
}

/**
 * Componente principal de visualização da Lista Duplamente Ligada
 *
 * @returns Elemento React com a interface completa da Lista Duplamente Ligada
 */
export function VisualizacaoListaDupla() {
  const navigate = useNavigate();
  const {
    inserirNoInicio,
    inserirNoFim,
    inserirNaPosicao,
    removerDoInicio,
    removerDoFim,
    removerDaPosicao,
    buscar,
    obterPorIndice,
    atualizar,
    inverter,
    limpar,
    info,
    nosVisuais,
  } = useListaDupla();

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [valor, setValor] = React.useState('');
  const [indice, setIndice] = React.useState('');
  const [mensagemAcao, setMensagemAcao] = React.useState('');
  const [historico, setHistorico] = React.useState<HistoricoOperacao[]>([]);
  const [indiceDestacado, setIndiceDestacado] = React.useState<number | null>(null);

  const capacidadeMaxima = 1000;

  const registrarOperacao = React.useCallback((operacao: string, status: 'success' | 'error' = 'success') => {
    setHistorico((prev) => [
      ...prev,
      {
        operacao,
        timestamp: Date.now(),
        status,
      },
    ]);
  }, []);

  /**
   * Manipula a execução de um método da lista
   *
   * @param e - Evento de submit do formulário
   */
  const executar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const metodoInfo = metodosDisponiveis.find((m) => m.id === metodoAtual);
      if (!metodoInfo) return;

      let mensagemSucesso = '';
      let destacar: number | null = null;

      switch (metodoAtual) {
        case 'inserirNoInicio': {
          const v = parseInt(valor);
          if (isNaN(v)) throw new Error('Valor inválido');
          inserirNoInicio(v);
          mensagemSucesso = `Valor ${v} inserido no início`;
          destacar = 0;
          break;
        }
        case 'inserirNoFim': {
          const v = parseInt(valor);
          if (isNaN(v)) throw new Error('Valor inválido');
          inserirNoFim(v);
          mensagemSucesso = `Valor ${v} inserido no fim`;
          destacar = info.tamanho; // Será o novo último índice
          break;
        }
        case 'inserirNaPosicao': {
          const v = parseInt(valor);
          const i = parseInt(indice);
          if (isNaN(v) || isNaN(i)) throw new Error('Valor ou índice inválido');
          inserirNaPosicao(i, v);
          mensagemSucesso = `Valor ${v} inserido na posição ${i}`;
          destacar = i;
          break;
        }
        case 'removerDoInicio': {
          const resultado = removerDoInicio();
          if (resultado !== null) {
            mensagemSucesso = `Valor ${resultado} removido do início`;
          } else {
            throw new Error('Lista vazia');
          }
          break;
        }
        case 'removerDoFim': {
          const resultado = removerDoFim();
          if (resultado !== null) {
            mensagemSucesso = `Valor ${resultado} removido do fim`;
          } else {
            throw new Error('Lista vazia');
          }
          break;
        }
        case 'removerDaPosicao': {
          const i = parseInt(indice);
          if (isNaN(i)) throw new Error('Índice inválido');
          const resultado = removerDaPosicao(i);
          if (resultado !== null) {
            mensagemSucesso = `Valor ${resultado} removido da posição ${i}`;
          } else {
            throw new Error('Posição inválida');
          }
          break;
        }
        case 'buscar': {
          const v = parseInt(valor);
          if (isNaN(v)) throw new Error('Valor inválido');
          const resultado = buscar(v);
          if (resultado !== -1) {
            mensagemSucesso = `Valor ${v} encontrado na posição ${resultado}`;
            destacar = resultado;
          } else {
            mensagemSucesso = `Valor ${v} não encontrado na lista`;
          }
          break;
        }
        case 'obterPorIndice': {
          const i = parseInt(indice);
          if (isNaN(i)) throw new Error('Índice inválido');
          const resultado = obterPorIndice(i);
          if (resultado !== null) {
            mensagemSucesso = `Valor na posição ${i}: ${resultado}`;
            destacar = i;
          } else {
            throw new Error('Índice fora dos limites');
          }
          break;
        }
        case 'atualizar': {
          const v = parseInt(valor);
          const i = parseInt(indice);
          if (isNaN(v) || isNaN(i)) throw new Error('Valor ou índice inválido');
          atualizar(i, v);
          mensagemSucesso = `Posição ${i} atualizada para ${v}`;
          destacar = i;
          break;
        }
        case 'inverter':
          inverter();
          mensagemSucesso = 'Lista invertida com sucesso';
          break;
        case 'tamanho':
          mensagemSucesso = `Tamanho da lista: ${info.tamanho}`;
          break;
        case 'limpar':
          limpar();
          mensagemSucesso = 'Lista limpa com sucesso';
          break;
        default:
          mensagemSucesso = 'Operação realizada com sucesso';
      }

      registrarOperacao(mensagemSucesso, 'success');
      setMensagemAcao(mensagemSucesso);
      setIndiceDestacado(destacar);

      // Limpar inputs
      setValor('');
      setIndice('');

      // Limpar destaque após 1.5s
      setTimeout(() => {
        setIndiceDestacado(null);
      }, 1500);
    } catch (error: unknown) {
      let mensagemErro = 'Erro desconhecido';
      if (typeof error === 'string') {
        mensagemErro = `Erro: ${error}`;
      } else if (error instanceof Error) {
        mensagemErro = `Erro: ${error.message}`;
      }

      registrarOperacao(mensagemErro, 'error');
      setMensagemAcao(mensagemErro);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Cabeçalho com navegação */}
      <div className="mb-6 flex justify-between items-center">
        <Button onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button onClick={() => window.close()} variant="destructive" aria-label="Sair">
          Sair
        </Button>
      </div>

      {/* Título e descrição */}
      <h1 className="text-xl font-bold mt-4">Lista Duplamente Ligada</h1>
      <p className="mt-4">Estrutura de dados linear com navegação bidirecional entre nós.</p>
      <span className="text-cyan-400">12 métodos disponíveis</span>

      {/* Visualização da lista (horizontal) */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <ul className="flex flex-row gap-2 min-h-[120px] items-center justify-start" role="list">
          {nosVisuais.length > 0 ? (
            nosVisuais.map((no, idx) => (
              <React.Fragment key={idx}>
                {/* Nó */}
                <li
                  role="listitem"
                  className={`
                    flex flex-col items-center p-3 rounded-lg border-2 min-w-[100px] transition-all duration-300
                    ${indiceDestacado === idx ? 'bg-yellow-400 text-gray-900 border-yellow-600 scale-110' : 'bg-gray-700 text-white border-gray-600'}
                    ${no.isHead ? 'border-green-400' : ''}
                    ${no.isTail ? 'border-purple-400' : ''}
                  `}
                  aria-label={`Elemento ${no.valor} na posição ${idx}${no.isHead ? ', cabeça da lista' : ''}${no.isTail ? ', cauda da lista' : ''}`}
                >
                  {/* Indicadores de cabeça/cauda */}
                  <div className="h-5 mb-1 text-xs font-semibold">
                    {no.isHead && <span className="text-green-400">HEAD</span>}
                    {no.isTail && <span className="text-purple-400">TAIL</span>}
                  </div>

                  {/* Valor */}
                  <div className="font-bold text-lg mb-1">{no.valor}</div>

                  {/* Índice */}
                  <div className="text-xs text-gray-400">idx: {no.indice}</div>

                  {/* Indicadores prev/next */}
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <span>{no.hasPrev ? '←' : ' '}</span>
                    <span className="mx-1">⟷</span>
                    <span>{no.hasNext ? '→' : ' '}</span>
                  </div>
                </li>

                {/* Setas bidirecionais entre nós */}
                {no.hasNext && (
                  <div className="flex items-center text-gray-400 text-xl">
                    ⟷
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <li role="listitem" className="text-gray-400 text-center py-8 w-full">
              Lista vazia. Use Inserir Início/Fim para adicionar elementos.
            </li>
          )}
        </ul>
      </div>

      {/* Grid de métodos */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {metodosDisponiveis.map((metodo) => (
          <button
            key={metodo.id}
            onClick={() => setMetodoAtual(metodo.id)}
            className={`p-2 rounded text-left flex items-center gap-2 ${
              metodoAtual === metodo.id ? 'bg-cyan-600' : 'bg-gray-700'
            } hover:bg-cyan-500 transition-colors`}
            aria-label={`Selecionar método ${metodo.titulo}`}
          >
            <span role="img" aria-hidden="true">
              {metodo.icone}
            </span>
            <span>{metodo.titulo}</span>
          </button>
        ))}
      </div>

      {/* Formulário de execução */}
      {metodoAtual && (
        <div className="mb-6 bg-gray-800 p-4 rounded">
          <p className="text-gray-300 mb-4">
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.mensagemExplicativa}
          </p>
          <form onSubmit={executar} className="flex flex-wrap md:flex-nowrap items-center gap-4">
            {/* Input de índice (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('indice') && (
              <input
                type="text"
                value={indice}
                onChange={(e) => setIndice(e.target.value)}
                placeholder="Índice (0-based)"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                aria-label="Índice do elemento"
              />
            )}

            {/* Input de valor (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('valor') && (
              <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor (número inteiro)"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                aria-label="Valor do elemento"
              />
            )}

            {/* Botão de executar */}
            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors font-semibold"
              aria-label="Executar operação"
            >
              Executar
            </button>
          </form>
        </div>
      )}

      {/* Mensagem de feedback */}
      {mensagemAcao && (
        <div className="mb-6 bg-gray-800 p-3 rounded">
          <p
            className={`${mensagemAcao.startsWith('Erro') ? 'text-red-400' : 'text-green-400'}`}
            role="alert"
          >
            {mensagemAcao}
          </p>
        </div>
      )}

      {/* Informações de estado */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-cyan-400">Tamanho:</span>
          <span className="font-bold">{info.tamanho}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-cyan-400">Primeiro:</span>
          <span className="font-bold">{info.primeiro ?? 'N/A'}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-cyan-400">Último:</span>
          <span className="font-bold">{info.ultimo ?? 'N/A'}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-cyan-400">Estado:</span>
          <span className="font-bold">{info.estaVazia ? 'Vazio' : 'Com elementos'}</span>
        </div>
      </div>

      {/* Histórico de operações */}
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold mb-3">Histórico de Operações</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {historico.length > 0 ? (
            historico.map((op, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  op.status === 'error' ? 'bg-red-900/30 border-l-4 border-red-500' : 'bg-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{op.operacao}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(op.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-2">Nenhuma operação executada ainda</p>
          )}
        </div>
      </div>
    </div>
  );
}
