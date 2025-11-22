import { Matriz } from "./matriz";

/**
 * Métodos auxiliares para Matriz
 */

/**
 * Cria uma matriz identidade (apenas para matrizes quadradas)
 *
 * @param tamanho - Tamanho da matriz (n × n)
 * @returns Nova matriz identidade
 */
export function criarMatrizIdentidade(tamanho: number): Matriz {
  const identidade = new Matriz(tamanho, tamanho, 0);

  for (let i = 0; i < tamanho; i++) {
    identidade.definir(i, i, 1);
  }

  return identidade;
}

/**
 * Cria uma matriz a partir de um array bidimensional
 *
 * @param dados - Array bidimensional
 * @returns Nova matriz
 */
export function criarMatrizDoArray(dados: number[][]): Matriz {
  if (dados.length === 0 || dados[0].length === 0) {
    throw new Error("Array não pode ser vazio");
  }

  const linhas = dados.length;
  const colunas = dados[0].length;

  // Validação: todas as linhas devem ter o mesmo número de colunas
  for (const linha of dados) {
    if (linha.length !== colunas) {
      throw new Error("Todas as linhas devem ter o mesmo número de colunas");
    }
  }

  const matriz = new Matriz(linhas, colunas);

  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      matriz.definir(i, j, dados[i][j]);
    }
  }

  return matriz;
}

/**
 * Verifica se duas matrizes são iguais
 *
 * @param matriz1 - Primeira matriz
 * @param matriz2 - Segunda matriz
 * @returns true se as matrizes forem iguais, false caso contrário
 */
export function matrizesIguais(matriz1: Matriz, matriz2: Matriz): boolean {
  if (
    matriz1.obterLinhas() !== matriz2.obterLinhas() ||
    matriz1.obterColunas() !== matriz2.obterColunas()
  ) {
    return false;
  }

  const array1 = matriz1.paraArray();
  const array2 = matriz2.paraArray();

  for (let i = 0; i < matriz1.obterLinhas(); i++) {
    for (let j = 0; j < matriz1.obterColunas(); j++) {
      if (array1[i][j] !== array2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Retorna estatísticas da matriz
 *
 * @param matriz - Instância da matriz
 * @returns Objeto com estatísticas
 */
export function obterEstatisticas(matriz: Matriz): {
  linhas: number;
  colunas: number;
  totalElementos: number;
  min: number;
  max: number;
  soma: number;
  media: number;
  ehQuadrada: boolean;
} {
  const dados = matriz.paraArray();
  const valores = dados.flat();

  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const soma = valores.reduce((acc, val) => acc + val, 0);
  const media = soma / valores.length;

  return {
    linhas: matriz.obterLinhas(),
    colunas: matriz.obterColunas(),
    totalElementos: valores.length,
    min,
    max,
    soma,
    media,
    ehQuadrada: matriz.ehQuadrada(),
  };
}

/**
 * Formata a matriz para exibição
 *
 * @param matriz - Instância da matriz
 * @returns String representando a matriz
 */
export function formatarMatriz(matriz: Matriz): string {
  const dados = matriz.paraArray();
  const linhas = dados.map((linha) => `[${linha.join(", ")}]`);
  return `[\n  ${linhas.join(",\n  ")}\n]`;
}
