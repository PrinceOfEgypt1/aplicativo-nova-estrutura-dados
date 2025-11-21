/**
 * Testes para o hook useFila
 *
 * @remarks
 * Suite completa de testes para validar o comportamento do hook useFila,
 * incluindo opera��es FIFO, valida��es, erros e hist�rico.
 */

import { renderHook, act } from '@testing-library/react';
import { useFila, OperationState } from './useFila';

/**
 * Helper para renderizar o hook
 */
const renderFilaHook = (capacidadeInicial?: number) =>
  renderHook(() => useFila(capacidadeInicial));

describe('useFila', () => {
  /**
   * Testes de inicializa��o
   */
  describe('Inicializa��o', () => {
    it('deve inicializar com o estado correto', () => {
      const { result } = renderFilaHook();
      expect(result.current.elementos).toEqual([]);
      expect(result.current.indiceDestacado).toBeNull();
      expect(result.current.mensagemAcao).toBeNull();
      expect(result.current.capacidadeMaxima).toBe(20);
      expect(result.current.historico).toEqual([]);
    });

    it('deve inicializar com capacidade customizada', () => {
      const { result } = renderFilaHook(10);
      expect(result.current.capacidadeMaxima).toBe(10);
    });
  });

  /**
   * Testes do m�todo enqueue
   */
  describe('enqueue', () => {
    it('deve adicionar um elemento ao final da fila', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento 10 adicionado ao final da fila');
    });

    it('deve adicionar m�ltiplos elementos mantendo ordem FIFO', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));
      await act(async () => await result.current.executarMetodo('enqueue', 30));

      expect(result.current.elementos.length).toBe(3);
      expect(result.current.elementos[0].value).toBe(10); // Frente
      expect(result.current.elementos[1].value).toBe(20);
      expect(result.current.elementos[2].value).toBe(30); // Final
    });

    it('deve lan�ar erro ao exceder capacidade', async () => {
      const { result } = renderFilaHook(2);
      await act(async () => await result.current.executarMetodo('enqueue', 1));
      await act(async () => await result.current.executarMetodo('enqueue', 2));

      await expect(
        act(async () => await result.current.executarMetodo('enqueue', 3))
      ).rejects.toThrow('A fila est� cheia');
    });

    it('deve validar valores inv�lidos', async () => {
      const { result } = renderFilaHook(5);

      await expect(
        act(async () => await result.current.executarMetodo('enqueue', ''))
      ).rejects.toThrow('O valor n�o pode estar vazio');

      await expect(
        act(async () => await result.current.executarMetodo('enqueue', 'abc'))
      ).rejects.toThrow('O valor deve ser um n�mero');

      await expect(
        act(async () => await result.current.executarMetodo('enqueue', 1.5))
      ).rejects.toThrow('O valor deve ser um n�mero inteiro');

      await expect(
        act(async () => await result.current.executarMetodo('enqueue', 1001))
      ).rejects.toThrow('O valor deve estar entre -1000 e 1000');

      await expect(
        act(async () => await result.current.executarMetodo('enqueue', -1001))
      ).rejects.toThrow('O valor deve estar entre -1000 e 1000');
    });

    it('deve registrar opera��o enqueue no hist�rico', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 42));

      expect(result.current.historico).toHaveLength(1);
      expect(result.current.historico[0].operacao).toBe('Enqueue: 42');
      expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);
    });
  });

  /**
   * Testes do m�todo dequeue
   */
  describe('dequeue', () => {
    it('deve remover elemento da frente', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));

      await act(async () => await result.current.executarMetodo('dequeue'));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(20);
      expect(result.current.mensagemAcao).toBe('Elemento 10 removido da frente da fila');
    });

    it('deve lan�ar erro ao remover de fila vazia', async () => {
      const { result } = renderFilaHook(5);

      await expect(
        act(async () => await result.current.executarMetodo('dequeue'))
      ).rejects.toThrow('Fila est� vazia');
    });

    it('deve remover todos os elementos em ordem FIFO', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));
      await act(async () => await result.current.executarMetodo('enqueue', 30));

      await act(async () => await result.current.executarMetodo('dequeue'));
      expect(result.current.elementos[0].value).toBe(20);

      await act(async () => await result.current.executarMetodo('dequeue'));
      expect(result.current.elementos[0].value).toBe(30);

      await act(async () => await result.current.executarMetodo('dequeue'));
      expect(result.current.elementos.length).toBe(0);
    });

    it('deve registrar opera��o dequeue no hist�rico', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 42));
      await act(async () => await result.current.executarMetodo('dequeue'));

      const dequeueOp = result.current.historico.find((op) => op.operacao.includes('Dequeue'));
      expect(dequeueOp).toBeDefined();
      expect(dequeueOp?.operacao).toBe('Dequeue: 42');
    });
  });

  /**
   * Testes do m�todo primeiro
   */
  describe('primeiro', () => {
    it('deve retornar o primeiro elemento sem remov�-lo', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));

      await act(async () => await result.current.executarMetodo('primeiro'));

      expect(result.current.elementos.length).toBe(2);
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento na frente: 10');
    });

    it('deve lan�ar erro em fila vazia', async () => {
      const { result } = renderFilaHook(5);

      await expect(
        act(async () => await result.current.executarMetodo('primeiro'))
      ).rejects.toThrow('Fila est� vazia');
    });
  });

  /**
   * Testes do m�todo ultimo
   */
  describe('ultimo', () => {
    it('deve retornar o �ltimo elemento sem remov�-lo', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));

      await act(async () => await result.current.executarMetodo('ultimo'));

      expect(result.current.elementos.length).toBe(2);
      expect(result.current.indiceDestacado).toBe(1);
      expect(result.current.mensagemAcao).toBe('Elemento no final: 20');
    });

    it('deve lan�ar erro em fila vazia', async () => {
      const { result } = renderFilaHook(5);

      await expect(
        act(async () => await result.current.executarMetodo('ultimo'))
      ).rejects.toThrow('Fila est� vazia');
    });

    it('deve retornar o mesmo elemento quando h� apenas um', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 42));

      await act(async () => await result.current.executarMetodo('ultimo'));

      expect(result.current.mensagemAcao).toBe('Elemento no final: 42');
      expect(result.current.indiceDestacado).toBe(0);
    });
  });

  /**
   * Testes do m�todo tamanho
   */
  describe('tamanho', () => {
    it('deve retornar 0 para fila vazia', async () => {
      const { result } = renderFilaHook(5);

      await act(async () => await result.current.executarMetodo('tamanho'));

      expect(result.current.mensagemAcao).toBe('Tamanho da fila: 0');
    });

    it('deve retornar o tamanho correto', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));
      await act(async () => await result.current.executarMetodo('enqueue', 30));

      await act(async () => await result.current.executarMetodo('tamanho'));

      expect(result.current.mensagemAcao).toBe('Tamanho da fila: 3');
    });
  });

  /**
   * Testes do m�todo estaVazio
   */
  describe('estaVazio', () => {
    it('deve retornar true para fila vazia', async () => {
      const { result } = renderFilaHook(5);

      await act(async () => await result.current.executarMetodo('estaVazio'));

      expect(result.current.mensagemAcao).toBe('A fila est� vazia');
    });

    it('deve retornar false para fila com elementos', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));

      await act(async () => await result.current.executarMetodo('estaVazio'));

      expect(result.current.mensagemAcao).toBe('A fila est� n�o vazia');
    });
  });

  /**
   * Testes do m�todo limpar
   */
  describe('limpar', () => {
    it('deve limpar todos os elementos', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));
      await act(async () => await result.current.executarMetodo('enqueue', 30));

      await act(async () => await result.current.executarMetodo('limpar'));

      expect(result.current.elementos.length).toBe(0);
      expect(result.current.mensagemAcao).toBe('Fila limpa');
    });

    it('deve limpar fila vazia sem erro', async () => {
      const { result } = renderFilaHook(5);

      await act(async () => await result.current.executarMetodo('limpar'));

      expect(result.current.elementos.length).toBe(0);
      expect(result.current.mensagemAcao).toBe('Fila limpa');
    });
  });

  /**
   * Testes do m�todo contem
   */
  describe('contem', () => {
    it('deve retornar true quando o elemento existe', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));
      await act(async () => await result.current.executarMetodo('enqueue', 30));

      await act(async () => await result.current.executarMetodo('contem', 20));

      expect(result.current.mensagemAcao).toBe('A fila cont�m o elemento 20');
      expect(result.current.indiceDestacado).toBe(1);
    });

    it('deve retornar false quando o elemento n�o existe', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));

      await act(async () => await result.current.executarMetodo('contem', 99));

      expect(result.current.mensagemAcao).toBe('A fila n�o cont�m o elemento 99');
      expect(result.current.indiceDestacado).toBeNull();
    });

    it('deve destacar o primeiro elemento encontrado', async () => {
      const { result } = renderFilaHook(5);
      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));
      await act(async () => await result.current.executarMetodo('enqueue', 10)); // Duplicado

      await act(async () => await result.current.executarMetodo('contem', 10));

      expect(result.current.indiceDestacado).toBe(0); // Primeira ocorr�ncia
    });
  });

  /**
   * Testes de integra��o e cen�rios complexos
   */
  describe('Cen�rios complexos', () => {
    it('deve processar uma sequ�ncia de opera��es mistas', async () => {
      const { result } = renderFilaHook(10);

      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));
      await act(async () => await result.current.executarMetodo('enqueue', 30));
      expect(result.current.elementos.length).toBe(3);

      await act(async () => await result.current.executarMetodo('dequeue'));
      expect(result.current.elementos.length).toBe(2);
      expect(result.current.elementos[0].value).toBe(20);

      await act(async () => await result.current.executarMetodo('enqueue', 40));
      expect(result.current.elementos.length).toBe(3);

      await act(async () => await result.current.executarMetodo('primeiro'));
      expect(result.current.mensagemAcao).toBe('Elemento na frente: 20');

      await act(async () => await result.current.executarMetodo('ultimo'));
      expect(result.current.mensagemAcao).toBe('Elemento no final: 40');
    });

    it('deve manter comportamento FIFO ap�s m�ltiplas opera��es', async () => {
      const { result } = renderFilaHook(5);

      // Adiciona 3 elementos
      await act(async () => await result.current.executarMetodo('enqueue', 1));
      await act(async () => await result.current.executarMetodo('enqueue', 2));
      await act(async () => await result.current.executarMetodo('enqueue', 3));

      // Remove 2
      await act(async () => await result.current.executarMetodo('dequeue'));
      await act(async () => await result.current.executarMetodo('dequeue'));

      // Adiciona mais 2
      await act(async () => await result.current.executarMetodo('enqueue', 4));
      await act(async () => await result.current.executarMetodo('enqueue', 5));

      // Verifica ordem FIFO
      expect(result.current.elementos[0].value).toBe(3);
      expect(result.current.elementos[1].value).toBe(4);
      expect(result.current.elementos[2].value).toBe(5);
    });

    it('deve tratar valores negativos corretamente', async () => {
      const { result } = renderFilaHook(5);

      await act(async () => await result.current.executarMetodo('enqueue', -100));
      await act(async () => await result.current.executarMetodo('enqueue', -50));
      await act(async () => await result.current.executarMetodo('enqueue', 0));

      expect(result.current.elementos[0].value).toBe(-100);
      expect(result.current.elementos[1].value).toBe(-50);
      expect(result.current.elementos[2].value).toBe(0);
    });
  });

  /**
   * Testes de hist�rico
   */
  describe('Hist�rico de opera��es', () => {
    it('deve registrar todas as opera��es no hist�rico', async () => {
      const { result } = renderFilaHook(5);

      await act(async () => await result.current.executarMetodo('enqueue', 10));
      await act(async () => await result.current.executarMetodo('enqueue', 20));
      await act(async () => await result.current.executarMetodo('dequeue'));

      expect(result.current.historico.length).toBeGreaterThanOrEqual(3);
    });

    it('deve registrar erros no hist�rico', async () => {
      const { result } = renderFilaHook(5);

      try {
        await act(async () => await result.current.executarMetodo('dequeue'));
      } catch (e) {
        // Erro esperado
      }

      const erroOp = result.current.historico.find((op) => op.status === OperationState.ERROR);
      expect(erroOp).toBeDefined();
    });
  });
});
