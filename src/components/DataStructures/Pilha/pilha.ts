/**
 * Classe Pilha (Stack)
 *
 * Estrutura de dados LIFO (Last In, First Out) que permite operações apenas no topo.
 *
 * @remarks
 * Esta implementação segue o padrão de qualidade estabelecido pela classe Vetor,
 * com validações robustas, tratamento de erros e suporte a operações fundamentais
 * de pilha.
 *
 * @example
 * ```typescript
 * const pilha = new Pilha(10);
 * pilha.push(5);
 * pilha.push(10);
 * const topo = pilha.peek(); // 10
 * const removido = pilha.pop(); // 10
 * ```
 */
export class Pilha {
  private elementos: number[];
  private capacidade: number;

  /**
   * Cria uma nova instância de Pilha
   *
   * @param capacidadeInicial - Capacidade máxima da pilha (padrão: 20)
   * @throws {Error} Se a capacidade for menor ou igual a zero
   */
  constructor(capacidadeInicial: number = 20) {
    if (capacidadeInicial <= 0) {
      throw new Error('A capacidade inicial deve ser maior que zero');
    }
    this.elementos = [];
    this.capacidade = capacidadeInicial;
  }

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
   * Adiciona um elemento no topo da pilha
   *
   * @param elemento - Valor a ser adicionado (número inteiro entre -1000 e 1000)
   * @throws {Error} Se a pilha estiver cheia ou o valor for inválido
   *
   * @example
   * ```typescript
   * pilha.push(42);
   * ```
   */
  push(elemento: number): void {
    if (this.elementos.length >= this.capacidade) {
      throw new Error('A pilha está cheia');
    }
    this.validarNumeroInteiro(elemento);
    this.elementos.push(elemento);
  }

  /**
   * Remove e retorna o elemento do topo da pilha
   *
   * @returns O valor do elemento removido
   * @throws {Error} Se a pilha estiver vazia
   *
   * @example
   * ```typescript
   * const valor = pilha.pop(); // Remove e retorna o topo
   * ```
   */
  pop(): number {
    if (this.estaVazio()) {
      throw new Error('Pilha está vazia');
    }
    return this.elementos.pop()!;
  }

  /**
   * Retorna o elemento do topo da pilha sem removê-lo
   *
   * @returns O valor do elemento no topo
   * @throws {Error} Se a pilha estiver vazia
   *
   * @example
   * ```typescript
   * const topo = pilha.peek(); // Visualiza o topo sem remover
   * ```
   */
  peek(): number {
    if (this.estaVazio()) {
      throw new Error('Pilha está vazia');
    }
    return this.elementos[this.elementos.length - 1];
  }

  /**
   * Retorna o número de elementos na pilha
   *
   * @returns Tamanho atual da pilha
   *
   * @example
   * ```typescript
   * const tamanho = pilha.tamanho(); // 5
   * ```
   */
  tamanho(): number {
    return this.elementos.length;
  }

  /**
   * Verifica se a pilha está vazia
   *
   * @returns true se a pilha não contém elementos, false caso contrário
   *
   * @example
   * ```typescript
   * if (pilha.estaVazio()) {
   *   console.log('Pilha vazia');
   * }
   * ```
   */
  estaVazio(): boolean {
    return this.elementos.length === 0;
  }

  /**
   * Remove todos os elementos da pilha
   *
   * @example
   * ```typescript
   * pilha.limpar(); // Pilha agora está vazia
   * ```
   */
  limpar(): void {
    this.elementos = [];
  }

  /**
   * Verifica se um elemento existe na pilha
   *
   * @param elemento - Valor a ser buscado
   * @returns true se o elemento existe na pilha, false caso contrário
   * @throws {Error} Se o valor for inválido
   *
   * @example
   * ```typescript
   * const existe = pilha.contem(42); // true ou false
   * ```
   */
  contem(elemento: number): boolean {
    this.validarNumeroInteiro(elemento);
    return this.elementos.includes(elemento);
  }

  /**
   * Busca um elemento e retorna sua distância do topo (1-indexed)
   *
   * @param elemento - Valor a ser buscado
   * @returns Distância do topo (1 = topo, 2 = segundo do topo, etc.) ou -1 se não encontrado
   * @throws {Error} Se o valor for inválido
   *
   * @remarks
   * Diferente de um array indexado, a busca retorna a posição relativa ao topo.
   * O elemento no topo tem posição 1, o segundo do topo tem posição 2, e assim por diante.
   *
   * @example
   * ```typescript
   * pilha.push(10);
   * pilha.push(20);
   * pilha.push(30);
   * const posicao = pilha.buscar(10); // Retorna 3 (terceiro do topo)
   * ```
   */
  buscar(elemento: number): number {
    this.validarNumeroInteiro(elemento);

    // Busca do topo para baixo
    for (let i = this.elementos.length - 1; i >= 0; i--) {
      if (this.elementos[i] === elemento) {
        // Retorna distância do topo (1-indexed)
        return this.elementos.length - i;
      }
    }

    return -1; // Não encontrado
  }

  /**
   * Converte a pilha para um array JavaScript
   *
   * @returns Array com cópia dos elementos (do fundo ao topo)
   *
   * @remarks
   * O array retornado é uma cópia, não uma referência aos elementos internos.
   * A ordem é do fundo ao topo (índice 0 = fundo, último índice = topo).
   *
   * @example
   * ```typescript
   * const array = pilha.paraArray(); // [10, 20, 30] (topo é 30)
   * ```
   */
  paraArray(): number[] {
    return [...this.elementos];
  }

  /**
   * Retorna a capacidade máxima da pilha
   *
   * @returns Capacidade máxima
   *
   * @example
   * ```typescript
   * const capacidade = pilha.capacidadeMaxima(); // 20
   * ```
   */
  capacidadeMaxima(): number {
    return this.capacidade;
  }
}
