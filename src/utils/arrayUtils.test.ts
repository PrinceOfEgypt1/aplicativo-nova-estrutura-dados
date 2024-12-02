// src/utils/arrayUtils.test.ts
import * as arrayUtils from './arrayUtils';

describe('arrayUtils', () => {
  describe('inserir()', () => {
    it('adiciona um elemento no índice correto', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.inserir(arr, 1, 4);
      expect(novoArr).toEqual([1, 4, 2, 3]);
    });

    it('adiciona um elemento no início do array', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.inserir(arr, 0, 4);
      expect(novoArr).toEqual([4, 1, 2, 3]);
    });

    it('adiciona um elemento no final do array', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.inserir(arr, 3, 4);
      expect(novoArr).toEqual([1, 2, 3, 4]);
    });

    it('lança um erro se o índice for negativo', () => {
      const arr = [1, 2, 3];
      expect(() => arrayUtils.inserir(arr, -1, 4)).toThrow('Índice fora dos limites');
    });

    it('lança um erro se o índice for maior que o tamanho do array', () => {
      const arr = [1, 2, 3];
      expect(() => arrayUtils.inserir(arr, 4, 4)).toThrow('Índice fora dos limites');
    });
  });

  describe('remover()', () => {
    it('remove o elemento do índice correto', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.remover(arr, 1);
      expect(novoArr).toEqual([1, 3]);
    });

    it('remove o elemento do início do array', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.remover(arr, 0);
      expect(novoArr).toEqual([2, 3]);
    });

    it('remove o elemento do final do array', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.remover(arr, 2);
      expect(novoArr).toEqual([1, 2]);
    });

    it('lança um erro se o índice for negativo', () => {
      const arr = [1, 2, 3];
      expect(() => arrayUtils.remover(arr, -1)).toThrow('Índice fora dos limites');
    });

    it('lança um erro se o índice for maior ou igual ao tamanho do array', () => {
      const arr = [1, 2, 3];
      expect(() => arrayUtils.remover(arr, 3)).toThrow('Índice fora dos limites');
    });
  });

  // Testes para as demais funções (buscar, obter, definir, tamanho, estaVazio, limpar, ordenar, inverter, adicionarNoFinal, estender, removerDoFinal, fatiar, contem, indiceDe, validarNumeroInteiro)
  // ... (adicione testes semelhantes aos exemplos acima para cada função)
});