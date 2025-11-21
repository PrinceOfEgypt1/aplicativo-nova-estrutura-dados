/**
 * Componente VisualizacaoFila
 *
 * @remarks
 * Interface principal para visualização e manipulação da estrutura de dados Fila.
 * Permite executar operações FIFO com feedback visual em tempo real.
 */

import * as React from 'react';
import { useFila } from './useFila';
import QueueCell from './QueueCell';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { metodosDisponiveis, type MetodoFila } from './metodosFila';

/**
 * Componente principal de visualização da Fila
 *
 * @returns Elemento React com a interface completa da Fila
 */
const VisualizacaoFila: React.FC = () => {
  const navigate = useNavigate();
  const {
    elementos,
    executarMetodo,
    mensagemAcao,
    historico,
    indiceDestacado,
    capacidadeMaxima,
    setIndiceDestacado,
    setMensagemAcao,
    registrarOperacao,
  } = useFila();

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [valor, setValor] = React.useState('');

  /**
   * Manipula a execução de um método da fila
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

      // Mensagens de sucesso personalizadas
      let mensagemSucesso = '';
      switch (metodoAtual) {
        case 'enqueue':
          mensagemSucesso = `Elemento ${valor} adicionado ao final da fila`;
          break;
        case 'dequeue':
          mensagemSucesso = 'Elemento removido da frente da fila';
          break;
        case 'primeiro':
          mensagemSucesso = 'Primeiro elemento visualizado';
          break;
        case 'ultimo':
          mensagemSucesso = 'Último elemento visualizado';
          break;
        case 'tamanho':
          mensagemSucesso = 'Tamanho da fila consultado';
          break;
        case 'estaVazio':
          mensagemSucesso = 'Verificação de fila vazia realizada';
          break;
        case 'limpar':
          mensagemSucesso = 'Fila limpa com sucesso';
          break;
        case 'contem':
          mensagemSucesso = `Verificação de existência do elemento ${valor} realizada`;
          break;
        default:
          mensagemSucesso = 'Operação realizada com sucesso';
      }

      registrarOperacao(mensagemSucesso);
      setMensagemAcao(mensagemSucesso);

      // Limpar inputs
      setValor('');

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

      registrarOperacao(mensagemErro);
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
      <h1 className="text-xl font-bold mt-4">Fila (Queue)</h1>
      <p className="mt-4">Estrutura FIFO (First In, First Out) para processamento ordenado.</p>
      <span className="text-blue-400">8 métodos disponíveis</span>

      {/* Visualização da fila (horizontal) */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <ul className="flex flex-row gap-2 min-h-[100px] items-center justify-start" role="list">
          {elementos.length > 0 ? (
            elementos.map((el, index) => (
              <QueueCell
                key={el.id}
                value={el.value}
                indice={index}
                destacado={indiceDestacado === index}
                isFrente={index === 0}
                isFinal={index === elementos.length - 1}
              />
            ))
          ) : (
            <li role="listitem" className="text-gray-400 text-center py-8 w-full">
              Fila vazia. Use Enqueue para adicionar elementos.
            </li>
          )}
        </ul>

        {/* Indicadores visuais de frente e final */}
        {elementos.length > 0 && (
          <div className="mt-4 flex justify-between text-center text-sm">
            <span className="text-green-400"> FRENTE DA FILA</span>
            <span className="text-purple-400">FINAL DA FILA ¡</span>
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
              metodoAtual === metodo.id ? 'bg-blue-600' : 'bg-gray-700'
            } hover:bg-blue-500 transition-colors`}
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
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Valor do elemento"
              />
            )}

            {/* Botão de executar */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-semibold"
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
          <span className="text-blue-400">Tamanho:</span>
          <span className="font-bold">{elementos.length}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-blue-400">Capacidade:</span>
          <span className="font-bold">
            {elementos.length} / {capacidadeMaxima}
          </span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-blue-400">Estado:</span>
          <span className="font-bold">{elementos.length > 0 ? 'Com elementos' : 'Vazio'}</span>
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

export default VisualizacaoFila;
