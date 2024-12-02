export const metodosVetor = {
  inserir: {
    nome: "inserir",
    descricao: "Insere um elemento em uma posicao especifica",
    parametros: ["indice: numero", "elemento: qualquer"],
  },
  remover: {
    nome: "remover",
    descricao: "Remove um elemento de uma posicao especifica",
    parametros: ["indice: numero"],
  },
  obter: {
    nome: "obter",
    descricao: "Retorna o elemento em um indice especifico",
    parametros: ["indice: numero"],
  },
  definir: {
    nome: "definir",
    descricao: "Atualiza o valor de um elemento em um indice especifico",
    parametros: ["indice: numero", "elemento: qualquer"],
  },
  adicionarNoFinal: {
    nome: "adicionarNoFinal",
    descricao: "Adiciona um elemento ao final do vetor",
    parametros: ["elemento: qualquer"],
  },
  removerDoFinal: {
    nome: "removerDoFinal",
    descricao: "Remove e retorna o ultimo elemento",
    parametros: [],
  },
  limpar: {
    nome: "limpar",
    descricao: "Remove todos os elementos do vetor",
    parametros: [],
  },
  tamanho: {
    nome: "tamanho",
    descricao: "Retorna o numero de elementos",
    parametros: [],
  },
  estaVazio: {
    nome: "estaVazio",
    descricao: "Verifica se o vetor esta vazio",
    parametros: [],
  },
};
