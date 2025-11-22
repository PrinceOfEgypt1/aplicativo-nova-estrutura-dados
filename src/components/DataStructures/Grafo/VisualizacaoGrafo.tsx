/**
 * Componente VisualizacaoGrafo
 *
 * @remarks
 * Interface principal para visualização e manipulação da estrutura de dados Grafo.
 * Permite executar operações com feedback visual em tempo real.
 */

import * as React from 'react';
import { useGrafo } from './useGrafo';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { metodosDisponiveis, type MetodoGrafo } from './metodosGrafo';

interface HistoricoOperacao {
  operacao: string;
  timestamp: number;
  status: 'success' | 'error';
}

/**
 * Componente principal de visualização do Grafo
 *
 * @returns Elemento React com a interface completa do Grafo
 */
export function VisualizacaoGrafo() {
  const navigate = useNavigate();
  const {
    adicionarVertice,
    removerVertice,
    adicionarAresta,
    removerAresta,
    buscaProfundidade,
    buscaLargura,
    limpar,
    info,
    grafo,
  } = useGrafo(false); // Grafo não-direcionado

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [vertice, setVertice] = React.useState('');
  const [origem, setOrigem] = React.useState('');
  const [destino, setDestino] = React.useState('');
  const [mensagemAcao, setMensagemAcao] = React.useState('');
  const [historico, setHistorico] = React.useState<HistoricoOperacao[]>([]);
  const [verticeDestacado, setVerticeDestacado] = React.useState<number | null>(null);

  const capacidadeMaxima = 100; // 0-99 vertices

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
   * Manipula a execução de um método do grafo
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
        case 'adicionarVertice': {
          const v = parseInt(vertice);
          if (isNaN(v)) throw new Error('Vértice inválido');
          adicionarVertice(v);
          mensagemSucesso = `Vértice ${v} adicionado ao grafo`;
          destacar = v;
          break;
        }
        case 'removerVertice': {
          const v = parseInt(vertice);
          if (isNaN(v)) throw new Error('Vértice inválido');
          removerVertice(v);
          mensagemSucesso = `Vértice ${v} removido do grafo`;
          break;
        }
        case 'adicionarAresta': {
          const o = parseInt(origem);
          const d = parseInt(destino);
          if (isNaN(o) || isNaN(d)) throw new Error('Origem ou destino inválido');
          adicionarAresta(o, d);
          mensagemSucesso = `Aresta ${o} → ${d} adicionada`;
          destacar = o;
          break;
        }
        case 'removerAresta': {
          const o = parseInt(origem);
          const d = parseInt(destino);
          if (isNaN(o) || isNaN(d)) throw new Error('Origem ou destino inválido');
          removerAresta(o, d);
          mensagemSucesso = `Aresta ${o} → ${d} removida`;
          break;
        }
        case 'buscaProfundidade': {
          const v = parseInt(vertice);
          if (isNaN(v)) throw new Error('Vértice inválido');
          const resultado = buscaProfundidade(v);
          mensagemSucesso = `DFS a partir de ${v}: [${resultado.join(' → ')}]`;
          break;
        }
        case 'buscaLargura': {
          const v = parseInt(vertice);
          if (isNaN(v)) throw new Error('Vértice inválido');
          const resultado = buscaLargura(v);
          mensagemSucesso = `BFS a partir de ${v}: [${resultado.join(' → ')}]`;
          break;
        }
        case 'obterVizinhos': {
          const v = parseInt(vertice);
          if (isNaN(v)) throw new Error('Vértice inválido');
          const vizinhos = grafo.obterVizinhos(v);
          mensagemSucesso = `Vizinhos de ${v}: [${vizinhos.join(', ')}]`;
          destacar = v;
          break;
        }
        case 'numeroVertices':
          mensagemSucesso = `Número total de vértices: ${grafo.numeroVertices()}`;
          break;
        case 'numeroArestas':
          mensagemSucesso = `Número total de arestas: ${grafo.numeroArestas()}`;
          break;
        case 'limpar':
          limpar();
          mensagemSucesso = 'Grafo limpo com sucesso';
          break;
        default:
          mensagemSucesso = 'Operação realizada com sucesso';
      }

      registrarOperacao(mensagemSucesso, 'success');
      setMensagemAcao(mensagemSucesso);
      setVerticeDestacado(destacar);

      // Limpar inputs
      setVertice('');
      setOrigem('');
      setDestino('');

      // Limpar destaque após 1.5s
      setTimeout(() => {
        setVerticeDestacado(null);
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
      <h1 className="text-xl font-bold mt-4">Grafo (Graph)</h1>
      <p className="mt-4">Estrutura para representar relações entre objetos através de vértices e arestas.</p>
      <span className="text-purple-400">10 métodos disponíveis</span>

      {/* Visualização do grafo */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg overflow-y-auto max-h-96">
        <ul className="space-y-2 min-h-[100px]" role="list">
          {info.vertices.length > 0 ? (
            info.vertices.map((v) => {
              const vizinhos = info.arestas
                .filter((a) => a[0] === v)
                .map((a) => a[1]);
              return (
                <li
                  key={v}
                  role="listitem"
                  className={`
                    flex items-center p-3 rounded-lg border-2 transition-all duration-300
                    ${verticeDestacado === v ? 'bg-yellow-400 text-gray-900 border-yellow-600 scale-105' : 'bg-gray-700 text-white border-gray-600'}
                  `}
                  aria-label={`Vértice ${v}${vizinhos.length > 0 ? ` conectado a ${vizinhos.join(', ')}` : ' sem conexões'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg mr-4">
                    {v}
                  </div>
                  <div className="flex-1">
                    {vizinhos.length > 0 ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-400">→</span>
                        {vizinhos.map((viz, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1">
                            <span className="inline-flex w-8 h-8 rounded-full bg-green-500 text-white items-center justify-center text-sm">
                              {viz}
                            </span>
                            {idx < vizinhos.length - 1 && <span className="text-gray-400">,</span>}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Sem conexões</span>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <li role="listitem" className="text-gray-400 text-center py-8">
              Grafo vazio. Use Add Vértice para adicionar vértices.
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
              metodoAtual === metodo.id ? 'bg-purple-600' : 'bg-gray-700'
            } hover:bg-purple-500 transition-colors`}
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
            {/* Input de vértice (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('vertice') && (
              <input
                type="text"
                value={vertice}
                onChange={(e) => setVertice(e.target.value)}
                placeholder="Vértice (0-99)"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="Número do vértice"
              />
            )}

            {/* Input de origem e destino (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('origem') && (
              <>
                <input
                  type="text"
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                  placeholder="Origem"
                  className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Vértice de origem"
                />
                <input
                  type="text"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  placeholder="Destino"
                  className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Vértice de destino"
                />
              </>
            )}

            {/* Botão de executar */}
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors font-semibold"
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
          <span className="text-purple-400">Vértices:</span>
          <span className="font-bold">{info.vertices.length}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-purple-400">Arestas:</span>
          <span className="font-bold">{info.arestas.length}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-purple-400">Densidade:</span>
          <span className="font-bold">{(info.densidade * 100).toFixed(1)}%</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-purple-400">Tipo:</span>
          <span className="font-bold">{info.direcionado ? 'Direcionado' : 'Não-Dir'}</span>
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
