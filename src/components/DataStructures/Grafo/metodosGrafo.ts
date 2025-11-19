// src/components/DataStructures/Grafo/metodosGrafo.ts
import { Grafo, Vertice, Aresta, CaminhoResult } from './grafo';

// 1. ADICIONAR_VERTICE - Adiciona um vértice ao grafo
export function adicionarVertice(grafo: Grafo, vertice: Vertice): Grafo {
  return {
    ...grafo,
    vertices: [...grafo.vertices, vertice],
  };
}

// 2. REMOVER_VERTICE - Remove um vértice e todas as arestas conectadas
export function removerVertice(grafo: Grafo, verticeId: string): Grafo {
  return {
    ...grafo,
    vertices: grafo.vertices.filter(v => v.id !== verticeId),
    arestas: grafo.arestas.filter(a => a.origem !== verticeId && a.destino !== verticeId),
  };
}

// 3. ADICIONAR_ARESTA - Adiciona uma aresta entre dois vértices
export function adicionarAresta(grafo: Grafo, aresta: Aresta): Grafo {
  // Verificar se os vértices existem
  const origemExiste = grafo.vertices.some(v => v.id === aresta.origem);
  const destinoExiste = grafo.vertices.some(v => v.id === aresta.destino);

  if (!origemExiste || !destinoExiste) {
    throw new Error('Vértices não encontrados');
  }

  return {
    ...grafo,
    arestas: [...grafo.arestas, aresta],
  };
}

// 4. REMOVER_ARESTA - Remove uma aresta específica
export function removerAresta(grafo: Grafo, origem: string, destino: string): Grafo {
  return {
    ...grafo,
    arestas: grafo.arestas.filter(a =>
      !(a.origem === origem && a.destino === destino)
    ),
  };
}

// 5. OBTER_VIZINHOS - Retorna os vizinhos de um vértice
export function obterVizinhos(grafo: Grafo, verticeId: string): string[] {
  const vizinhos: string[] = [];

  grafo.arestas.forEach(aresta => {
    if (aresta.origem === verticeId) {
      vizinhos.push(aresta.destino);
    }
    // Se não é direcionado, considera ambas direções
    if (!grafo.direcionado && aresta.destino === verticeId) {
      vizinhos.push(aresta.origem);
    }
  });

  return [...new Set(vizinhos)]; // Remove duplicatas
}

// 6. OBTER_GRAU - Retorna o grau de um vértice
export function obterGrau(grafo: Grafo, verticeId: string): number {
  let grau = 0;

  grafo.arestas.forEach(aresta => {
    if (aresta.origem === verticeId) grau++;
    if (!grafo.direcionado && aresta.destino === verticeId) grau++;
    else if (grafo.direcionado && aresta.destino === verticeId) grau++; // grau de entrada
  });

  return grau;
}

// 7. CONTEM_VERTICE - Verifica se um vértice existe
export function contemVertice(grafo: Grafo, verticeId: string): boolean {
  return grafo.vertices.some(v => v.id === verticeId);
}

// 8. CONTEM_ARESTA - Verifica se uma aresta existe
export function contemAresta(grafo: Grafo, origem: string, destino: string): boolean {
  return grafo.arestas.some(a => a.origem === origem && a.destino === destino);
}

// 9. LIMPAR - Remove todos os vértices e arestas
export function limpar(): Grafo {
  return {
    vertices: [],
    arestas: [],
    direcionado: false,
  };
}

// 10. TAMANHO_VERTICES - Retorna o número de vértices
export function tamanhoVertices(grafo: Grafo): number {
  return grafo.vertices.length;
}

// 11. TOTAL_ARESTAS - Retorna o número de arestas
export function totalArestas(grafo: Grafo): number {
  return grafo.arestas.length;
}

// 12. BFS - Busca em Largura (Breadth-First Search)
export function bfs(grafo: Grafo, inicio: string): string[] {
  if (!contemVertice(grafo, inicio)) return [];

  const visitados = new Set<string>();
  const fila: string[] = [inicio];
  const resultado: string[] = [];

  while (fila.length > 0) {
    const atual = fila.shift()!;

    if (visitados.has(atual)) continue;

    visitados.add(atual);
    resultado.push(atual);

    const vizinhos = obterVizinhos(grafo, atual);
    vizinhos.forEach(v => {
      if (!visitados.has(v)) {
        fila.push(v);
      }
    });
  }

  return resultado;
}

// 13. DFS - Busca em Profundidade (Depth-First Search)
export function dfs(grafo: Grafo, inicio: string): string[] {
  if (!contemVertice(grafo, inicio)) return [];

  const visitados = new Set<string>();
  const resultado: string[] = [];

  function dfsRecursivo(verticeId: string) {
    visitados.add(verticeId);
    resultado.push(verticeId);

    const vizinhos = obterVizinhos(grafo, verticeId);
    vizinhos.forEach(v => {
      if (!visitados.has(v)) {
        dfsRecursivo(v);
      }
    });
  }

  dfsRecursivo(inicio);
  return resultado;
}

// 14. ESTA_CONECTADO - Verifica se dois vértices estão conectados
export function estaConectado(grafo: Grafo, origem: string, destino: string): boolean {
  const visitados = bfs(grafo, origem);
  return visitados.includes(destino);
}

// 15. OBTER_CAMINHO - Encontra um caminho entre dois vértices (BFS)
export function obterCaminho(grafo: Grafo, inicio: string, fim: string): CaminhoResult {
  if (!contemVertice(grafo, inicio) || !contemVertice(grafo, fim)) {
    return { existe: false, caminho: [], distancia: -1 };
  }

  if (inicio === fim) {
    return { existe: true, caminho: [inicio], distancia: 0 };
  }

  const visitados = new Set<string>();
  const fila: Array<{ id: string; caminho: string[] }> = [{ id: inicio, caminho: [inicio] }];

  while (fila.length > 0) {
    const { id: atual, caminho } = fila.shift()!;

    if (visitados.has(atual)) continue;
    visitados.add(atual);

    if (atual === fim) {
      return { existe: true, caminho, distancia: caminho.length - 1 };
    }

    const vizinhos = obterVizinhos(grafo, atual);
    vizinhos.forEach(v => {
      if (!visitados.has(v)) {
        fila.push({ id: v, caminho: [...caminho, v] });
      }
    });
  }

  return { existe: false, caminho: [], distancia: -1 };
}

// 16. CLONAR - Clona o grafo
export function clonar(grafo: Grafo): Grafo {
  return {
    vertices: grafo.vertices.map(v => ({ ...v })),
    arestas: grafo.arestas.map(a => ({ ...a })),
    direcionado: grafo.direcionado,
  };
}

// 17. ESTA_VAZIO - Verifica se o grafo está vazio
export function estaVazio(grafo: Grafo): boolean {
  return grafo.vertices.length === 0;
}
