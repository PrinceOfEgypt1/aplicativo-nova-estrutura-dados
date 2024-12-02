// src/components/DataStructures/Vetor/metodosVetor.ts
// Definição das interfaces dentro do próprio arquivo para manter a estrutura
interface MetodoInfo {
  titulo: string;
  descricao: string;
  requisitos: string[];
}

// Exportação dos grupos de métodos
export const gruposMetodos = {
  basicos: ['inserir', 'remover', 'pesquisar', 'obterElemento', 'definirElemento'],
  informacao: ['tamanho', 'estaVazio'],
  manipulacao: ['limpar', 'ordenar', 'inverter'],
  final: ['adicionarNoFinal', 'removerDoFinal', 'estender'],
  busca: ['fatiar', 'contem', 'indiceDe']
} as const;

// Tipagem para os grupos de métodos
export type GrupoMetodo = keyof typeof gruposMetodos;

// Definição e exportação dos métodos disponíveis
export const metodosInfo: Record<string, MetodoInfo> = {
  inserir: {
    titulo: "Inserir",
    descricao: "Adiciona um elemento em uma posição específica",
    requisitos: ["Solicitar um valor", "Solicitar um índice"]
  },
  remover: {
    titulo: "Remover",
    descricao: "Remove um elemento de uma posição específica",
    requisitos: ["Solicitar um índice"]
  },
  pesquisar: {
    titulo: "Pesquisar",
    descricao: "Busca um elemento no vetor",
    requisitos: ["Solicitar um valor"]
  },
  obterElemento: {
    titulo: "Obter Elemento",
    descricao: "Retorna o elemento em uma posição específica",
    requisitos: ["Solicitar um índice"]
  },
  definirElemento: {
    titulo: "Definir Elemento",
    descricao: "Atualiza o valor de um elemento em uma posição específica",
    requisitos: ["Solicitar um valor", "Solicitar um índice"]
  },
  tamanho: {
    titulo: "Tamanho",
    descricao: "Retorna o número atual de elementos no vetor",
    requisitos: []
  },
  estaVazio: {
    titulo: "Está Vazio",
    descricao: "Verifica se o vetor não contém elementos",
    requisitos: []
  },
  limpar: {
    titulo: "Limpar",
    descricao: "Remove todos os elementos do vetor",
    requisitos: []
  },
  ordenar: {
    titulo: "Ordenar",
    descricao: "Reorganiza os elementos em ordem crescente",
    requisitos: []
  },
  inverter: {
    titulo: "Inverter",
    descricao: "Inverte a ordem atual dos elementos no vetor",
    requisitos: []
  },
  adicionarNoFinal: {
    titulo: "Adicionar no Final",
    descricao: "Insere um novo elemento na última posição do vetor",
    requisitos: ["Solicitar um valor"]
  },
  estender: {
    titulo: "Estender",
    descricao: "Adiciona múltiplos elementos ao final do vetor",
    requisitos: ["Solicitar valores separados por vírgula"]
  },
  removerDoFinal: {
    titulo: "Remover do Final",
    descricao: "Remove e retorna o último elemento do vetor",
    requisitos: []
  },
  fatiar: {
    titulo: "Fatiar",
    descricao: "Cria um novo vetor com elementos entre dois índices",
    requisitos: ["Solicitar índice inicial", "Solicitar índice final"]
  },
  contem: {
    titulo: "Contém",
    descricao: "Verifica se um determinado elemento existe no vetor",
    requisitos: ["Solicitar um valor"]
  },
  indiceDe: {
    titulo: "Índice De",
    descricao: "Retorna a posição da primeira ocorrência do elemento",
    requisitos: ["Solicitar um valor"]
  }
};