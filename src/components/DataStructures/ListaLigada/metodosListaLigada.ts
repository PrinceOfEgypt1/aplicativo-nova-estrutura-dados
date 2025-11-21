/**
 * Metadados e configurações dos métodos da Lista Ligada
 *
 * @remarks
 * Este arquivo centraliza todas as informações sobre os métodos disponíveis
 * na estrutura de dados Lista Ligada, incluindo descrições, requisitos e agrupamentos.
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
  insercao: ['inserirNoInicio', 'inserirNoFim', 'inserirNaPosicao'],
  remocao: ['removerDoInicio', 'removerDoFim', 'removerDaPosicao'],
  busca: ['buscar', 'obterPorIndice'],
  informacao: ['tamanho', 'estaVazia', 'obterCabeca'],
  manipulacao: ['limpar']
} as const;

export type GrupoMetodo = keyof typeof gruposMetodos;

/**
 * Informações detalhadas de cada método da Lista Ligada
 *
 * @remarks
 * Cada método possui:
 * - titulo: Nome amigável para exibição na UI
 * - descricao: Explicação do que o método faz
 * - requisitos: Lista de parâmetros necessários
 */
export const metodosInfo: Record<string, MetodoInfo> = {
  inserirNoInicio: {
    titulo: 'Inserir no Início',
    descricao: 'Insere um novo nó no início da lista ligada',
    requisitos: ['Solicitar um valor']
  },
  inserirNoFim: {
    titulo: 'Inserir no Fim',
    descricao: 'Insere um novo nó no final da lista ligada',
    requisitos: ['Solicitar um valor']
  },
  inserirNaPosicao: {
    titulo: 'Inserir na Posição',
    descricao: 'Insere um novo nó em uma posição específica',
    requisitos: ['Solicitar índice e valor']
  },
  removerDoInicio: {
    titulo: 'Remover do Início',
    descricao: 'Remove e retorna o nó do início da lista',
    requisitos: []
  },
  removerDoFim: {
    titulo: 'Remover do Fim',
    descricao: 'Remove e retorna o nó do final da lista',
    requisitos: []
  },
  removerDaPosicao: {
    titulo: 'Remover da Posição',
    descricao: 'Remove e retorna o nó de uma posição específica',
    requisitos: ['Solicitar índice']
  },
  buscar: {
    titulo: 'Buscar',
    descricao: 'Busca um elemento e retorna seu índice',
    requisitos: ['Solicitar um valor']
  },
  obterPorIndice: {
    titulo: 'Obter por Índice',
    descricao: 'Retorna o valor de um nó em uma posição específica',
    requisitos: ['Solicitar índice']
  },
  tamanho: {
    titulo: 'Tamanho',
    descricao: 'Retorna o número de nós na lista',
    requisitos: []
  },
  estaVazia: {
    titulo: 'Está Vazia',
    descricao: 'Verifica se a lista não contém nós',
    requisitos: []
  },
  limpar: {
    titulo: 'Limpar',
    descricao: 'Remove todos os nós da lista',
    requisitos: []
  },
  obterCabeca: {
    titulo: 'Obter Cabeça',
    descricao: 'Retorna o valor do nó cabeça (primeiro)',
    requisitos: []
  }
};

/**
 * Interface para um método disponível na UI
 */
export interface MetodoListaLigada {
  id: string;
  titulo: string;
  icone: string;
  requisitos: ('valor' | 'indice' | 'ambos')[];
  mensagemExplicativa: string;
}

/**
 * Lista de métodos disponíveis para exibição na interface do usuário
 *
 * @remarks
 * Cada método inclui ícone e mensagem explicativa para melhor UX
 */
export const metodosDisponiveis: MetodoListaLigada[] = [
  {
    id: 'inserirNoInicio',
    titulo: 'Inserir no Início',
    icone: '⬆',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor (número inteiro entre -1000 e 1000) para adicionar no início da lista.'
  },
  {
    id: 'inserirNoFim',
    titulo: 'Inserir no Fim',
    icone: '⬇',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor (número inteiro entre -1000 e 1000) para adicionar no final da lista.'
  },
  {
    id: 'inserirNaPosicao',
    titulo: 'Inserir na Posição',
    icone: '📌',
    requisitos: ['ambos'],
    mensagemExplicativa: 'Insira o índice (0 a tamanho) e o valor para inserir em uma posição específica.'
  },
  {
    id: 'removerDoInicio',
    titulo: 'Remover do Início',
    icone: '⏫',
    requisitos: [],
    mensagemExplicativa: 'Remove o primeiro nó da lista e retorna seu valor.'
  },
  {
    id: 'removerDoFim',
    titulo: 'Remover do Fim',
    icone: '⏬',
    requisitos: [],
    mensagemExplicativa: 'Remove o último nó da lista e retorna seu valor.'
  },
  {
    id: 'removerDaPosicao',
    titulo: 'Remover da Posição',
    icone: '✂',
    requisitos: ['indice'],
    mensagemExplicativa: 'Insira o índice (0 a tamanho-1) para remover o nó dessa posição.'
  },
  {
    id: 'buscar',
    titulo: 'Buscar',
    icone: '🔍',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor para buscar na lista. Retorna o índice ou -1 se não encontrado.'
  },
  {
    id: 'obterPorIndice',
    titulo: 'Obter por Índice',
    icone: '📍',
    requisitos: ['indice'],
    mensagemExplicativa: 'Insira o índice (0 a tamanho-1) para obter o valor do nó nessa posição.'
  },
  {
    id: 'tamanho',
    titulo: 'Tamanho',
    icone: '📏',
    requisitos: [],
    mensagemExplicativa: 'Retorna a quantidade de nós atualmente na lista.'
  },
  {
    id: 'estaVazia',
    titulo: 'Está Vazia',
    icone: '❓',
    requisitos: [],
    mensagemExplicativa: 'Verifica se a lista não contém nenhum nó.'
  },
  {
    id: 'limpar',
    titulo: 'Limpar',
    icone: '🗑',
    requisitos: [],
    mensagemExplicativa: 'Remove todos os nós da lista, deixando-a vazia.'
  },
  {
    id: 'obterCabeca',
    titulo: 'Obter Cabeça',
    icone: '🎯',
    requisitos: [],
    mensagemExplicativa: 'Retorna o valor do nó cabeça (primeiro da lista) sem removê-lo.'
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
