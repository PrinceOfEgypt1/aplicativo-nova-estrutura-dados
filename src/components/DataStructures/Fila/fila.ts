/**
 * Classe Fila (Queue)
 *
 * Estrutura de dados FIFO (First In, First Out) que permite adição no final
 * e remoção na frente.
 *
 * @remarks
 * Esta implementação segue o padrão de qualidade estabelecido pelas estruturas
 * anteriores (Vetor e Pilha), com validações robustas, tratamento de erros e
 * suporte a operações fundamentais de fila.
 *
 * @example
 * ```typescript
 * const fila = new Fila(10);
 * fila.enqueue(5);
 * fila.enqueue(10);
 * const primeiro = fila.primeiro(); // 5
 * const removido = fila.dequeue(); // 5
 * ```
 */
export class Fila {
  private elementos: number[];
  private capacidade: number;

  /**
   * Cria uma nova instância de Fila
   *
   * @param capacidadeInicial - Capacidade máxima da fila (padrão: 20)
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
   * Adiciona um elemento no final da fila
   *
   * @param elemento - Valor a ser adicionado (número inteiro entre -1000 e 1000)
   * @throws {Error} Se a fila estiver cheia ou o valor for inválido
   *
   * @example
   * ```typescript
   * fila.enqueue(42);
   * ```
   */
  enqueue(elemento: number): void {
    if (this.elementos.length >= this.capacidade) {
      throw new Error('A fila está cheia');
    }
    this.validarNumeroInteiro(elemento);
    this.elementos.push(elemento);
  }

  /**
   * Remove e retorna o elemento da frente da fila
   *
   * @returns O valor do elemento removido
   * @throws {Error} Se a fila estiver vazia
   *
   * @example
   * ```typescript
   * const valor = fila.dequeue(); // Remove e retorna o primeiro
   * ```
   */
  dequeue(): number {
    if (this.estaVazio()) {
      throw new Error('Fila está vazia');
    }
    return this.elementos.shift()!;
  }

  /**
   * Retorna o elemento da frente da fila sem removê-lo
   *
   * @returns O valor do primeiro elemento
   * @throws {Error} Se a fila estiver vazia
   *
   * @example
   * ```typescript
   * const primeiro = fila.primeiro(); // Visualiza a frente sem remover
   * ```
   */
  primeiro(): number {
    if (this.estaVazio()) {
      throw new Error('Fila está vazia');
    }
    return this.elementos[0];
  }

  /**
   * Retorna o elemento do final da fila sem removê-lo
   *
   * @returns O valor do último elemento
   * @throws {Error} Se a fila estiver vazia
   *
   * @example
   * ```typescript
   * const ultimo = fila.ultimo(); // Visualiza o final sem remover
   * ```
   */
  ultimo(): number {
    if (this.estaVazio()) {
      throw new Error('Fila está vazia');
    }
    return this.elementos[this.elementos.length - 1];
  }

  /**
   * Retorna o número de elementos na fila
   *
   * @returns Tamanho atual da fila
   *
   * @example
   * ```typescript
   * const tamanho = fila.tamanho(); // 5
   * ```
   */
  tamanho(): number {
    return this.elementos.length;
  }

  /**
   * Verifica se a fila está vazia
   *
   * @returns true se a fila não contém elementos, false caso contrário
   *
   * @example
   * ```typescript
   * if (fila.estaVazio()) {
   *   console.log('Fila vazia');
   * }
   * ```
   */
  estaVazio(): boolean {
    return this.elementos.length === 0;
  }

  /**
   * Remove todos os elementos da fila
   *
   * @example
   * ```typescript
   * fila.limpar(); // Fila agora está vazia
   * ```
   */
  limpar(): void {
    this.elementos = [];
  }

  /**
   * Verifica se um elemento existe na fila
   *
   * @param elemento - Valor a ser buscado
   * @returns true se o elemento existe na fila, false caso contrário
   * @throws {Error} Se o valor for inválido
   *
   * @example
   * ```typescript
   * const existe = fila.contem(42); // true ou false
   * ```
   */
  contem(elemento: number): boolean {
    this.validarNumeroInteiro(elemento);
    return this.elementos.includes(elemento);
  }

  /**
   * Converte a fila para um array JavaScript
   *
   * @returns Array com cópia dos elementos (da frente ao final)
   *
   * @remarks
   * O array retornado é uma cópia, não uma referência aos elementos internos.
   * A ordem é da frente ao final (índice 0 = frente, último índice = final).
   *
   * @example
   * ```typescript
   * const array = fila.paraArray(); // [10, 20, 30] (frente é 10)
   * ```
   */
  paraArray(): number[] {
    return [...this.elementos];
  }

  /**
   * Retorna a capacidade máxima da fila
   *
   * @returns Capacidade máxima
   *
   * @example
   * ```typescript
   * const capacidade = fila.capacidadeMaxima(); // 20
   * ```
   */
  capacidadeMaxima(): number {
    return this.capacidade;
  }
}
