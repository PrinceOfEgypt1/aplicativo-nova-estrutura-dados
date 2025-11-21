/**
 * Hook customizado para gerenciar o estado da �rvore Bin�ria de Busca
 *
 * @remarks
 * Este hook encapsula toda a l�gica de gerenciamento de estado da �rvore Bin�ria,
 * incluindo opera��es, valida��es, hist�rico e feedback visual.
 * Utiliza useReducer para gerenciamento de estado complexo e previs�vel.
 */

import { useState, useCallback, useReducer } from 'react';
import { ArvoreBinaria, No } from './arvore';
import * as validationUtils from '../../../utils/validationUtils';

/**
 * Estados poss�veis de uma opera��o
 */
export enum OperationState {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  ERROR = 'error',
}

/**
 * Registro de uma opera��o no hist�rico
 */
interface OperationHistory {
  operacao: string;
  timestamp: number;
  status: OperationState;
}

/**
 * A��o do reducer
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
 * Hook customizado para gerenciar a �rvore Bin�ria
 *
 * @returns Objeto com estado e m�todos da �rvore
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
   * Reducer para gerenciar o estado da �rvore
   *
   * @param state - Estado atual
   * @param action - A��o a ser executada
   * @returns Novo estado
   * @throws {Error} Se a opera��o n�o puder ser executada
   */
  const reducer = (state: State, action: Action): State => {
    // Criar nova instância e copiar valores existentes para imutabilidade
    const novaArvore = new ArvoreBinaria();
    const valoresAtuais = state.arvore.emOrdem();
    valoresAtuais.forEach(v => {
      try { novaArvore.inserir(v); } catch(e) { /* ignora duplicatas */ }
    });

    switch (action.type) {
      case 'inserir': {
        const { value } = action.payload;
        novaArvore.inserir(value);

        return {
          ...state,
          arvore: novaArvore,
          raiz: novaArvore.obterRaiz(),
          valorDestacado: value,
          mensagemAcao: `Valor ${value} inserido na �rvore`,
        };
      }

      case 'remover': {
        const { value } = action.payload;
        novaArvore.remover(value);

        return {
          ...state,
          arvore: novaArvore,
          raiz: novaArvore.obterRaiz(),
          valorDestacado: null,
          mensagemAcao: `Valor ${value} removido da �rvore`,
        };
      }

      case 'buscar': {
        const { value } = action.payload;
        const encontrado = novaArvore.buscar(value);

        return {
          ...state,
          arvore: novaArvore,
          valorDestacado: encontrado ? value : null,
          mensagemAcao: encontrado
            ? `Valor ${value} encontrado na �rvore`
            : `Valor ${value} n�o encontrado`,
        };
      }

      case 'contem': {
        const { value } = action.payload;
        const contem = novaArvore.contem(value);

        return {
          ...state,
          arvore: novaArvore,
          valorDestacado: contem ? value : null,
          mensagemAcao: `A �rvore ${contem ? 'cont�m' : 'n�o cont�m'} o valor ${value}`,
        };
      }

      case 'min': {
        const minimo = novaArvore.min();

        return {
          ...state,
          arvore: novaArvore,
          valorDestacado: minimo,
          mensagemAcao: `Menor valor: ${minimo}`,
        };
      }

      case 'max': {
        const maximo = novaArvore.max();

        return {
          ...state,
          arvore: novaArvore,
          valorDestacado: maximo,
          mensagemAcao: `Maior valor: ${maximo}`,
        };
      }

      case 'altura': {
        const altura = novaArvore.altura();

        return {
          ...state,
          arvore: novaArvore,
          mensagemAcao: `Altura da �rvore: ${altura}`,
        };
      }

      case 'tamanho': {
        const tamanho = novaArvore.tamanho();

        return {
          ...state,
          arvore: novaArvore,
          mensagemAcao: `Tamanho da �rvore: ${tamanho} n�s`,
        };
      }

      case 'estaVazio': {
        const vazia = novaArvore.estaVazio();

        return {
          ...state,
          arvore: novaArvore,
          mensagemAcao: `A �rvore est� ${vazia ? '' : 'n�o '}vazia`,
        };
      }

      case 'limpar': {
        const arvoreVazia = new ArvoreBinaria();

        return {
          ...state,
          arvore: arvoreVazia,
          raiz: null,
          valorDestacado: null,
          mensagemAcao: '�rvore limpa',
        };
      }

      case 'emOrdem': {
        const valores = novaArvore.emOrdem();

        return {
          ...state,
          arvore: novaArvore,
          mensagemAcao: `Em ordem: [${valores.join(', ')}]`,
        };
      }

      case 'preOrdem': {
        const valores = novaArvore.preOrdem();

        return {
          ...state,
          arvore: novaArvore,
          mensagemAcao: `Pr�-ordem: [${valores.join(', ')}]`,
        };
      }

      case 'posOrdem': {
        const valores = novaArvore.posOrdem();

        return {
          ...state,
          arvore: novaArvore,
          mensagemAcao: `P�s-ordem: [${valores.join(', ')}]`,
        };
      }

      case 'emNivel': {
        const valores = novaArvore.emNivel();

        return {
          ...state,
          arvore: novaArvore,
          mensagemAcao: `Em n�vel: [${valores.join(', ')}]`,
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
   * Registra uma opera��o no hist�rico
   *
   * @param operacao - Descri��o da opera��o
   * @param status - Status da opera��o (padr�o: COMPLETED)
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
      ); // Limita a 50 opera��es
    },
    []
  );

  /**
   * Executa um m�todo da �rvore
   *
   * @param metodo - Nome do m�todo a executar
   * @param valor - Valor opcional necess�rio para alguns m�todos
   * @throws {Error} Se o m�todo falhar ou os par�metros forem inv�lidos
   *
   * @remarks
   * Este m�todo:
   * - Valida os par�metros de entrada
   * - Despacha a a��o apropriada para o reducer
   * - Registra a opera��o no hist�rico
   * - Gerencia o destaque visual
   * - Trata erros de forma consistente
   */
  const executarMetodo = useCallback(
    async (metodo: string, valor?: string | number) => {
      try {
        // Fun��o auxiliar para validar n�mero
        const validacaoNumeroValor = (valor: string | number): number => {
          const validacao = validationUtils.validarNumero(valor);
          if (!validacao.valido) {
            throw new Error(validacao.mensagem);
          }
          return validacao.valor!;
        };

        // Executar m�todo baseado no tipo
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
            registrarOperacao(`Cont�m: ${valorValidado}`);
            break;
          }

          case 'min': {
            if (arvore.estaVazio()) {
              throw new Error('�rvore est� vazia');
            }
            dispatch({ type: 'min' });
            registrarOperacao('Consultar m�nimo');
            break;
          }

          case 'max': {
            if (arvore.estaVazio()) {
              throw new Error('�rvore est� vazia');
            }
            dispatch({ type: 'max' });
            registrarOperacao('Consultar m�ximo');
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
            registrarOperacao('Verifica��o de vazio');
            break;
          }

          case 'limpar': {
            dispatch({ type: 'limpar' });
            registrarOperacao('�rvore limpa');
            break;
          }

          case 'emOrdem': {
            dispatch({ type: 'emOrdem' });
            registrarOperacao('Travessia em ordem');
            break;
          }

          case 'preOrdem': {
            dispatch({ type: 'preOrdem' });
            registrarOperacao('Travessia pr�-ordem');
            break;
          }

          case 'posOrdem': {
            dispatch({ type: 'posOrdem' });
            registrarOperacao('Travessia p�s-ordem');
            break;
          }

          case 'emNivel': {
            dispatch({ type: 'emNivel' });
            registrarOperacao('Travessia em n�vel');
            break;
          }

          default:
            throw new Error(`M�todo n�o implementado: ${metodo}`);
        }

        // Limpar destaque ap�s 1.5s
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
   * Define a mensagem de a��o
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
