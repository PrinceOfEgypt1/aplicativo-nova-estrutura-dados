// src/components/DataStructures/ListaLigada/useListaLigada.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as metodosLista from './metodosListaLigada';
import { LinkedListElement, OperationState, OperationHistory } from './listaLigada';
import { validarNumero } from '../../../utils/validationUtils';

export function useListaLigada(capacidadeMaxima: number = 20) {
  const [elementos, setElementos] = useState<LinkedListElement[]>([]);
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
      let mensagem: string = '';

      switch (metodo) {
        case 'inserirInicio': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          if (elementos.length >= capacidadeMaxima) {
            throw new Error(`Lista cheia! Capacidade m�xima: ${capacidadeMaxima}`);
          }

          const novaLista = metodosLista.inserirInicio(elementos, Number(valor), uuidv4());
          setElementos(novaLista);
          setElementoDestacado(novaLista[0].id);
          mensagem = `Elemento ${valor} inserido no in�cio`;
          break;
        }

        case 'inserirFim': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          if (elementos.length >= capacidadeMaxima) {
            throw new Error(`Lista cheia! Capacidade m�xima: ${capacidadeMaxima}`);
          }

          const novaLista = metodosLista.inserirFim(elementos, Number(valor), uuidv4());
          setElementos(novaLista);
          setElementoDestacado(novaLista[novaLista.length - 1].id);
          mensagem = `Elemento ${valor} inserido no final`;
          break;
        }

        case 'inserirPosicao': {
          const [valor, posicao] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const posicaoNum = Number(posicao);
          if (isNaN(posicaoNum) || posicaoNum < 0 || posicaoNum > elementos.length) {
            throw new Error('Posi��o inv�lida');
          }

          if (elementos.length >= capacidadeMaxima) {
            throw new Error(`Lista cheia! Capacidade m�xima: ${capacidadeMaxima}`);
          }

          const novaLista = metodosLista.inserirPosicao(elementos, Number(valor), posicaoNum, uuidv4());
          setElementos(novaLista);
          setElementoDestacado(novaLista[posicaoNum].id);
          mensagem = `Elemento ${valor} inserido na posi��o ${posicao}`;
          break;
        }

        case 'removerInicio': {
          if (elementos.length === 0) {
            throw new Error('Lista vazia!');
          }
          const { novaLista, elementoRemovido } = metodosLista.removerInicio(elementos);
          setElementos(novaLista);
          mensagem = `Elemento ${elementoRemovido?.value} removido do in�cio`;
          break;
        }

        case 'removerFim': {
          if (elementos.length === 0) {
            throw new Error('Lista vazia!');
          }
          const { novaLista, elementoRemovido } = metodosLista.removerFim(elementos);
          setElementos(novaLista);
          mensagem = `Elemento ${elementoRemovido?.value} removido do final`;
          break;
        }

        case 'removerPosicao': {
          const [posicao] = args;
          const posicaoNum = Number(posicao);
          if (isNaN(posicaoNum) || posicaoNum < 0 || posicaoNum >= elementos.length) {
            throw new Error('Posi��o inv�lida');
          }

          const { novaLista, elementoRemovido } = metodosLista.removerPosicao(elementos, posicaoNum);
          setElementos(novaLista);
          mensagem = `Elemento ${elementoRemovido?.value} removido da posi��o ${posicao}`;
          break;
        }

        case 'removerPorValor': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const { novaLista, elementoRemovido, posicaoRemovida } = metodosLista.removerPorValor(
            elementos,
            Number(valor)
          );

          if (!elementoRemovido) {
            throw new Error(`Elemento ${valor} n�o encontrado`);
          }

          setElementos(novaLista);
          mensagem = `Elemento ${valor} removido da posi��o ${posicaoRemovida}`;
          break;
        }

        case 'buscar': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const posicao = metodosLista.buscar(elementos, Number(valor));
          if (posicao === -1) {
            mensagem = `Elemento ${valor} n�o encontrado`;
          } else {
            setElementoDestacado(elementos[posicao].id);
            mensagem = `Elemento ${valor} encontrado na posi��o ${posicao}`;
          }
          break;
        }

        case 'contem': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const contem = metodosLista.contem(elementos, Number(valor));
          mensagem = contem
            ? `A lista cont�m o elemento ${valor}`
            : `A lista n�o cont�m o elemento ${valor}`;
          break;
        }

        case 'tamanho': {
          const tam = metodosLista.tamanho(elementos);
          mensagem = `Tamanho da lista: ${tam}`;
          break;
        }

        case 'estaVazia': {
          const vazia = metodosLista.estaVazia(elementos);
          mensagem = vazia ? 'A lista est� vazia' : 'A lista n�o est� vazia';
          break;
        }

        case 'limpar': {
          setElementos(metodosLista.limpar());
          mensagem = 'Lista limpa com sucesso';
          break;
        }

        case 'obterPosicao': {
          const [posicao] = args;
          const posicaoNum = Number(posicao);
          if (isNaN(posicaoNum) || posicaoNum < 0 || posicaoNum >= elementos.length) {
            throw new Error('Posi��o inv�lida');
          }

          const elemento = metodosLista.obterPosicao(elementos, posicaoNum);
          if (elemento) {
            setElementoDestacado(elemento.id);
            mensagem = `Posi��o ${posicao}: ${elemento.value}`;
          }
          break;
        }

        case 'inverter': {
          const invertida = metodosLista.inverter(elementos);
          setElementos(invertida);
          mensagem = 'Lista invertida com sucesso';
          break;
        }

        case 'paraArray': {
          const array = metodosLista.paraArray(elementos);
          mensagem = `Lista convertida: [${array.join(', ')}]`;
          break;
        }

        case 'clonar': {
          const clonada = metodosLista.clonar(elementos);
          mensagem = `Lista clonada com ${clonada.length} elementos`;
          break;
        }

        case 'obterCabeca': {
          const cabeca = metodosLista.obterCabeca(elementos);
          if (!cabeca) throw new Error('Lista vazia!');
          setElementoDestacado(cabeca.id);
          mensagem = `Cabe�a (head): ${cabeca.value}`;
          break;
        }

        case 'obterCauda': {
          const cauda = metodosLista.obterCauda(elementos);
          if (!cauda) throw new Error('Lista vazia!');
          setElementoDestacado(cauda.id);
          mensagem = `Cauda (tail): ${cauda.value}`;
          break;
        }

        case 'obterMin': {
          const min = metodosLista.obterMin(elementos);
          if (!min) throw new Error('Lista vazia!');
          setElementoDestacado(min.id);
          mensagem = `Menor elemento: ${min.value}`;
          break;
        }

        case 'obterMax': {
          const max = metodosLista.obterMax(elementos);
          if (!max) throw new Error('Lista vazia!');
          setElementoDestacado(max.id);
          mensagem = `Maior elemento: ${max.value}`;
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
