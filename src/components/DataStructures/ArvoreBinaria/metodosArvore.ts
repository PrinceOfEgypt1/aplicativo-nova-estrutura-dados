// src/components/DataStructures/ArvoreBinaria/metodosArvore.ts
import { TreeElement } from './arvore';


// 1. INSERIR - Insere elemento mantendo ordem BST
export function inserir(arvore: TreeElement[], valor: number, id: string): TreeElement[] {
  const novoElemento: TreeElement = {
    value: valor,
    id,
    level: 0,
    position: 0,
  };

  const nova = [...arvore, novoElemento];
  return recalcularPosicoes(nova);
}

// 2. REMOVER - Remove elemento
export function remover(arvore: TreeElement[], valor: number): {
  novaArvore: TreeElement[];
  elementoRemovido: TreeElement | null;
} {
  const index = arvore.findIndex(el => el.value === valor);
  if (index === -1) return { novaArvore: arvore, elementoRemovido: null };

  const elementoRemovido = arvore[index];
  const novaArvore = arvore.filter((_, i) => i !== index);

  return { novaArvore: recalcularPosicoes(novaArvore), elementoRemovido };
}

// 3. BUSCAR - Encontra elemento e retorna �ndice
export function buscar(arvore: TreeElement[], valor: number): number {
  return arvore.findIndex(el => el.value === valor);
}

// 4. CONTEM - Verifica se cont�m valor
export function contem(arvore: TreeElement[], valor: number): boolean {
  return arvore.some(el => el.value === valor);
}

// 5. MIN - Retorna menor elemento
export function obterMin(arvore: TreeElement[]): TreeElement | null {
  if (arvore.length === 0) return null;
  return arvore.reduce((min, curr) => curr.value < min.value ? curr : min);
}

// 6. MAX - Retorna maior elemento
export function obterMax(arvore: TreeElement[]): TreeElement | null {
  if (arvore.length === 0) return null;
  return arvore.reduce((max, curr) => curr.value > max.value ? curr : max);
}

// 7. ALTURA - Calcula altura da �rvore
export function altura(arvore: TreeElement[]): number {
  if (arvore.length === 0) return 0;
  return Math.max(...arvore.map(el => el.level)) + 1;
}

// 8. TAMANHO - Retorna n�mero de elementos
export function tamanho(arvore: TreeElement[]): number {
  return arvore.length;
}

// 9. ESTA_VAZIA - Verifica se est� vazia
export function estaVazia(arvore: TreeElement[]): boolean {
  return arvore.length === 0;
}

// 10. LIMPAR - Remove todos elementos
export function limpar(): TreeElement[] {
  return [];
}

// 11. IN_ORDER - Travessia em ordem (esquerda-raiz-direita)
export function inOrder(arvore: TreeElement[]): number[] {
  return [...arvore].sort((a, b) => a.value - b.value).map(el => el.value);
}

// 12. PRE_ORDER - Travessia pr�-ordem (raiz-esquerda-direita)
export function preOrder(arvore: TreeElement[]): number[] {
  if (arvore.length === 0) return [];

  const sorted = [...arvore].sort((a, b) => a.value - b.value);
  const result: number[] = [];

  function traverse(start: number, end: number) {
    if (start > end) return;
    const mid = Math.floor((start + end) / 2);
    result.push(sorted[mid].value);
    traverse(start, mid - 1);
    traverse(mid + 1, end);
  }

  traverse(0, sorted.length - 1);
  return result;
}

// 13. POST_ORDER - Travessia p�s-ordem (esquerda-direita-raiz)
export function postOrder(arvore: TreeElement[]): number[] {
  if (arvore.length === 0) return [];

  const sorted = [...arvore].sort((a, b) => a.value - b.value);
  const result: number[] = [];

  function traverse(start: number, end: number) {
    if (start > end) return;
    const mid = Math.floor((start + end) / 2);
    traverse(start, mid - 1);
    traverse(mid + 1, end);
    result.push(sorted[mid].value);
  }

  traverse(0, sorted.length - 1);
  return result;
}

// 14. BALANCEADA - Verifica se est� balanceada
export function estaBalanceada(arvore: TreeElement[]): boolean {
  if (arvore.length === 0) return true;

  const niveis = arvore.map(el => el.level);
  const minNivel = Math.min(...niveis);
  const maxNivel = Math.max(...niveis);

  return (maxNivel - minNivel) <= 1;
}

// 15. RAIZ - Retorna elemento raiz
export function obterRaiz(arvore: TreeElement[]): TreeElement | null {
  if (arvore.length === 0) return null;
  return arvore.find(el => el.level === 0) || arvore[0];
}

// 16. PARA_ARRAY - Converte para array em ordem
export function paraArray(arvore: TreeElement[]): number[] {
  return inOrder(arvore);
}

// Helper: Recalcula posi��es e n�veis dos elementos para visualiza��o balanceada
function recalcularPosicoes(arvore: TreeElement[]): TreeElement[] {
  if (arvore.length === 0) return [];

  const sorted = [...arvore].sort((a, b) => a.value - b.value);
  const resultado: TreeElement[] = [];

  function construir(start: number, end: number, nivel: number, posicao: number) {
    if (start > end) return;

    const mid = Math.floor((start + end) / 2);
    resultado.push({
      ...sorted[mid],
      level: nivel,
      position: posicao,
    });

    construir(start, mid - 1, nivel + 1, posicao * 2);
    construir(mid + 1, end, nivel + 1, posicao * 2 + 1);
  }

  construir(0, sorted.length - 1, 0, 0);
  return resultado;
}

// 17. CLONAR - Clona a �rvore
export function clonar(arvore: TreeElement[]): TreeElement[] {
  return arvore.map(el => ({ ...el }));
}
