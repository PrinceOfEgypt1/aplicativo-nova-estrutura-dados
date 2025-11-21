/**
 * Componente VisualizacaoListaLigada
 *
 * @remarks
 * Interface principal para visualização e manipulação da estrutura de dados Lista Ligada.
 * Permite executar operações de inserção, remoção e busca com feedback visual em tempo real.
 */

import * as React from 'react';
import { useListaLigada } from './useListaLigada';
import NoListaLigada from './NoListaLigada';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { metodosDisponiveis, type MetodoListaLigada } from './metodosListaLigada';

/**
 * Componente principal de visualização da Lista Ligada
 *
 * @returns Elemento React com a interface completa da Lista Ligada
 */
const VisualizacaoListaLigada: React.FC = () => {
  const navigate = useNavigate();
  const {
    elementos,
    executarMetodo,
    mensagemAcao,
    historico,
    indiceDestacado,
    setIndiceDestacado,
    setMensagemAcao,
    registrarOperacao,
  } = useListaLigada();

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [valor, setValor] = React.useState('');
  const [indice, setIndice] = React.useState('');

  /**
   * Manipula a execução de um método da lista ligada
   *
   * @param e - Evento de submit do formulário
   */
  const executar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const metodoInfo = metodosDisponiveis.find((m) => m.id === metodoAtual);
      if (!metodoInfo) return;

      // Determinar parâmetros baseado no método
      let parametros: any;

      if (metodoInfo.requisitos.includes('ambos')) {
        // Métodos que precisam de índice e valor
        parametros = { indice: parseInt(indice, 10), valor: parseInt(valor, 10) };
      } else if (metodoInfo.requisitos.includes('indice')) {
        // Métodos que só precisam de índice
        parametros = parseInt(indice, 10);
      } else if (metodoInfo.requisitos.includes('valor')) {
        // Métodos que só precisam de valor
        parametros = parseInt(valor, 10);
      }

      // Executar método
      await executarMetodo(metodoAtual!, parametros);

      // Mensagens de sucesso personalizadas
      let mensagemSucesso = '';
      switch (metodoAtual) {
        case 'inserirNoInicio':
          mensagemSucesso = `Elemento ${valor} inserido no início da lista`;
          break;
        case 'inserirNoFim':
          mensagemSucesso = `Elemento ${valor} inserido no final da lista`;
          break;
        case 'inserirNaPosicao':
          mensagemSucesso = `Elemento ${valor} inserido na posição ${indice}`;
          break;
        case 'removerDoInicio':
          mensagemSucesso = 'Elemento removido do início da lista';
          break;
        case 'removerDoFim':
          mensagemSucesso = 'Elemento removido do final da lista';
          break;
        case 'removerDaPosicao':
          mensagemSucesso = `Elemento removido da posição ${indice}`;
          break;
        case 'buscar':
          mensagemSucesso = `Busca pelo elemento ${valor} realizada`;
          break;
        case 'obterPorIndice':
          mensagemSucesso = `Elemento na posição ${indice} consultado`;
          break;
        case 'tamanho':
          mensagemSucesso = 'Tamanho da lista consultado';
          break;
        case 'estaVazia':
          mensagemSucesso = 'Verificação de lista vazia realizada';
          break;
        case 'limpar':
          mensagemSucesso = 'Lista limpa com sucesso';
          break;
        case 'obterCabeca':
          mensagemSucesso = 'Cabeça da lista consultada';
          break;
        default:
          mensagemSucesso = 'Operação realizada com sucesso';
      }

      registrarOperacao(mensagemSucesso);
      setMensagemAcao(mensagemSucesso);

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
      <h1 className="text-xl font-bold mt-4">Lista Ligada (Linked List)</h1>
      <p className="mt-4">Estrutura de dados dinâmica com nós conectados por ponteiros.</p>
      <span className="text-green-400">12 métodos disponíveis</span>

      {/* Visualização da lista ligada (horizontal com setas) */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <div className="flex flex-row items-center min-h-[100px] justify-start" role="list">
          {elementos.length > 0 ? (
            elementos.map((el, index) => (
              <NoListaLigada
                key={el.id}
                value={el.value}
                indice={index}
                destacado={indiceDestacado === index}
                isCabeca={index === 0}
                isUltimo={index === elementos.length - 1}
              />
            ))
          ) : (
            <div role="listitem" className="text-gray-400 text-center py-8 w-full">
              Lista vazia. Use Inserir no Início ou Inserir no Fim para adicionar nós.
            </div>
          )}
        </div>

        {/* Indicador visual de cabeça */}
        {elementos.length > 0 && (
          <div className="mt-4 text-center text-sm">
            <span className="text-cyan-400"> CABEÇA DA LISTA</span>
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
              metodoAtual === metodo.id ? 'bg-green-600' : 'bg-gray-700'
            } hover:bg-green-500 transition-colors`}
            aria-label={`Selecionar método ${metodo.titulo}`}
          >
            <span role="img" aria-hidden="true">
              {metodo.icone}
            </span>
            <span className="text-sm">{metodo.titulo}</span>
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
            {(metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('indice') ||
              metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('ambos')) && (
              <input
                type="text"
                value={indice}
                onChange={(e) => setIndice(e.target.value)}
                placeholder="Índice"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Índice"
              />
            )}

            {/* Input de valor (quando necessário) */}
            {(metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('valor') ||
              metodosDisponiveis.find((m) => m.id === metodoAtual)?.requisitos.includes('ambos')) && (
              <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor (número inteiro)"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Valor do elemento"
              />
            )}

            {/* Botão de executar */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors font-semibold"
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
          <span className="text-green-400">Tamanho:</span>
          <span className="font-bold">{elementos.length}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-green-400">Cabeça:</span>
          <span className="font-bold">
            {elementos.length > 0 ? elementos[0].value : 'null'}
          </span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-green-400">Estado:</span>
          <span className="font-bold">{elementos.length > 0 ? 'Com nós' : 'Vazio'}</span>
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

export default VisualizacaoListaLigada;
