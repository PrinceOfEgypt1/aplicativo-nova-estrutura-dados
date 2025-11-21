/**
 * Implementação de Árvore Binária de Busca (BST - Binary Search Tree)
 *
 * @remarks
 * Esta classe implementa uma árvore binária de busca com operações básicas
 * de inserção, remoção, busca e travessias. Mantém a propriedade BST:
 * - Subárvore esquerda: valores menores
 * - Subárvore direita: valores maiores
 */

/**
 * Classe No (Node) representando um nó da árvore
 */
export class No {
  valor: number;
  esquerda: No | null;
  direita: No | null;

  /**
   * Cria um novo nó da árvore
   *
   * @param valor - Valor numérico do nó
   */
  constructor(valor: number) {
    this.valor = valor;
    this.esquerda = null;
    this.direita = null;
  }
}

/**
 * Classe ArvoreBinaria implementando uma BST
 */
export class ArvoreBinaria {
  private raiz: No | null;
  private tamanhoArvore: number;

  /**
   * Cria uma nova árvore binária vazia
   */
  constructor() {
    this.raiz = null;
    this.tamanhoArvore = 0;
  }

  /**
   * Valida se o valor é um número inteiro válido
   *
   * @param valor - Valor a ser validado
   * @throws {Error} Se o valor for inválido
   */
  private validarNumeroInteiro(valor: number): void {
    if (typeof valor !== 'number') {
      throw new Error('O valor deve ser um número');
    }
    if (!Number.isInteger(valor)) {
      throw new Error('O valor deve ser um número inteiro');
    }
    if (valor < -1000 || valor > 1000) {
      throw new Error('O valor deve estar entre -1000 e 1000');
    }
  }

  /**
   * Insere um novo valor na árvore mantendo a propriedade BST
   *
   * @param valor - Valor a ser inserido
   * @throws {Error} Se o valor for inválido ou já existir
   *
   * @example
   * ```typescript
   * arvore.inserir(10);
   * arvore.inserir(5);
   * arvore.inserir(15);
   * ```
   */
  inserir(valor: number): void {
    this.validarNumeroInteiro(valor);

    const novoNo = new No(valor);

    if (this.raiz === null) {
      this.raiz = novoNo;
      this.tamanhoArvore++;
      return;
    }

    this.inserirRecursivo(this.raiz, novoNo);
    this.tamanhoArvore++;
  }

  /**
   * Método auxiliar recursivo para inserir nó
   */
  private inserirRecursivo(atual: No, novoNo: No): void {
    if (novoNo.valor === atual.valor) {
      throw new Error('Valor já existe na árvore');
    }

    if (novoNo.valor < atual.valor) {
      if (atual.esquerda === null) {
        atual.esquerda = novoNo;
      } else {
        this.inserirRecursivo(atual.esquerda, novoNo);
      }
    } else {
      if (atual.direita === null) {
        atual.direita = novoNo;
      } else {
        this.inserirRecursivo(atual.direita, novoNo);
      }
    }
  }

  /**
   * Remove um valor da árvore mantendo a propriedade BST
   *
   * @param valor - Valor a ser removido
   * @returns true se removeu, false se não encontrou
   * @throws {Error} Se a árvore estiver vazia
   *
   * @example
   * ```typescript
   * arvore.remover(10);
   * ```
   */
  remover(valor: number): boolean {
    if (this.raiz === null) {
      throw new Error('Árvore está vazia');
    }

    this.validarNumeroInteiro(valor);

    const resultado = this.removerRecursivo(this.raiz, valor);
    if (resultado.removido) {
      this.raiz = resultado.no;
      this.tamanhoArvore--;
      return true;
    }
    return false;
  }

  /**
   * Método auxiliar recursivo para remover nó
   */
  private removerRecursivo(no: No | null, valor: number): { no: No | null; removido: boolean } {
    if (no === null) {
      return { no: null, removido: false };
    }

    if (valor < no.valor) {
      const resultado = this.removerRecursivo(no.esquerda, valor);
      no.esquerda = resultado.no;
      return { no, removido: resultado.removido };
    } else if (valor > no.valor) {
      const resultado = this.removerRecursivo(no.direita, valor);
      no.direita = resultado.no;
      return { no, removido: resultado.removido };
    } else {
      // Nó encontrado
      // Caso 1: Nó folha (sem filhos)
      if (no.esquerda === null && no.direita === null) {
        return { no: null, removido: true };
      }

      // Caso 2: Nó com um filho
      if (no.esquerda === null) {
        return { no: no.direita, removido: true };
      }
      if (no.direita === null) {
        return { no: no.esquerda, removido: true };
      }

      // Caso 3: Nó com dois filhos
      // Encontra o menor valor da subárvore direita
      const sucessor = this.encontrarMinimo(no.direita);
      no.valor = sucessor.valor;
      const resultado = this.removerRecursivo(no.direita, sucessor.valor);
      no.direita = resultado.no;
      return { no, removido: true };
    }
  }

  /**
   * Busca um valor na árvore
   *
   * @param valor - Valor a ser buscado
   * @returns true se encontrou, false caso contrário
   *
   * @example
   * ```typescript
   * const existe = arvore.buscar(10);
   * ```
   */
  buscar(valor: number): boolean {
    this.validarNumeroInteiro(valor);
    return this.buscarRecursivo(this.raiz, valor) !== null;
  }

  /**
   * Método auxiliar recursivo para buscar nó
   */
  private buscarRecursivo(no: No | null, valor: number): No | null {
    if (no === null) {
      return null;
    }

    if (valor === no.valor) {
      return no;
    }

    if (valor < no.valor) {
      return this.buscarRecursivo(no.esquerda, valor);
    } else {
      return this.buscarRecursivo(no.direita, valor);
    }
  }

  /**
   * Retorna o valor mínimo da árvore
   *
   * @returns Valor mínimo
   * @throws {Error} Se a árvore estiver vazia
   *
   * @example
   * ```typescript
   * const min = arvore.minimo();
   * ```
   */
  minimo(): number {
    if (this.raiz === null) {
      throw new Error('Árvore está vazia');
    }
    return this.encontrarMinimo(this.raiz).valor;
  }

  /**
   * Método auxiliar para encontrar o nó com valor mínimo
   */
  private encontrarMinimo(no: No): No {
    while (no.esquerda !== null) {
      no = no.esquerda;
    }
    return no;
  }

  /**
   * Retorna o valor máximo da árvore
   *
   * @returns Valor máximo
   * @throws {Error} Se a árvore estiver vazia
   *
   * @example
   * ```typescript
   * const max = arvore.maximo();
   * ```
   */
  maximo(): number {
    if (this.raiz === null) {
      throw new Error('Árvore está vazia');
    }
    return this.encontrarMaximo(this.raiz).valor;
  }

  /**
   * Método auxiliar para encontrar o nó com valor máximo
   */
  private encontrarMaximo(no: No): No {
    while (no.direita !== null) {
      no = no.direita;
    }
    return no;
  }

  /**
   * Calcula a altura da árvore
   *
   * @returns Altura da árvore (0 para árvore vazia)
   *
   * @example
   * ```typescript
   * const altura = arvore.altura();
   * ```
   */
  altura(): number {
    return this.calcularAltura(this.raiz);
  }

  /**
   * Método auxiliar recursivo para calcular altura
   */
  private calcularAltura(no: No | null): number {
    if (no === null) {
      return 0;
    }

    const alturaEsquerda = this.calcularAltura(no.esquerda);
    const alturaDireita = this.calcularAltura(no.direita);

    return Math.max(alturaEsquerda, alturaDireita) + 1;
  }

  /**
   * Retorna o número total de nós na árvore
   *
   * @returns Número de nós
   *
   * @example
   * ```typescript
   * const total = arvore.tamanho();
   * ```
   */
  tamanho(): number {
    return this.tamanhoArvore;
  }

  /**
   * Verifica se a árvore está vazia
   *
   * @returns true se vazia, false caso contrário
   *
   * @example
   * ```typescript
   * if (arvore.estaVazia()) {
   *   console.log('Árvore vazia');
   * }
   * ```
   */
  estaVazia(): boolean {
    return this.raiz === null;
  }

  /**
   * Remove todos os nós da árvore
   *
   * @example
   * ```typescript
   * arvore.limpar();
   * ```
   */
  limpar(): void {
    this.raiz = null;
    this.tamanhoArvore = 0;
  }

  /**
   * Travessia em ordem (in-order): esquerda, raiz, direita
   * Retorna valores em ordem crescente para BST
   *
   * @returns Array com valores em ordem crescente
   *
   * @example
   * ```typescript
   * const valores = arvore.emOrdem(); // [1, 2, 3, 4, 5]
   * ```
   */
  emOrdem(): number[] {
    const resultado: number[] = [];
    this.emOrdemRecursivo(this.raiz, resultado);
    return resultado;
  }

  /**
   * Método auxiliar recursivo para travessia em ordem
   */
  private emOrdemRecursivo(no: No | null, resultado: number[]): void {
    if (no !== null) {
      this.emOrdemRecursivo(no.esquerda, resultado);
      resultado.push(no.valor);
      this.emOrdemRecursivo(no.direita, resultado);
    }
  }

  /**
   * Travessia pré-ordem (pre-order): raiz, esquerda, direita
   *
   * @returns Array com valores em pré-ordem
   *
   * @example
   * ```typescript
   * const valores = arvore.preOrdem();
   * ```
   */
  preOrdem(): number[] {
    const resultado: number[] = [];
    this.preOrdemRecursivo(this.raiz, resultado);
    return resultado;
  }

  /**
   * Método auxiliar recursivo para travessia pré-ordem
   */
  private preOrdemRecursivo(no: No | null, resultado: number[]): void {
    if (no !== null) {
      resultado.push(no.valor);
      this.preOrdemRecursivo(no.esquerda, resultado);
      this.preOrdemRecursivo(no.direita, resultado);
    }
  }

  /**
   * Travessia pós-ordem (post-order): esquerda, direita, raiz
   *
   * @returns Array com valores em pós-ordem
   *
   * @example
   * ```typescript
   * const valores = arvore.posOrdem();
   * ```
   */
  posOrdem(): number[] {
    const resultado: number[] = [];
    this.posOrdemRecursivo(this.raiz, resultado);
    return resultado;
  }

  /**
   * Método auxiliar recursivo para travessia pós-ordem
   */
  private posOrdemRecursivo(no: No | null, resultado: number[]): void {
    if (no !== null) {
      this.posOrdemRecursivo(no.esquerda, resultado);
      this.posOrdemRecursivo(no.direita, resultado);
      resultado.push(no.valor);
    }
  }

  /**
   * Retorna a raiz da árvore (para visualização)
   *
   * @returns Nó raiz ou null se vazia
   */
  obterRaiz(): No | null {
    return this.raiz;
  }
}
