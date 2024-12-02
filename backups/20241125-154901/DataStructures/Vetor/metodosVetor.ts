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
  buscar: {
    nome: "buscar",
    descricao: "Procura por um elemento e retorna seu indice",
    parametros: ["elemento: qualquer"],
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
  limpar: {
    nome: "limpar",
    descricao: "Remove todos os elementos do vetor",
    parametros: [],
  },
  ordenar: {
    nome: "ordenar",
    descricao: "Reorganiza os elementos em ordem crescente",
    parametros: ["comparador?: (a: qualquer, b: qualquer) => numero"],
  },
  inverter: {
    nome: "inverter",
    descricao: "Inverte a ordem dos elementos",
    parametros: [],
  },
  adicionarNoFinal: {
    nome: "adicionarNoFinal",
    descricao: "Adiciona um elemento ao final do vetor",
    parametros: ["elemento: qualquer"],
  },
  estender: {
    nome: "estender",
    descricao: "Adiciona multiplos elementos ao final do vetor",
    parametros: ["elementos: qualquer[]"],
  },
  removerDoFinal: {
    nome: "removerDoFinal",
    descricao: "Remove e retorna o ultimo elemento",
    parametros: [],
  },
  fatiar: {
    nome: "fatiar",
    descricao: "Cria um novo vetor com uma subsecao do vetor original",
    parametros: ["inicio: numero", "fim?: numero"],
  },
  contem: {
    nome: "contem",
    descricao: "Verifica se um elemento esta presente no vetor",
    parametros: ["elemento: qualquer"],
  },
  indiceDe: {
    nome: "indiceDe",
    descricao: "Retorna o indice da primeira ocorrencia de um elemento",
    parametros: ["elemento: qualquer"],
  },
};