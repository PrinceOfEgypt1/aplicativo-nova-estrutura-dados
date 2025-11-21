/**
 * Hook customizado para gerenciar o estado da Árvore Binária de Busca
 *
 * @remarks
 * Este hook encapsula toda a lógica de gerenciamento de estado da Árvore Binária,
 * incluindo operações, validações, histórico e feedback visual.
 * Utiliza useReducer para gerenciamento de estado complexo e previsível.
 */

import { useState, useCallback, useReducer } from 'react';
import { ArvoreBinaria, No } from './arvore';
import * as validationUtils from '../../../utils/validationUtils';

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
  arvore: ArvoreBinaria;
  raiz: No | null;
  valorDestacado: number | null;
  mensagemAcao: string | null;
}

/**
 * Hook customizado para gerenciar a Árvore Binária
 *
 * @returns Objeto com estado e métodos da árvore
 *
 * @example
 * ```typescript
 * const {
 *   raiz,
 *   executarMetodo,
 *   mensagemAcao,
 *   historico
 * } = useArvoreBinaria();
 *
 * // Inserir elemento
 * await executarMetodo('inserir', 42);
 *
 * // Buscar elemento
 * await executarMetodo('buscar', 42);
 * ```
 */
export function useArvoreBinaria() {
  const initialState: State = {
    arvore: new ArvoreBinaria(),
    raiz: null,
    valorDestacado: null,
    mensagemAcao: null,
  };

  /**
   * Reducer para gerenciar o estado da árvore
   *
   * @param state - Estado atual
   * @param action - Ação a ser executada
   * @returns Novo estado
   * @throws {Error} Se a operação não puder ser executada
   */
  const reducer = (state: State, action: Action): State => {
    const novaArvore = state.arvore;

    switch (action.type) {
      case 'inserir': {
        const { value } = action.payload;
        novaArvore.inserir(value);

        return {
          ...state,
          raiz: novaArvore.obterRaiz(),
          valorDestacado: value,
          mensagemAcao: `Valor ${value} inserido na árvore`,
        };
      }

      case 'remover': {
        const { value } = action.payload;
        novaArvore.remover(value);

        return {
          ...state,
          raiz: novaArvore.obterRaiz(),
          valorDestacado: null,
          mensagemAcao: `Valor ${value} removido da árvore`,
        };
      }

      case 'buscar': {
        const { value } = action.payload;
        const encontrado = novaArvore.buscar(value);

        return {
          ...state,
          valorDestacado: encontrado ? value : null,
          mensagemAcao: encontrado
            ? `Valor ${value} encontrado na árvore`
            : `Valor ${value} não encontrado`,
        };
      }

      case 'contem': {
        const { value } = action.payload;
        const contem = novaArvore.contem(value);

        return {
          ...state,
          valorDestacado: contem ? value : null,
          mensagemAcao: `A árvore ${contem ? 'contém' : 'não contém'} o valor ${value}`,
        };
      }

      case 'min': {
        const minimo = novaArvore.min();

        return {
          ...state,
          valorDestacado: minimo,
          mensagemAcao: `Menor valor: ${minimo}`,
        };
      }

      case 'max': {
        const maximo = novaArvore.max();

        return {
          ...state,
          valorDestacado: maximo,
          mensagemAcao: `Maior valor: ${maximo}`,
        };
      }

      case 'altura': {
        const altura = novaArvore.altura();

        return {
          ...state,
          mensagemAcao: `Altura da árvore: ${altura}`,
        };
      }

      case 'tamanho': {
        const tamanho = novaArvore.tamanho();

        return {
          ...state,
          mensagemAcao: `Tamanho da árvore: ${tamanho} nós`,
        };
      }

      case 'estaVazio': {
        const vazia = novaArvore.estaVazio();

        return {
          ...state,
          mensagemAcao: `A árvore está ${vazia ? '' : 'não '}vazia`,
        };
      }

      case 'limpar': {
        novaArvore.limpar();

        return {
          ...state,
          raiz: null,
          valorDestacado: null,
          mensagemAcao: 'Árvore limpa',
        };
      }

      case 'emOrdem': {
        const valores = novaArvore.emOrdem();

        return {
          ...state,
          mensagemAcao: `Em ordem: [${valores.join(', ')}]`,
        };
      }

      case 'preOrdem': {
        const valores = novaArvore.preOrdem();

        return {
          ...state,
          mensagemAcao: `Pré-ordem: [${valores.join(', ')}]`,
        };
      }

      case 'posOrdem': {
        const valores = novaArvore.posOrdem();

        return {
          ...state,
          mensagemAcao: `Pós-ordem: [${valores.join(', ')}]`,
        };
      }

      case 'emNivel': {
        const valores = novaArvore.emNivel();

        return {
          ...state,
          mensagemAcao: `Em nível: [${valores.join(', ')}]`,
        };
      }

      case 'SET_VALOR_DESTACADO':
        return { ...state, valorDestacado: action.payload };

      case 'SET_MENSAGEM_ACAO':
        return { ...state, mensagemAcao: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { arvore, raiz, valorDestacado, mensagemAcao } = state;
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
   * Executa um método da árvore
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
          case 'inserir': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({
              type: 'inserir',
              payload: { value: valorValidado },
            });
            registrarOperacao(`Inserir: ${valorValidado}`);
            break;
          }

          case 'remover': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({
              type: 'remover',
              payload: { value: valorValidado },
            });
            registrarOperacao(`Remover: ${valorValidado}`);
            break;
          }

          case 'buscar': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({
              type: 'buscar',
              payload: { value: valorValidado },
            });
            registrarOperacao(`Buscar: ${valorValidado}`);
            break;
          }

          case 'contem': {
            const valorValidado = validacaoNumeroValor(valor!);
            dispatch({
              type: 'contem',
              payload: { value: valorValidado },
            });
            registrarOperacao(`Contém: ${valorValidado}`);
            break;
          }

          case 'min': {
            if (arvore.estaVazio()) {
              throw new Error('Árvore está vazia');
            }
            dispatch({ type: 'min' });
            registrarOperacao('Consultar mínimo');
            break;
          }

          case 'max': {
            if (arvore.estaVazio()) {
              throw new Error('Árvore está vazia');
            }
            dispatch({ type: 'max' });
            registrarOperacao('Consultar máximo');
            break;
          }

          case 'altura': {
            dispatch({ type: 'altura' });
            registrarOperacao('Consultar altura');
            break;
          }

          case 'tamanho': {
            dispatch({ type: 'tamanho' });
            registrarOperacao('Consultar tamanho');
            break;
          }

          case 'estaVazio': {
            dispatch({ type: 'estaVazio' });
            registrarOperacao('Verificação de vazio');
            break;
          }

          case 'limpar': {
            dispatch({ type: 'limpar' });
            registrarOperacao('Árvore limpa');
            break;
          }

          case 'emOrdem': {
            dispatch({ type: 'emOrdem' });
            registrarOperacao('Travessia em ordem');
            break;
          }

          case 'preOrdem': {
            dispatch({ type: 'preOrdem' });
            registrarOperacao('Travessia pré-ordem');
            break;
          }

          case 'posOrdem': {
            dispatch({ type: 'posOrdem' });
            registrarOperacao('Travessia pós-ordem');
            break;
          }

          case 'emNivel': {
            dispatch({ type: 'emNivel' });
            registrarOperacao('Travessia em nível');
            break;
          }

          default:
            throw new Error(`Método não implementado: ${metodo}`);
        }

        // Limpar destaque após 1.5s
        if (valorDestacado !== null) {
          setTimeout(() => {
            dispatch({ type: 'SET_VALOR_DESTACADO', payload: null });
          }, 1500);
        }
      } catch (error: any) {
        const mensagemErro = error.message || 'Erro desconhecido';
        dispatch({ type: 'SET_MENSAGEM_ACAO', payload: `Erro: ${mensagemErro}` });
        registrarOperacao(`Erro: ${mensagemErro}`, OperationState.ERROR);
        throw error;
      }
    },
    [valorDestacado, registrarOperacao, arvore]
  );

  /**
   * Define o valor destacado
   *
   * @param valor - Valor a destacar ou null para limpar
   */
  const setValorDestacado = useCallback((valor: number | null) => {
    dispatch({ type: 'SET_VALOR_DESTACADO', payload: valor });
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
    raiz,
    historico,
    mensagemAcao,
    valorDestacado,
    executarMetodo,
    registrarOperacao,
    setValorDestacado,
    setMensagemAcao,
    tamanho: arvore.tamanho(),
    altura: arvore.altura(),
    estaVazio: arvore.estaVazio(),
  };
}
