/**
 * Classe Árvore Binária de Busca (Binary Search Tree - BST)
 *
 * Estrutura de dados hierárquica que mantém os dados organizados
 * de forma que o filho esquerdo é menor e o filho direito é maior.
 *
 * @remarks
 * Esta implementação segue o padrão de qualidade estabelecido pela classe Pilha,
 * com validações robustas, tratamento de erros e suporte a operações fundamentais
 * de árvore binária de busca.
 *
 * @example
 * ```typescript
 * const arvore = new ArvoreBinaria();
 * arvore.inserir(50);
 * arvore.inserir(30);
 * arvore.inserir(70);
 * const existe = arvore.buscar(30); // true
 * const altura = arvore.altura(); // 2
 * ```
 */

/**
 * Representa um nó da árvore binária
 */
export class No {
  valor: number;
  esquerda: No | null = null;
  direita: No | null = null;

  constructor(valor: number) {
    this.valor = valor;
  }
}

/**
 * Classe principal da Árvore Binária de Busca
 */
export class ArvoreBinaria {
  private raiz: No | null = null;

  /**
   * Valida se um número é inteiro e está dentro do range permitido
   *
   * @param valor - Número a ser validado
   * @throws {Error} Se o valor não for inteiro ou estiver fora do range [-1000, 1000]
   * @private
   */
  private validarNumeroInteiro(valor: number): void {
    if (!Number.isInteger(valor)) {
      throw new Error('Apenas números inteiros são permitidos');
    }
    if (valor < -1000 || valor > 1000) {
      throw new Error('O valor deve estar entre -1000 e 1000');
    }
  }

  /**
   * Insere um novo valor na árvore
   *
   * @param valor - Valor a ser inserido (número inteiro entre -1000 e 1000)
   * @throws {Error} Se o valor for inválido ou já existir na árvore
   *
   * @example
   * ```typescript
   * arvore.inserir(50);
   * arvore.inserir(30);
   * ```
   */
  inserir(valor: number): void {
    this.validarNumeroInteiro(valor);

    if (this.buscar(valor)) {
      throw new Error(`O valor ${valor} já existe na árvore`);
    }

    const novoNo = new No(valor);

    if (this.raiz === null) {
      this.raiz = novoNo;
      return;
    }

    let atual = this.raiz;
    while (true) {
      if (valor < atual.valor) {
        if (atual.esquerda === null) {
          atual.esquerda = novoNo;
          break;
        }
        atual = atual.esquerda;
      } else {
        if (atual.direita === null) {
          atual.direita = novoNo;
          break;
        }
        atual = atual.direita;
      }
    }
  }

  /**
   * Busca um valor na árvore
   *
   * @param valor - Valor a ser buscado
   * @returns true se o valor existe, false caso contrário
   * @throws {Error} Se o valor for inválido
   *
   * @example
   * ```typescript
   * const existe = arvore.buscar(30); // true ou false
   * ```
   */
  buscar(valor: number): boolean {
    this.validarNumeroInteiro(valor);

    let atual = this.raiz;
    while (atual !== null) {
      if (valor === atual.valor) {
        return true;
      }
      atual = valor < atual.valor ? atual.esquerda : atual.direita;
    }
    return false;
  }

  /**
   * Alias para o método buscar
   *
   * @param valor - Valor a ser verificado
   * @returns true se o valor existe, false caso contrário
   */
  contem(valor: number): boolean {
    return this.buscar(valor);
  }

  /**
   * Remove um valor da árvore
   *
   * @param valor - Valor a ser removido
   * @throws {Error} Se o valor não existir ou for inválido
   *
   * @example
   * ```typescript
   * arvore.remover(30);
   * ```
   */
  remover(valor: number): void {
    this.validarNumeroInteiro(valor);

    if (!this.buscar(valor)) {
      throw new Error(`O valor ${valor} não existe na árvore`);
    }

    this.raiz = this.removerRecursivo(this.raiz, valor);
  }

  /**
   * Método recursivo auxiliar para remover um nó
   *
   * @param no - Nó atual
   * @param valor - Valor a ser removido
   * @returns Nó atualizado após remoção
   * @private
   */
  private removerRecursivo(no: No | null, valor: number): No | null {
    if (no === null) {
      return null;
    }

    if (valor < no.valor) {
      no.esquerda = this.removerRecursivo(no.esquerda, valor);
      return no;
    } else if (valor > no.valor) {
      no.direita = this.removerRecursivo(no.direita, valor);
      return no;
    } else {
      // Caso 1: Nó folha (sem filhos)
      if (no.esquerda === null && no.direita === null) {
        return null;
      }

      // Caso 2: Nó com apenas um filho
      if (no.esquerda === null) {
        return no.direita;
      }
      if (no.direita === null) {
        return no.esquerda;
      }

      // Caso 3: Nó com dois filhos
      // Encontra o menor valor da subárvore direita (sucessor in-order)
      const sucessor = this.encontrarMin(no.direita);
      no.valor = sucessor.valor;
      no.direita = this.removerRecursivo(no.direita, sucessor.valor);
      return no;
    }
  }

  /**
   * Encontra o nó com o menor valor em uma subárvore
   *
   * @param no - Raiz da subárvore
   * @returns Nó com o menor valor
   * @private
   */
  private encontrarMin(no: No): No {
    while (no.esquerda !== null) {
      no = no.esquerda;
    }
    return no;
  }

  /**
   * Retorna o menor valor da árvore
   *
   * @returns Menor valor
   * @throws {Error} Se a árvore estiver vazia
   *
   * @example
   * ```typescript
   * const minimo = arvore.min(); // Menor valor
   * ```
   */
  min(): number {
    if (this.raiz === null) {
      throw new Error('Árvore está vazia');
    }
    return this.encontrarMin(this.raiz).valor;
  }

  /**
   * Retorna o maior valor da árvore
   *
   * @returns Maior valor
   * @throws {Error} Se a árvore estiver vazia
   *
   * @example
   * ```typescript
   * const maximo = arvore.max(); // Maior valor
   * ```
   */
  max(): number {
    if (this.raiz === null) {
      throw new Error('Árvore está vazia');
    }

    let atual = this.raiz;
    while (atual.direita !== null) {
      atual = atual.direita;
    }
    return atual.valor;
  }

  /**
   * Retorna a altura da árvore
   *
   * @returns Altura (número de níveis - 1)
   *
   * @remarks
   * Uma árvore vazia tem altura 0.
   * Uma árvore com apenas a raiz tem altura 1.
   *
   * @example
   * ```typescript
   * const altura = arvore.altura(); // 3
   * ```
   */
  altura(): number {
    return this.alturaRecursiva(this.raiz);
  }

  /**
   * Calcula a altura de forma recursiva
   *
   * @param no - Nó atual
   * @returns Altura da subárvore
   * @private
   */
  private alturaRecursiva(no: No | null): number {
    if (no === null) {
      return 0;
    }
    const alturaEsquerda = this.alturaRecursiva(no.esquerda);
    const alturaDireita = this.alturaRecursiva(no.direita);
    return 1 + Math.max(alturaEsquerda, alturaDireita);
  }

  /**
   * Retorna o número total de nós na árvore
   *
   * @returns Quantidade de nós
   *
   * @example
   * ```typescript
   * const total = arvore.tamanho(); // 5
   * ```
   */
  tamanho(): number {
    return this.tamanhoRecursivo(this.raiz);
  }

  /**
   * Calcula o tamanho de forma recursiva
   *
   * @param no - Nó atual
   * @returns Número de nós na subárvore
   * @private
   */
  private tamanhoRecursivo(no: No | null): number {
    if (no === null) {
      return 0;
    }
    return 1 + this.tamanhoRecursivo(no.esquerda) + this.tamanhoRecursivo(no.direita);
  }

  /**
   * Verifica se a árvore está vazia
   *
   * @returns true se a árvore não contém nós, false caso contrário
   *
   * @example
   * ```typescript
   * if (arvore.estaVazio()) {
   *   console.log('Árvore vazia');
   * }
   * ```
   */
  estaVazio(): boolean {
    return this.raiz === null;
  }

  /**
   * Remove todos os nós da árvore
   *
   * @example
   * ```typescript
   * arvore.limpar(); // Árvore agora está vazia
   * ```
   */
  limpar(): void {
    this.raiz = null;
  }

  /**
   * Retorna a travessia em ordem (in-order)
   *
   * @returns Array com os valores em ordem crescente
   *
   * @remarks
   * A travessia in-order visita: esquerda ’ raiz ’ direita
   * Em uma BST, isso retorna os valores em ordem crescente.
   *
   * @example
   * ```typescript
   * const valores = arvore.emOrdem(); // [10, 20, 30, 40, 50]
   * ```
   */
  emOrdem(): number[] {
    const resultado: number[] = [];
    this.emOrdemRecursivo(this.raiz, resultado);
    return resultado;
  }

  /**
   * Travessia em ordem recursiva
   *
   * @param no - Nó atual
   * @param resultado - Array para armazenar os valores
   * @private
   */
  private emOrdemRecursivo(no: No | null, resultado: number[]): void {
    if (no !== null) {
      this.emOrdemRecursivo(no.esquerda, resultado);
      resultado.push(no.valor);
      this.emOrdemRecursivo(no.direita, resultado);
    }
  }

  /**
   * Retorna a travessia em pré-ordem (pre-order)
   *
   * @returns Array com os valores em pré-ordem
   *
   * @remarks
   * A travessia pre-order visita: raiz ’ esquerda ’ direita
   *
   * @example
   * ```typescript
   * const valores = arvore.preOrdem(); // [30, 20, 10, 40, 50]
   * ```
   */
  preOrdem(): number[] {
    const resultado: number[] = [];
    this.preOrdemRecursivo(this.raiz, resultado);
    return resultado;
  }

  /**
   * Travessia em pré-ordem recursiva
   *
   * @param no - Nó atual
   * @param resultado - Array para armazenar os valores
   * @private
   */
  private preOrdemRecursivo(no: No | null, resultado: number[]): void {
    if (no !== null) {
      resultado.push(no.valor);
      this.preOrdemRecursivo(no.esquerda, resultado);
      this.preOrdemRecursivo(no.direita, resultado);
    }
  }

  /**
   * Retorna a travessia em pós-ordem (post-order)
   *
   * @returns Array com os valores em pós-ordem
   *
   * @remarks
   * A travessia post-order visita: esquerda ’ direita ’ raiz
   *
   * @example
   * ```typescript
   * const valores = arvore.posOrdem(); // [10, 50, 40, 20, 30]
   * ```
   */
  posOrdem(): number[] {
    const resultado: number[] = [];
    this.posOrdemRecursivo(this.raiz, resultado);
    return resultado;
  }

  /**
   * Travessia em pós-ordem recursiva
   *
   * @param no - Nó atual
   * @param resultado - Array para armazenar os valores
   * @private
   */
  private posOrdemRecursivo(no: No | null, resultado: number[]): void {
    if (no !== null) {
      this.posOrdemRecursivo(no.esquerda, resultado);
      this.posOrdemRecursivo(no.direita, resultado);
      resultado.push(no.valor);
    }
  }

  /**
   * Retorna a travessia em nível (level-order / BFS)
   *
   * @returns Array com os valores por nível
   *
   * @remarks
   * A travessia em nível visita os nós nível por nível, da esquerda para a direita.
   *
   * @example
   * ```typescript
   * const valores = arvore.emNivel(); // [30, 20, 40, 10, 50]
   * ```
   */
  emNivel(): number[] {
    if (this.raiz === null) {
      return [];
    }

    const resultado: number[] = [];
    const fila: No[] = [this.raiz];

    while (fila.length > 0) {
      const no = fila.shift()!;
      resultado.push(no.valor);

      if (no.esquerda !== null) {
        fila.push(no.esquerda);
      }
      if (no.direita !== null) {
        fila.push(no.direita);
      }
    }

    return resultado;
  }

  /**
   * Retorna a raiz da árvore (para visualização)
   *
   * @returns Nó raiz ou null se a árvore estiver vazia
   *
   * @example
   * ```typescript
   * const raiz = arvore.obterRaiz();
   * ```
   */
  obterRaiz(): No | null {
    return this.raiz;
  }

  /**
   * Converte a árvore para um array (travessia em ordem)
   *
   * @returns Array com os valores em ordem crescente
   *
   * @example
   * ```typescript
   * const array = arvore.paraArray(); // [10, 20, 30, 40, 50]
   * ```
   */
  paraArray(): number[] {
    return this.emOrdem();
  }
}
