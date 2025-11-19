// src/components/DataStructures/ListaLigada/metodosListaLigada.ts
import { LinkedListElement } from './listaLigada';

/**
 * 1. INSERT_AT_HEAD - Insere elemento no início da lista
 */
export function inserirInicio(lista: LinkedListElement[], valor: number, id: string): LinkedListElement[] {
  const novoElemento: LinkedListElement = {
    value: valor,
    id,
    timestamp: Date.now(),
  };
  return [novoElemento, ...lista];
}

/**
 * 2. INSERT_AT_TAIL - Insere elemento no final da lista
 */
export function inserirFim(lista: LinkedListElement[], valor: number, id: string): LinkedListElement[] {
  const novoElemento: LinkedListElement = {
    value: valor,
    id,
    timestamp: Date.now(),
  };
  return [...lista, novoElemento];
}

/**
 * 3. INSERT_AT_POSITION - Insere elemento em posição específica
 */
export function inserirPosicao(
  lista: LinkedListElement[],
  valor: number,
  posicao: number,
  id: string
): LinkedListElement[] {
  if (posicao < 0 || posicao > lista.length) {
    throw new Error('Posição inválida');
  }

  const novoElemento: LinkedListElement = {
    value: valor,
    id,
    timestamp: Date.now(),
  };

  const novaLista = [...lista];
  novaLista.splice(posicao, 0, novoElemento);
  return novaLista;
}

/**
 * 4. DELETE_AT_HEAD - Remove elemento do início
 */
export function removerInicio(lista: LinkedListElement[]): {
  novaLista: LinkedListElement[];
  elementoRemovido: LinkedListElement | null;
} {
  if (lista.length === 0) {
    return { novaLista: lista, elementoRemovido: null };
  }
  return {
    novaLista: lista.slice(1),
    elementoRemovido: lista[0],
  };
}

/**
 * 5. DELETE_AT_TAIL - Remove elemento do final
 */
export function removerFim(lista: LinkedListElement[]): {
  novaLista: LinkedListElement[];
  elementoRemovido: LinkedListElement | null;
} {
  if (lista.length === 0) {
    return { novaLista: lista, elementoRemovido: null };
  }
  return {
    novaLista: lista.slice(0, -1),
    elementoRemovido: lista[lista.length - 1],
  };
}

/**
 * 6. DELETE_AT_POSITION - Remove elemento de posição específica
 */
export function removerPosicao(lista: LinkedListElement[], posicao: number): {
  novaLista: LinkedListElement[];
  elementoRemovido: LinkedListElement | null;
} {
  if (posicao < 0 || posicao >= lista.length) {
    throw new Error('Posição inválida');
  }

  const novaLista = [...lista];
  const elementoRemovido = novaLista[posicao];
  novaLista.splice(posicao, 1);
  return { novaLista, elementoRemovido };
}

/**
 * 7. SEARCH - Busca valor e retorna posição (-1 se não encontrado)
 */
export function buscar(lista: LinkedListElement[], valor: number): number {
  return lista.findIndex(el => el.value === valor);
}

/**
 * 8. CONTAINS - Verifica se contém valor
 */
export function contem(lista: LinkedListElement[], valor: number): boolean {
  return lista.some(el => el.value === valor);
}

/**
 * 9. SIZE - Retorna tamanho da lista
 */
export function tamanho(lista: LinkedListElement[]): number {
  return lista.length;
}

/**
 * 10. IS_EMPTY - Verifica se está vazia
 */
export function estaVazia(lista: LinkedListElement[]): boolean {
  return lista.length === 0;
}

/**
 * 11. CLEAR - Limpa a lista
 */
export function limpar(): LinkedListElement[] {
  return [];
}

/**
 * 12. GET_AT_POSITION - Obtém elemento em posição específica
 */
export function obterPosicao(lista: LinkedListElement[], posicao: number): LinkedListElement | null {
  if (posicao < 0 || posicao >= lista.length) return null;
  return lista[posicao];
}

/**
 * 13. REVERSE - Inverte a lista
 */
export function inverter(lista: LinkedListElement[]): LinkedListElement[] {
  return [...lista].reverse();
}

/**
 * 14. TO_ARRAY - Converte para array
 */
export function paraArray(lista: LinkedListElement[]): number[] {
  return lista.map(el => el.value);
}

/**
 * 15. CLONE - Clona a lista
 */
export function clonar(lista: LinkedListElement[]): LinkedListElement[] {
  return lista.map(el => ({ ...el }));
}

/**
 * 16. GET_HEAD - Retorna o primeiro elemento
 */
export function obterCabeca(lista: LinkedListElement[]): LinkedListElement | null {
  if (lista.length === 0) return null;
  return lista[0];
}

/**
 * 17. GET_TAIL - Retorna o último elemento
 */
export function obterCauda(lista: LinkedListElement[]): LinkedListElement | null {
  if (lista.length === 0) return null;
  return lista[lista.length - 1];
}

/**
 * 18. GET_MIN - Retorna menor elemento
 */
export function obterMin(lista: LinkedListElement[]): LinkedListElement | null {
  if (lista.length === 0) return null;
  return lista.reduce((min, current) => (current.value < min.value ? current : min));
}

/**
 * 19. GET_MAX - Retorna maior elemento
 */
export function obterMax(lista: LinkedListElement[]): LinkedListElement | null {
  if (lista.length === 0) return null;
  return lista.reduce((max, current) => (current.value > max.value ? current : max));
}

/**
 * 20. DELETE_BY_VALUE - Remove primeira ocorrência de um valor
 */
export function removerPorValor(lista: LinkedListElement[], valor: number): {
  novaLista: LinkedListElement[];
  elementoRemovido: LinkedListElement | null;
  posicaoRemovida: number;
} {
  const posicao = lista.findIndex(el => el.value === valor);

  if (posicao === -1) {
    return { novaLista: lista, elementoRemovido: null, posicaoRemovida: -1 };
  }

  const novaLista = [...lista];
  const elementoRemovido = novaLista[posicao];
  novaLista.splice(posicao, 1);

  return { novaLista, elementoRemovido, posicaoRemovida: posicao };
}
