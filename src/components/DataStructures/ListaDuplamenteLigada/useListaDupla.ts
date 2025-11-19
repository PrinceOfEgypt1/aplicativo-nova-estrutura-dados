// src/components/DataStructures/ListaDuplamenteLigada/useListaDupla.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as metodos from './metodosListaDupla';
import { DoublyLinkedListElement, OperationState, OperationHistory } from './listaDupla';
import { validarNumero } from '../../../utils/validationUtils';

export function useListaDupla(capacidadeMaxima: number = 20) {
  const [elementos, setElementos] = useState<DoublyLinkedListElement[]>([]);
  const [elementoDestacado, setElementoDestacado] = useState<string | null>(null);
  const [mensagemAcao, setMensagemAcao] = useState<string | null>(null);
  const [historico, setHistorico] = useState<OperationHistory[]>([]);
  const [posicaoNavegacao, setPosicaoNavegacao] = useState<number>(0);

  const registrarOperacao = useCallback((operacao: string, status: OperationState, detalhes?: string) => {
    setHistorico(prev => [...prev, { operacao, timestamp: Date.now(), status, detalhes }]);
  }, []);

  const executarMetodo = useCallback(async (metodo: string, ...args: any[]) => {
    try {
      let mensagem = '';
      const handlers: Record<string, () => void> = {
        inserirInicio: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          if (elementos.length >= capacidadeMaxima) throw new Error(`Lista cheia!`);
          const nova = metodos.inserirInicio(elementos, Number(args[0]), uuidv4());
          setElementos(nova);
          setElementoDestacado(nova[0].id);
          mensagem = `Elemento ${args[0]} inserido no início`;
        },
        inserirFim: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          if (elementos.length >= capacidadeMaxima) throw new Error(`Lista cheia!`);
          const nova = metodos.inserirFim(elementos, Number(args[0]), uuidv4());
          setElementos(nova);
          setElementoDestacado(nova[nova.length - 1].id);
          mensagem = `Elemento ${args[0]} inserido no final`;
        },
        inserirPosicao: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const pos = Number(args[1]);
          if (elementos.length >= capacidadeMaxima) throw new Error(`Lista cheia!`);
          const nova = metodos.inserirPosicao(elementos, Number(args[0]), pos, uuidv4());
          setElementos(nova);
          setElementoDestacado(nova[pos].id);
          mensagem = `Elemento ${args[0]} inserido na posição ${pos}`;
        },
        inserirAntes: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const pos = Number(args[1]);
          if (elementos.length >= capacidadeMaxima) throw new Error(`Lista cheia!`);
          const nova = metodos.inserirAntes(elementos, Number(args[0]), pos, uuidv4());
          setElementos(nova);
          setElementoDestacado(nova[pos].id);
          mensagem = `Elemento ${args[0]} inserido antes da posição ${pos}`;
        },
        inserirDepois: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const pos = Number(args[1]);
          if (elementos.length >= capacidadeMaxima) throw new Error(`Lista cheia!`);
          const nova = metodos.inserirDepois(elementos, Number(args[0]), pos, uuidv4());
          setElementos(nova);
          setElementoDestacado(nova[pos + 1].id);
          mensagem = `Elemento ${args[0]} inserido depois da posição ${pos}`;
        },
        removerInicio: () => {
          if (elementos.length === 0) throw new Error('Lista vazia!');
          const { novaLista, elementoRemovido } = metodos.removerInicio(elementos);
          setElementos(novaLista);
          mensagem = `Elemento ${elementoRemovido?.value} removido do início`;
        },
        removerFim: () => {
          if (elementos.length === 0) throw new Error('Lista vazia!');
          const { novaLista, elementoRemovido } = metodos.removerFim(elementos);
          setElementos(novaLista);
          mensagem = `Elemento ${elementoRemovido?.value} removido do final`;
        },
        removerPosicao: () => {
          const pos = Number(args[0]);
          const { novaLista, elementoRemovido } = metodos.removerPosicao(elementos, pos);
          setElementos(novaLista);
          mensagem = `Elemento ${elementoRemovido?.value} removido da posição ${pos}`;
        },
        removerPorValor: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const { novaLista, elementoRemovido, posicaoRemovida } = metodos.removerPorValor(elementos, Number(args[0]));
          if (!elementoRemovido) throw new Error(`Elemento não encontrado`);
          setElementos(novaLista);
          mensagem = `Elemento ${args[0]} removido da posição ${posicaoRemovida}`;
        },
        buscar: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const pos = metodos.buscar(elementos, Number(args[0]));
          if (pos === -1) {
            mensagem = `Elemento ${args[0]} não encontrado`;
          } else {
            setElementoDestacado(elementos[pos].id);
            setPosicaoNavegacao(pos);
            mensagem = `Elemento ${args[0]} encontrado na posição ${pos}`;
          }
        },
        contem: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const contem = metodos.contem(elementos, Number(args[0]));
          mensagem = contem ? `A lista contém ${args[0]}` : `A lista não contém ${args[0]}`;
        },
        tamanho: () => {
          mensagem = `Tamanho: ${metodos.tamanho(elementos)}`;
        },
        estaVazia: () => {
          mensagem = metodos.estaVazia(elementos) ? 'Lista vazia' : 'Lista não vazia';
        },
        limpar: () => {
          setElementos(metodos.limpar());
          setPosicaoNavegacao(0);
          mensagem = 'Lista limpa';
        },
        obterPosicao: () => {
          const pos = Number(args[0]);
          const el = metodos.obterPosicao(elementos, pos);
          if (el) {
            setElementoDestacado(el.id);
            setPosicaoNavegacao(pos);
            mensagem = `Posição ${pos}: ${el.value}`;
          }
        },
        inverter: () => {
          setElementos(metodos.inverter(elementos));
          mensagem = 'Lista invertida';
        },
        paraArray: () => {
          mensagem = `Array: [${metodos.paraArray(elementos).join(', ')}]`;
        },
        clonar: () => {
          mensagem = `Lista clonada com ${metodos.clonar(elementos).length} elementos`;
        },
        obterCabeca: () => {
          const el = metodos.obterCabeca(elementos);
          if (!el) throw new Error('Lista vazia!');
          setElementoDestacado(el.id);
          setPosicaoNavegacao(0);
          mensagem = `Cabeça: ${el.value}`;
        },
        obterCauda: () => {
          const el = metodos.obterCauda(elementos);
          if (!el) throw new Error('Lista vazia!');
          setElementoDestacado(el.id);
          setPosicaoNavegacao(elementos.length - 1);
          mensagem = `Cauda: ${el.value}`;
        },
        obterMin: () => {
          const el = metodos.obterMin(elementos);
          if (!el) throw new Error('Lista vazia!');
          setElementoDestacado(el.id);
          mensagem = `Menor: ${el.value}`;
        },
        obterMax: () => {
          const el = metodos.obterMax(elementos);
          if (!el) throw new Error('Lista vazia!');
          setElementoDestacado(el.id);
          mensagem = `Maior: ${el.value}`;
        },
        navegarFrente: () => {
          const novaPos = metodos.navegarFrente(elementos, posicaoNavegacao);
          setPosicaoNavegacao(novaPos);
          if (elementos[novaPos]) {
            setElementoDestacado(elementos[novaPos].id);
            mensagem = `Navegando para frente ’ Posição ${novaPos}: ${elementos[novaPos].value}`;
          }
        },
        navegarTras: () => {
          const novaPos = metodos.navegarTras(elementos, posicaoNavegacao);
          setPosicaoNavegacao(novaPos);
          if (elementos[novaPos]) {
            setElementoDestacado(elementos[novaPos].id);
            mensagem = `Navegando para trás  Posição ${novaPos}: ${elementos[novaPos].value}`;
          }
        },
      };

      const handler = handlers[metodo];
      if (!handler) throw new Error(`Método '${metodo}' não implementado`);

      handler();
      setMensagemAcao(mensagem);
      registrarOperacao(mensagem, OperationState.COMPLETED);
      setTimeout(() => setElementoDestacado(null), 2000);

    } catch (error: any) {
      const mensagemErro = error.message || 'Erro desconhecido';
      setMensagemAcao(`L ${mensagemErro}`);
      registrarOperacao(mensagemErro, OperationState.ERROR);
      throw error;
    }
  }, [elementos, capacidadeMaxima, posicaoNavegacao, registrarOperacao]);

  return {
    elementos,
    elementoDestacado,
    mensagemAcao,
    historico,
    capacidadeMaxima,
    posicaoNavegacao,
    executarMetodo,
    setElementoDestacado,
    setMensagemAcao,
    registrarOperacao,
  };
}
