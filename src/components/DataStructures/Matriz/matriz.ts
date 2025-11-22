/**
 * Classe Matriz
 *
 * Estrutura de dados bidimensional para armazenar e manipular dados em linhas e colunas.
 *
 * @remarks
 * Esta implementação segue o padrão de qualidade estabelecido pelas estruturas anteriores,
 * com validações robustas, tratamento de erros e suporte a operações fundamentais de matrizes.
 *
 * Características:
 * - Tamanho fixo (linhas × colunas) definido na criação
 * - Acesso em O(1) por índices [linha][coluna]
 * - Operações de transposição, soma, multiplicação
 * - Validações de dimensões e valores
 *
 * @example
 * ```typescript
 * const matriz = new Matriz(3, 3);
 * matriz.definir(0, 0, 5);
 * matriz.definir(1, 1, 10);
 * const valor = matriz.obter(0, 0); // 5
 * const transposta = matriz.transpor();
 * ```
 */
export class Matriz {
  private dados: number[][];
  private linhas: number;
  private colunas: number;

  /**
   * Cria uma nova matriz com dimensões especificadas
   *
   * @param linhas - Número de linhas (1-10)
   * @param colunas - Número de colunas (1-10)
   * @param valorInicial - Valor inicial para preencher (padrão: 0)
   * @throws {Error} Se as dimensões forem inválidas
   */
  constructor(linhas: number, colunas: number, valorInicial: number = 0) {
    this.validarDimensao(linhas, "linhas");
    this.validarDimensao(colunas, "colunas");
    this.validarNumeroInteiro(valorInicial);

    this.linhas = linhas;
    this.colunas = colunas;
    this.dados = Array(linhas)
      .fill(null)
      .map(() => Array(colunas).fill(valorInicial));
  }

  /**
   * Valida se uma dimensão é válida
   *
   * @param dimensao - Dimensão a ser validada
   * @param nome - Nome da dimensão (para mensagem de erro)
   * @throws {Error} Se a dimensão for inválida
   * @private
   */
  private validarDimensao(dimensao: number, nome: string): void {
    if (!Number.isInteger(dimensao)) {
      throw new Error(`O número de ${nome} deve ser um inteiro`);
    }

    if (dimensao < 1 || dimensao > 10) {
      throw new Error(`O número de ${nome} deve estar entre 1 e 10`);
    }
  }

  /**
   * Valida se um número é inteiro e está dentro do range permitido
   *
   * @param valor - Número a ser validado
   * @throws {Error} Se o valor for inválido
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
   * Valida se um índice de linha é válido
   *
   * @param linha - Índice da linha
   * @throws {Error} Se o índice for inválido
   * @private
   */
  private validarLinha(linha: number): void {
    if (!Number.isInteger(linha)) {
      throw new Error("O índice da linha deve ser um inteiro");
    }

    if (linha < 0 || linha >= this.linhas) {
      throw new Error(
        `Índice de linha inválido. Deve estar entre 0 e ${this.linhas - 1}`
      );
    }
  }

  /**
   * Valida se um índice de coluna é válido
   *
   * @param coluna - Índice da coluna
   * @throws {Error} Se o índice for inválido
   * @private
   */
  private validarColuna(coluna: number): void {
    if (!Number.isInteger(coluna)) {
      throw new Error("O índice da coluna deve ser um inteiro");
    }

    if (coluna < 0 || coluna >= this.colunas) {
      throw new Error(
        `Índice de coluna inválido. Deve estar entre 0 e ${this.colunas - 1}`
      );
    }
  }

  /**
   * Define um valor em uma posição específica da matriz
   *
   * Complexidade: O(1)
   *
   * @param linha - Índice da linha (0-based)
   * @param coluna - Índice da coluna (0-based)
   * @param valor - Valor a ser definido
   * @throws {Error} Se os índices ou valor forem inválidos
   */
  definir(linha: number, coluna: number, valor: number): void {
    this.validarLinha(linha);
    this.validarColuna(coluna);
    this.validarNumeroInteiro(valor);

    this.dados[linha][coluna] = valor;
  }

  /**
   * Obtém o valor de uma posição específica da matriz
   *
   * Complexidade: O(1)
   *
   * @param linha - Índice da linha (0-based)
   * @param coluna - Índice da coluna (0-based)
   * @returns O valor na posição especificada
   * @throws {Error} Se os índices forem inválidos
   */
  obter(linha: number, coluna: number): number {
    this.validarLinha(linha);
    this.validarColuna(coluna);

    return this.dados[linha][coluna];
  }

  /**
   * Retorna o número de linhas da matriz
   *
   * Complexidade: O(1)
   *
   * @returns Número de linhas
   */
  obterLinhas(): number {
    return this.linhas;
  }

  /**
   * Retorna o número de colunas da matriz
   *
   * Complexidade: O(1)
   *
   * @returns Número de colunas
   */
  obterColunas(): number {
    return this.colunas;
  }

  /**
   * Preenche toda a matriz com um valor
   *
   * Complexidade: O(n × m)
   *
   * @param valor - Valor para preencher
   * @throws {Error} Se o valor for inválido
   */
  preencher(valor: number): void {
    this.validarNumeroInteiro(valor);

    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        this.dados[i][j] = valor;
      }
    }
  }

  /**
   * Preenche uma linha específica com um valor
   *
   * Complexidade: O(m)
   *
   * @param linha - Índice da linha
   * @param valor - Valor para preencher
   * @throws {Error} Se o índice ou valor forem inválidos
   */
  preencherLinha(linha: number, valor: number): void {
    this.validarLinha(linha);
    this.validarNumeroInteiro(valor);

    for (let j = 0; j < this.colunas; j++) {
      this.dados[linha][j] = valor;
    }
  }

  /**
   * Preenche uma coluna específica com um valor
   *
   * Complexidade: O(n)
   *
   * @param coluna - Índice da coluna
   * @param valor - Valor para preencher
   * @throws {Error} Se o índice ou valor forem inválidos
   */
  preencherColuna(coluna: number, valor: number): void {
    this.validarColuna(coluna);
    this.validarNumeroInteiro(valor);

    for (let i = 0; i < this.linhas; i++) {
      this.dados[i][coluna] = valor;
    }
  }

  /**
   * Obtém uma linha específica como array
   *
   * Complexidade: O(m)
   *
   * @param linha - Índice da linha
   * @returns Array com os valores da linha
   * @throws {Error} Se o índice for inválido
   */
  obterLinha(linha: number): number[] {
    this.validarLinha(linha);
    return [...this.dados[linha]];
  }

  /**
   * Obtém uma coluna específica como array
   *
   * Complexidade: O(n)
   *
   * @param coluna - Índice da coluna
   * @returns Array com os valores da coluna
   * @throws {Error} Se o índice for inválido
   */
  obterColuna(coluna: number): number[] {
    this.validarColuna(coluna);
    return this.dados.map((linha) => linha[coluna]);
  }

  /**
   * Retorna a transposta da matriz (troca linhas por colunas)
   *
   * Complexidade: O(n × m)
   *
   * @returns Nova matriz transposta
   */
  transpor(): Matriz {
    const transposta = new Matriz(this.colunas, this.linhas);

    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        transposta.definir(j, i, this.dados[i][j]);
      }
    }

    return transposta;
  }

  /**
   * Soma esta matriz com outra matriz
   *
   * Complexidade: O(n × m)
   *
   * @param outra - Matriz a ser somada
   * @returns Nova matriz com a soma
   * @throws {Error} Se as dimensões não forem compatíveis
   */
  somar(outra: Matriz): Matriz {
    if (this.linhas !== outra.linhas || this.colunas !== outra.colunas) {
      throw new Error(
        "As matrizes devem ter as mesmas dimensões para soma"
      );
    }

    const resultado = new Matriz(this.linhas, this.colunas);

    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        const soma = this.dados[i][j] + outra.dados[i][j];
        // Validação do resultado
        if (soma < -1000 || soma > 1000) {
          throw new Error("Resultado da soma excede o limite permitido");
        }
        resultado.definir(i, j, soma);
      }
    }

    return resultado;
  }

  /**
   * Multiplica esta matriz por um escalar
   *
   * Complexidade: O(n × m)
   *
   * @param escalar - Valor escalar para multiplicar
   * @returns Nova matriz multiplicada
   * @throws {Error} Se o escalar for inválido ou resultado exceder limites
   */
  multiplicarPorEscalar(escalar: number): Matriz {
    if (!Number.isInteger(escalar)) {
      throw new Error("O escalar deve ser um número inteiro");
    }

    const resultado = new Matriz(this.linhas, this.colunas);

    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        const produto = this.dados[i][j] * escalar;
        // Validação do resultado
        if (produto < -1000 || produto > 1000) {
          throw new Error("Resultado da multiplicação excede o limite permitido");
        }
        resultado.definir(i, j, produto);
      }
    }

    return resultado;
  }

  /**
   * Verifica se a matriz é quadrada
   *
   * Complexidade: O(1)
   *
   * @returns true se a matriz for quadrada, false caso contrário
   */
  ehQuadrada(): boolean {
    return this.linhas === this.colunas;
  }

  /**
   * Obtém a diagonal principal (apenas para matrizes quadradas)
   *
   * Complexidade: O(n)
   *
   * @returns Array com os valores da diagonal principal
   * @throws {Error} Se a matriz não for quadrada
   */
  obterDiagonalPrincipal(): number[] {
    if (!this.ehQuadrada()) {
      throw new Error("A matriz deve ser quadrada");
    }

    const diagonal: number[] = [];
    for (let i = 0; i < this.linhas; i++) {
      diagonal.push(this.dados[i][i]);
    }

    return diagonal;
  }

  /**
   * Obtém a diagonal secundária (apenas para matrizes quadradas)
   *
   * Complexidade: O(n)
   *
   * @returns Array com os valores da diagonal secundária
   * @throws {Error} Se a matriz não for quadrada
   */
  obterDiagonalSecundaria(): number[] {
    if (!this.ehQuadrada()) {
      throw new Error("A matriz deve ser quadrada");
    }

    const diagonal: number[] = [];
    for (let i = 0; i < this.linhas; i++) {
      diagonal.push(this.dados[i][this.colunas - 1 - i]);
    }

    return diagonal;
  }

  /**
   * Converte a matriz em um array bidimensional
   *
   * Complexidade: O(n × m)
   *
   * @returns Array bidimensional com os valores da matriz
   */
  paraArray(): number[][] {
    return this.dados.map((linha) => [...linha]);
  }

  /**
   * Cria uma cópia da matriz
   *
   * Complexidade: O(n × m)
   *
   * @returns Nova matriz com os mesmos valores
   */
  clonar(): Matriz {
    const clone = new Matriz(this.linhas, this.colunas);

    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        clone.definir(i, j, this.dados[i][j]);
      }
    }

    return clone;
  }

  /**
   * Limpa a matriz (preenche com zeros)
   *
   * Complexidade: O(n × m)
   */
  limpar(): void {
    this.preencher(0);
  }
}
