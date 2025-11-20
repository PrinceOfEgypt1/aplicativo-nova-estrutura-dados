/**
 * Metadados e configurações dos métodos da Pilha
 *
 * @remarks
 * Este arquivo centraliza todas as informações sobre os métodos disponíveis
 * na estrutura de dados Pilha, incluindo descrições, requisitos e agrupamentos.
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
  basicos: ['push', 'pop', 'peek'],
  informacao: ['tamanho', 'estaVazio'],
  manipulacao: ['limpar'],
  verificacao: ['contem', 'buscar']
} as const;

export type GrupoMetodo = keyof typeof gruposMetodos;

/**
 * Informações detalhadas de cada método da Pilha
 *
 * @remarks
 * Cada método possui:
 * - titulo: Nome amigável para exibição na UI
 * - descricao: Explicação do que o método faz
 * - requisitos: Lista de parâmetros necessários
 */
export const metodosInfo: Record<string, MetodoInfo> = {
  push: {
    titulo: 'Push',
    descricao: 'Adiciona um elemento no topo da pilha',
    requisitos: ['Solicitar um valor']
  },
  pop: {
    titulo: 'Pop',
    descricao: 'Remove e retorna o elemento do topo da pilha',
    requisitos: []
  },
  peek: {
    titulo: 'Peek',
    descricao: 'Retorna o elemento do topo sem remover',
    requisitos: []
  },
  tamanho: {
    titulo: 'Tamanho',
    descricao: 'Retorna o número de elementos na pilha',
    requisitos: []
  },
  estaVazio: {
    titulo: 'Está Vazio',
    descricao: 'Verifica se a pilha não contém elementos',
    requisitos: []
  },
  limpar: {
    titulo: 'Limpar',
    descricao: 'Remove todos os elementos da pilha',
    requisitos: []
  },
  contem: {
    titulo: 'Contém',
    descricao: 'Verifica se um elemento existe na pilha',
    requisitos: ['Solicitar um valor']
  },
  buscar: {
    titulo: 'Buscar',
    descricao: 'Retorna a posição do elemento a partir do topo (1-indexed)',
    requisitos: ['Solicitar um valor']
  }
};

/**
 * Interface para um método disponível na UI
 */
export interface MetodoPilha {
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
export const metodosDisponiveis: MetodoPilha[] = [
  {
    id: 'push',
    titulo: 'Push',
    icone: '⬆',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor (número inteiro entre -1000 e 1000) para adicionar ao topo da pilha.'
  },
  {
    id: 'pop',
    titulo: 'Pop',
    icone: '⬇',
    requisitos: [],
    mensagemExplicativa: 'Remove o elemento do topo da pilha e o retorna.'
  },
  {
    id: 'peek',
    titulo: 'Peek',
    icone: '👁',
    requisitos: [],
    mensagemExplicativa: 'Visualiza o elemento do topo sem removê-lo da pilha.'
  },
  {
    id: 'tamanho',
    titulo: 'Tamanho',
    icone: '📏',
    requisitos: [],
    mensagemExplicativa: 'Retorna a quantidade de elementos atualmente na pilha.'
  },
  {
    id: 'estaVazio',
    titulo: 'Está Vazio',
    icone: '❓',
    requisitos: [],
    mensagemExplicativa: 'Verifica se a pilha não contém nenhum elemento.'
  },
  {
    id: 'limpar',
    titulo: 'Limpar',
    icone: '🗑',
    requisitos: [],
    mensagemExplicativa: 'Remove todos os elementos da pilha, deixando-a vazia.'
  },
  {
    id: 'contem',
    titulo: 'Contém',
    icone: '🔍',
    requisitos: ['valor'],
    mensagemExplicativa: 'Verifica se um elemento específico existe em qualquer posição da pilha.'
  },
  {
    id: 'buscar',
    titulo: 'Buscar',
    icone: '🎯',
    requisitos: ['valor'],
    mensagemExplicativa: 'Busca um elemento e retorna sua distância do topo (1 = topo, 2 = segundo, etc.).'
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
