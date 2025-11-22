import { Matriz } from "./matriz";

/**
 * Metadados e configurações dos métodos da Matriz
 */

export interface MetodoMatriz {
  id: string;
  titulo: string;
  icone: string;
  requisitos: ('linha' | 'coluna' | 'valor' | 'escalar' | 'novasLinhas' | 'novasColunas')[];
  mensagemExplicativa: string;
}

export const metodosDisponiveis: MetodoMatriz[] = [
  {
    id: 'definir',
    titulo: 'Definir',
    icone: '📝',
    requisitos: ['linha', 'coluna', 'valor'],
    mensagemExplicativa: 'Define um valor em uma posição específica da matriz [linha][coluna].'
  },
  {
    id: 'obter',
    titulo: 'Obter',
    icone: '👁',
    requisitos: ['linha', 'coluna'],
    mensagemExplicativa: 'Obtém o valor de uma posição específica da matriz.'
  },
  {
    id: 'preencher',
    titulo: 'Preencher Tudo',
    icone: '🎨',
    requisitos: ['valor'],
    mensagemExplicativa: 'Preenche toda a matriz com um valor específico.'
  },
  {
    id: 'preencherLinha',
    titulo: 'Preencher Linha',
    icone: '➡',
    requisitos: ['linha', 'valor'],
    mensagemExplicativa: 'Preenche uma linha específica com um valor.'
  },
  {
    id: 'preencherColuna',
    titulo: 'Preencher Coluna',
    icone: '⬇',
    requisitos: ['coluna', 'valor'],
    mensagemExplicativa: 'Preenche uma coluna específica com um valor.'
  },
  {
    id: 'transpor',
    titulo: 'Transpor',
    icone: '🔄',
    requisitos: [],
    mensagemExplicativa: 'Transpõe a matriz (inverte linhas e colunas).'
  },
  {
    id: 'multiplicarPorEscalar',
    titulo: 'Mult. Escalar',
    icone: '✖',
    requisitos: ['escalar'],
    mensagemExplicativa: 'Multiplica todos os elementos da matriz por um escalar.'
  },
  {
    id: 'redimensionar',
    titulo: 'Redimensionar',
    icone: '📐',
    requisitos: ['novasLinhas', 'novasColunas'],
    mensagemExplicativa: 'Redimensiona a matriz (cria nova matriz com dimensões diferentes).'
  },
  {
    id: 'limpar',
    titulo: 'Limpar',
    icone: '🗑',
    requisitos: [],
    mensagemExplicativa: 'Limpa a matriz (preenche tudo com zeros).'
  }
];

/**
 * Métodos auxiliares para Matriz
 */

/**
 * Cria uma matriz identidade (apenas para matrizes quadradas)
 *
 * @param tamanho - Tamanho da matriz (n � n)
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
    throw new Error("Array n�o pode ser vazio");
  }

  const linhas = dados.length;
  const colunas = dados[0].length;

  // Valida��o: todas as linhas devem ter o mesmo n�mero de colunas
  for (const linha of dados) {
    if (linha.length !== colunas) {
      throw new Error("Todas as linhas devem ter o mesmo n�mero de colunas");
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
 * Verifica se duas matrizes s�o iguais
 *
 * @param matriz1 - Primeira matriz
 * @param matriz2 - Segunda matriz
 * @returns true se as matrizes forem iguais, false caso contr�rio
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
 * Retorna estat�sticas da matriz
 *
 * @param matriz - Inst�ncia da matriz
 * @returns Objeto com estat�sticas
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
 * Formata a matriz para exibi��o
 *
 * @param matriz - Inst�ncia da matriz
 * @returns String representando a matriz
 */
export function formatarMatriz(matriz: Matriz): string {
  const dados = matriz.paraArray();
  const linhas = dados.map((linha) => `[${linha.join(", ")}]`);
  return `[\n  ${linhas.join(",\n  ")}\n]`;
}
