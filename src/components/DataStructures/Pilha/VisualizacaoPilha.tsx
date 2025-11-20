/**
 * Componente VisualizacaoPilha
 *
 * @remarks
 * Interface principal para visualização e manipulação da estrutura de dados Pilha.
 * Permite executar operações LIFO com feedback visual em tempo real.
 */

import * as React from 'react';
import { usePilha } from './usePilha';
import StackCell from './StackCell';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { metodosDisponiveis, type MetodoPilha } from './metodosPilha';

/**
 * Componente principal de visualização da Pilha
 *
 * @returns Elemento React com a interface completa da Pilha
 */
const VisualizacaoPilha: React.FC = () => {
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
  } = usePilha();

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [valor, setValor] = React.useState('');

  /**
   * Manipula a execução de um método da pilha
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
        case 'push':
          mensagemSucesso = `Elemento ${valor} adicionado ao topo`;
          break;
        case 'pop':
          mensagemSucesso = 'Elemento removido do topo';
          break;
        case 'peek':
          mensagemSucesso = 'Topo visualizado';
          break;
        case 'tamanho':
          mensagemSucesso = 'Tamanho da pilha consultado';
          break;
        case 'estaVazio':
          mensagemSucesso = 'Verificação de pilha vazia realizada';
          break;
        case 'limpar':
          mensagemSucesso = 'Pilha limpa com sucesso';
          break;
        case 'contem':
          mensagemSucesso = `Verificação de existência do elemento ${valor} realizada`;
          break;
        case 'buscar':
          mensagemSucesso = `Busca do elemento ${valor} realizada`;
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
      <h1 className="text-xl font-bold mt-4">Pilha (Stack)</h1>
      <p className="mt-4">Estrutura LIFO (Last In, First Out) para processamento ordenado.</p>
      <span className="text-rose-400">8 métodos disponíveis</span>

      {/* Visualização da pilha (vertical) */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg overflow-y-auto max-h-96">
        <ul className="flex flex-col-reverse gap-2 max-w-md mx-auto" role="list">
          {elementos.length > 0 ? (
            elementos.map((el, index) => (
              <StackCell
                key={el.id}
                value={el.value}
                indice={index}
                destacado={indiceDestacado === index}
                isTopo={index === elementos.length - 1}
              />
            ))
          ) : (
            <li role="listitem" className="text-gray-400 text-center py-8">
              Pilha vazia. Use Push para adicionar elementos.
            </li>
          )}
        </ul>

        {/* Indicador visual de topo */}
        {elementos.length > 0 && (
          <div className="mt-4 text-center">
            <span className="text-blue-400 text-sm">‘ TOPO DA PILHA ‘</span>
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
              metodoAtual === metodo.id ? 'bg-rose-600' : 'bg-gray-700'
            } hover:bg-rose-500 transition-colors`}
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
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                aria-label="Valor do elemento"
              />
            )}

            {/* Botão de executar */}
            <button
              type="submit"
              className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition-colors font-semibold"
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
          <span className="text-rose-400">Tamanho:</span>
          <span className="font-bold">{elementos.length}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-rose-400">Capacidade:</span>
          <span className="font-bold">
            {elementos.length} / {capacidadeMaxima}
          </span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-rose-400">Estado:</span>
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

export default VisualizacaoPilha;
