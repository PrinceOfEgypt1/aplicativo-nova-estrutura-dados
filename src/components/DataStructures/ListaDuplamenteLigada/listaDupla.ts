/**
 * Classe NoDuplo (Doubly Linked Node)
 *
 * Representa um nó individual na lista duplamente ligada
 */
export class NoDuplo {
  valor: number;
  proximo: NoDuplo | null;
  anterior: NoDuplo | null;

  constructor(valor: number) {
    this.valor = valor;
    this.proximo = null;
    this.anterior = null;
  }
}

/**
 * Classe ListaDuplamenteLigada (Doubly Linked List)
 *
 * Estrutura de dados dinâmica que armazena elementos em nós conectados por ponteiros bidirecionais.
 * Cada nó contém um valor, uma referência para o próximo nó e uma referência para o nó anterior.
 *
 * @remarks
 * Esta implementação segue o padrão de qualidade estabelecido pelas estruturas
 * anteriores (Vetor, Pilha, Fila e Lista Ligada), com validações robustas, tratamento de erros
 * e suporte a operações fundamentais de lista duplamente ligada.
 *
 * Vantagens sobre Lista Ligada Simples:
 * - Navegação bidirecional (frente e trás)
 * - Remoção mais eficiente quando temos referência ao nó
 * - Inserção antes de um nó específico em O(1)
 *
 * @example
 * ```typescript
 * const lista = new ListaDuplamenteLigada();
 * lista.inserirNoInicio(10);
 * lista.inserirNoFim(20);
 * lista.inserirNaPosicao(1, 15); // Insere 15 entre 10 e 20
 * const valor = lista.obterPorIndice(1); // 15
 * lista.removerDoFim(); // Remove 20
 * ```
 */
export class ListaDuplamenteLigada {
  private cabeca: NoDuplo | null;
  private cauda: NoDuplo | null;
  private tamanhoLista: number;

  /**
   * Cria uma nova instância de ListaDuplamenteLigada vazia
   */
  constructor() {
    this.cabeca = null;
    this.cauda = null;
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
      throw new Error("O valor deve ser um número inteiro");
    }

    if (valor < -1000 || valor > 1000) {
      throw new Error("O valor deve estar entre -1000 e 1000");
    }
  }

  /**
   * Valida se um índice é válido para a lista
   *
   * @param indice - Índice a ser validado
   * @throws {Error} Se o índice for inválido
   * @private
   */
  private validarIndice(indice: number): void {
    if (!Number.isInteger(indice)) {
      throw new Error("O índice deve ser um número inteiro");
    }

    if (indice < 0 || indice >= this.tamanhoLista) {
      throw new Error(
        `Índice inválido. Deve estar entre 0 e ${this.tamanhoLista - 1}`
      );
    }
  }

  /**
   * Valida se um índice é válido para inserção
   *
   * @param indice - Índice a ser validado
   * @throws {Error} Se o índice for inválido
   * @private
   */
  private validarIndiceInsercao(indice: number): void {
    if (!Number.isInteger(indice)) {
      throw new Error("O índice deve ser um número inteiro");
    }

    if (indice < 0 || indice > this.tamanhoLista) {
      throw new Error(
        `Índice inválido para inserção. Deve estar entre 0 e ${this.tamanhoLista}`
      );
    }
  }

  /**
   * Insere um valor no início da lista
   *
   * Complexidade: O(1)
   *
   * @param valor - Valor a ser inserido
   * @throws {Error} Se o valor for inválido
   */
  inserirNoInicio(valor: number): void {
    this.validarNumeroInteiro(valor);

    const novoNo = new NoDuplo(valor);

    if (this.cabeca === null) {
      // Lista vazia
      this.cabeca = novoNo;
      this.cauda = novoNo;
    } else {
      // Lista tem elementos
      novoNo.proximo = this.cabeca;
      this.cabeca.anterior = novoNo;
      this.cabeca = novoNo;
    }

    this.tamanhoLista++;
  }

  /**
   * Insere um valor no fim da lista
   *
   * Complexidade: O(1)
   *
   * @param valor - Valor a ser inserido
   * @throws {Error} Se o valor for inválido
   */
  inserirNoFim(valor: number): void {
    this.validarNumeroInteiro(valor);

    const novoNo = new NoDuplo(valor);

    if (this.cauda === null) {
      // Lista vazia
      this.cabeca = novoNo;
      this.cauda = novoNo;
    } else {
      // Lista tem elementos
      novoNo.anterior = this.cauda;
      this.cauda.proximo = novoNo;
      this.cauda = novoNo;
    }

    this.tamanhoLista++;
  }

  /**
   * Insere um valor em uma posição específica
   *
   * Complexidade: O(n)
   *
   * @param indice - Posição onde inserir (0-based)
   * @param valor - Valor a ser inserido
   * @throws {Error} Se o índice ou valor forem inválidos
   */
  inserirNaPosicao(indice: number, valor: number): void {
    this.validarIndiceInsercao(indice);
    this.validarNumeroInteiro(valor);

    // Casos especiais
    if (indice === 0) {
      this.inserirNoInicio(valor);
      return;
    }

    if (indice === this.tamanhoLista) {
      this.inserirNoFim(valor);
      return;
    }

    // Otimização: escolhe a direção mais curta
    const novoNo = new NoDuplo(valor);
    let noAtual: NoDuplo | null;

    if (indice < this.tamanhoLista / 2) {
      // Navega da cabeça
      noAtual = this.cabeca;
      for (let i = 0; i < indice; i++) {
        noAtual = noAtual!.proximo;
      }
    } else {
      // Navega da cauda
      noAtual = this.cauda;
      for (let i = this.tamanhoLista - 1; i > indice; i--) {
        noAtual = noAtual!.anterior;
      }
    }

    // Insere o novo nó antes de noAtual
    const noAnterior = noAtual!.anterior;
    novoNo.proximo = noAtual;
    novoNo.anterior = noAnterior;
    noAtual!.anterior = novoNo;
    noAnterior!.proximo = novoNo;

    this.tamanhoLista++;
  }

  /**
   * Remove o primeiro elemento da lista
   *
   * Complexidade: O(1)
   *
   * @returns O valor removido
   * @throws {Error} Se a lista estiver vazia
   */
  removerDoInicio(): number {
    if (this.cabeca === null) {
      throw new Error("Lista vazia. Não há elementos para remover");
    }

    const valorRemovido = this.cabeca.valor;

    if (this.cabeca === this.cauda) {
      // Único elemento
      this.cabeca = null;
      this.cauda = null;
    } else {
      this.cabeca = this.cabeca.proximo;
      this.cabeca!.anterior = null;
    }

    this.tamanhoLista--;
    return valorRemovido;
  }

  /**
   * Remove o último elemento da lista
   *
   * Complexidade: O(1)
   *
   * @returns O valor removido
   * @throws {Error} Se a lista estiver vazia
   */
  removerDoFim(): number {
    if (this.cauda === null) {
      throw new Error("Lista vazia. Não há elementos para remover");
    }

    const valorRemovido = this.cauda.valor;

    if (this.cabeca === this.cauda) {
      // Único elemento
      this.cabeca = null;
      this.cauda = null;
    } else {
      this.cauda = this.cauda.anterior;
      this.cauda!.proximo = null;
    }

    this.tamanhoLista--;
    return valorRemovido;
  }

  /**
   * Remove um elemento de uma posição específica
   *
   * Complexidade: O(n)
   *
   * @param indice - Posição do elemento a remover (0-based)
   * @returns O valor removido
   * @throws {Error} Se o índice for inválido
   */
  removerDaPosicao(indice: number): number {
    this.validarIndice(indice);

    // Casos especiais
    if (indice === 0) {
      return this.removerDoInicio();
    }

    if (indice === this.tamanhoLista - 1) {
      return this.removerDoFim();
    }

    // Otimização: escolhe a direção mais curta
    let noAtual: NoDuplo | null;

    if (indice < this.tamanhoLista / 2) {
      // Navega da cabeça
      noAtual = this.cabeca;
      for (let i = 0; i < indice; i++) {
        noAtual = noAtual!.proximo;
      }
    } else {
      // Navega da cauda
      noAtual = this.cauda;
      for (let i = this.tamanhoLista - 1; i > indice; i--) {
        noAtual = noAtual!.anterior;
      }
    }

    const valorRemovido = noAtual!.valor;
    const noAnterior = noAtual!.anterior;
    const noProximo = noAtual!.proximo;

    noAnterior!.proximo = noProximo;
    noProximo!.anterior = noAnterior;

    this.tamanhoLista--;
    return valorRemovido;
  }

  /**
   * Busca a primeira ocorrência de um valor
   *
   * Complexidade: O(n)
   *
   * @param valor - Valor a ser buscado
   * @returns Índice do valor ou -1 se não encontrado
   */
  buscar(valor: number): number {
    let noAtual = this.cabeca;
    let indice = 0;

    while (noAtual !== null) {
      if (noAtual.valor === valor) {
        return indice;
      }
      noAtual = noAtual.proximo;
      indice++;
    }

    return -1;
  }

  /**
   * Obtém o valor de um elemento por índice
   *
   * Complexidade: O(n)
   *
   * @param indice - Índice do elemento (0-based)
   * @returns O valor no índice especificado
   * @throws {Error} Se o índice for inválido
   */
  obterPorIndice(indice: number): number {
    this.validarIndice(indice);

    // Otimização: escolhe a direção mais curta
    let noAtual: NoDuplo | null;

    if (indice < this.tamanhoLista / 2) {
      // Navega da cabeça
      noAtual = this.cabeca;
      for (let i = 0; i < indice; i++) {
        noAtual = noAtual!.proximo;
      }
    } else {
      // Navega da cauda
      noAtual = this.cauda;
      for (let i = this.tamanhoLista - 1; i > indice; i--) {
        noAtual = noAtual!.anterior;
      }
    }

    return noAtual!.valor;
  }

  /**
   * Atualiza o valor de um elemento por índice
   *
   * Complexidade: O(n)
   *
   * @param indice - Índice do elemento (0-based)
   * @param valor - Novo valor
   * @throws {Error} Se o índice ou valor forem inválidos
   */
  atualizar(indice: number, valor: number): void {
    this.validarIndice(indice);
    this.validarNumeroInteiro(valor);

    // Otimização: escolhe a direção mais curta
    let noAtual: NoDuplo | null;

    if (indice < this.tamanhoLista / 2) {
      // Navega da cabeça
      noAtual = this.cabeca;
      for (let i = 0; i < indice; i++) {
        noAtual = noAtual!.proximo;
      }
    } else {
      // Navega da cauda
      noAtual = this.cauda;
      for (let i = this.tamanhoLista - 1; i > indice; i--) {
        noAtual = noAtual!.anterior;
      }
    }

    noAtual!.valor = valor;
  }

  /**
   * Retorna o tamanho atual da lista
   *
   * Complexidade: O(1)
   *
   * @returns Número de elementos na lista
   */
  tamanho(): number {
    return this.tamanhoLista;
  }

  /**
   * Verifica se a lista está vazia
   *
   * Complexidade: O(1)
   *
   * @returns true se a lista estiver vazia, false caso contrário
   */
  estaVazia(): boolean {
    return this.tamanhoLista === 0;
  }

  /**
   * Remove todos os elementos da lista
   *
   * Complexidade: O(1)
   */
  limpar(): void {
    this.cabeca = null;
    this.cauda = null;
    this.tamanhoLista = 0;
  }

  /**
   * Converte a lista em um array
   *
   * Complexidade: O(n)
   *
   * @returns Array com todos os valores da lista
   */
  paraArray(): number[] {
    const resultado: number[] = [];
    let noAtual = this.cabeca;

    while (noAtual !== null) {
      resultado.push(noAtual.valor);
      noAtual = noAtual.proximo;
    }

    return resultado;
  }

  /**
   * Converte a lista em um array reverso
   *
   * Complexidade: O(n)
   *
   * @returns Array com todos os valores da lista em ordem reversa
   */
  paraArrayReverso(): number[] {
    const resultado: number[] = [];
    let noAtual = this.cauda;

    while (noAtual !== null) {
      resultado.push(noAtual.valor);
      noAtual = noAtual.anterior;
    }

    return resultado;
  }

  /**
   * Retorna o primeiro elemento sem removê-lo
   *
   * Complexidade: O(1)
   *
   * @returns O primeiro valor da lista
   * @throws {Error} Se a lista estiver vazia
   */
  obterPrimeiro(): number {
    if (this.cabeca === null) {
      throw new Error("Lista vazia");
    }
    return this.cabeca.valor;
  }

  /**
   * Retorna o último elemento sem removê-lo
   *
   * Complexidade: O(1)
   *
   * @returns O último valor da lista
   * @throws {Error} Se a lista estiver vazia
   */
  obterUltimo(): number {
    if (this.cauda === null) {
      throw new Error("Lista vazia");
    }
    return this.cauda.valor;
  }

  /**
   * Inverte a ordem dos elementos da lista
   *
   * Complexidade: O(n)
   */
  inverter(): void {
    if (this.tamanhoLista <= 1) {
      return;
    }

    let noAtual = this.cabeca;
    let temp: NoDuplo | null = null;

    // Troca as referências anterior e proximo de cada nó
    while (noAtual !== null) {
      temp = noAtual.anterior;
      noAtual.anterior = noAtual.proximo;
      noAtual.proximo = temp;
      noAtual = noAtual.anterior; // Avança (que era o próximo antes da troca)
    }

    // Troca cabeça e cauda
    temp = this.cabeca;
    this.cabeca = this.cauda;
    this.cauda = temp;
  }
}
