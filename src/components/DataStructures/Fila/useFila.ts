// src/components/DataStructures/Fila/useFila.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as metodosFila from './metodosFila';
import { QueueElement, OperationState, OperationHistory } from './fila';
import { validarNumero } from '../../../utils/validationUtils';

export function useFila(capacidadeMaxima: number = 20) {
  const [elementos, setElementos] = useState<QueueElement[]>([]);
  const [elementoDestacado, setElementoDestacado] = useState<string | null>(null);
  const [mensagemAcao, setMensagemAcao] = useState<string | null>(null);
  const [historico, setHistorico] = useState<OperationHistory[]>([]);

  const registrarOperacao = useCallback((operacao: string, status: OperationState, detalhes?: string) => {
    const novaOperacao: OperationHistory = {
      operacao,
      timestamp: Date.now(),
      status,
      detalhes,
    };
    setHistorico(prev => [...prev, novaOperacao]);
  }, []);

  const executarMetodo = useCallback(async (metodo: string, ...args: any[]) => {
    try {
      let mensagem: string;

      switch (metodo) {
        case 'enqueue': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          if (elementos.length >= capacidadeMaxima) {
            throw new Error(`Fila cheia! Capacidade máxima: ${capacidadeMaxima}`);
          }

          const novaFila = metodosFila.enqueue(elementos, Number(valor), uuidv4());
          setElementos(novaFila);
          setElementoDestacado(novaFila[novaFila.length - 1].id);
          mensagem = `Elemento ${valor} adicionado ao final da fila`;
          break;
        }

        case 'dequeue': {
          if (elementos.length === 0) {
            throw new Error('Fila vazia! Não é possível remover');
          }
          const { novaFila, elementoRemovido } = metodosFila.dequeue(elementos);
          setElementos(novaFila);
          mensagem = `Elemento ${elementoRemovido?.value} removido do início da fila`;
          break;
        }

        case 'front': {
          const inicio = metodosFila.front(elementos);
          if (!inicio) throw new Error('Fila vazia!');
          setElementoDestacado(inicio.id);
          mensagem = `Início da fila: ${inicio.value}`;
          break;
        }

        case 'rear': {
          const fim = metodosFila.rear(elementos);
          if (!fim) throw new Error('Fila vazia!');
          setElementoDestacado(fim.id);
          mensagem = `Final da fila: ${fim.value}`;
          break;
        }

        case 'isEmpty': {
          const vazia = metodosFila.isEmpty(elementos);
          mensagem = vazia ? 'A fila está vazia' : 'A fila não está vazia';
          break;
        }

        case 'size': {
          const tamanho = metodosFila.size(elementos);
          mensagem = `Tamanho da fila: ${tamanho}`;
          break;
        }

        case 'clear': {
          setElementos(metodosFila.clear());
          mensagem = 'Fila limpa com sucesso';
          break;
        }

        case 'search': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const posicao = metodosFila.search(elementos, Number(valor));
          if (posicao === -1) {
            mensagem = `Elemento ${valor} não encontrado na fila`;
          } else {
            setElementoDestacado(elementos[posicao].id);
            mensagem = `Elemento ${valor} encontrado na posição ${posicao} (0 = início)`;
          }
          break;
        }

        case 'contains': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const contem = metodosFila.contains(elementos, Number(valor));
          mensagem = contem
            ? `A fila contém o elemento ${valor}`
            : `A fila não contém o elemento ${valor}`;
          break;
        }

        case 'toArray': {
          const array = metodosFila.toArray(elementos);
          mensagem = `Fila convertida para array: [${array.join(', ')}]`;
          break;
        }

        case 'clone': {
          const clonada = metodosFila.clone(elementos);
          mensagem = `Fila clonada com ${clonada.length} elementos`;
          break;
        }

        case 'reverse': {
          const invertida = metodosFila.reverse(elementos);
          setElementos(invertida);
          mensagem = 'Fila invertida com sucesso';
          break;
        }

        case 'enqueueMultiple': {
          const [valores] = args;
          if (!valores || valores.trim() === '') {
            throw new Error('Digite os valores separados por vírgula');
          }

          const valoresArray = valores.split(',').map((v: string) => v.trim());

          // Validar todos os valores
          for (const val of valoresArray) {
            const validacao = validarNumero(val);
            if (!validacao.valido) {
              throw new Error(`Valor inválido: ${val}. ${validacao.mensagem}`);
            }
          }

          const numerosArray = valoresArray.map(Number);

          if (elementos.length + numerosArray.length > capacidadeMaxima) {
            throw new Error(
              `Capacidade excedida! Atual: ${elementos.length}, Adicionando: ${numerosArray.length}, Máximo: ${capacidadeMaxima}`
            );
          }

          const novaFila = metodosFila.enqueueMultiple(elementos, numerosArray, uuidv4);
          setElementos(novaFila);
          mensagem = `${numerosArray.length} elementos adicionados: [${numerosArray.join(', ')}]`;
          break;
        }

        case 'getMin': {
          const minElemento = metodosFila.getMin(elementos);
          if (!minElemento) throw new Error('Fila vazia!');
          setElementoDestacado(minElemento.id);
          mensagem = `Menor elemento: ${minElemento.value}`;
          break;
        }

        case 'getMax': {
          const maxElemento = metodosFila.getMax(elementos);
          if (!maxElemento) throw new Error('Fila vazia!');
          setElementoDestacado(maxElemento.id);
          mensagem = `Maior elemento: ${maxElemento.value}`;
          break;
        }

        default:
          throw new Error(`Método '${metodo}' não implementado`);
      }

      setMensagemAcao(mensagem);
      registrarOperacao(mensagem, OperationState.COMPLETED);

      // Limpar destaque após 2 segundos
      setTimeout(() => setElementoDestacado(null), 2000);

    } catch (error: any) {
      const mensagemErro = error.message || 'Erro desconhecido';
      setMensagemAcao(`L ${mensagemErro}`);
      registrarOperacao(mensagemErro, OperationState.ERROR);
      throw error;
    }
  }, [elementos, capacidadeMaxima, registrarOperacao]);

  return {
    elementos,
    elementoDestacado,
    mensagemAcao,
    historico,
    capacidadeMaxima,
    executarMetodo,
    setElementoDestacado,
    setMensagemAcao,
    registrarOperacao,
  };
}
