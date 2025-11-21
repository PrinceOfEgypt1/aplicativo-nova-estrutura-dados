/**
 * Classe No (Node)
 *
 * Representa um nó individual na lista ligada
 */
export class No {
  valor: number;
  proximo: No | null;

  constructor(valor: number) {
    this.valor = valor;
    this.proximo = null;
  }
}

/**
 * Classe ListaLigada (Linked List)
 *
 * Estrutura de dados dinâmica que armazena elementos em nós conectados por ponteiros.
 * Cada nó contém um valor e uma referência para o próximo nó.
 *
 * @remarks
 * Esta implementação segue o padrão de qualidade estabelecido pelas estruturas
 * anteriores (Vetor, Pilha e Fila), com validações robustas, tratamento de erros
 * e suporte a operações fundamentais de lista ligada.
 *
 * @example
 * ```typescript
 * const lista = new ListaLigada();
 * lista.inserirNoInicio(10);
 * lista.inserirNoFim(20);
 * lista.inserirNaPosicao(1, 15); // Insere 15 entre 10 e 20
 * const valor = lista.obterPorIndice(1); // 15
 * ```
 */
export class ListaLigada {
  private cabeca: No | null;
  private tamanhoLista: number;

  /**
   * Cria uma nova instância de ListaLigada vazia
   */
  constructor() {
    this.cabeca = null;
    this.tamanhoLista = 0;
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
   * Valida se um índice está dentro dos limites da lista
   *
   * @param indice - Índice a ser validado
   * @throws {Error} Se o índice for negativo ou maior/igual ao tamanho
   * @private
   */
  private validarIndice(indice: number): void {
    if (indice < 0 || indice >= this.tamanhoLista) {
      throw new Error(`Índice ${indice} fora dos limites. Tamanho da lista: ${this.tamanhoLista}`);
    }
  }

  /**
   * Insere um elemento no início da lista
   *
   * @param valor - Valor a ser inserido (número inteiro entre -1000 e 1000)
   * @throws {Error} Se o valor for inválido
   *
   * @example
   * ```typescript
   * lista.inserirNoInicio(42);
   * ```
   */
  inserirNoInicio(valor: number): void {
    this.validarNumeroInteiro(valor);

    const novoNo = new No(valor);
    novoNo.proximo = this.cabeca;
    this.cabeca = novoNo;
    this.tamanhoLista++;
  }

  /**
   * Insere um elemento no final da lista
   *
   * @param valor - Valor a ser inserido (número inteiro entre -1000 e 1000)
   * @throws {Error} Se o valor for inválido
   *
   * @example
   * ```typescript
   * lista.inserirNoFim(42);
   * ```
   */
  inserirNoFim(valor: number): void {
    this.validarNumeroInteiro(valor);

    const novoNo = new No(valor);

    if (this.cabeca === null) {
      this.cabeca = novoNo;
    } else {
      let atual = this.cabeca;
      while (atual.proximo !== null) {
        atual = atual.proximo;
      }
      atual.proximo = novoNo;
    }
    this.tamanhoLista++;
  }

  /**
   * Insere um elemento em uma posição específica
   *
   * @param indice - Posição onde inserir (0-indexed)
   * @param valor - Valor a ser inserido (número inteiro entre -1000 e 1000)
   * @throws {Error} Se o índice for inválido ou o valor for inválido
   *
   * @example
   * ```typescript
   * lista.inserirNaPosicao(2, 42); // Insere na posição 2
   * ```
   */
  inserirNaPosicao(indice: number, valor: number): void {
    if (indice < 0 || indice > this.tamanhoLista) {
      throw new Error(`Índice ${indice} fora dos limites para inserção. Tamanho da lista: ${this.tamanhoLista}`);
    }

    this.validarNumeroInteiro(valor);

    if (indice === 0) {
      this.inserirNoInicio(valor);
      return;
    }

    const novoNo = new No(valor);
    let atual = this.cabeca;
    let posicao = 0;

    while (posicao < indice - 1 && atual !== null) {
      atual = atual.proximo;
      posicao++;
    }

    if (atual !== null) {
      novoNo.proximo = atual.proximo;
      atual.proximo = novoNo;
      this.tamanhoLista++;
    }
  }

  /**
   * Remove e retorna o elemento do início da lista
   *
   * @returns O valor do elemento removido
   * @throws {Error} Se a lista estiver vazia
   *
   * @example
   * ```typescript
   * const valor = lista.removerDoInicio(); // Remove e retorna o primeiro
   * ```
   */
  removerDoInicio(): number {
    if (this.cabeca === null) {
      throw new Error('Lista está vazia');
    }

    const valorRemovido = this.cabeca.valor;
    this.cabeca = this.cabeca.proximo;
    this.tamanhoLista--;

    return valorRemovido;
  }

  /**
   * Remove e retorna o elemento do final da lista
   *
   * @returns O valor do elemento removido
   * @throws {Error} Se a lista estiver vazia
   *
   * @example
   * ```typescript
   * const valor = lista.removerDoFim(); // Remove e retorna o último
   * ```
   */
  removerDoFim(): number {
    if (this.cabeca === null) {
      throw new Error('Lista está vazia');
    }

    if (this.cabeca.proximo === null) {
      const valorRemovido = this.cabeca.valor;
      this.cabeca = null;
      this.tamanhoLista--;
      return valorRemovido;
    }

    let atual = this.cabeca;
    while (atual.proximo !== null && atual.proximo.proximo !== null) {
      atual = atual.proximo;
    }

    const valorRemovido = atual.proximo!.valor;
    atual.proximo = null;
    this.tamanhoLista--;

    return valorRemovido;
  }

  /**
   * Remove e retorna o elemento de uma posição específica
   *
   * @param indice - Posição do elemento a remover (0-indexed)
   * @returns O valor do elemento removido
   * @throws {Error} Se o índice for inválido ou a lista estiver vazia
   *
   * @example
   * ```typescript
   * const valor = lista.removerDaPosicao(2); // Remove da posição 2
   * ```
   */
  removerDaPosicao(indice: number): number {
    if (this.cabeca === null) {
      throw new Error('Lista está vazia');
    }

    this.validarIndice(indice);

    if (indice === 0) {
      return this.removerDoInicio();
    }

    let atual = this.cabeca;
    let posicao = 0;

    while (posicao < indice - 1 && atual.proximo !== null) {
      atual = atual.proximo;
      posicao++;
    }

    if (atual.proximo === null) {
      throw new Error('Índice fora dos limites');
    }

    const valorRemovido = atual.proximo.valor;
    atual.proximo = atual.proximo.proximo;
    this.tamanhoLista--;

    return valorRemovido;
  }

  /**
   * Busca um elemento na lista e retorna seu índice
   *
   * @param valor - Valor a ser buscado
   * @returns Índice da primeira ocorrência do valor, ou -1 se não encontrado
   * @throws {Error} Se o valor for inválido
   *
   * @example
   * ```typescript
   * const indice = lista.buscar(42); // Retorna índice ou -1
   * ```
   */
  buscar(valor: number): number {
    this.validarNumeroInteiro(valor);

    let atual = this.cabeca;
    let indice = 0;

    while (atual !== null) {
      if (atual.valor === valor) {
        return indice;
      }
      atual = atual.proximo;
      indice++;
    }

    return -1;
  }

  /**
   * Retorna o valor do elemento em uma posição específica
   *
   * @param indice - Posição do elemento (0-indexed)
   * @returns O valor do elemento na posição
   * @throws {Error} Se o índice for inválido
   *
   * @example
   * ```typescript
   * const valor = lista.obterPorIndice(2); // Retorna valor na posição 2
   * ```
   */
  obterPorIndice(indice: number): number {
    this.validarIndice(indice);

    let atual = this.cabeca;
    let posicao = 0;

    while (atual !== null && posicao < indice) {
      atual = atual.proximo;
      posicao++;
    }

    if (atual === null) {
      throw new Error('Índice fora dos limites');
    }

    return atual.valor;
  }

  /**
   * Retorna o número de elementos na lista
   *
   * @returns Tamanho atual da lista
   *
   * @example
   * ```typescript
   * const tamanho = lista.tamanho(); // 5
   * ```
   */
  tamanho(): number {
    return this.tamanhoLista;
  }

  /**
   * Verifica se a lista está vazia
   *
   * @returns true se a lista não contém elementos, false caso contrário
   *
   * @example
   * ```typescript
   * if (lista.estaVazia()) {
   *   console.log('Lista vazia');
   * }
   * ```
   */
  estaVazia(): boolean {
    return this.cabeca === null;
  }

  /**
   * Remove todos os elementos da lista
   *
   * @example
   * ```typescript
   * lista.limpar(); // Lista agora está vazia
   * ```
   */
  limpar(): void {
    this.cabeca = null;
    this.tamanhoLista = 0;
  }

  /**
   * Converte a lista para um array JavaScript
   *
   * @returns Array com os valores da lista em ordem
   *
   * @remarks
   * O array retornado é uma representação dos valores, não dos nós.
   *
   * @example
   * ```typescript
   * const array = lista.paraArray(); // [10, 20, 30]
   * ```
   */
  paraArray(): number[] {
    const array: number[] = [];
    let atual = this.cabeca;

    while (atual !== null) {
      array.push(atual.valor);
      atual = atual.proximo;
    }

    return array;
  }

  /**
   * Retorna informações sobre o nó cabeça
   *
   * @returns Valor da cabeça ou null se lista vazia
   *
   * @example
   * ```typescript
   * const cabeca = lista.obterCabeca(); // 10 ou null
   * ```
   */
  obterCabeca(): number | null {
    return this.cabeca ? this.cabeca.valor : null;
  }
}
