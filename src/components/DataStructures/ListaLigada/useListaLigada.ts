/**
 * Hook customizado para gerenciar o estado da Lista Ligada
 *
 * @remarks
 * Este hook encapsula toda a lógica de gerenciamento de estado da Lista Ligada,
 * incluindo operações, validações, histórico e feedback visual.
 * Utiliza useReducer para gerenciamento de estado complexo e previsível.
 */

import { useState, useCallback, useReducer } from 'react';
import * as validationUtils from '../../../utils/validationUtils';
import { v4 as uuidv4 } from 'uuid';

/**
 * Representa um elemento na lista ligada com ID único
 */
export interface LinkedListElement {
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
  elementos: LinkedListElement[];
  indiceDestacado: number | null;
  mensagemAcao: string | null;
}

/**
 * Hook customizado para gerenciar a Lista Ligada
 *
 * @returns Objeto com estado e métodos da lista ligada
 *
 * @example
 * ```typescript
 * const {
 *   elementos,
 *   executarMetodo,
 *   mensagemAcao,
 *   historico
 * } = useListaLigada();
 *
 * // Inserir no início
 * await executarMetodo('inserirNoInicio', 42);
 *
 * // Inserir em posição específica
 * await executarMetodo('inserirNaPosicao', { indice: 2, valor: 99 });
 *
 * // Buscar elemento
 * await executarMetodo('buscar', 42);
 * ```
 */
export function useListaLigada() {
  const initialState: State = {
    elementos: [],
    indiceDestacado: null,
    mensagemAcao: null,
  };

  /**
   * Reducer para gerenciar o estado da lista ligada
   *
   * @param state - Estado atual
   * @param action - Ação a ser executada
   * @returns Novo estado
   * @throws {Error} Se a operação não puder ser executada
   */
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'inserirNoInicio': {
        const { value } = action.payload;

        const novoElemento: LinkedListElement = {
          value,
          id: uuidv4(),
        };

        return {
          ...state,
          elementos: [novoElemento, ...state.elementos],
          indiceDestacado: 0,
          mensagemAcao: `Elemento ${value} inserido no início da lista`,
        };
      }

      case 'inserirNoFim': {
        const { value } = action.payload;

        const novoElemento: LinkedListElement = {
          value,
          id: uuidv4(),
        };

        return {
          ...state,
          elementos: [...state.elementos, novoElemento],
          indiceDestacado: state.elementos.length,
          mensagemAcao: `Elemento ${value} inserido no final da lista`,
        };
      }

      case 'inserirNaPosicao': {
        const { indice, value } = action.payload;

        if (indice < 0 || indice > state.elementos.length) {
          throw new Error(
            `Índice ${indice} fora dos limites para inserção. Tamanho da lista: ${state.elementos.length}`
          );
        }

        const novoElemento: LinkedListElement = {
          value,
          id: uuidv4(),
        };

        const novosElementos = [
          ...state.elementos.slice(0, indice),
          novoElemento,
          ...state.elementos.slice(indice),
        ];

        return {
          ...state,
          elementos: novosElementos,
          indiceDestacado: indice,
          mensagemAcao: `Elemento ${value} inserido na posição ${indice}`,
        };
      }

      case 'removerDoInicio': {
        if (state.elementos.length === 0) {
          throw new Error('Lista está vazia');
        }

        const valorRemovido = state.elementos[0].value;
        const novosElementos = state.elementos.slice(1);

        return {
          ...state,
          elementos: novosElementos,
          indiceDestacado: null,
          mensagemAcao: `Elemento ${valorRemovido} removido do início da lista`,
        };
      }

      case 'removerDoFim': {
        if (state.elementos.length === 0) {
          throw new Error('Lista está vazia');
        }

        const valorRemovido = state.elementos[state.elementos.length - 1].value;
        const novosElementos = state.elementos.slice(0, -1);

        return {
          ...state,
          elementos: novosElementos,
          indiceDestacado: null,
          mensagemAcao: `Elemento ${valorRemovido} removido do final da lista`,
        };
      }

      case 'removerDaPosicao': {
        const { indice } = action.payload;

        if (state.elementos.length === 0) {
          throw new Error('Lista está vazia');
        }

        if (indice < 0 || indice >= state.elementos.length) {
          throw new Error(
            `Índice ${indice} fora dos limites. Tamanho da lista: ${state.elementos.length}`
          );
        }

        const valorRemovido = state.elementos[indice].value;
        const novosElementos = [
          ...state.elementos.slice(0, indice),
          ...state.elementos.slice(indice + 1),
        ];

        return {
          ...state,
          elementos: novosElementos,
          indiceDestacado: null,
          mensagemAcao: `Elemento ${valorRemovido} removido da posição ${indice}`,
        };
      }

      case 'buscar': {
        const { value } = action.payload;
        const indice = state.elementos.findIndex((el) => el.value === value);

        if (indice === -1) {
          return {
            ...state,
            indiceDestacado: null,
            mensagemAcao: `Elemento ${value} não encontrado na lista`,
          };
        }

        return {
          ...state,
          indiceDestacado: indice,
          mensagemAcao: `Elemento ${value} encontrado na posição ${indice}`,
        };
      }

      case 'obterPorIndice': {
        const { indice } = action.payload;

        if (indice < 0 || indice >= state.elementos.length) {
          throw new Error(
            `Índice ${indice} fora dos limites. Tamanho da lista: ${state.elementos.length}`
          );
        }

        const valor = state.elementos[indice].value;

        return {
          ...state,
          indiceDestacado: indice,
          mensagemAcao: `Elemento na posição ${indice}: ${valor}`,
        };
      }

      case 'tamanho': {
        return {
          ...state,
          mensagemAcao: `Tamanho da lista: ${state.elementos.length}`,
        };
      }

      case 'estaVazia': {
        const vazia = state.elementos.length === 0;
        return {
          ...state,
          mensagemAcao: `A lista está ${vazia ? '' : 'não '}vazia`,
        };
      }

      case 'limpar': {
        return {
          ...state,
          elementos: [],
          indiceDestacado: null,
          mensagemAcao: 'Lista limpa',
        };
      }

      case 'obterCabeca': {
        if (state.elementos.length === 0) {
          return {
            ...state,
            indiceDestacado: null,
            mensagemAcao: 'Lista está vazia (cabeça: null)',
          };
        }

        const cabeca = state.elementos[0].value;
        return {
          ...state,
          indiceDestacado: 0,
          mensagemAcao: `Cabeça da lista: ${cabeca}`,
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
   * Executa um método da lista ligada
   *
   * @param metodo - Nome do método a executar
   * @param parametros - Parâmetros necessários para o método (valor, indice, etc.)
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
    async (metodo: string, parametros?: any) => {
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
          case 'inserirNoInicio': {
            const valorValidado = validacaoNumeroValor(parametros);
            dispatch({
              type: 'inserirNoInicio',
              payload: { value: valorValidado },
            });
            registrarOperacao(`Inserir no início: ${valorValidado}`);
            break;
          }

          case 'inserirNoFim': {
            const valorValidado = validacaoNumeroValor(parametros);
            dispatch({
              type: 'inserirNoFim',
              payload: { value: valorValidado },
            });
            registrarOperacao(`Inserir no fim: ${valorValidado}`);
            break;
          }

          case 'inserirNaPosicao': {
            const { indice, valor } = parametros;
            const indiceValidado = parseInt(String(indice), 10);
            const valorValidado = validacaoNumeroValor(valor);

            if (!Number.isInteger(indiceValidado) || indiceValidado < 0) {
              throw new Error('Índice deve ser um número inteiro não-negativo');
            }

            dispatch({
              type: 'inserirNaPosicao',
              payload: { indice: indiceValidado, value: valorValidado },
            });
            registrarOperacao(`Inserir na posição ${indiceValidado}: ${valorValidado}`);
            break;
          }

          case 'removerDoInicio': {
            if (elementos.length === 0) {
              throw new Error('Lista está vazia');
            }
            const valorRemovido = elementos[0].value;
            dispatch({ type: 'removerDoInicio' });
            registrarOperacao(`Remover do início: ${valorRemovido}`);
            break;
          }

          case 'removerDoFim': {
            if (elementos.length === 0) {
              throw new Error('Lista está vazia');
            }
            const valorRemovido = elementos[elementos.length - 1].value;
            dispatch({ type: 'removerDoFim' });
            registrarOperacao(`Remover do fim: ${valorRemovido}`);
            break;
          }

          case 'removerDaPosicao': {
            const indiceValidado = parseInt(String(parametros), 10);

            if (!Number.isInteger(indiceValidado) || indiceValidado < 0) {
              throw new Error('Índice deve ser um número inteiro não-negativo');
            }

            if (elementos.length === 0) {
              throw new Error('Lista está vazia');
            }

            if (indiceValidado >= elementos.length) {
              throw new Error(
                `Índice ${indiceValidado} fora dos limites. Tamanho da lista: ${elementos.length}`
              );
            }

            const valorRemovido = elementos[indiceValidado].value;
            dispatch({ type: 'removerDaPosicao', payload: { indice: indiceValidado } });
            registrarOperacao(`Remover da posição ${indiceValidado}: ${valorRemovido}`);
            break;
          }

          case 'buscar': {
            const valorValidado = validacaoNumeroValor(parametros);
            dispatch({ type: 'buscar', payload: { value: valorValidado } });
            const indice = elementos.findIndex((el) => el.value === valorValidado);
            if (indice === -1) {
              registrarOperacao(`Buscar: ${valorValidado} (não encontrado)`);
            } else {
              registrarOperacao(`Buscar: ${valorValidado} (posição ${indice})`);
            }
            break;
          }

          case 'obterPorIndice': {
            const indiceValidado = parseInt(String(parametros), 10);

            if (!Number.isInteger(indiceValidado) || indiceValidado < 0) {
              throw new Error('Índice deve ser um número inteiro não-negativo');
            }

            if (indiceValidado >= elementos.length) {
              throw new Error(
                `Índice ${indiceValidado} fora dos limites. Tamanho da lista: ${elementos.length}`
              );
            }

            dispatch({ type: 'obterPorIndice', payload: { indice: indiceValidado } });
            registrarOperacao(`Obter por índice: ${indiceValidado}`);
            break;
          }

          case 'tamanho': {
            dispatch({ type: 'tamanho' });
            registrarOperacao('Tamanho consultado');
            break;
          }

          case 'estaVazia': {
            dispatch({ type: 'estaVazia' });
            registrarOperacao('Verificação de vazio');
            break;
          }

          case 'limpar': {
            dispatch({ type: 'limpar' });
            registrarOperacao('Lista limpa');
            break;
          }

          case 'obterCabeca': {
            dispatch({ type: 'obterCabeca' });
            registrarOperacao('Obter cabeça');
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
    [indiceDestacado, registrarOperacao, elementos]
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
    registrarOperacao,
    setIndiceDestacado,
    setMensagemAcao,
  };
}
