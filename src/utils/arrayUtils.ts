// src/utils/arrayUtils.ts

export function inserir(arr: number[], indice: number, elemento: number): number[] {
    if (indice < 0 || indice > arr.length) {
      throw new Error("Índice fora dos limites");
    }
    return [...arr.slice(0, indice), elemento, ...arr.slice(indice)];
  }
  
  export function remover(arr: number[], indice: number): number[] {
    if (indice < 0 || indice >= arr.length) {
      throw new Error("Índice fora dos limites");
    }
    return [...arr.slice(0, indice), ...arr.slice(indice + 1)];
  }
  
  export function buscar(arr: number[], elemento: number): number {
    return arr.indexOf(elemento);
  }
  
  export function obter(arr: number[], indice: number): number {
    if (indice < 0 || indice >= arr.length) {
      throw new Error("Índice fora dos limites");
    }
    return arr[indice];
  }
  
  export function definir(arr: number[], indice: number, elemento: number): number[] {
    if (indice < 0 || indice >= arr.length) {
      throw new Error("Índice fora dos limites");
    }
    const novoArray = [...arr];
    novoArray[indice] = elemento;
    return novoArray;
  }
  
  
  export function tamanho(arr: number[]): number {
    return arr.length;
  }
  
  export function estaVazio(arr: number[]): boolean {
    return arr.length === 0;
  }
  
  export function limpar(capacidade: number): number[] {
    return new Array(capacidade);
  }
  
  export function ordenar(arr: number[]): number[] {
    return [...arr].sort((a, b) => a - b);
  }
  
  export function inverter(arr: number[]): number[] {
    return [...arr].reverse();
  }
  
  export function adicionarNoFinal(arr: number[], elemento: number): number[] {
    return [...arr, elemento];
  }
  
  export function estender(arr: number[], elementos: number[]): number[] {
    return [...arr, ...elementos];
  }
  
  export function removerDoFinal(arr: number[]): number[] {
    if (estaVazio(arr)) {
      throw new Error("Vetor está vazio");
    }
    return arr.slice(0, -1);
  }
  
  export function fatiar(arr: number[], inicio: number, fim?: number): number[] {
      if (inicio < 0 || inicio >= arr.length) {
        throw new Error("Índice inicial fora dos limites");
      }
      const fimEfetivo = fim === undefined ? arr.length : fim;
      if (fimEfetivo < inicio || fimEfetivo > arr.length) {
        throw new Error("Índice final inválido");
      }
      return arr.slice(inicio, fimEfetivo);
  }
  
  export function contem(arr: number[], elemento: number): boolean {
    return arr.includes(elemento);
  }
  
  export function indiceDe(arr: number[], elemento: number): number {
    return arr.indexOf(elemento);
  }
  
  
  export function validarNumeroInteiro(valor: number): void {
      if (!Number.isInteger(valor)) {
        throw new Error("Apenas números inteiros são permitidos");
      }
      if (valor < -1000 || valor > 1000) {
        throw new Error("O valor deve estar entre -1000 e 1000");
      }
  }