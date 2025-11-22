/**
 * Classe Grafo (Graph)
 *
 * Estrutura de dados para representar relações entre entidades (vértices) através de conexões (arestas).
 *
 * @remarks
 * Esta implementação usa lista de adjacências para representar o grafo, sendo eficiente
 * para grafos esparsos (poucos vértices conectados). Suporta grafos direcionados e não-direcionados.
 *
 * Características:
 * - Pode ser direcionado ou não-direcionado
 * - Vértices representados por números inteiros (0-99)
 * - Arestas podem ter pesos opcionais
 * - Algoritmos de busca: DFS (profundidade) e BFS (largura)
 * - Detecção de ciclos e componentes conectados
 *
 * @example
 * ```typescript
 * const grafo = new Grafo(false); // grafo não-direcionado
 * grafo.adicionarVertice(0);
 * grafo.adicionarVertice(1);
 * grafo.adicionarAresta(0, 1);
 * const vizinhos = grafo.obterVizinhos(0); // [1]
 * ```
 */
export class Grafo {
  private adjacencias: Map<number, Set<number>>;
  private direcionado: boolean;
  private pesos: Map<string, number>; // Armazena pesos das arestas

  /**
   * Cria um novo grafo
   *
   * @param direcionado - Se true, o grafo é direcionado; caso contrário, não-direcionado
   */
  constructor(direcionado: boolean = false) {
    this.adjacencias = new Map();
    this.direcionado = direcionado;
    this.pesos = new Map();
  }

  /**
   * Valida se um vértice é válido
   *
   * @param vertice - Vértice a ser validado
   * @throws {Error} Se o vértice for inválido
   * @private
   */
  private validarVertice(vertice: number): void {
    if (!Number.isInteger(vertice)) {
      throw new Error("O vértice deve ser um número inteiro");
    }

    if (vertice < 0 || vertice > 99) {
      throw new Error("O vértice deve estar entre 0 e 99");
    }
  }

  /**
   * Valida se um peso é válido
   *
   * @param peso - Peso a ser validado
   * @throws {Error} Se o peso for inválido
   * @private
   */
  private validarPeso(peso: number): void {
    if (!Number.isInteger(peso)) {
      throw new Error("O peso deve ser um número inteiro");
    }

    if (peso < -100 || peso > 100) {
      throw new Error("O peso deve estar entre -100 e 100");
    }
  }

  /**
   * Gera chave única para aresta
   *
   * @param origem - Vértice de origem
   * @param destino - Vértice de destino
   * @returns Chave única
   * @private
   */
  private gerarChaveAresta(origem: number, destino: number): string {
    return `${origem}-${destino}`;
  }

  /**
   * Adiciona um vértice ao grafo
   *
   * Complexidade: O(1)
   *
   * @param vertice - Vértice a ser adicionado
   * @throws {Error} Se o vértice for inválido ou já existir
   */
  adicionarVertice(vertice: number): void {
    this.validarVertice(vertice);

    if (this.adjacencias.has(vertice)) {
      throw new Error(`Vértice ${vertice} já existe`);
    }

    this.adjacencias.set(vertice, new Set());
  }

  /**
   * Remove um vértice e todas as suas arestas
   *
   * Complexidade: O(V + E) onde V = vértices, E = arestas
   *
   * @param vertice - Vértice a ser removido
   * @throws {Error} Se o vértice não existir
   */
  removerVertice(vertice: number): void {
    this.validarVertice(vertice);

    if (!this.adjacencias.has(vertice)) {
      throw new Error(`Vértice ${vertice} não existe`);
    }

    // Remove todas as arestas que apontam para este vértice
    for (const [v, vizinhos] of this.adjacencias) {
      if (vizinhos.has(vertice)) {
        vizinhos.delete(vertice);
        this.pesos.delete(this.gerarChaveAresta(v, vertice));
      }
    }

    // Remove as arestas que saem deste vértice
    const vizinhos = this.adjacencias.get(vertice)!;
    for (const vizinho of vizinhos) {
      this.pesos.delete(this.gerarChaveAresta(vertice, vizinho));
    }

    // Remove o vértice
    this.adjacencias.delete(vertice);
  }

  /**
   * Adiciona uma aresta entre dois vértices
   *
   * Complexidade: O(1)
   *
   * @param origem - Vértice de origem
   * @param destino - Vértice de destino
   * @param peso - Peso da aresta (opcional, padrão: 1)
   * @throws {Error} Se os vértices não existirem ou aresta já existir
   */
  adicionarAresta(origem: number, destino: number, peso: number = 1): void {
    this.validarVertice(origem);
    this.validarVertice(destino);
    this.validarPeso(peso);

    if (!this.adjacencias.has(origem)) {
      throw new Error(`Vértice de origem ${origem} não existe`);
    }

    if (!this.adjacencias.has(destino)) {
      throw new Error(`Vértice de destino ${destino} não existe`);
    }

    const vizinhos = this.adjacencias.get(origem)!;

    if (vizinhos.has(destino)) {
      throw new Error(`Aresta de ${origem} para ${destino} já existe`);
    }

    vizinhos.add(destino);
    this.pesos.set(this.gerarChaveAresta(origem, destino), peso);

    // Se o grafo não é direcionado, adiciona aresta reversa
    if (!this.direcionado) {
      this.adjacencias.get(destino)!.add(origem);
      this.pesos.set(this.gerarChaveAresta(destino, origem), peso);
    }
  }

  /**
   * Remove uma aresta entre dois vértices
   *
   * Complexidade: O(1)
   *
   * @param origem - Vértice de origem
   * @param destino - Vértice de destino
   * @throws {Error} Se os vértices ou aresta não existirem
   */
  removerAresta(origem: number, destino: number): void {
    this.validarVertice(origem);
    this.validarVertice(destino);

    if (!this.adjacencias.has(origem)) {
      throw new Error(`Vértice de origem ${origem} não existe`);
    }

    if (!this.adjacencias.has(destino)) {
      throw new Error(`Vértice de destino ${destino} não existe`);
    }

    const vizinhos = this.adjacencias.get(origem)!;

    if (!vizinhos.has(destino)) {
      throw new Error(`Aresta de ${origem} para ${destino} não existe`);
    }

    vizinhos.delete(destino);
    this.pesos.delete(this.gerarChaveAresta(origem, destino));

    // Se o grafo não é direcionado, remove aresta reversa
    if (!this.direcionado) {
      this.adjacencias.get(destino)!.delete(origem);
      this.pesos.delete(this.gerarChaveAresta(destino, origem));
    }
  }

  /**
   * Verifica se existe uma aresta entre dois vértices
   *
   * Complexidade: O(1)
   *
   * @param origem - Vértice de origem
   * @param destino - Vértice de destino
   * @returns true se a aresta existe, false caso contrário
   */
  existeAresta(origem: number, destino: number): boolean {
    if (!this.adjacencias.has(origem)) {
      return false;
    }

    return this.adjacencias.get(origem)!.has(destino);
  }

  /**
   * Obtém o peso de uma aresta
   *
   * Complexidade: O(1)
   *
   * @param origem - Vértice de origem
   * @param destino - Vértice de destino
   * @returns Peso da aresta
   * @throws {Error} Se a aresta não existir
   */
  obterPeso(origem: number, destino: number): number {
    if (!this.existeAresta(origem, destino)) {
      throw new Error(`Aresta de ${origem} para ${destino} não existe`);
    }

    return this.pesos.get(this.gerarChaveAresta(origem, destino)) || 1;
  }

  /**
   * Obtém todos os vizinhos de um vértice
   *
   * Complexidade: O(1) + O(grau do vértice)
   *
   * @param vertice - Vértice
   * @returns Array com os vizinhos
   * @throws {Error} Se o vértice não existir
   */
  obterVizinhos(vertice: number): number[] {
    this.validarVertice(vertice);

    if (!this.adjacencias.has(vertice)) {
      throw new Error(`Vértice ${vertice} não existe`);
    }

    return Array.from(this.adjacencias.get(vertice)!);
  }

  /**
   * Obtém o grau de um vértice (número de arestas)
   *
   * Complexidade: O(1)
   *
   * @param vertice - Vértice
   * @returns Grau do vértice
   * @throws {Error} Se o vértice não existir
   */
  obterGrau(vertice: number): number {
    this.validarVertice(vertice);

    if (!this.adjacencias.has(vertice)) {
      throw new Error(`Vértice ${vertice} não existe`);
    }

    return this.adjacencias.get(vertice)!.size;
  }

  /**
   * Retorna todos os vértices do grafo
   *
   * Complexidade: O(V)
   *
   * @returns Array com todos os vértices
   */
  obterVertices(): number[] {
    return Array.from(this.adjacencias.keys()).sort((a, b) => a - b);
  }

  /**
   * Retorna o número de vértices
   *
   * Complexidade: O(1)
   *
   * @returns Número de vértices
   */
  numeroVertices(): number {
    return this.adjacencias.size;
  }

  /**
   * Retorna o número de arestas
   *
   * Complexidade: O(V)
   *
   * @returns Número de arestas
   */
  numeroArestas(): number {
    let count = 0;
    for (const vizinhos of this.adjacencias.values()) {
      count += vizinhos.size;
    }
    return this.direcionado ? count : count / 2;
  }

  /**
   * Busca em profundidade (DFS)
   *
   * Complexidade: O(V + E)
   *
   * @param inicio - Vértice inicial
   * @returns Array com vértices na ordem de visitação
   * @throws {Error} Se o vértice inicial não existir
   */
  buscaProfundidade(inicio: number): number[] {
    this.validarVertice(inicio);

    if (!this.adjacencias.has(inicio)) {
      throw new Error(`Vértice ${inicio} não existe`);
    }

    const visitados = new Set<number>();
    const resultado: number[] = [];

    const dfs = (vertice: number) => {
      visitados.add(vertice);
      resultado.push(vertice);

      const vizinhos = this.obterVizinhos(vertice);
      for (const vizinho of vizinhos) {
        if (!visitados.has(vizinho)) {
          dfs(vizinho);
        }
      }
    };

    dfs(inicio);
    return resultado;
  }

  /**
   * Busca em largura (BFS)
   *
   * Complexidade: O(V + E)
   *
   * @param inicio - Vértice inicial
   * @returns Array com vértices na ordem de visitação
   * @throws {Error} Se o vértice inicial não existir
   */
  buscaLargura(inicio: number): number[] {
    this.validarVertice(inicio);

    if (!this.adjacencias.has(inicio)) {
      throw new Error(`Vértice ${inicio} não existe`);
    }

    const visitados = new Set<number>();
    const fila: number[] = [inicio];
    const resultado: number[] = [];

    visitados.add(inicio);

    while (fila.length > 0) {
      const vertice = fila.shift()!;
      resultado.push(vertice);

      const vizinhos = this.obterVizinhos(vertice);
      for (const vizinho of vizinhos) {
        if (!visitados.has(vizinho)) {
          visitados.add(vizinho);
          fila.push(vizinho);
        }
      }
    }

    return resultado;
  }

  /**
   * Verifica se o grafo é direcionado
   *
   * Complexidade: O(1)
   *
   * @returns true se direcionado, false caso contrário
   */
  ehDirecionado(): boolean {
    return this.direcionado;
  }

  /**
   * Limpa o grafo (remove todos os vértices e arestas)
   *
   * Complexidade: O(1)
   */
  limpar(): void {
    this.adjacencias.clear();
    this.pesos.clear();
  }

  /**
   * Retorna representação do grafo como lista de adjacências
   *
   * Complexidade: O(V + E)
   *
   * @returns Objeto com vértices e suas adjacências
   */
  paraObjeto(): Record<number, number[]> {
    const obj: Record<number, number[]> = {};

    for (const [vertice, vizinhos] of this.adjacencias) {
      obj[vertice] = Array.from(vizinhos);
    }

    return obj;
  }
}
