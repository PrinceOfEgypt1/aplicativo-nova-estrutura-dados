/**
 * Hook customizado para gerenciar o estado da Fila
 *
 * @remarks
 * Este hook encapsula toda a lógica de gerenciamento de estado da Fila,
 * incluindo operações, validações, histórico e feedback visual.
 * Utiliza useReducer para gerenciamento de estado complexo e previsível.
 */

import { useState, useCallback, useReducer } from 'react';
import * as validationUtils from '../../../utils/validationUtils';
import { v4 as uuidv4 } from 'uuid';

/**
 * Representa um elemento na fila com ID único
 */
export interface QueueElement {
  value: number;
  id: string;
}

/**
 * Estados possíveis de uma operação
 */
export enum OperationState {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  ERROR = 'error',
}

/**
 * Registro de uma operação no histórico
 */
interface OperationHistory {
  operacao: string;
  timestamp: number;
  status: OperationState;
}

/**
 * Ação do reducer
 */
interface Action {
  type: string;
  payload?: any;
}

/**
 * Estado do hook
 */
interface State {
  elementos: QueueElement[];
  indiceDestacado: number | null;
  mensagemAcao: string | null;
}

/**
 * Hook customizado para gerenciar a Fila
 *
 * @param capacidadeInicial - Capacidade máxima da fila (padrão: 20)
 * @returns Objeto com estado e métodos da fila
 *
 * @example
 * ```typescript
 * const {
 *   elementos,
 *   executarMetodo,
 *   mensagemAcao,
 *   historico
 * } = useFila(20);
 *
 * // Adicionar elemento
 * await executarMetodo('enqueue', 42);
 *
 * // Remover elemento
 * await executarMetodo('dequeue');
 * ```
 */
export function useFila(capacidadeInicial: number = 20) {
  const initialState: State = {
    elementos: [],
    indiceDestacado: null,
    mensagemAcao: null,
  };

  /**
   * Reducer para gerenciar o estado da fila
   *
   * @param state - Estado atual
   * @param action - Ação a ser executada
   * @returns Novo estado
   * @throws {Error} Se a operação não puder ser executada
   */
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'enqueue': {
        const { value, capacidadeInicial } = action.payload;

        // Validação de capacidade
        if (state.elementos.length >= capacidadeInicial) {
          throw new Error(`A fila está cheia. Capacidade máxima: ${capacidadeInicial}`);
        }

        const novoElemento: QueueElement = {
          value,
          id: uuidv4(),
        };

        return {
          ...state,
          elementos: [...state.elementos, novoElemento],
          indiceDestacado: state.elementos.length,
          mensagemAcao: `Elemento ${value} adicionado ao final da fila`,
        };
      }

      case 'dequeue': {
        if (state.elementos.length === 0) {
          throw new Error('Fila está vazia');
        }

        const valorRemovido = state.elementos[0].value;
        const novosElementos = state.elementos.slice(1);

        return {
          ...state,
          elementos: novosElementos,
          indiceDestacado: null,
          mensagemAcao: `Elemento ${valorRemovido} removido da frente da fila`,
        };
      }

      case 'primeiro': {
        if (state.elementos.length === 0) {
          throw new Error('Fila está vazia');
        }

        const primeiro = state.elementos[0].value;

        return {
          ...state,
          indiceDestacado: 0,
          mensagemAcao: `Elemento na frente: ${primeiro}`,
        };
      }

      case 'ultimo': {
        if (state.elementos.length === 0) {
          throw new Error('Fila está vazia');
        }

        const ultimo = state.elementos[state.elementos.length - 1].value;

        return {
          ...state,
          indiceDestacado: state.elementos.length - 1,
          mensagemAcao: `Elemento no final: ${ultimo}`,
        };
      }

      case 'tamanho': {
        return {
          ...state,
          mensagemAcao: `Tamanho da fila: ${state.elementos.length}`,
        };
      }

      case 'estaVazio': {
        const vazia = state.elementos.length === 0;
        return {
          ...state,
          mensagemAcao: `A fila está ${vazia ? '' : 'não '}vazia`,
        };
      }

      case 'limpar': {
        return {
          ...state,
          elementos: [],
          indiceDestacado: null,
          mensagemAcao: 'Fila limpa',
        };
      }

      case 'contem': {
        const { value } = action.payload;
        const contem = state.elementos.some((el) => el.value === value);

        let indiceEncontrado: number | null = null;
        if (contem) {
          const idx = state.elementos.findIndex((el) => el.value === value);
          indiceEncontrado = idx;
        }

        return {
          ...state,
          indiceDestacado: indiceEncontrado,
          mensagemAcao: `A fila ${contem ? 'contém' : 'não contém'} o elemento ${value}`,
        };
      }

      case 'SET_INDICE_DESTACADO':
        return { ...state, indiceDestacado: action.payload };

      case 'SET_MENSAGEM_ACAO':
        return { ...state, mensagemAcao: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { elementos, indiceDestacado, mensagemAcao } = state;
  const [historico, setHistorico] = useState<OperationHistory[]>([]);

  /**
   * Registra uma operação no histórico
   *
   * @param operacao - Descrição da operação
   * @param status - Status da operação (padrão: COMPLETED)
   */
  const registrarOperacao = useCallback(
    (operacao: string, status: OperationState = OperationState.COMPLETED) => {
      setHistorico((prev) =>
        [
          {
            operacao,
            timestamp: Date.now(),
            status,
          },
          ...prev,
        ].slice(0, 50)
      ); // Limita a 50 operações
    },
    []
  );

  /**
   * Executa um método da fila
   *
   * @param metodo - Nome do método a executar
   * @param valor - Valor opcional necessário para alguns métodos
   * @throws {Error} Se o método falhar ou os parâmetros forem inválidos
   *
   * @remarks
   * Este método:
   * - Valida os parâmetros de entrada
   * - Despacha a ação apropriada para o reducer
   * - Registra a operação no histórico
   * - Gerencia o destaque visual
   * - Trata erros de forma consistente
   */
  const executarMetodo = useCallback(
    async (metodo: string, valor?: string | number) => {
      try {
        // Função auxiliar para validar número
        const validacaoNumeroValor = (valor: string | number): number => {
          const validacao = validationUtils.validarNumero(valor);
          if (!validacao.valido) {
            throw new Error(validacao.mensagem);
          }
          return validacao.valor!;
        };

        // Executar método baseado no tipo
        switch (metodo) {
          case 'enqueue': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({
              type: 'enqueue',
              payload: {
                value: valorValidado,
                capacidadeInicial,
              },
            });
            registrarOperacao(`Enqueue: ${valorValidado}`);
            break;
          }

          case 'dequeue': {
            const tamanhoAntes = elementos.length;
            if (tamanhoAntes === 0) {
              throw new Error('Fila está vazia');
            }
            const valorRemovido = elementos[0].value;
            dispatch({ type: 'dequeue' });
            registrarOperacao(`Dequeue: ${valorRemovido}`);
            break;
          }

          case 'primeiro': {
            if (elementos.length === 0) {
              throw new Error('Fila está vazia');
            }
            dispatch({ type: 'primeiro' });
            registrarOperacao('Primeiro consultado');
            break;
          }

          case 'ultimo': {
            if (elementos.length === 0) {
              throw new Error('Fila está vazia');
            }
            dispatch({ type: 'ultimo' });
            registrarOperacao('Último consultado');
            break;
          }

          case 'tamanho': {
            dispatch({ type: 'tamanho' });
            registrarOperacao('Tamanho consultado');
            break;
          }

          case 'estaVazio': {
            dispatch({ type: 'estaVazio' });
            registrarOperacao('Verificação de vazio');
            break;
          }

          case 'limpar': {
            dispatch({ type: 'limpar' });
            registrarOperacao('Fila limpa');
            break;
          }

          case 'contem': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({ type: 'contem', payload: { value: valorValidado } });
            registrarOperacao(`Contém: ${valorValidado}`);
            break;
          }

          default:
            throw new Error(`Método não implementado: ${metodo}`);
        }

        // Limpar destaque após 1.5s
        if (indiceDestacado !== null) {
          setTimeout(() => {
            dispatch({ type: 'SET_INDICE_DESTACADO', payload: null });
          }, 1500);
        }
      } catch (error: any) {
        const mensagemErro = error.message || 'Erro desconhecido';
        dispatch({ type: 'SET_MENSAGEM_ACAO', payload: `Erro: ${mensagemErro}` });
        registrarOperacao(`Erro: ${mensagemErro}`, OperationState.ERROR);
        throw error;
      }
    },
    [capacidadeInicial, indiceDestacado, registrarOperacao, elementos]
  );

  /**
   * Define o índice destacado
   *
   * @param indice - Índice a destacar ou null para limpar
   */
  const setIndiceDestacado = useCallback((indice: number | null) => {
    dispatch({ type: 'SET_INDICE_DESTACADO', payload: indice });
  }, []);

  /**
   * Define a mensagem de ação
   *
   * @param mensagem - Mensagem a exibir ou null para limpar
   */
  const setMensagemAcao = useCallback((mensagem: string | null) => {
    dispatch({ type: 'SET_MENSAGEM_ACAO', payload: mensagem });
  }, []);

  return {
    elementos,
    historico,
    mensagemAcao,
    indiceDestacado,
    executarMetodo,
    capacidadeMaxima: capacidadeInicial,
    registrarOperacao,
    setIndiceDestacado,
    setMensagemAcao,
  };
}
