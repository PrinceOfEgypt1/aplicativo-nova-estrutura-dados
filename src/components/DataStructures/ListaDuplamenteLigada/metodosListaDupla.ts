// src/components/DataStructures/ListaDuplamenteLigada/metodosListaDupla.ts
import { DoublyLinkedListElement } from './listaDupla';

// M�todos b�sicos (mesmos da lista simples)
export function inserirInicio(lista: DoublyLinkedListElement[], valor: number, id: string): DoublyLinkedListElement[] {
  return [{ value: valor, id, timestamp: Date.now() }, ...lista];
}

export function inserirFim(lista: DoublyLinkedListElement[], valor: number, id: string): DoublyLinkedListElement[] {
  return [...lista, { value: valor, id, timestamp: Date.now() }];
}

export function inserirPosicao(lista: DoublyLinkedListElement[], valor: number, posicao: number, id: string): DoublyLinkedListElement[] {
  if (posicao < 0 || posicao > lista.length) throw new Error('Posi��o inv�lida');
  const novaLista = [...lista];
  novaLista.splice(posicao, 0, { value: valor, id, timestamp: Date.now() });
  return novaLista;
}

export function removerInicio(lista: DoublyLinkedListElement[]): { novaLista: DoublyLinkedListElement[]; elementoRemovido: DoublyLinkedListElement | null } {
  if (lista.length === 0) return { novaLista: lista, elementoRemovido: null };
  return { novaLista: lista.slice(1), elementoRemovido: lista[0] };
}

export function removerFim(lista: DoublyLinkedListElement[]): { novaLista: DoublyLinkedListElement[]; elementoRemovido: DoublyLinkedListElement | null } {
  if (lista.length === 0) return { novaLista: lista, elementoRemovido: null };
  return { novaLista: lista.slice(0, -1), elementoRemovido: lista[lista.length - 1] };
}

export function removerPosicao(lista: DoublyLinkedListElement[], posicao: number): { novaLista: DoublyLinkedListElement[]; elementoRemovido: DoublyLinkedListElement | null } {
  if (posicao < 0 || posicao >= lista.length) throw new Error('Posi��o inv�lida');
  const novaLista = [...lista];
  const elementoRemovido = novaLista[posicao];
  novaLista.splice(posicao, 1);
  return { novaLista, elementoRemovido };
}

export function buscar(lista: DoublyLinkedListElement[], valor: number): number {
  return lista.findIndex(el => el.value === valor);
}

export function contem(lista: DoublyLinkedListElement[], valor: number): boolean {
  return lista.some(el => el.value === valor);
}

export function tamanho(lista: DoublyLinkedListElement[]): number {
  return lista.length;
}

export function estaVazia(lista: DoublyLinkedListElement[]): boolean {
  return lista.length === 0;
}

export function limpar(): DoublyLinkedListElement[] {
  return [];
}

export function obterPosicao(lista: DoublyLinkedListElement[], posicao: number): DoublyLinkedListElement | null {
  if (posicao < 0 || posicao >= lista.length) return null;
  return lista[posicao];
}

export function inverter(lista: DoublyLinkedListElement[]): DoublyLinkedListElement[] {
  return [...lista].reverse();
}

export function paraArray(lista: DoublyLinkedListElement[]): number[] {
  return lista.map(el => el.value);
}

export function clonar(lista: DoublyLinkedListElement[]): DoublyLinkedListElement[] {
  return lista.map(el => ({ ...el }));
}

export function obterCabeca(lista: DoublyLinkedListElement[]): DoublyLinkedListElement | null {
  return lista.length > 0 ? lista[0] : null;
}

export function obterCauda(lista: DoublyLinkedListElement[]): DoublyLinkedListElement | null {
  return lista.length > 0 ? lista[lista.length - 1] : null;
}

export function obterMin(lista: DoublyLinkedListElement[]): DoublyLinkedListElement | null {
  if (lista.length === 0) return null;
  return lista.reduce((min, current) => (current.value < min.value ? current : min));
}

export function obterMax(lista: DoublyLinkedListElement[]): DoublyLinkedListElement | null {
  if (lista.length === 0) return null;
  return lista.reduce((max, current) => (current.value > max.value ? current : max));
}

export function removerPorValor(lista: DoublyLinkedListElement[], valor: number): { novaLista: DoublyLinkedListElement[]; elementoRemovido: DoublyLinkedListElement | null; posicaoRemovida: number } {
  const posicao = lista.findIndex(el => el.value === valor);
  if (posicao === -1) return { novaLista: lista, elementoRemovido: null, posicaoRemovida: -1 };
  const novaLista = [...lista];
  const elementoRemovido = novaLista[posicao];
  novaLista.splice(posicao, 1);
  return { novaLista, elementoRemovido, posicaoRemovida: posicao };
}

// M�todos espec�ficos de lista dupla
export function navegarFrente(lista: DoublyLinkedListElement[], posicaoAtual: number): number {
  if (posicaoAtual < lista.length - 1) return posicaoAtual + 1;
  return posicaoAtual;
}

export function navegarTras(_lista: DoublyLinkedListElement[], posicaoAtual: number): number {
  if (posicaoAtual > 0) return posicaoAtual - 1;
  return posicaoAtual;
}

export function inserirAntes(lista: DoublyLinkedListElement[], valor: number, posicao: number, id: string): DoublyLinkedListElement[] {
  return inserirPosicao(lista, valor, posicao, id);
}

export function inserirDepois(lista: DoublyLinkedListElement[], valor: number, posicao: number, id: string): DoublyLinkedListElement[] {
  return inserirPosicao(lista, valor, posicao + 1, id);
}
