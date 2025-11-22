import { ListaDuplamenteLigada } from "./listaDupla";

/**
 * Métodos auxiliares para Lista Duplamente Ligada
 */

/**
 * Formata a lista para exibição
 *
 * @param lista - Instância da lista
 * @returns String representando a lista
 */
export function formatarLista(lista: ListaDuplamenteLigada): string {
  if (lista.estaVazia()) {
    return "Lista vazia: null";
  }

  const elementos = lista.paraArray();
  return `[${elementos.join(" <-> ")}]`;
}

/**
 * Formata a lista em ordem reversa para exibição
 *
 * @param lista - Instância da lista
 * @returns String representando a lista em ordem reversa
 */
export function formatarListaReversa(lista: ListaDuplamenteLigada): string {
  if (lista.estaVazia()) {
    return "Lista vazia: null";
  }

  const elementos = lista.paraArrayReverso();
  return `[${elementos.join(" <-> ")}]`;
}

/**
 * Cria uma lista a partir de um array
 *
 * @param valores - Array de valores
 * @returns Nova instância de ListaDuplamenteLigada
 */
export function criarListaDoArray(valores: number[]): ListaDuplamenteLigada {
  const lista = new ListaDuplamenteLigada();

  for (const valor of valores) {
    lista.inserirNoFim(valor);
  }

  return lista;
}

/**
 * Verifica se duas listas são iguais
 *
 * @param lista1 - Primeira lista
 * @param lista2 - Segunda lista
 * @returns true se as listas forem iguais, false caso contrário
 */
export function listasIguais(
  lista1: ListaDuplamenteLigada,
  lista2: ListaDuplamenteLigada
): boolean {
  if (lista1.tamanho() !== lista2.tamanho()) {
    return false;
  }

  const array1 = lista1.paraArray();
  const array2 = lista2.paraArray();

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Retorna estatísticas da lista
 *
 * @param lista - Instância da lista
 * @returns Objeto com estatísticas (tamanho, min, max, soma, média)
 */
export function obterEstatisticas(lista: ListaDuplamenteLigada): {
  tamanho: number;
  min: number | null;
  max: number | null;
  soma: number;
  media: number | null;
} {
  if (lista.estaVazia()) {
    return {
      tamanho: 0,
      min: null,
      max: null,
      soma: 0,
      media: null,
    };
  }

  const elementos = lista.paraArray();
  const min = Math.min(...elementos);
  const max = Math.max(...elementos);
  const soma = elementos.reduce((acc, val) => acc + val, 0);
  const media = soma / elementos.length;

  return {
    tamanho: lista.tamanho(),
    min,
    max,
    soma,
    media,
  };
}
