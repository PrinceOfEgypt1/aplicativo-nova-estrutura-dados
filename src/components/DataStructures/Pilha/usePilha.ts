/**
 * Hook customizado para gerenciar o estado da Pilha
 *
 * @remarks
 * Este hook encapsula toda a lógica de gerenciamento de estado da Pilha,
 * incluindo operações, validações, histórico e feedback visual.
 * Utiliza useReducer para gerenciamento de estado complexo e previsível.
 */

import { useState, useCallback, useReducer } from 'react';
import * as validationUtils from '../../../utils/validationUtils';
import { v4 as uuidv4 } from 'uuid';

/**
 * Representa um elemento na pilha com ID único
 */
export interface StackElement {
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
  elementos: StackElement[];
  indiceDestacado: number | null;
  mensagemAcao: string | null;
}

/**
 * Hook customizado para gerenciar a Pilha
 *
 * @param capacidadeInicial - Capacidade máxima da pilha (padrão: 20)
 * @returns Objeto com estado e métodos da pilha
 *
 * @example
 * ```typescript
 * const {
 *   elementos,
 *   executarMetodo,
 *   mensagemAcao,
 *   historico
 * } = usePilha(20);
 *
 * // Adicionar elemento
 * await executarMetodo('push', 42);
 *
 * // Remover elemento
 * await executarMetodo('pop');
 * ```
 */
export function usePilha(capacidadeInicial: number = 20) {
  const initialState: State = {
    elementos: [],
    indiceDestacado: null,
    mensagemAcao: null,
  };

  /**
   * Reducer para gerenciar o estado da pilha
   *
   * @param state - Estado atual
   * @param action - Ação a ser executada
   * @returns Novo estado
   * @throws {Error} Se a operação não puder ser executada
   */
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'push': {
        const { value, capacidadeInicial } = action.payload;

        // Validação de capacidade
        if (state.elementos.length >= capacidadeInicial) {
          throw new Error(`A pilha está cheia. Capacidade máxima: ${capacidadeInicial}`);
        }

        const novoElemento: StackElement = {
          value,
          id: uuidv4(),
        };

        return {
          ...state,
          elementos: [...state.elementos, novoElemento],
          indiceDestacado: state.elementos.length,
          mensagemAcao: `Elemento ${value} adicionado ao topo`,
        };
      }

      case 'pop': {
        if (state.elementos.length === 0) {
          throw new Error('Pilha está vazia');
        }

        const valorRemovido = state.elementos[state.elementos.length - 1].value;
        const novosElementos = state.elementos.slice(0, -1);

        return {
          ...state,
          elementos: novosElementos,
          indiceDestacado: null,
          mensagemAcao: `Elemento ${valorRemovido} removido do topo`,
        };
      }

      case 'peek': {
        if (state.elementos.length === 0) {
          throw new Error('Pilha está vazia');
        }

        const topo = state.elementos[state.elementos.length - 1].value;

        return {
          ...state,
          indiceDestacado: state.elementos.length - 1,
          mensagemAcao: `Elemento no topo: ${topo}`,
        };
      }

      case 'tamanho': {
        return {
          ...state,
          mensagemAcao: `Tamanho da pilha: ${state.elementos.length}`,
        };
      }

      case 'estaVazio': {
        const vazia = state.elementos.length === 0;
        return {
          ...state,
          mensagemAcao: `A pilha está ${vazia ? '' : 'não '}vazia`,
        };
      }

      case 'limpar': {
        return {
          ...state,
          elementos: [],
          indiceDestacado: null,
          mensagemAcao: 'Pilha limpa',
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
          mensagemAcao: `A pilha ${contem ? 'contém' : 'não contém'} o elemento ${value}`,
        };
      }

      case 'buscar': {
        const { value } = action.payload;
        let posicao = -1;
        let indiceEncontrado: number | null = null;

        // Busca do topo para baixo
        for (let i = state.elementos.length - 1; i >= 0; i--) {
          if (state.elementos[i].value === value) {
            posicao = state.elementos.length - i;
            indiceEncontrado = i;
            break;
          }
        }

        return {
          ...state,
          indiceDestacado: indiceEncontrado,
          mensagemAcao:
            posicao !== -1
              ? `Elemento ${value} encontrado a ${posicao} posição${posicao > 1 ? 'ões' : ''} do topo`
              : `Elemento ${value} não encontrado`,
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
   * Executa um método da pilha
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
          case 'push': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({
              type: 'push',
              payload: {
                value: valorValidado,
                capacidadeInicial,
              },
            });
            registrarOperacao(`Push: ${valorValidado}`);
            break;
          }

          case 'pop': {
            const tamanhoAntes = elementos.length;
            if (tamanhoAntes === 0) {
              throw new Error('Pilha está vazia');
            }
            const valorRemovido = elementos[tamanhoAntes - 1].value;
            dispatch({ type: 'pop' });
            registrarOperacao(`Pop: ${valorRemovido}`);
            break;
          }

          case 'peek': {
            if (elementos.length === 0) {
              throw new Error('Pilha está vazia');
            }
            dispatch({ type: 'peek' });
            registrarOperacao('Peek');
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
            registrarOperacao('Pilha limpa');
            break;
          }

          case 'contem': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({ type: 'contem', payload: { value: valorValidado } });
            registrarOperacao(`Contém: ${valorValidado}`);
            break;
          }

          case 'buscar': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({ type: 'buscar', payload: { value: valorValidado } });
            registrarOperacao(`Buscar: ${valorValidado}`);
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
