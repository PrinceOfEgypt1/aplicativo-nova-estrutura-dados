import { Grafo } from "./grafo";

/**
 * Metadados e configurações dos métodos do Grafo
 */

export interface MetodoGrafo {
  id: string;
  titulo: string;
  icone: string;
  requisitos: ('vertice' | 'origem' | 'destino')[];
  mensagemExplicativa: string;
}

export const metodosDisponiveis: MetodoGrafo[] = [
  {
    id: 'adicionarVertice',
    titulo: 'Add Vértice',
    icone: '➕🔵',
    requisitos: ['vertice'],
    mensagemExplicativa: 'Insira o número do vértice (0-99) para adicionar ao grafo.'
  },
  {
    id: 'removerVertice',
    titulo: 'Rem Vértice',
    icone: '➖🔵',
    requisitos: ['vertice'],
    mensagemExplicativa: 'Remove um vértice e todas as suas arestas.'
  },
  {
    id: 'adicionarAresta',
    titulo: 'Add Aresta',
    icone: '➕🔗',
    requisitos: ['origem', 'destino'],
    mensagemExplicativa: 'Insira vértice de origem e destino para criar uma aresta.'
  },
  {
    id: 'removerAresta',
    titulo: 'Rem Aresta',
    icone: '➖🔗',
    requisitos: ['origem', 'destino'],
    mensagemExplicativa: 'Remove a aresta entre dois vértices.'
  },
  {
    id: 'buscaProfundidade',
    titulo: 'DFS',
    icone: '🔍⬇',
    requisitos: ['vertice'],
    mensagemExplicativa: 'Busca em profundidade (Depth-First Search) a partir de um vértice.'
  },
  {
    id: 'buscaLargura',
    titulo: 'BFS',
    icone: '🔍⬌',
    requisitos: ['vertice'],
    mensagemExplicativa: 'Busca em largura (Breadth-First Search) a partir de um vértice.'
  },
  {
    id: 'obterVizinhos',
    titulo: 'Vizinhos',
    icone: '👥',
    requisitos: ['vertice'],
    mensagemExplicativa: 'Retorna todos os vizinhos de um vértice.'
  },
  {
    id: 'numeroVertices',
    titulo: 'Nº Vértices',
    icone: '📊',
    requisitos: [],
    mensagemExplicativa: 'Retorna o número total de vértices no grafo.'
  },
  {
    id: 'numeroArestas',
    titulo: 'Nº Arestas',
    icone: '📈',
    requisitos: [],
    mensagemExplicativa: 'Retorna o número total de arestas no grafo.'
  },
  {
    id: 'limpar',
    titulo: 'Limpar',
    icone: '🗑',
    requisitos: [],
    mensagemExplicativa: 'Remove todos os vértices e arestas do grafo.'
  }
];

/**
 * Retorna estatísticas do grafo
 */
export function obterEstatisticas(grafo: Grafo): {
  vertices: number;
  arestas: number;
  direcionado: boolean;
  densidade: number;
} {
  const vertices = grafo.numeroVertices();
  const arestas = grafo.numeroArestas();

  let densidade = 0;
  if (vertices > 1) {
    const maxArestas = grafo.ehDirecionado()
      ? vertices * (vertices - 1)
      : (vertices * (vertices - 1)) / 2;
    densidade = maxArestas > 0 ? arestas / maxArestas : 0;
  }

  return {
    vertices,
    arestas,
    direcionado: grafo.ehDirecionado(),
    densidade,
  };
}

/**
 * Retorna todas as arestas do grafo
 */
export function obterArestas(grafo: Grafo): [number, number][] {
  const arestas: [number, number][] = [];
  const vertices = grafo.obterVertices();
  const visitadas = new Set<string>();

  for (const vertice of vertices) {
    const vizinhos = grafo.obterVizinhos(vertice);

    for (const vizinho of vizinhos) {
      const chave = grafo.ehDirecionado()
        ? `${vertice}-${vizinho}`
        : [vertice, vizinho].sort().join("-");

      if (!visitadas.has(chave)) {
        arestas.push([vertice, vizinho]);
        visitadas.add(chave);
      }
    }
  }

  return arestas;
}
