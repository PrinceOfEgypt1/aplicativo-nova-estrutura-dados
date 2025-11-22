import { useState, useCallback, useMemo } from "react";
import { Grafo } from "./grafo";
import { obterEstatisticas, obterArestas } from "./metodosGrafo";

/**
 * Hook personalizado para gerenciar um Grafo
 *
 * @param direcionado - Se o grafo é direcionado (padrão: false)
 * @returns Objeto contendo o grafo e métodos para manipulá-lo
 */
export function useGrafo(direcionado: boolean = false) {
  const [grafo] = useState(() => new Grafo(direcionado));
  const [versao, setVersao] = useState(0);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarEstado = useCallback(() => {
    setVersao((v) => v + 1);
  }, []);

  const mostrarMensagem = useCallback((msg: string, isErro = false) => {
    if (isErro) {
      setErro(msg);
      setMensagem(null);
    } else {
      setMensagem(msg);
      setErro(null);
    }
    setTimeout(() => {
      setMensagem(null);
      setErro(null);
    }, 3000);
  }, []);

  const adicionarVertice = useCallback(
    (vertice: number) => {
      try {
        grafo.adicionarVertice(vertice);
        atualizarEstado();
        mostrarMensagem(`Vértice ${vertice} adicionado`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao adicionar vértice",
          true
        );
      }
    },
    [grafo, atualizarEstado, mostrarMensagem]
  );

  const removerVertice = useCallback(
    (vertice: number) => {
      try {
        grafo.removerVertice(vertice);
        atualizarEstado();
        mostrarMensagem(`Vértice ${vertice} removido`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao remover vértice",
          true
        );
      }
    },
    [grafo, atualizarEstado, mostrarMensagem]
  );

  const adicionarAresta = useCallback(
    (origem: number, destino: number, peso: number = 1) => {
      try {
        grafo.adicionarAresta(origem, destino, peso);
        atualizarEstado();
        mostrarMensagem(`Aresta ${origem} ’ ${destino} adicionada (peso: ${peso})`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao adicionar aresta",
          true
        );
      }
    },
    [grafo, atualizarEstado, mostrarMensagem]
  );

  const removerAresta = useCallback(
    (origem: number, destino: number) => {
      try {
        grafo.removerAresta(origem, destino);
        atualizarEstado();
        mostrarMensagem(`Aresta ${origem} ’ ${destino} removida`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao remover aresta",
          true
        );
      }
    },
    [grafo, atualizarEstado, mostrarMensagem]
  );

  const buscaProfundidade = useCallback(
    (inicio: number) => {
      try {
        const resultado = grafo.buscaProfundidade(inicio);
        mostrarMensagem(`DFS: ${resultado.join(" ’ ")}`);
        return resultado;
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro na busca em profundidade",
          true
        );
        return [];
      }
    },
    [grafo, mostrarMensagem]
  );

  const buscaLargura = useCallback(
    (inicio: number) => {
      try {
        const resultado = grafo.buscaLargura(inicio);
        mostrarMensagem(`BFS: ${resultado.join(" ’ ")}`);
        return resultado;
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro na busca em largura",
          true
        );
        return [];
      }
    },
    [grafo, mostrarMensagem]
  );

  const limpar = useCallback(() => {
    grafo.limpar();
    atualizarEstado();
    mostrarMensagem("Grafo limpo");
  }, [grafo, atualizarEstado, mostrarMensagem]);

  const info = useMemo(() => {
    const stats = obterEstatisticas(grafo);
    const vertices = grafo.obterVertices();
    const arestas = obterArestas(grafo);

    return {
      ...stats,
      vertices,
      arestas,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versao, grafo]);

  return {
    adicionarVertice,
    removerVertice,
    adicionarAresta,
    removerAresta,
    buscaProfundidade,
    buscaLargura,
    limpar,
    info,
    mensagem,
    erro,
    grafo,
  };
}
