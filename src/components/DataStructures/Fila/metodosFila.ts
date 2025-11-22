/**
 * Metadados e configurações dos métodos da Fila
 *
 * @remarks
 * Este arquivo centraliza todas as informações sobre os métodos disponíveis
 * na estrutura de dados Fila, incluindo descrições, requisitos e agrupamentos.
 */

/**
 * Interface que define as informações de cada método
 */
export interface MetodoInfo {
  titulo: string;
  descricao: string;
  requisitos: string[];
}

/**
 * Agrupamento dos métodos por categoria funcional
 */
export const gruposMetodos = {
  basicos: ['enqueue', 'dequeue'],
  visualizacao: ['primeiro', 'ultimo'],
  informacao: ['tamanho', 'estaVazio'],
  manipulacao: ['limpar'],
  verificacao: ['contem']
} as const;

export type GrupoMetodo = keyof typeof gruposMetodos;

/**
 * Informações detalhadas de cada método da Fila
 *
 * @remarks
 * Cada método possui:
 * - titulo: Nome amigável para exibição na UI
 * - descricao: Explicação do que o método faz
 * - requisitos: Lista de parâmetros necessários
 */
export const metodosInfo: Record<string, MetodoInfo> = {
  enqueue: {
    titulo: 'Enqueue',
    descricao: 'Adiciona um elemento no final da fila',
    requisitos: ['Solicitar um valor']
  },
  dequeue: {
    titulo: 'Dequeue',
    descricao: 'Remove e retorna o elemento da frente da fila',
    requisitos: []
  },
  primeiro: {
    titulo: 'Primeiro',
    descricao: 'Retorna o elemento da frente sem remover',
    requisitos: []
  },
  ultimo: {
    titulo: 'Último',
    descricao: 'Retorna o elemento do final sem remover',
    requisitos: []
  },
  tamanho: {
    titulo: 'Tamanho',
    descricao: 'Retorna o número de elementos na fila',
    requisitos: []
  },
  estaVazio: {
    titulo: 'Está Vazio',
    descricao: 'Verifica se a fila não contém elementos',
    requisitos: []
  },
  limpar: {
    titulo: 'Limpar',
    descricao: 'Remove todos os elementos da fila',
    requisitos: []
  },
  contem: {
    titulo: 'Contém',
    descricao: 'Verifica se um elemento existe na fila',
    requisitos: ['Solicitar um valor']
  }
};

/**
 * Interface para um método disponível na UI
 */
export interface MetodoFila {
  id: string;
  titulo: string;
  icone: string;
  requisitos: ('valor')[];
  mensagemExplicativa: string;
}

/**
 * Lista de métodos disponíveis para exibição na interface do usuário
 *
 * @remarks
 * Cada método inclui ícone e mensagem explicativa para melhor UX
 */
export const metodosDisponiveis: MetodoFila[] = [
  {
    id: 'enqueue',
    titulo: 'Enqueue',
    icone: '➡',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor (número inteiro entre -1000 e 1000) para adicionar ao final da fila.'
  },
  {
    id: 'dequeue',
    titulo: 'Dequeue',
    icone: '⬅',
    requisitos: [],
    mensagemExplicativa: 'Remove o elemento da frente da fila e o retorna.'
  },
  {
    id: 'primeiro',
    titulo: 'Primeiro',
    icone: '👁',
    requisitos: [],
    mensagemExplicativa: 'Visualiza o elemento da frente sem removê-lo da fila.'
  },
  {
    id: 'ultimo',
    titulo: 'Último',
    icone: '🔚',
    requisitos: [],
    mensagemExplicativa: 'Visualiza o elemento do final da fila sem removê-lo.'
  },
  {
    id: 'tamanho',
    titulo: 'Tamanho',
    icone: '📏',
    requisitos: [],
    mensagemExplicativa: 'Retorna a quantidade de elementos atualmente na fila.'
  },
  {
    id: 'estaVazio',
    titulo: 'Está Vazio',
    icone: '❓',
    requisitos: [],
    mensagemExplicativa: 'Verifica se a fila não contém nenhum elemento.'
  },
  {
    id: 'limpar',
    titulo: 'Limpar',
    icone: '🗑',
    requisitos: [],
    mensagemExplicativa: 'Remove todos os elementos da fila, deixando-a vazia.'
  },
  {
    id: 'contem',
    titulo: 'Contém',
    icone: '🔍',
    requisitos: ['valor'],
    mensagemExplicativa: 'Verifica se um elemento específico existe em qualquer posição da fila.'
  }
];

/**
 * Obtém informações de um método específico
 *
 * @param metodoId - ID do método
 * @returns Informações do método ou undefined se não encontrado
 */
export function obterInfoMetodo(metodoId: string): MetodoInfo | undefined {
  return metodosInfo[metodoId];
}

/**
 * Obtém todos os métodos de um grupo específico
 *
 * @param grupo - Nome do grupo
 * @returns Array de IDs dos métodos do grupo
 */
export function obterMetodosDoGrupo(grupo: GrupoMetodo): readonly string[] {
  return gruposMetodos[grupo];
}
