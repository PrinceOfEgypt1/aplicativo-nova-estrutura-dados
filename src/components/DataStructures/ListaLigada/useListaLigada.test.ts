/**
 * Testes para o hook useListaLigada
 *
 * @remarks
 * Suite completa de testes para validar o comportamento do hook useListaLigada,
 * incluindo operações de inserção, remoção, busca, validações, erros e histórico.
 */

import { renderHook, act } from '@testing-library/react';
import { useListaLigada, OperationState } from './useListaLigada';

/**
 * Helper para renderizar o hook
 */
const renderListaLigadaHook = () => renderHook(() => useListaLigada());

describe('useListaLigada', () => {
  /**
   * Testes de inicialização
   */
  describe('Inicialização', () => {
    it('deve inicializar com o estado correto', () => {
      const { result } = renderListaLigadaHook();
      expect(result.current.elementos).toEqual([]);
      expect(result.current.indiceDestacado).toBeNull();
      expect(result.current.mensagemAcao).toBeNull();
      expect(result.current.historico).toEqual([]);
    });
  });

  /**
   * Testes do método inserirNoInicio
   */
  describe('inserirNoInicio', () => {
    it('deve inserir um elemento no início da lista vazia', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoInicio', 10));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento 10 inserido no início da lista');
    });

    it('deve inserir múltiplos elementos no início mantendo ordem', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoInicio', 10));
      await act(async () => await result.current.executarMetodo('inserirNoInicio', 20));
      await act(async () => await result.current.executarMetodo('inserirNoInicio', 30));

      expect(result.current.elementos.length).toBe(3);
      expect(result.current.elementos[0].value).toBe(30); // Último inserido
      expect(result.current.elementos[1].value).toBe(20);
      expect(result.current.elementos[2].value).toBe(10); // Primeiro inserido
    });

    it('deve validar valores inválidos', async () => {
      const { result } = renderListaLigadaHook();

      await expect(
        act(async () => await result.current.executarMetodo('inserirNoInicio', ''))
      ).rejects.toThrow('O valor não pode estar vazio');

      await expect(
        act(async () => await result.current.executarMetodo('inserirNoInicio', 'abc'))
      ).rejects.toThrow('O valor deve ser um número');

      await expect(
        act(async () => await result.current.executarMetodo('inserirNoInicio', 1.5))
      ).rejects.toThrow('O valor deve ser um número inteiro');

      await expect(
        act(async () => await result.current.executarMetodo('inserirNoInicio', 1001))
      ).rejects.toThrow('O valor deve estar entre -1000 e 1000');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoInicio', 42));

      expect(result.current.historico.length).toBe(1);
      expect(result.current.historico[0].operacao).toBe('Inserir no início: 42');
      expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);
    });
  });

  /**
   * Testes do método inserirNoFim
   */
  describe('inserirNoFim', () => {
    it('deve inserir um elemento no final da lista vazia', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento 10 inserido no final da lista');
    });

    it('deve inserir múltiplos elementos no final mantendo ordem', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      expect(result.current.elementos.length).toBe(3);
      expect(result.current.elementos[0].value).toBe(10); // Primeiro inserido
      expect(result.current.elementos[1].value).toBe(20);
      expect(result.current.elementos[2].value).toBe(30); // Último inserido
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 42));

      expect(result.current.historico.length).toBe(1);
      expect(result.current.historico[0].operacao).toBe('Inserir no fim: 42');
    });
  });

  /**
   * Testes do método inserirNaPosicao
   */
  describe('inserirNaPosicao', () => {
    it('deve inserir elemento na posição 0 de lista vazia', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () =>
        await result.current.executarMetodo('inserirNaPosicao', { indice: 0, valor: 10 })
      );

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(10);
    });

    it('deve inserir elemento no meio da lista', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));
      await act(async () =>
        await result.current.executarMetodo('inserirNaPosicao', { indice: 1, valor: 20 })
      );

      expect(result.current.elementos.length).toBe(3);
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.elementos[1].value).toBe(20);
      expect(result.current.elementos[2].value).toBe(30);
    });

    it('deve inserir elemento no final usando tamanho como índice', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () =>
        await result.current.executarMetodo('inserirNaPosicao', { indice: 2, valor: 30 })
      );

      expect(result.current.elementos.length).toBe(3);
      expect(result.current.elementos[2].value).toBe(30);
    });

    it('deve lançar erro para índice negativo', async () => {
      const { result } = renderListaLigadaHook();

      await expect(
        act(async () =>
          await result.current.executarMetodo('inserirNaPosicao', { indice: -1, valor: 10 })
        )
      ).rejects.toThrow('Índice deve ser um número inteiro não-negativo');
    });

    it('deve lançar erro para índice maior que tamanho', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      await expect(
        act(async () =>
          await result.current.executarMetodo('inserirNaPosicao', { indice: 5, valor: 20 })
        )
      ).rejects.toThrow('fora dos limites');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () =>
        await result.current.executarMetodo('inserirNaPosicao', { indice: 0, valor: 42 })
      );

      expect(result.current.historico[0].operacao).toBe('Inserir na posição 0: 42');
    });
  });

  /**
   * Testes do método removerDoInicio
   */
  describe('removerDoInicio', () => {
    it('deve remover elemento do início da lista', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      await act(async () => await result.current.executarMetodo('removerDoInicio'));

      expect(result.current.elementos.length).toBe(2);
      expect(result.current.elementos[0].value).toBe(20);
      expect(result.current.mensagemAcao).toBe('Elemento 10 removido do início da lista');
    });

    it('deve lançar erro ao remover de lista vazia', async () => {
      const { result } = renderListaLigadaHook();

      await expect(
        act(async () => await result.current.executarMetodo('removerDoInicio'))
      ).rejects.toThrow('Lista está vazia');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoInicio', 10));
      await act(async () => await result.current.executarMetodo('removerDoInicio'));

      expect(result.current.historico.length).toBe(2);
      expect(result.current.historico[0].operacao).toBe('Remover do início: 10');
    });
  });

  /**
   * Testes do método removerDoFim
   */
  describe('removerDoFim', () => {
    it('deve remover elemento do final da lista', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      await act(async () => await result.current.executarMetodo('removerDoFim'));

      expect(result.current.elementos.length).toBe(2);
      expect(result.current.elementos[1].value).toBe(20);
      expect(result.current.mensagemAcao).toBe('Elemento 30 removido do final da lista');
    });

    it('deve lançar erro ao remover de lista vazia', async () => {
      const { result } = renderListaLigadaHook();

      await expect(
        act(async () => await result.current.executarMetodo('removerDoFim'))
      ).rejects.toThrow('Lista está vazia');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('removerDoFim'));

      expect(result.current.historico[0].operacao).toBe('Remover do fim: 10');
    });
  });

  /**
   * Testes do método removerDaPosicao
   */
  describe('removerDaPosicao', () => {
    it('deve remover elemento do início (posição 0)', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));

      await act(async () => await result.current.executarMetodo('removerDaPosicao', 0));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(20);
    });

    it('deve remover elemento do meio da lista', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      await act(async () => await result.current.executarMetodo('removerDaPosicao', 1));

      expect(result.current.elementos.length).toBe(2);
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.elementos[1].value).toBe(30);
    });

    it('deve lançar erro para índice negativo', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      await expect(
        act(async () => await result.current.executarMetodo('removerDaPosicao', -1))
      ).rejects.toThrow('Índice deve ser um número inteiro não-negativo');
    });

    it('deve lançar erro para índice fora dos limites', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      await expect(
        act(async () => await result.current.executarMetodo('removerDaPosicao', 5))
      ).rejects.toThrow('fora dos limites');
    });

    it('deve lançar erro ao remover de lista vazia', async () => {
      const { result } = renderListaLigadaHook();

      await expect(
        act(async () => await result.current.executarMetodo('removerDaPosicao', 0))
      ).rejects.toThrow('Lista está vazia');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('removerDaPosicao', 0));

      expect(result.current.historico[0].operacao).toBe('Remover da posição 0: 10');
    });
  });

  /**
   * Testes do método buscar
   */
  describe('buscar', () => {
    it('deve encontrar elemento existente e retornar seu índice', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      await act(async () => await result.current.executarMetodo('buscar', 20));

      expect(result.current.indiceDestacado).toBe(1);
      expect(result.current.mensagemAcao).toBe('Elemento 20 encontrado na posição 1');
    });

    it('deve retornar mensagem quando elemento não existe', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      await act(async () => await result.current.executarMetodo('buscar', 99));

      expect(result.current.indiceDestacado).toBeNull();
      expect(result.current.mensagemAcao).toBe('Elemento 99 não encontrado na lista');
    });

    it('deve encontrar primeiro elemento quando há duplicatas', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      await act(async () => await result.current.executarMetodo('buscar', 10));

      expect(result.current.indiceDestacado).toBe(0);
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('buscar', 10));

      expect(result.current.historico[0].operacao).toBe('Buscar: 10 (posição 0)');
    });
  });

  /**
   * Testes do método obterPorIndice
   */
  describe('obterPorIndice', () => {
    it('deve obter valor do elemento na posição especificada', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      await act(async () => await result.current.executarMetodo('obterPorIndice', 1));

      expect(result.current.indiceDestacado).toBe(1);
      expect(result.current.mensagemAcao).toBe('Elemento na posição 1: 20');
    });

    it('deve lançar erro para índice negativo', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      await expect(
        act(async () => await result.current.executarMetodo('obterPorIndice', -1))
      ).rejects.toThrow('Índice deve ser um número inteiro não-negativo');
    });

    it('deve lançar erro para índice fora dos limites', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      await expect(
        act(async () => await result.current.executarMetodo('obterPorIndice', 5))
      ).rejects.toThrow('fora dos limites');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 42));
      await act(async () => await result.current.executarMetodo('obterPorIndice', 0));

      expect(result.current.historico[0].operacao).toBe('Obter por índice: 0');
    });
  });

  /**
   * Testes do método tamanho
   */
  describe('tamanho', () => {
    it('deve retornar 0 para lista vazia', async () => {
      const { result } = renderListaLigadaHook();

      await act(async () => await result.current.executarMetodo('tamanho'));

      expect(result.current.mensagemAcao).toBe('Tamanho da lista: 0');
    });

    it('deve retornar tamanho correto após inserções', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      await act(async () => await result.current.executarMetodo('tamanho'));

      expect(result.current.mensagemAcao).toBe('Tamanho da lista: 3');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('tamanho'));

      expect(result.current.historico[0].operacao).toBe('Tamanho consultado');
    });
  });

  /**
   * Testes do método estaVazia
   */
  describe('estaVazia', () => {
    it('deve retornar true para lista vazia', async () => {
      const { result } = renderListaLigadaHook();

      await act(async () => await result.current.executarMetodo('estaVazia'));

      expect(result.current.mensagemAcao).toBe('A lista está vazia');
    });

    it('deve retornar false para lista com elementos', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      await act(async () => await result.current.executarMetodo('estaVazia'));

      expect(result.current.mensagemAcao).toBe('A lista está não vazia');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('estaVazia'));

      expect(result.current.historico[0].operacao).toBe('Verificação de vazio');
    });
  });

  /**
   * Testes do método limpar
   */
  describe('limpar', () => {
    it('deve remover todos os elementos da lista', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      await act(async () => await result.current.executarMetodo('limpar'));

      expect(result.current.elementos.length).toBe(0);
      expect(result.current.indiceDestacado).toBeNull();
      expect(result.current.mensagemAcao).toBe('Lista limpa');
    });

    it('deve funcionar em lista já vazia', async () => {
      const { result } = renderListaLigadaHook();

      await act(async () => await result.current.executarMetodo('limpar'));

      expect(result.current.elementos.length).toBe(0);
      expect(result.current.mensagemAcao).toBe('Lista limpa');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('limpar'));

      expect(result.current.historico[0].operacao).toBe('Lista limpa');
    });
  });

  /**
   * Testes do método obterCabeca
   */
  describe('obterCabeca', () => {
    it('deve retornar valor da cabeça', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));

      await act(async () => await result.current.executarMetodo('obterCabeca'));

      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Cabeça da lista: 10');
    });

    it('deve retornar null para lista vazia', async () => {
      const { result } = renderListaLigadaHook();

      await act(async () => await result.current.executarMetodo('obterCabeca'));

      expect(result.current.indiceDestacado).toBeNull();
      expect(result.current.mensagemAcao).toBe('Lista está vazia (cabeça: null)');
    });

    it('deve registrar operação no histórico', async () => {
      const { result } = renderListaLigadaHook();
      await act(async () => await result.current.executarMetodo('obterCabeca'));

      expect(result.current.historico[0].operacao).toBe('Obter cabeça');
    });
  });

  /**
   * Testes de erro e histórico
   */
  describe('Tratamento de erros', () => {
    it('deve registrar erro no histórico quando operação falha', async () => {
      const { result } = renderListaLigadaHook();

      await expect(
        act(async () => await result.current.executarMetodo('removerDoInicio'))
      ).rejects.toThrow();

      expect(result.current.historico[0].status).toBe(OperationState.ERROR);
      expect(result.current.historico[0].operacao).toContain('Erro');
    });

    it('deve atualizar mensagemAcao com mensagem de erro', async () => {
      const { result } = renderListaLigadaHook();

      await expect(
        act(async () => await result.current.executarMetodo('removerDoInicio'))
      ).rejects.toThrow();

      expect(result.current.mensagemAcao).toContain('Erro');
      expect(result.current.mensagemAcao).toContain('Lista está vazia');
    });
  });

  /**
   * Testes de histórico
   */
  describe('Histórico de operações', () => {
    it('deve limitar histórico a 50 operações', async () => {
      const { result } = renderListaLigadaHook();

      // Executar mais de 50 operações
      for (let i = 0; i < 60; i++) {
        await act(async () => await result.current.executarMetodo('inserirNoFim', i));
      }

      expect(result.current.historico.length).toBe(50);
    });

    it('deve manter ordem cronológica inversa no histórico', async () => {
      const { result } = renderListaLigadaHook();

      await act(async () => await result.current.executarMetodo('inserirNoFim', 1));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 2));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 3));

      // Mais recente primeiro
      expect(result.current.historico[0].operacao).toBe('Inserir no fim: 3');
      expect(result.current.historico[1].operacao).toBe('Inserir no fim: 2');
      expect(result.current.historico[2].operacao).toBe('Inserir no fim: 1');
    });
  });

  /**
   * Testes de métodos auxiliares
   */
  describe('Métodos auxiliares', () => {
    it('deve limpar destaque após timeout', async () => {
      jest.useFakeTimers();
      const { result } = renderListaLigadaHook();

      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));

      expect(result.current.indiceDestacado).toBe(0);

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      // O destaque deve ser limpo após 1.5s
      expect(result.current.indiceDestacado).toBeNull();

      jest.useRealTimers();
    });

    it('deve permitir definir índice destacado manualmente', () => {
      const { result } = renderListaLigadaHook();

      act(() => {
        result.current.setIndiceDestacado(2);
      });

      expect(result.current.indiceDestacado).toBe(2);
    });

    it('deve permitir definir mensagem de ação manualmente', () => {
      const { result } = renderListaLigadaHook();

      act(() => {
        result.current.setMensagemAcao('Mensagem customizada');
      });

      expect(result.current.mensagemAcao).toBe('Mensagem customizada');
    });
  });

  /**
   * Testes de cenários complexos
   */
  describe('Cenários complexos', () => {
    it('deve manter integridade após múltiplas operações mistas', async () => {
      const { result } = renderListaLigadaHook();

      // Inserir elementos
      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));
      await act(async () => await result.current.executarMetodo('inserirNoInicio', 5));

      // Remover elementos
      await act(async () => await result.current.executarMetodo('removerDoFim'));
      await act(async () => await result.current.executarMetodo('removerDaPosicao', 1));

      // Buscar
      await act(async () => await result.current.executarMetodo('buscar', 20));

      expect(result.current.elementos.length).toBe(2);
      expect(result.current.elementos[0].value).toBe(5);
      expect(result.current.elementos[1].value).toBe(20);
    });

    it('deve permitir reconstruir lista após limpar', async () => {
      const { result } = renderListaLigadaHook();

      await act(async () => await result.current.executarMetodo('inserirNoFim', 10));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 20));
      await act(async () => await result.current.executarMetodo('limpar'));
      await act(async () => await result.current.executarMetodo('inserirNoFim', 30));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(30);
    });
  });
});
