import { Grafo } from "./grafo";

/**
 * Métodos auxiliares para Grafo
 */

/**
 * Retorna estatísticas do grafo
 *
 * @param grafo - Instância do grafo
 * @returns Objeto com estatísticas
 */
export function obterEstatisticas(grafo: Grafo): {
  vertices: number;
  arestas: number;
  direcionado: boolean;
  densidade: number;
} {
  const vertices = grafo.numeroVertices();
  const arestas = grafo.numeroArestas();

  // Densidade = E / (V * (V-1)) para direcionado
  // Densidade = 2E / (V * (V-1)) para não-direcionado
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
 * Formata o grafo para exibição
 *
 * @param grafo - Instância do grafo
 * @returns String representando o grafo
 */
export function formatarGrafo(grafo: Grafo): string {
  const vertices = grafo.obterVertices();

  if (vertices.length === 0) {
    return "Grafo vazio";
  }

  const linhas = vertices.map((v) => {
    const vizinhos = grafo.obterVizinhos(v);
    const vizinhosStr = vizinhos.length > 0 ? vizinhos.join(", ") : "nenhum";
    return `  ${v} -> [${vizinhosStr}]`;
  });

  return `Grafo ${grafo.ehDirecionado() ? "direcionado" : "não-direcionado"}:\n${linhas.join("\n")}`;
}

/**
 * Verifica se o grafo é conectado
 * (todos os vértices são alcançáveis a partir de qualquer vértice)
 *
 * @param grafo - Instância do grafo
 * @returns true se conectado, false caso contrário
 */
export function ehConectado(grafo: Grafo): boolean {
  const vertices = grafo.obterVertices();

  if (vertices.length === 0) {
    return true;
  }

  const alcancaveis = grafo.buscaProfundidade(vertices[0]);
  return alcancaveis.length === vertices.length;
}

/**
 * Retorna todas as arestas do grafo
 *
 * @param grafo - Instância do grafo
 * @returns Array de arestas no formato [origem, destino]
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
