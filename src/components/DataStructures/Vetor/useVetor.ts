// src/components/DataStructures/Vetor/useVetor.ts
import { useState, useCallback, useReducer } from "react";
import * as arrayUtils from '../../../utils/arrayUtils';
import * as validationUtils from '../../../utils/validationUtils';
import { v4 as uuidv4 } from 'uuid';

export interface VectorElement {
  value: number;
  id: string;
}

export enum OperationState {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  ERROR = 'error',
}

interface OperationHistory {
  operacao: string;
  timestamp: number;
  status: OperationState;
}

interface Action {
  type: string;
  payload?: any;
}

interface State {
  elementos: VectorElement[];
  indiceDestacado: number | null;
  mensagemAcao: string | null;
}

export function useVetor(capacidadeInicial: number = 20) {
  const initialState: State = {
    elementos: [],
    indiceDestacado: null,
    mensagemAcao: null,
  };

  const reducer = (state: State, action: Action): State => {
    let novosElementos: number[] = [];
    switch (action.type) {
      case 'inserir': {
        const { indice, value, capacidadeInicial } = action.payload;
        const validacaoIndice = validationUtils.validarIndice(indice, state.elementos.length, capacidadeInicial);
        if (!validacaoIndice.valido) {
          throw new Error(validacaoIndice.mensagem);
        }
        if (state.elementos.length < capacidadeInicial) {
          novosElementos = arrayUtils.inserir(state.elementos.map(e => e.value), indice, value);
          return {
            ...state,
            elementos: novosElementos.map(value => ({ value, id: uuidv4() })),
            indiceDestacado: indice,
            mensagemAcao: `Elemento ${value} inserido na posição ${indice}`,
          };
        } else {
          throw new Error(`O vetor já está cheio. Tamanho atual: ${state.elementos.length}, capacidade máxima: ${capacidadeInicial}`);
        }
      }
      case 'remover': {
        const { indice } = action.payload;
        const validacaoIndice = validationUtils.validarIndice(indice, state.elementos.length - 1, capacidadeInicial);
        if (!validacaoIndice.valido) {
          throw new Error(validacaoIndice.mensagem);
        }
        novosElementos = arrayUtils.remover(state.elementos.map(e => e.value), indice);
        return {
          ...state,
          elementos: novosElementos.map((value, index) => ({ value, id: state.elementos[index].id })),
          mensagemAcao: `Elemento removido da posição ${indice}`,
        };
      }
      case 'buscar': {
        const { valor } = action.payload;
        const indiceEncontrado = arrayUtils.buscar(state.elementos.map(e => e.value), valor);
        return {
          ...state,
          indiceDestacado: indiceEncontrado,
          mensagemAcao: `Elemento ${valor} ${indiceEncontrado !== -1 ? `encontrado na posição ${indiceEncontrado}` : 'não encontrado'}`,
        };
      }
      case 'obterElemento': {
        const { indice } = action.payload;
        const validacaoIndice = validationUtils.validarIndice(indice, state.elementos.length - 1, capacidadeInicial);
        if (!validacaoIndice.valido) {
          throw new Error(validacaoIndice.mensagem);
        }
        const elemento = arrayUtils.obter(state.elementos.map(e => e.value), indice);
        return {
          ...state,
          indiceDestacado: indice,
          mensagemAcao: `Elemento na posição ${indice}: ${elemento}`,
        };
      }
      case 'definirElemento': {
        const { indice, value } = action.payload;
        const validacaoIndice = validationUtils.validarIndice(indice, state.elementos.length - 1, capacidadeInicial);
        if (!validacaoIndice.valido) {
          throw new Error(validacaoIndice.mensagem);
        }
        novosElementos = arrayUtils.definir(state.elementos.map(e => e.value), indice, value);
        return {
          ...state,
          elementos: novosElementos.map((value, index) => ({ value, id: state.elementos[index].id })),
          indiceDestacado: indice,
          mensagemAcao: `Elemento ${value} definido na posição ${indice}`,
        };
      }
      case 'tamanho':
        return {
          ...state,
          mensagemAcao: `Tamanho do vetor: ${arrayUtils.tamanho(state.elementos.map(e => e.value))}`,
        };
      case 'estaVazio':
        return {
          ...state,
          mensagemAcao: `O vetor está ${arrayUtils.estaVazio(state.elementos.map(e => e.value)) ? '' : 'não '}vazio`,
        };
      case 'limpar':
        return {
          ...state,
          elementos: [],
          mensagemAcao: 'Vetor limpo',
        };
      case 'ordenar':
        novosElementos = arrayUtils.ordenar(state.elementos.map(e => e.value));
        return {
          ...state,
          elementos: novosElementos.map((value, index) => ({ value, id: state.elementos[index].id })),
          mensagemAcao: 'Vetor Ordenado',
        };
      case 'inverter':
        novosElementos = arrayUtils.inverter(state.elementos.map(e => e.value));
        return {
          ...state,
          elementos: novosElementos.map((value, index) => ({ value, id: state.elementos[index].id })),
          mensagemAcao: 'Vetor Invertido',
        };
      case 'adicionarNoFinal': {
        const { value, capacidadeInicial } = action.payload;
        if (state.elementos.length < capacidadeInicial) {
          novosElementos = arrayUtils.adicionarNoFinal(state.elementos.map(e => e.value), value);
          return {
            ...state,
            elementos: novosElementos.map(value => ({ value, id: uuidv4() })),
            indiceDestacado: state.elementos.length,
            mensagemAcao: `Elemento ${value} adicionado ao final`,
          };
        } else {
          throw new Error(`O vetor já está cheio. Tamanho atual: ${state.elementos.length}, capacidade máxima: ${capacidadeInicial}`);
        }
      }
      case 'estender': {
        const { value: valores, capacidadeInicial, tamanhoAtual } = action.payload;
        if (tamanhoAtual + valores.length > capacidadeInicial) {
          throw new Error(`A capacidade do vetor seria excedida. Tamanho atual: ${tamanhoAtual}, capacidade máxima: ${capacidadeInicial}, valores para inserir: ${valores.length}`);
        }
        novosElementos = arrayUtils.estender(state.elementos.map(e => e.value), valores);
        return {
          ...state,
          elementos: novosElementos.map(value => ({ value, id: uuidv4() })),
          mensagemAcao: 'Elementos adicionados',
        };
      }
      case 'removerDoFinal':
        novosElementos = arrayUtils.removerDoFinal(state.elementos.map(e => e.value));
        return {
          ...state,
          elementos: novosElementos.map((value, index) => ({ value, id: state.elementos[index].id })),
          mensagemAcao: 'Elemento removido do final',
        };
      case 'fatiar': {
        const { inicio, fim } = action.payload;
        const validacaoInicio = validationUtils.validarIndice(inicio, state.elementos.length - 1, capacidadeInicial);
        const validacaoFim = validationUtils.validarIndice(fim, state.elementos.length, capacidadeInicial);
        if (!validacaoInicio.valido || !validacaoFim.valido) {
          throw new Error(`Índices de fatiamento inválidos: início ${inicio}, fim ${fim}`);
        }
        novosElementos = arrayUtils.fatiar(state.elementos.map(e => e.value), inicio, fim);
        return {
          ...state,
          elementos: novosElementos.map(value => ({ value, id: uuidv4() })),
          mensagemAcao: `Fatiar: ${novosElementos}`,
        };
      }
      case 'contem': {
        const { value } = action.payload;
        return {
          ...state,
          mensagemAcao: `O vetor ${arrayUtils.contem(state.elementos.map(e => e.value), value) ? 'contém' : 'não contém'} o elemento ${value}`,
        };
      }
      case 'indiceDe': {
        const { value } = action.payload;
        const indice = arrayUtils.indiceDe(state.elementos.map(e => e.value), value);
        return {
          ...state,
          indiceDestacado: indice,
          mensagemAcao: `Índice de ${value}: ${indice}`,
        };
      }
      case 'SET_ELEMENTOS':
        return { ...state, elementos: action.payload };
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

  const registrarOperacao = useCallback((operacao: string, status: OperationState = OperationState.COMPLETED) => {
    setHistorico(prev => [{ operacao, timestamp: Date.now(), status }, ...prev]);
    dispatch({ type: 'SET_MENSAGEM_ACAO', payload: operacao });
  }, []);

  const executarMetodo = useCallback(
    async (metodo: string, valor?: string | number, indice?: string | number, indiceSecundario?: string | number) => {
      try {
        const validacaoNumeroValor = (valor: string | number) => {
          const validacao = validationUtils.validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          return validacao.valor!;
        };

        // Removido a validação de índice daqui

        switch (metodo) {
          case 'inserir':
            dispatch({
              type: 'inserir',
              payload: {
                value: validacaoNumeroValor(valor!),
                indice: Number(indice!),
                capacidadeInicial,
              },
            });
            break;
          case 'remover':
            dispatch({
              type: 'remover',
              payload: {
                indice: Number(indice!),
                capacidadeInicial,
              },
            });
            break;
          case 'buscar':
            dispatch({
              type: 'buscar',
              payload: {
                valor: validacaoNumeroValor(valor!),
              },
            });
            break;
          case 'obterElemento':
            dispatch({
              type: 'obterElemento',
              payload: {
                indice: Number(indice!),
                capacidadeInicial,
              },
            });
            break;
          case 'definirElemento':
            dispatch({
              type: 'definirElemento',
              payload: {
                indice: Number(indice!),
                value: validacaoNumeroValor(valor!),
                capacidadeInicial,
              },
            });
            break;
          case 'tamanho':
            dispatch({ type: 'tamanho' });
            break;
          case 'estaVazio':
            dispatch({ type: 'estaVazio' });
            break;
          case 'limpar':
            dispatch({ type: 'limpar' });
            break;
          case 'ordenar':
            dispatch({ type: 'ordenar' });
            break;
          case 'inverter':
            dispatch({ type: 'inverter' });
            break;
          case 'adicionarNoFinal':
            dispatch({
              type: 'adicionarNoFinal',
              payload: {
                value: validacaoNumeroValor(valor!),
                capacidadeInicial,
              },
            });
            break;
          case 'estender': {
            const valores = valor!
              .toString()
              .split(',')
              .map(v => v.trim())
              .map(Number);
            try {
              valores.forEach(v => {
                arrayUtils.validarNumeroInteiro(v);
              });
            } catch (error) {
              throw new Error(`Valor inválido na lista: ${error}`);
            }
            dispatch({
              type: 'estender',
              payload: {
                value: valores,
                capacidadeInicial,
                tamanhoAtual: state.elementos.length,
              },
            });
            break;
          }
          case 'removerDoFinal':
            dispatch({ type: 'removerDoFinal' });
            break;
          case 'fatiar':
            dispatch({
              type: 'fatiar',
              payload: {
                inicio: Number(indice!),
                fim: Number(indiceSecundario!),
                capacidadeInicial,
              },
            });
            break;
          case 'contem':
            dispatch({ type: 'contem', payload: { value: Number(valor!) } });
            break;
          case 'indiceDe':
            dispatch({ type: 'indiceDe', payload: { value: Number(valor!) } });
            break;
          default:
            throw new Error('Método não implementado');
        }

        if (indiceDestacado !== null) {
          setTimeout(() => dispatch({ type: 'SET_INDICE_DESTACADO', payload: null }), 1500);
        }
      } catch (error: any) {
        dispatch({ type: 'SET_MENSAGEM_ACAO', payload: `Erro: ${error.message}` });
        throw error;
      }
    },
    [state.elementos.length, capacidadeInicial]
  );

  return {
    elementos,
    historico,
    mensagemAcao,
    indiceDestacado,
    executarMetodo,
    capacidadeMaxima: capacidadeInicial,
    registrarOperacao,
    setIndiceDestacado: (indice: number | null) => dispatch({ type: 'SET_INDICE_DESTACADO', payload: indice }),
    setMensagemAcao: (mensagem: string | null) => dispatch({ type: 'SET_MENSAGEM_ACAO', payload: mensagem }),
  };
}
