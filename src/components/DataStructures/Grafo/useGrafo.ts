// src/components/DataStructures/Grafo/useGrafo.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as metodos from './metodosGrafo';
import { Grafo, Vertice, OperationState, OperationHistory } from './grafo';
import { validarNumero } from '../../../utils/validationUtils';

export function useGrafo(capacidadeMaxima: number = 10) {
  const [grafo, setGrafo] = useState<Grafo>({
    vertices: [],
    arestas: [],
    direcionado: false,
  });
  const [verticeDestacado, setVerticeDestacado] = useState<string | null>(null);
  const [arestaDestacada, setArestaDestacada] = useState<{ origem: string; destino: string } | null>(null);
  const [mensagemAcao, setMensagemAcao] = useState<string | null>(null);
  const [historico, setHistorico] = useState<OperationHistory[]>([]);

  const registrarOperacao = useCallback((operacao: string, status: OperationState, detalhes?: string) => {
    setHistorico(prev => [...prev, { operacao, timestamp: Date.now(), status, detalhes }]);
  }, []);

  const executarMetodo = useCallback(async (metodo: string, ...args: any[]) => {
    try {
      let mensagem = '';

      const handlers: Record<string, () => void> = {
        adicionarVertice: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          if (grafo.vertices.length >= capacidadeMaxima) throw new Error('Grafo cheio!');

          const novoVertice: Vertice = {
            id: uuidv4(),
            valor: Number(args[0]),
            x: Math.random() * 400 + 100,
            y: Math.random() * 300 + 100,
          };

          const novoGrafo = metodos.adicionarVertice(grafo, novoVertice);
          setGrafo(novoGrafo);
          setVerticeDestacado(novoVertice.id);
          mensagem = `Vértice ${args[0]} adicionado`;
        },

        removerVertice: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const vertice = grafo.vertices.find(v => v.valor === Number(args[0]));
          if (!vertice) throw new Error('Vértice não encontrado!');

          const novoGrafo = metodos.removerVertice(grafo, vertice.id);
          setGrafo(novoGrafo);
          mensagem = `Vértice ${args[0]} removido`;
        },

        adicionarAresta: () => {
          const validacao1 = validarNumero(args[0]);
          const validacao2 = validarNumero(args[1]);
          if (!validacao1.valido || !validacao2.valido) throw new Error('Valores inválidos');

          const origem = grafo.vertices.find(v => v.valor === Number(args[0]));
          const destino = grafo.vertices.find(v => v.valor === Number(args[1]));

          if (!origem || !destino) throw new Error('Vértices não encontrados!');

          const novaAresta = { origem: origem.id, destino: destino.id };
          const novoGrafo = metodos.adicionarAresta(grafo, novaAresta);
          setGrafo(novoGrafo);
          setArestaDestacada(novaAresta);
          mensagem = `Aresta ${args[0]} ’ ${args[1]} adicionada`;
        },

        removerAresta: () => {
          const validacao1 = validarNumero(args[0]);
          const validacao2 = validarNumero(args[1]);
          if (!validacao1.valido || !validacao2.valido) throw new Error('Valores inválidos');

          const origem = grafo.vertices.find(v => v.valor === Number(args[0]));
          const destino = grafo.vertices.find(v => v.valor === Number(args[1]));

          if (!origem || !destino) throw new Error('Vértices não encontrados!');

          const novoGrafo = metodos.removerAresta(grafo, origem.id, destino.id);
          setGrafo(novoGrafo);
          mensagem = `Aresta ${args[0]} ’ ${args[1]} removida`;
        },

        obterVizinhos: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const vertice = grafo.vertices.find(v => v.valor === Number(args[0]));
          if (!vertice) throw new Error('Vértice não encontrado!');

          const vizinhos = metodos.obterVizinhos(grafo, vertice.id);
          const valores = vizinhos.map(id => grafo.vertices.find(v => v.id === id)?.valor);
          setVerticeDestacado(vertice.id);
          mensagem = `Vizinhos de ${args[0]}: [${valores.join(', ')}]`;
        },

        obterGrau: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const vertice = grafo.vertices.find(v => v.valor === Number(args[0]));
          if (!vertice) throw new Error('Vértice não encontrado!');

          const grau = metodos.obterGrau(grafo, vertice.id);
          setVerticeDestacado(vertice.id);
          mensagem = `Grau de ${args[0]}: ${grau}`;
        },

        contemVertice: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const vertice = grafo.vertices.find(v => v.valor === Number(args[0]));
          const contem = metodos.contemVertice(grafo, vertice?.id || '');
          mensagem = contem ? `Grafo contém vértice ${args[0]}` : `Grafo não contém vértice ${args[0]}`;
        },

        bfs: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const vertice = grafo.vertices.find(v => v.valor === Number(args[0]));
          if (!vertice) throw new Error('Vértice não encontrado!');

          const resultado = metodos.bfs(grafo, vertice.id);
          const valores = resultado.map(id => grafo.vertices.find(v => v.id === id)?.valor);
          mensagem = `BFS de ${args[0]}: [${valores.join(', ')}]`;
        },

        dfs: () => {
          const validacao = validarNumero(args[0]);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          const vertice = grafo.vertices.find(v => v.valor === Number(args[0]));
          if (!vertice) throw new Error('Vértice não encontrado!');

          const resultado = metodos.dfs(grafo, vertice.id);
          const valores = resultado.map(id => grafo.vertices.find(v => v.id === id)?.valor);
          mensagem = `DFS de ${args[0]}: [${valores.join(', ')}]`;
        },

        estaConectado: () => {
          const validacao1 = validarNumero(args[0]);
          const validacao2 = validarNumero(args[1]);
          if (!validacao1.valido || !validacao2.valido) throw new Error('Valores inválidos');

          const origem = grafo.vertices.find(v => v.valor === Number(args[0]));
          const destino = grafo.vertices.find(v => v.valor === Number(args[1]));

          if (!origem || !destino) throw new Error('Vértices não encontrados!');

          const conectado = metodos.estaConectado(grafo, origem.id, destino.id);
          mensagem = conectado
            ? `${args[0]} e ${args[1]} estão conectados`
            : `${args[0]} e ${args[1]} NÃO estão conectados`;
        },

        obterCaminho: () => {
          const validacao1 = validarNumero(args[0]);
          const validacao2 = validarNumero(args[1]);
          if (!validacao1.valido || !validacao2.valido) throw new Error('Valores inválidos');

          const origem = grafo.vertices.find(v => v.valor === Number(args[0]));
          const destino = grafo.vertices.find(v => v.valor === Number(args[1]));

          if (!origem || !destino) throw new Error('Vértices não encontrados!');

          const resultado = metodos.obterCaminho(grafo, origem.id, destino.id);
          if (resultado.existe) {
            const valores = resultado.caminho.map(id => grafo.vertices.find(v => v.id === id)?.valor);
            mensagem = `Caminho: [${valores.join(' ’ ')}] (distância: ${resultado.distancia})`;
          } else {
            mensagem = `Não existe caminho entre ${args[0]} e ${args[1]}`;
          }
        },

        limpar: () => {
          setGrafo(metodos.limpar());
          mensagem = 'Grafo limpo';
        },

        tamanhoVertices: () => {
          mensagem = `Total de vértices: ${metodos.tamanhoVertices(grafo)}`;
        },

        totalArestas: () => {
          mensagem = `Total de arestas: ${metodos.totalArestas(grafo)}`;
        },

        estaVazio: () => {
          mensagem = metodos.estaVazio(grafo) ? 'Grafo vazio' : 'Grafo não vazio';
        },

        clonar: () => {
          const clone = metodos.clonar(grafo);
          mensagem = `Grafo clonado com ${clone.vertices.length} vértices e ${clone.arestas.length} arestas`;
        },

        toggleDirecionado: () => {
          setGrafo({ ...grafo, direcionado: !grafo.direcionado });
          mensagem = grafo.direcionado ? 'Grafo agora é não direcionado' : 'Grafo agora é direcionado';
        },
      };

      const handler = handlers[metodo];
      if (!handler) throw new Error(`Método '${metodo}' não implementado`);

      handler();
      setMensagemAcao(mensagem);
      registrarOperacao(mensagem, OperationState.COMPLETED);
      setTimeout(() => {
        setVerticeDestacado(null);
        setArestaDestacada(null);
      }, 2000);

    } catch (error: any) {
      const mensagemErro = error.message || 'Erro desconhecido';
      setMensagemAcao(`L ${mensagemErro}`);
      registrarOperacao(mensagemErro, OperationState.ERROR);
      throw error;
    }
  }, [grafo, capacidadeMaxima, registrarOperacao]);

  return {
    grafo,
    verticeDestacado,
    arestaDestacada,
    mensagemAcao,
    historico,
    capacidadeMaxima,
    executarMetodo,
    setVerticeDestacado,
    setMensagemAcao,
    registrarOperacao,
  };
}
