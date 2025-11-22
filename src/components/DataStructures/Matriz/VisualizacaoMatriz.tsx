/**
 * Componente VisualizacaoMatriz
 *
 * @remarks
 * Interface principal para visualização e manipulação da estrutura de dados Matriz.
 * Permite executar operações matriciais com feedback visual em tempo real.
 */

import * as React from 'react';
import { useMatriz } from './useMatriz';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { metodosDisponiveis, type MetodoMatriz } from './metodosMatriz';

interface HistoricoOperacao {
  operacao: string;
  timestamp: number;
  status: 'success' | 'error';
}

/**
 * Componente principal de visualização da Matriz
 *
 * @returns Elemento React com a interface completa da Matriz
 */
export function VisualizacaoMatriz() {
  const navigate = useNavigate();
  const {
    definir,
    obter,
    preencher,
    preencherLinha,
    preencherColuna,
    transpor,
    multiplicarPorEscalar,
    limpar,
    redimensionar,
    info,
  } = useMatriz(3, 3);

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [linha, setLinha] = React.useState('');
  const [coluna, setColuna] = React.useState('');
  const [valor, setValor] = React.useState('');
  const [escalar, setEscalar] = React.useState('');
  const [novasLinhas, setNovasLinhas] = React.useState('');
  const [novasColunas, setNovasColunas] = React.useState('');
  const [mensagemAcao, setMensagemAcao] = React.useState('');
  const [historico, setHistorico] = React.useState<HistoricoOperacao[]>([]);
  const [celulaDestacada, setCelulaDestacada] = React.useState<[number, number] | null>(null);

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
   * Manipula a execução de um método da matriz
   *
   * @param e - Evento de submit do formulário
   */
  const executar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const metodoInfo = metodosDisponiveis.find((m) => m.id === metodoAtual);
      if (!metodoInfo) return;

      let mensagemSucesso = '';
      let destacar: [number, number] | null = null;

      switch (metodoAtual) {
        case 'definir': {
          const l = parseInt(linha);
          const c = parseInt(coluna);
          const v = parseInt(valor);
          if (isNaN(l) || isNaN(c) || isNaN(v)) throw new Error('Parâmetros inválidos');
          definir(l, c, v);
          mensagemSucesso = `Valor ${v} definido em [${l}][${c}]`;
          destacar = [l, c];
          break;
        }
        case 'obter': {
          const l = parseInt(linha);
          const c = parseInt(coluna);
          if (isNaN(l) || isNaN(c)) throw new Error('Linha ou coluna inválida');
          const resultado = obter(l, c);
          mensagemSucesso = `Valor em [${l}][${c}]: ${resultado}`;
          destacar = [l, c];
          break;
        }
        case 'preencher': {
          const v = parseInt(valor);
          if (isNaN(v)) throw new Error('Valor inválido');
          preencher(v);
          mensagemSucesso = `Matriz preenchida com ${v}`;
          break;
        }
        case 'preencherLinha': {
          const l = parseInt(linha);
          const v = parseInt(valor);
          if (isNaN(l) || isNaN(v)) throw new Error('Linha ou valor inválido');
          preencherLinha(l, v);
          mensagemSucesso = `Linha ${l} preenchida com ${v}`;
          break;
        }
        case 'preencherColuna': {
          const c = parseInt(coluna);
          const v = parseInt(valor);
          if (isNaN(c) || isNaN(v)) throw new Error('Coluna ou valor inválido');
          preencherColuna(c, v);
          mensagemSucesso = `Coluna ${c} preenchida com ${v}`;
          break;
        }
        case 'transpor':
          transpor();
          mensagemSucesso = 'Matriz transposta com sucesso';
          break;
        case 'multiplicarPorEscalar': {
          const e = parseInt(escalar);
          if (isNaN(e)) throw new Error('Escalar inválido');
          multiplicarPorEscalar(e);
          mensagemSucesso = `Matriz multiplicada por ${e}`;
          break;
        }
        case 'redimensionar': {
          const nl = parseInt(novasLinhas);
          const nc = parseInt(novasColunas);
          if (isNaN(nl) || isNaN(nc)) throw new Error('Dimensões inválidas');
          redimensionar(nl, nc);
          mensagemSucesso = `Matriz redimensionada para ${nl}×${nc}`;
          break;
        }
        case 'limpar':
          limpar();
          mensagemSucesso = 'Matriz limpa (preenchida com zeros)';
          break;
        default:
          mensagemSucesso = 'Operação realizada com sucesso';
      }

      registrarOperacao(mensagemSucesso, 'success');
      setMensagemAcao(mensagemSucesso);
      setCelulaDestacada(destacar);

      // Limpar inputs
      setLinha('');
      setColuna('');
      setValor('');
      setEscalar('');
      setNovasLinhas('');
      setNovasColunas('');

      // Limpar destaque após 1.5s
      setTimeout(() => {
        setCelulaDestacada(null);
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
      <h1 className="text-xl font-bold mt-4">Matriz (Matrix)</h1>
      <p className="mt-4">Estrutura bidimensional para armazenar dados em linhas e colunas.</p>
      <span className="text-orange-400">9 métodos disponíveis</span>

      {/* Visualização da matriz */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <h3 className="text-sm text-gray-400 mb-2">
          Matriz {info.linhas}×{info.colunas}
        </h3>
        <div className="inline-block">
          {info.dados.map((linhaArray, i) => (
            <div key={i} className="flex gap-1 mb-1">
              {linhaArray.map((valorCelula, j) => (
                <div
                  key={j}
                  className={`
                    w-14 h-14 border-2 rounded flex items-center justify-center font-semibold text-sm transition-all duration-300
                    ${celulaDestacada && celulaDestacada[0] === i && celulaDestacada[1] === j
                      ? 'bg-yellow-400 text-gray-900 border-yellow-600 scale-110'
                      : 'bg-gray-700 text-white border-gray-600'}
                  `}
                  aria-label={`Célula [${i}][${j}] = ${valorCelula}`}
                >
                  {valorCelula}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Grid de métodos */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {metodosDisponiveis.map((metodo) => (
          <button
            key={metodo.id}
            onClick={() => setMetodoAtual(metodo.id)}
            className={`p-2 rounded text-left flex items-center gap-2 ${
              metodoAtual === metodo.id ? 'bg-orange-600' : 'bg-gray-700'
            } hover:bg-orange-500 transition-colors`}
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
            {/* Input de linha (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('linha') && (
              <input
                type="text"
                value={linha}
                onChange={(e) => setLinha(e.target.value)}
                placeholder="Linha (0-based)"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Índice da linha"
              />
            )}

            {/* Input de coluna (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('coluna') && (
              <input
                type="text"
                value={coluna}
                onChange={(e) => setColuna(e.target.value)}
                placeholder="Coluna (0-based)"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Índice da coluna"
              />
            )}

            {/* Input de valor (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('valor') && (
              <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Valor"
              />
            )}

            {/* Input de escalar (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('escalar') && (
              <input
                type="text"
                value={escalar}
                onChange={(e) => setEscalar(e.target.value)}
                placeholder="Escalar"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Valor escalar"
              />
            )}

            {/* Input de novas dimensões (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('novasLinhas') && (
              <>
                <input
                  type="text"
                  value={novasLinhas}
                  onChange={(e) => setNovasLinhas(e.target.value)}
                  placeholder="Linhas"
                  className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  aria-label="Número de linhas"
                />
                <input
                  type="text"
                  value={novasColunas}
                  onChange={(e) => setNovasColunas(e.target.value)}
                  placeholder="Colunas"
                  className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  aria-label="Número de colunas"
                />
              </>
            )}

            {/* Botão de executar */}
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors font-semibold"
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
          <span className="text-orange-400">Dimensão:</span>
          <span className="font-bold">{info.linhas}×{info.colunas}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-orange-400">Elementos:</span>
          <span className="font-bold">{info.totalElementos}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-orange-400">Min/Max:</span>
          <span className="font-bold">{info.min}/{info.max}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-orange-400">Soma:</span>
          <span className="font-bold">{info.soma}</span>
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
