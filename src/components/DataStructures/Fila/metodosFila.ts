// src/components/DataStructures/Fila/metodosFila.ts
import { QueueElement } from './fila';

/**
 * 1. ENQUEUE - Adiciona um elemento no final da fila
 */
export function enqueue(fila: QueueElement[], valor: number, id: string): QueueElement[] {
  const novoElemento: QueueElement = {
    value: valor,
    id,
    timestamp: Date.now(),
  };
  return [...fila, novoElemento];
}

/**
 * 2. DEQUEUE - Remove e retorna o elemento do início da fila
 */
export function dequeue(fila: QueueElement[]): { novaFila: QueueElement[]; elementoRemovido: QueueElement | null } {
  if (fila.length === 0) {
    return { novaFila: fila, elementoRemovido: null };
  }
  const novaFila = fila.slice(1);
  const elementoRemovido = fila[0];
  return { novaFila, elementoRemovido };
}

/**
 * 3. FRONT/PEEK - Retorna o elemento do início sem remover
 */
export function front(fila: QueueElement[]): QueueElement | null {
  if (fila.length === 0) return null;
  return fila[0];
}

/**
 * 4. REAR - Retorna o elemento do final sem remover
 */
export function rear(fila: QueueElement[]): QueueElement | null {
  if (fila.length === 0) return null;
  return fila[fila.length - 1];
}

/**
 * 5. IS_EMPTY - Verifica se a fila está vazia
 */
export function isEmpty(fila: QueueElement[]): boolean {
  return fila.length === 0;
}

/**
 * 6. SIZE - Retorna o tamanho da fila
 */
export function size(fila: QueueElement[]): number {
  return fila.length;
}

/**
 * 7. CLEAR - Limpa todos os elementos da fila
 */
export function clear(): QueueElement[] {
  return [];
}

/**
 * 8. CONTAINS - Verifica se a fila contém um elemento
 */
export function contains(fila: QueueElement[], valor: number): boolean {
  return fila.some(elemento => elemento.value === valor);
}

/**
 * 9. SEARCH - Busca um elemento e retorna sua posição (0 = início)
 * Retorna -1 se não encontrado
 */
export function search(fila: QueueElement[], valor: number): number {
  return fila.findIndex(elemento => elemento.value === valor);
}

/**
 * 10. TO_ARRAY - Converte a fila para array (do início para o fim)
 */
export function toArray(fila: QueueElement[]): number[] {
  return fila.map(elemento => elemento.value);
}

/**
 * 11. CLONE - Cria uma cópia da fila
 */
export function clone(fila: QueueElement[]): QueueElement[] {
  return fila.map(elemento => ({ ...elemento }));
}

/**
 * 12. REVERSE - Inverte a ordem dos elementos
 */
export function reverse(fila: QueueElement[]): QueueElement[] {
  return [...fila].reverse();
}

/**
 * 13. ENQUEUE_MULTIPLE - Adiciona múltiplos elementos de uma vez
 */
export function enqueueMultiple(fila: QueueElement[], valores: number[], idGenerator: () => string): QueueElement[] {
  const novosElementos: QueueElement[] = valores.map(valor => ({
    value: valor,
    id: idGenerator(),
    timestamp: Date.now(),
  }));
  return [...fila, ...novosElementos];
}

/**
 * 14. GET_AT_INDEX - Retorna elemento em um índice específico (0 = início)
 */
export function getAtIndex(fila: QueueElement[], indice: number): QueueElement | null {
  if (indice < 0 || indice >= fila.length) return null;
  return fila[indice];
}

/**
 * 15. GET_MIN - Retorna o menor elemento (sem remover)
 */
export function getMin(fila: QueueElement[]): QueueElement | null {
  if (fila.length === 0) return null;
  return fila.reduce((min, current) =>
    current.value < min.value ? current : min
  );
}

/**
 * 16. GET_MAX - Retorna o maior elemento (sem remover)
 */
export function getMax(fila: QueueElement[]): QueueElement | null {
  if (fila.length === 0) return null;
  return fila.reduce((max, current) =>
    current.value > max.value ? current : max
  );
}
