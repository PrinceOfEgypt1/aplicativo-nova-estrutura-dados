/**
 * Metadados e configurações dos métodos da Lista Duplamente Ligada
 */

export interface MetodoListaDupla {
  id: string;
  titulo: string;
  icone: string;
  requisitos: ('valor' | 'indice')[];
  mensagemExplicativa: string;
}

export const metodosDisponiveis: MetodoListaDupla[] = [
  {
    id: 'inserirNoInicio',
    titulo: 'Inserir Início',
    icone: '⬅➕',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor (número inteiro entre -1000 e 1000) para adicionar no início da lista.'
  },
  {
    id: 'inserirNoFim',
    titulo: 'Inserir Fim',
    icone: '➕➡',
    requisitos: ['valor'],
    mensagemExplicativa: 'Insira o valor para adicionar no final da lista.'
  },
  {
    id: 'inserirNaPosicao',
    titulo: 'Inserir Posição',
    icone: '📌',
    requisitos: ['indice', 'valor'],
    mensagemExplicativa: 'Insira o índice (0-based) e o valor para inserir em uma posição específica.'
  },
  {
    id: 'removerDoInicio',
    titulo: 'Remover Início',
    icone: '⬅➖',
    requisitos: [],
    mensagemExplicativa: 'Remove o primeiro elemento da lista.'
  },
  {
    id: 'removerDoFim',
    titulo: 'Remover Fim',
    icone: '➖➡',
    requisitos: [],
    mensagemExplicativa: 'Remove o último elemento da lista.'
  },
  {
    id: 'removerDaPosicao',
    titulo: 'Remover Posição',
    icone: '🗑',
    requisitos: ['indice'],
    mensagemExplicativa: 'Remove o elemento de uma posição específica (0-based).'
  },
  {
    id: 'buscar',
    titulo: 'Buscar',
    icone: '🔍',
    requisitos: ['valor'],
    mensagemExplicativa: 'Busca a primeira ocorrência de um valor e retorna seu índice.'
  },
  {
    id: 'obterPorIndice',
    titulo: 'Obter',
    icone: '👁',
    requisitos: ['indice'],
    mensagemExplicativa: 'Obtém o valor de um elemento em uma posição específica.'
  },
  {
    id: 'atualizar',
    titulo: 'Atualizar',
    icone: '✏',
    requisitos: ['indice', 'valor'],
    mensagemExplicativa: 'Atualiza o valor em uma posição específica da lista.'
  },
  {
    id: 'inverter',
    titulo: 'Inverter',
    icone: '🔄',
    requisitos: [],
    mensagemExplicativa: 'Inverte a ordem de todos os elementos da lista.'
  },
  {
    id: 'tamanho',
    titulo: 'Tamanho',
    icone: '📏',
    requisitos: [],
    mensagemExplicativa: 'Retorna a quantidade de elementos na lista.'
  },
  {
    id: 'limpar',
    titulo: 'Limpar',
    icone: '🗑',
    requisitos: [],
    mensagemExplicativa: 'Remove todos os elementos da lista.'
  }
];
