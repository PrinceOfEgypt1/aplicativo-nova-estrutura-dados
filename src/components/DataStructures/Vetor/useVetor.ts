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

const reducer = (state: State, action: Action): State => {
  let novosElementos: number[] = [];
  switch (action.type) {
    case 'inserir':
      novosElementos = arrayUtils.inserir(state.elementos.map(e => e.value), action.payload.indice, action.payload.value);
      return {
        ...state,
        elementos: novosElementos.map((value) => ({ value, id: uuidv4() })),
        indiceDestacado: action.payload.indice,
        mensagemAcao: `Elemento ${action.payload.value} inserido na posição ${action.payload.indice}`,
      };
    case 'remover':
      novosElementos = arrayUtils.remover(state.elementos.map(e => e.value), action.payload.indice);
      return {
        ...state,
        elementos: novosElementos.map((value, index) => ({ value, id: state.elementos[index].id })),
        mensagemAcao: `Elemento removido da posição ${action.payload.indice}`,
      };
    case 'buscar':
      const indiceEncontrado = arrayUtils.buscar(state.elementos.map(e => e.value), action.payload.valor);
      return {
        ...state,
        indiceDestacado: indiceEncontrado,
        mensagemAcao: `Elemento ${action.payload.valor} ${indiceEncontrado !== -1 ? `encontrado na posição ${indiceEncontrado}` : 'não encontrado'}`,
      };
    case 'obterElemento':
      const elemento = arrayUtils.obter(state.elementos.map(e => e.value), action.payload.indice);
      return {
        ...state,
        indiceDestacado: action.payload.indice,
        mensagemAcao: `Elemento na posição ${action.payload.indice}: ${elemento}`,
      };
    case 'definirElemento':
      novosElementos = arrayUtils.definir(state.elementos.map(e => e.value), action.payload.indice, action.payload.value);
      return {
        ...state,
        elementos: novosElementos.map((value) => ({ value, id: uuidv4() })),
        indiceDestacado: action.payload.indice,
        mensagemAcao: `Elemento ${action.payload.value} definido na posição ${action.payload.indice}`,
      };
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
    case 'adicionarNoFinal':
      novosElementos = arrayUtils.adicionarNoFinal(state.elementos.map(e => e.value), action.payload.value);
      return {
        ...state,
        elementos: novosElementos.map((value) => ({ value, id: uuidv4() })),
        indiceDestacado: state.elementos.length,
        mensagemAcao: `Elemento ${action.payload.value} adicionado ao final`,
      };
    case 'estender':
      novosElementos = arrayUtils.estender(state.elementos.map(e => e.value), action.payload.value);
      return {
        ...state,
        elementos: novosElementos.map((value) => ({ value, id: uuidv4() })),
        mensagemAcao: 'Elementos adicionados',
      };
    case 'removerDoFinal':
      novosElementos = arrayUtils.removerDoFinal(state.elementos.map(e => e.value));
      return {
        ...state,
        elementos: novosElementos.map((value, index) => ({ value, id: state.elementos[index].id })),
        mensagemAcao: 'Elemento removido do final',
      };
    case 'fatiar':
      novosElementos = arrayUtils.fatiar(state.elementos.map(e => e.value), action.payload.inicio, action.payload.fim);
      return {
        ...state,
        elementos: novosElementos.map((value) => ({ value, id: uuidv4() })),
        mensagemAcao: `Fatiar: ${novosElementos}`,
      };
    case 'contem':
      return {
        ...state,
        mensagemAcao: `O vetor ${arrayUtils.contem(state.elementos.map(e => e.value), action.payload.value) ? 'contém' : 'não contém'} o elemento ${action.payload.value}`,
      };
    case 'indiceDe':
      const indice = arrayUtils.indiceDe(state.elementos.map(e => e.value), action.payload.value);
      return {
        ...state,
        indiceDestacado: indice,
        mensagemAcao: `Índice de ${action.payload.value}: ${indice}`,
      };
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

export function useVetor(capacidadeInicial: number = 20) {
  const initialState: State = {
    elementos: [],
    indiceDestacado: null,
    mensagemAcao: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { elementos, indiceDestacado, mensagemAcao } = state;
  const [historico, setHistorico] = useState<OperationHistory[]>([]);

  const registrarOperacao = useCallback((operacao: string, status: OperationState = OperationState.COMPLETED) => {
    setHistorico(prev => [{ operacao, timestamp: Date.now(), status }, ...prev]);
    dispatch({ type: 'SET_MENSAGEM_ACAO', payload: operacao });
  }, []);

  const executarMetodo = useCallback(async (metodo: string, valor?: string | number, indice?: string | number, indiceSecundario?: string | number) => {
    try {
      const validacaoNumeroValor = (valor: string | number) => {
        const validacao = validationUtils.validarNumero(valor);
        if (!validacao.valido) throw new Error(validacao.mensagem);
        return validacao.valor!;
      };

      const validacaoIndice = (indice: string | number, tamanhoArray: number) => {
        const indiceNumber = Number(indice);
        const validacao = validationUtils.validarIndice(indiceNumber, tamanhoArray, capacidadeInicial);
        if (!validacao.valido) throw new Error(validacao.mensagem);
        return indiceNumber;
      };


      switch (metodo) {
        case 'inserir':
          dispatch({
            type: 'inserir',
            payload: {
              value: validacaoNumeroValor(valor!),
              indice: validacaoIndice(indice!, elementos.length),
            },
          });
          break;
        case 'remover':
          dispatch({
            type: 'remover',
            payload: {
              indice: validacaoIndice(indice!, elementos.length),
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
              indice: validacaoIndice(indice!, elementos.length),
            },
          });
          break;
        case 'definirElemento':
          dispatch({
            type: 'definirElemento',
            payload: {
              indice: validacaoIndice(indice!, elementos.length),
              value: validacaoNumeroValor(valor!),
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
            payload: { value: validacaoNumeroValor(valor!) },
          });
          break;
        case 'estender': {
            const valores = valor!.toString().split(',').map(v => v.trim()).map(Number)
            try {
                valores.forEach(v => {
                    arrayUtils.validarNumeroInteiro(v)
                })
            } catch (error) {
              throw new Error(`Valor inválido na lista: ${error}`)
            }
            if (arrayUtils.tamanho(elementos.map(e => e.value)) + valores.length > capacidadeInicial){
                throw new Error(`A capacidade do vetor seria excedida. Tamanho atual: ${arrayUtils.tamanho(elementos.map(e => e.value))}, capacidade máxima: ${capacidadeInicial}, valores para inserir: ${valores.length}`)
              }
            dispatch({ type: 'estender', payload: { value: valores } });
            break;
        }
        case 'removerDoFinal':
          dispatch({ type: 'removerDoFinal' });
          break;
        case 'fatiar':
          dispatch({
            type: 'fatiar',
            payload: { inicio: Number(indice!), fim: Number(indiceSecundario!) },
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
  }, [registrarOperacao, elementos, capacidadeInicial]);


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