/**
 * Componente VisualizacaoArvoreBinaria
 *
 * @remarks
 * Interface principal para visualização e manipulação da estrutura de dados Árvore Binária.
 * Permite executar operações BST com feedback visual em tempo real usando cores roxas.
 */

import * as React from 'react';
import { motion } from 'framer-motion';
import { useArvoreBinaria } from './useArvoreBinaria';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { metodosDisponiveis } from './metodosArvore';
import { No as NoType } from './arvore';

/**
 * Componente para renderizar um único nó da árvore
 */
const NoComponente: React.FC<{ valor: number; destacado: boolean }> = ({ valor, destacado }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all ${
        destacado ? 'bg-yellow-500 ring-4 ring-yellow-300' : 'bg-purple-600'
      }`}
    >
      {valor}
    </motion.div>
  );
};

/**
 * Componente para renderizar uma aresta (linha conectando os nós)
 */
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
      stroke="#9333ea"
      strokeWidth="2"
    />
  );
};

/**
 * Componente principal de visualização da Árvore Binária
 *
 * @returns Elemento React com a interface completa da Árvore Binária
 */
const VisualizacaoArvoreBinaria: React.FC = () => {
  const navigate = useNavigate();
  const {
    raiz,
    executarMetodo,
    mensagemAcao,
    historico,
    valorDestacado,
    setValorDestacado,
    setMensagemAcao,
    registrarOperacao,
    tamanho,
    altura,
    estaVazio,
  } = useArvoreBinaria();

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [valor, setValor] = React.useState('');

  /**
   * Manipula a execução de um método da árvore
   *
   * @param e - Evento de submit do formulário
   */
  const executar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const metodoInfo = metodosDisponiveis.find((m) => m.id === metodoAtual);
      if (!metodoInfo) return;

      // Executar método
      await executarMetodo(metodoAtual!, valor);

      // Limpar inputs
      setValor('');

      // Limpar destaque após 1.5s
      setTimeout(() => {
        setValorDestacado(null);
      }, 1500);
    } catch (error: unknown) {
      let mensagemErro = 'Erro desconhecido';
      if (typeof error === 'string') {
        mensagemErro = `Erro: ${error}`;
      } else if (error instanceof Error) {
        mensagemErro = `Erro: ${error.message}`;
      }

      registrarOperacao(mensagemErro);
      setMensagemAcao(mensagemErro);
    }
  };

  /**
   * Função recursiva para renderizar a árvore
   */
  const renderizarArvore = (
    no: NoType | null,
    nivel: number,
    posicaoX: number,
    espacamento: number
  ): JSX.Element | null => {
    if (!no) return null;

    const espacamentoVertical = 80; // Espaçamento vertical entre níveis

    return (
      <g key={`${no.valor}-${nivel}-${posicaoX}`}>
        {/* Renderiza as arestas para os filhos */}
        {no.esquerda && (
          <Aresta
            x1={posicaoX}
            y1={nivel * espacamentoVertical + 24}
            x2={posicaoX - espacamento}
            y2={(nivel + 1) * espacamentoVertical}
          />
        )}
        {no.direita && (
          <Aresta
            x1={posicaoX}
            y1={nivel * espacamentoVertical + 24}
            x2={posicaoX + espacamento}
            y2={(nivel + 1) * espacamentoVertical}
          />
        )}

        {/* Posiciona o nó atual */}
        <foreignObject
          x={posicaoX - 24}
          y={nivel * espacamentoVertical}
          width="48"
          height="48"
        >
          <NoComponente valor={no.valor} destacado={valorDestacado === no.valor} />
        </foreignObject>

        {/* Renderiza os filhos recursivamente com espaçamento reduzido */}
        {renderizarArvore(no.esquerda, nivel + 1, posicaoX - espacamento, espacamento / 2)}
        {renderizarArvore(no.direita, nivel + 1, posicaoX + espacamento, espacamento / 2)}
      </g>
    );
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
      <h1 className="text-xl font-bold mt-4">Árvore Binária de Busca (BST)</h1>
      <p className="mt-4">Estrutura hierárquica que mantém os dados organizados para busca eficiente.</p>
      <span className="text-purple-400">14 métodos disponíveis</span>

      {/* Visualização da árvore (hierárquica) */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg overflow-auto">
        {raiz ? (
          <div className="flex justify-center">
            <svg
              width="100%"
              height={Math.max(400, altura * 100)}
              viewBox={`-400 -20 800 ${Math.max(400, altura * 100)}`}
              preserveAspectRatio="xMidYMin meet"
            >
              {renderizarArvore(raiz, 0, 0, 200)}
            </svg>
          </div>
        ) : (
          <div className="text-gray-400 text-center py-16">
            Árvore vazia. Use Inserir para adicionar nós.
          </div>
        )}
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
            {/* Input de valor (quando necessário) */}
            {metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('valor') && (
              <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor (número inteiro)"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="Valor do elemento"
              />
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
          <span className="text-purple-400">Tamanho:</span>
          <span className="font-bold">{tamanho} nós</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-purple-400">Altura:</span>
          <span className="font-bold">{altura} níveis</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-purple-400">Estado:</span>
          <span className="font-bold">{estaVazio ? 'Vazio' : 'Com nós'}</span>
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
};

export default VisualizacaoArvoreBinaria;