// src/components/DataStructures/Pilha/metodosPilha.ts
import { StackElement } from './pilha';

/**
 * 1. PUSH - Empilha um elemento no topo
 */
export function push(pilha: StackElement[], valor: number, id: string): StackElement[] {
  const novoElemento: StackElement = {
    value: valor,
    id,
    timestamp: Date.now(),
  };
  return [...pilha, novoElemento];
}

/**
 * 2. POP - Desempilha (remove) o elemento do topo
 */
export function pop(pilha: StackElement[]): { novaPilha: StackElement[]; elementoRemovido: StackElement | null } {
  if (pilha.length === 0) {
    return { novaPilha: pilha, elementoRemovido: null };
  }
  const novaPilha = pilha.slice(0, -1);
  const elementoRemovido = pilha[pilha.length - 1];
  return { novaPilha, elementoRemovido };
}

/**
 * 3. PEEK/TOP - Retorna o elemento do topo sem remover
 */
export function peek(pilha: StackElement[]): StackElement | null {
  if (pilha.length === 0) return null;
  return pilha[pilha.length - 1];
}

/**
 * 4. IS_EMPTY - Verifica se a pilha está vazia
 */
export function isEmpty(pilha: StackElement[]): boolean {
  return pilha.length === 0;
}

/**
 * 5. SIZE - Retorna o tamanho da pilha
 */
export function size(pilha: StackElement[]): number {
  return pilha.length;
}

/**
 * 6. CLEAR - Limpa todos os elementos da pilha
 */
export function clear(): StackElement[] {
  return [];
}

/**
 * 7. SEARCH - Busca um elemento e retorna sua posição a partir do topo
 * Retorna -1 se não encontrado
 */
export function search(pilha: StackElement[], valor: number): number {
  for (let i = pilha.length - 1; i >= 0; i--) {
    if (pilha[i].value === valor) {
      return pilha.length - 1 - i; // Distância do topo
    }
  }
  return -1;
}

/**
 * 8. CONTAINS - Verifica se a pilha contém um elemento
 */
export function contains(pilha: StackElement[], valor: number): boolean {
  return pilha.some(elemento => elemento.value === valor);
}

/**
 * 9. TO_ARRAY - Converte a pilha para array (do fundo para o topo)
 */
export function toArray(pilha: StackElement[]): number[] {
  return pilha.map(elemento => elemento.value);
}

/**
 * 10. CLONE - Cria uma cópia da pilha
 */
export function clone(pilha: StackElement[]): StackElement[] {
  return pilha.map(elemento => ({ ...elemento }));
}

/**
 * 11. REVERSE - Inverte a ordem dos elementos
 */
export function reverse(pilha: StackElement[]): StackElement[] {
  return [...pilha].reverse();
}

/**
 * 12. PUSH_MULTIPLE - Empilha múltiplos elementos de uma vez
 */
export function pushMultiple(pilha: StackElement[], valores: number[], idGenerator: () => string): StackElement[] {
  const novosElementos: StackElement[] = valores.map(valor => ({
    value: valor,
    id: idGenerator(),
    timestamp: Date.now(),
  }));
  return [...pilha, ...novosElementos];
}

/**
 * 13. GET_AT_INDEX - Retorna elemento em um índice específico (0 = fundo)
 */
export function getAtIndex(pilha: StackElement[], indice: number): StackElement | null {
  if (indice < 0 || indice >= pilha.length) return null;
  return pilha[indice];
}

/**
 * 14. GET_MIN - Retorna o menor elemento (sem remover)
 */
export function getMin(pilha: StackElement[]): StackElement | null {
  if (pilha.length === 0) return null;
  return pilha.reduce((min, current) =>
    current.value < min.value ? current : min
  );
}

/**
 * 15. GET_MAX - Retorna o maior elemento (sem remover)
 */
export function getMax(pilha: StackElement[]): StackElement | null {
  if (pilha.length === 0) return null;
  return pilha.reduce((max, current) =>
    current.value > max.value ? current : max
  );
}
