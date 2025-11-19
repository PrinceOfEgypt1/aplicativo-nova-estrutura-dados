// src/components/DataStructures/ArvoreBinaria/useArvoreBinaria.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as metodos from './metodosArvore';
import { TreeElement, OperationState, OperationHistory } from './arvore';
import { validarNumero } from '../../../utils/validationUtils';

export function useArvoreBinaria(capacidadeMaxima: number = 15) {
  const [elementos, setElementos] = useState<TreeElement[]>([]);
  const [elementoDestacado, setElementoDestacado] = useState<string | null>(null);
  const [mensagemAcao, setMensagemAcao] = useState<string | null>(null);
  const [historico, setHistorico] = useState<OperationHistory[]>([]);

  const registrarOperacao = useCallback((operacao: string, status: OperationState, detalhes?: string) => {
    setHistorico(prev => [...prev, { operacao, timestamp: Date.now(), status, detalhes }]);
  }, []);

  const executarMetodo = useCallback(async (metodo: string, ...args: any[]) => {
    try {
      let mensagem = '';

      const handlers: Record<string, () => void> = {
        inserir: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          if (elementos.length >= capacidadeMaxima) throw new Error('Árvore cheia!');
          if (metodos.contem(elementos, Number(args[0]))) {
            throw new Error('Valor já existe na árvore!');
          }
          const nova = metodos.inserir(elementos, Number(args[0]), uuidv4());
          setElementos(nova);
          const inserido = nova.find(el => el.value === Number(args[0]));
          if (inserido) setElementoDestacado(inserido.id);
          mensagem = `Elemento ${args[0]} inserido`;
        },
        remover: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const { novaArvore, elementoRemovido } = metodos.remover(elementos, Number(args[0]));
          if (!elementoRemovido) throw new Error('Elemento não encontrado!');
          setElementos(novaArvore);
          mensagem = `Elemento ${args[0]} removido`;
        },
        buscar: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const index = metodos.buscar(elementos, Number(args[0]));
          if (index === -1) {
            mensagem = `Elemento ${args[0]} não encontrado`;
          } else {
            setElementoDestacado(elementos[index].id);
            mensagem = `Elemento ${args[0]} encontrado`;
          }
        },
        contem: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          const contem = metodos.contem(elementos, Number(args[0]));
          mensagem = contem ? `Árvore contém ${args[0]}` : `Árvore não contém ${args[0]}`;
        },
        obterMin: () => {
          const min = metodos.obterMin(elementos);
          if (!min) throw new Error('Árvore vazia!');
          setElementoDestacado(min.id);
          mensagem = `Menor elemento: ${min.value}`;
        },
        obterMax: () => {
          const max = metodos.obterMax(elementos);
          if (!max) throw new Error('Árvore vazia!');
          setElementoDestacado(max.id);
          mensagem = `Maior elemento: ${max.value}`;
        },
        altura: () => {
          const h = metodos.altura(elementos);
          mensagem = `Altura da árvore: ${h}`;
        },
        tamanho: () => {
          mensagem = `Tamanho: ${metodos.tamanho(elementos)}`;
        },
        estaVazia: () => {
          mensagem = metodos.estaVazia(elementos) ? 'Árvore vazia' : 'Árvore não vazia';
        },
        limpar: () => {
          setElementos(metodos.limpar());
          mensagem = 'Árvore limpa';
        },
        inOrder: () => {
          const ordem = metodos.inOrder(elementos);
          mensagem = `InOrder: [${ordem.join(', ')}]`;
        },
        preOrder: () => {
          const ordem = metodos.preOrder(elementos);
          mensagem = `PreOrder: [${ordem.join(', ')}]`;
        },
        postOrder: () => {
          const ordem = metodos.postOrder(elementos);
          mensagem = `PostOrder: [${ordem.join(', ')}]`;
        },
        estaBalanceada: () => {
          const balanceada = metodos.estaBalanceada(elementos);
          mensagem = balanceada ? 'Árvore balanceada ' : 'Árvore desbalanceada ';
        },
        obterRaiz: () => {
          const raiz = metodos.obterRaiz(elementos);
          if (!raiz) throw new Error('Árvore vazia!');
          setElementoDestacado(raiz.id);
          mensagem = `Raiz: ${raiz.value}`;
        },
        paraArray: () => {
          const arr = metodos.paraArray(elementos);
          mensagem = `Array: [${arr.join(', ')}]`;
        },
        clonar: () => {
          const clone = metodos.clonar(elementos);
          mensagem = `Árvore clonada com ${clone.length} elementos`;
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
