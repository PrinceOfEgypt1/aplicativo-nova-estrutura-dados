/**
 * Testes para a classe ArvoreBinaria
 */

import { ArvoreBinaria } from './arvore';

describe('ArvoreBinaria', () => {
  let arvore: ArvoreBinaria;

  beforeEach(() => {
    arvore = new ArvoreBinaria();
  });

  describe('Inicializacao', () => {
    it('deve inicializar arvore vazia', () => {
      expect(arvore.estaVazio()).toBe(true);
      expect(arvore.tamanho()).toBe(0);
      expect(arvore.altura()).toBe(0);
    });
  });

  describe('inserir', () => {
    it('deve inserir elemento na arvore vazia', () => {
      arvore.inserir(50);
      expect(arvore.tamanho()).toBe(1);
      expect(arvore.buscar(50)).toBe(true);
    });

    it('deve inserir multiplos elementos', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(70);
      expect(arvore.tamanho()).toBe(3);
    });

    it('deve lancar erro para valor duplicado', () => {
      arvore.inserir(50);
      expect(() => arvore.inserir(50)).toThrow('O valor 50 já existe na árvore');
    });

    it('deve validar valores invalidos', () => {
      expect(() => arvore.inserir(1.5)).toThrow('Apenas números inteiros são permitidos');
      expect(() => arvore.inserir(1001)).toThrow('O valor deve estar entre -1000 e 1000');
    });
  });

  describe('buscar', () => {
    it('deve encontrar elemento existente', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      expect(arvore.buscar(30)).toBe(true);
    });

    it('deve retornar false para inexistente', () => {
      arvore.inserir(50);
      expect(arvore.buscar(30)).toBe(false);
    });
  });

  describe('remover', () => {
    it('deve remover no folha', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(70);
      arvore.remover(30);
      expect(arvore.tamanho()).toBe(2);
      expect(arvore.buscar(30)).toBe(false);
    });

    it('deve remover no com um filho', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(20);
      arvore.remover(30);
      expect(arvore.tamanho()).toBe(2);
      expect(arvore.buscar(20)).toBe(true);
    });

    it('deve remover no com dois filhos', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(70);
      arvore.inserir(20);
      arvore.inserir(40);
      arvore.remover(30);
      expect(arvore.tamanho()).toBe(4);
    });

    it('deve lancar erro para valor inexistente', () => {
      arvore.inserir(50);
      expect(() => arvore.remover(30)).toThrow('O valor 30 não existe na árvore');
    });
  });

  describe('min e max', () => {
    it('deve retornar menor valor', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(70);
      arvore.inserir(20);
      expect(arvore.min()).toBe(20);
    });

    it('deve retornar maior valor', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(70);
      arvore.inserir(80);
      expect(arvore.max()).toBe(80);
    });

    it('deve lancar erro em arvore vazia', () => {
      expect(() => arvore.min()).toThrow('Árvore está vazia');
      expect(() => arvore.max()).toThrow('Árvore está vazia');
    });
  });

  describe('altura', () => {
    it('deve retornar 0 para arvore vazia', () => {
      expect(arvore.altura()).toBe(0);
    });

    it('deve calcular altura corretamente', () => {
      arvore.inserir(50);
      expect(arvore.altura()).toBe(1);
      arvore.inserir(30);
      arvore.inserir(70);
      expect(arvore.altura()).toBe(2);
    });
  });

  describe('tamanho', () => {
    it('deve contar todos os nos', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(70);
      expect(arvore.tamanho()).toBe(3);
    });
  });

  describe('limpar', () => {
    it('deve remover todos os nos', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.limpar();
      expect(arvore.estaVazio()).toBe(true);
      expect(arvore.tamanho()).toBe(0);
    });
  });

  describe('Travessias', () => {
    beforeEach(() => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(70);
      arvore.inserir(20);
      arvore.inserir(40);
    });

    it('emOrdem deve retornar valores ordenados', () => {
      expect(arvore.emOrdem()).toEqual([20, 30, 40, 50, 70]);
    });

    it('preOrdem deve visitar raiz primeiro', () => {
      expect(arvore.preOrdem()).toEqual([50, 30, 20, 40, 70]);
    });

    it('posOrdem deve visitar raiz por ultimo', () => {
      expect(arvore.posOrdem()).toEqual([20, 40, 30, 70, 50]);
    });

    it('emNivel deve visitar por nivel', () => {
      expect(arvore.emNivel()).toEqual([50, 30, 70, 20, 40]);
    });
  });
});
