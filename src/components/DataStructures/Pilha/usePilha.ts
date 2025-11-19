// src/components/DataStructures/Pilha/usePilha.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as metodosPilha from './metodosPilha';
import { StackElement, OperationState, OperationHistory } from './pilha';
import { validarNumero } from '../../../utils/validationUtils';

export function usePilha(capacidadeMaxima: number = 20) {
  const [elementos, setElementos] = useState<StackElement[]>([]);
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
        case 'push': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          if (elementos.length >= capacidadeMaxima) {
            throw new Error(`Pilha cheia! Capacidade m�xima: ${capacidadeMaxima}`);
          }

          const novaPilha = metodosPilha.push(elementos, Number(valor), uuidv4());
          setElementos(novaPilha);
          setElementoDestacado(novaPilha[novaPilha.length - 1].id);
          mensagem = `Elemento ${valor} empilhado no topo`;
          break;
        }

        case 'pop': {
          if (elementos.length === 0) {
            throw new Error('Pilha vazia! N�o � poss�vel desempilhar');
          }
          const { novaPilha, elementoRemovido } = metodosPilha.pop(elementos);
          setElementos(novaPilha);
          mensagem = `Elemento ${elementoRemovido?.value} desempilhado do topo`;
          break;
        }

        case 'peek': {
          const topo = metodosPilha.peek(elementos);
          if (!topo) throw new Error('Pilha vazia!');
          setElementoDestacado(topo.id);
          mensagem = `Topo da pilha: ${topo.value}`;
          break;
        }

        case 'isEmpty': {
          const vazia = metodosPilha.isEmpty(elementos);
          mensagem = vazia ? 'A pilha est� vazia' : 'A pilha n�o est� vazia';
          break;
        }

        case 'size': {
          const tamanho = metodosPilha.size(elementos);
          mensagem = `Tamanho da pilha: ${tamanho}`;
          break;
        }

        case 'clear': {
          setElementos(metodosPilha.clear());
          mensagem = 'Pilha limpa com sucesso';
          break;
        }

        case 'search': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const posicao = metodosPilha.search(elementos, Number(valor));
          if (posicao === -1) {
            mensagem = `Elemento ${valor} n�o encontrado na pilha`;
          } else {
            const indice = elementos.length - 1 - posicao;
            setElementoDestacado(elementos[indice].id);
            mensagem = `Elemento ${valor} encontrado a ${posicao} posi��es do topo`;
          }
          break;
        }

        case 'contains': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const contem = metodosPilha.contains(elementos, Number(valor));
          mensagem = contem
            ? `A pilha cont�m o elemento ${valor}`
            : `A pilha n�o cont�m o elemento ${valor}`;
          break;
        }

        case 'toArray': {
          const array = metodosPilha.toArray(elementos);
          mensagem = `Pilha convertida para array: [${array.join(', ')}]`;
          break;
        }

        case 'clone': {
          const clonada = metodosPilha.clone(elementos);
          mensagem = `Pilha clonada com ${clonada.length} elementos`;
          break;
        }

        case 'reverse': {
          const invertida = metodosPilha.reverse(elementos);
          setElementos(invertida);
          mensagem = 'Pilha invertida com sucesso';
          break;
        }

        case 'pushMultiple': {
          const [valores] = args;
          if (!valores || valores.trim() === '') {
            throw new Error('Digite os valores separados por v�rgula');
          }

          const valoresArray = valores.split(',').map((v: string) => v.trim());

          // Validar todos os valores
          for (const val of valoresArray) {
            const validacao = validarNumero(val);
            if (!validacao.valido) {
              throw new Error(`Valor inv�lido: ${val}. ${validacao.mensagem}`);
            }
          }

          const numerosArray = valoresArray.map(Number);

          if (elementos.length + numerosArray.length > capacidadeMaxima) {
            throw new Error(
              `Capacidade excedida! Atual: ${elementos.length}, Adicionando: ${numerosArray.length}, M�ximo: ${capacidadeMaxima}`
            );
          }

          const novaPilha = metodosPilha.pushMultiple(elementos, numerosArray, uuidv4);
          setElementos(novaPilha);
          mensagem = `${numerosArray.length} elementos empilhados: [${numerosArray.join(', ')}]`;
          break;
        }

        case 'getMin': {
          const minElemento = metodosPilha.getMin(elementos);
          if (!minElemento) throw new Error('Pilha vazia!');
          setElementoDestacado(minElemento.id);
          mensagem = `Menor elemento: ${minElemento.value}`;
          break;
        }

        case 'getMax': {
          const maxElemento = metodosPilha.getMax(elementos);
          if (!maxElemento) throw new Error('Pilha vazia!');
          setElementoDestacado(maxElemento.id);
          mensagem = `Maior elemento: ${maxElemento.value}`;
          break;
        }

        default:
          throw new Error(`M�todo '${metodo}' n�o implementado`);
      }

      setMensagemAcao(mensagem);
      registrarOperacao(mensagem, OperationState.COMPLETED);

      // Limpar destaque ap�s 2 segundos
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
