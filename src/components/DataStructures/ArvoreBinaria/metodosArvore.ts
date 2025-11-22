/**
 * Metadados e configurações dos métodos da Árvore Binária
 *
 * @remarks
 * Este arquivo centraliza todas as informações sobre os métodos disponíveis
 * na estrutura de dados Árvore Binária de Busca, incluindo descrições,
 * requisitos e agrupamentos.
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
  basicos: ['inserir', 'remover', 'buscar'],
  consulta: ['min', 'max', 'altura', 'tamanho'],
  verificacao: ['contem', 'estaVazio'],
  manipulacao: ['limpar'],
  travessia: ['emOrdem', 'preOrdem', 'posOrdem', 'emNivel']
} as const;

export type GrupoMetodo = keyof typeof gruposMetodos;

/**
 * Informações detalhadas de cada método da Árvore Binária
 *
 * @remarks
 * Cada método possui:
 * - titulo: Nome amigável para exibição na UI
 * - descricao: Explicação do que o método faz
 * - requisitos: Lista de parâmetros necessários
 */
export const metodosInfo: Record<string, MetodoInfo> = {
  inserir: {
    titulo: 'Inserir',
    descricao: 'Adiciona um novo valor na árvore mantendo a propriedade BST',
    requisitos: ['Solicitar um valor']
  },
  remover: {
    titulo: 'Remover',
    descricao: 'Remove um valor da árvore mantendo a propriedade BST',
    requisitos: ['Solicitar um valor']
  },
  buscar: {
    titulo: 'Buscar',
    descricao: 'Verifica se um valor existe na árvore',
    requisitos: ['Solicitar um valor']
  },
  contem: {
    titulo: 'Contém',
    descricao: 'Verifica se um valor existe na árvore (alias para buscar)',
    requisitos: ['Solicitar um valor']
  },
  min: {
    titulo: 'Mínimo',
    descricao: 'Retorna o menor valor da árvore',
    requisitos: []
  },
  max: {
    titulo: 'Máximo',
    descricao: 'Retorna o maior valor da árvore',
    requisitos: []
  },
  altura: {
    titulo: 'Altura',
    descricao: 'Retorna a altura da árvore (número de níveis)',
    requisitos: []
  },
  tamanho: {
    titulo: 'Tamanho',
    descricao: 'Retorna o número total de nós na árvore',
    requisitos: []
  },
  estaVazio: {
    titulo: 'Está Vazio',
    descricao: 'Verifica se a árvore não contém nós',
    requisitos: []
  },
  limpar: {
    titulo: 'Limpar',
    descricao: 'Remove todos os nós da árvore',
    requisitos: []
  },
  emOrdem: {
    titulo: 'Em Ordem',
    descricao: 'Retorna os valores em ordem crescente (esquerda → raiz → direita)',
    requisitos: []
  },
  preOrdem: {
    titulo: 'Pré-Ordem',
    descricao: 'Retorna os valores em pré-ordem (raiz → esquerda → direita)',
    requisitos: []
  },
  posOrdem: {
    titulo: 'Pós-Ordem',
    descricao: 'Retorna os valores em pós-ordem (esquerda → direita → raiz)',
    requisitos: []
  },
  emNivel: {
    titulo: 'Em Nível',
    descricao: 'Retorna os valores por nível (BFS - da esquerda para direita)',
    requisitos: []
  }
};

/**
 * Interface para um método disponível na UI
 */
export interface MetodoArvoreBinaria {
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
 * Cada método inclui ícone roxo e mensagem explicativa para melhor UX
 */
export const metodosDisponiveis: MetodoArvoreBinaria[] = [
  {
    id: 'inserir',
    titulo: 'Inserir',
    icone: '➕',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor (número inteiro entre -1000 e 1000) para adicionar na árvore.'
  },
  {
    id: 'remover',
    titulo: 'Remover',
    icone: '➖',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor a ser removido da árvore.'
  },
  {
    id: 'buscar',
    titulo: 'Buscar',
    icone: '🔍',
    requisitos: ['valor'],
    mensagemExplicativa: 'Busca um valor específico na árvore e indica se foi encontrado.'
  },
  {
    id: 'contem',
    titulo: 'Contém',
    icone: '✓',
    requisitos: ['valor'],
    mensagemExplicativa: 'Verifica se um valor específico existe na árvore.'
  },
  {
    id: 'min',
    titulo: 'Mínimo',
    icone: '⬇️',
    requisitos: [],
    mensagemExplicativa: 'Encontra e retorna o menor valor armazenado na árvore.'
  },
  {
    id: 'max',
    titulo: 'Máximo',
    icone: '⬆️',
    requisitos: [],
    mensagemExplicativa: 'Encontra e retorna o maior valor armazenado na árvore.'
  },
  {
    id: 'altura',
    titulo: 'Altura',
    icone: '📏',
    requisitos: [],
    mensagemExplicativa: 'Calcula e retorna a altura da árvore (número de níveis).'
  },
  {
    id: 'tamanho',
    titulo: 'Tamanho',
    icone: '🔢',
    requisitos: [],
    mensagemExplicativa: 'Retorna a quantidade total de nós na árvore.'
  },
  {
    id: 'estaVazio',
    titulo: 'Está Vazio',
    icone: '❓',
    requisitos: [],
    mensagemExplicativa: 'Verifica se a árvore não contém nenhum nó.'
  },
  {
    id: 'limpar',
    titulo: 'Limpar',
    icone: '🗑️',
    requisitos: [],
    mensagemExplicativa: 'Remove todos os nós da árvore, deixando-a vazia.'
  },
  {
    id: 'emOrdem',
    titulo: 'Em Ordem',
    icone: '📊',
    requisitos: [],
    mensagemExplicativa: 'Retorna os valores em ordem crescente (travessia in-order).'
  },
  {
    id: 'preOrdem',
    titulo: 'Pré-Ordem',
    icone: '🎯',
    requisitos: [],
    mensagemExplicativa: 'Retorna os valores em pré-ordem (raiz primeiro).'
  },
  {
    id: 'posOrdem',
    titulo: 'Pós-Ordem',
    icone: '🎪',
    requisitos: [],
    mensagemExplicativa: 'Retorna os valores em pós-ordem (raiz por último).'
  },
  {
    id: 'emNivel',
    titulo: 'Em Nível',
    icone: '🌊',
    requisitos: [],
    mensagemExplicativa: 'Retorna os valores nível por nível (travessia BFS).'
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
