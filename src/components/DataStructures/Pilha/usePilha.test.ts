/**
 * Testes para o hook usePilha
 *
 * @remarks
 * Suite completa de testes para validar o comportamento do hook usePilha,
 * incluindo operações LIFO, validações, erros e histórico.
 */

import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { usePilha, OperationState } from './usePilha';
import * as validationUtils from '../../../utils/validationUtils';
import { DataStructureProvider } from '../../../context/DataStructureContext';

/**
 * Wrapper para prover contexto necessário ao hook
 */
interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <DataStructureProvider>{children}</DataStructureProvider>
);

/**
 * Helper para renderizar o hook com wrapper
 */
const renderPilhaHook = (capacidadeInicial?: number) =>
  renderHook(() => usePilha(capacidadeInicial), { wrapper: Wrapper });

describe('usePilha', () => {
  /**
   * Testes de inicialização
   */
  describe('Inicialização', () => {
    it('deve inicializar com o estado correto', () => {
      const { result } = renderPilhaHook();
      expect(result.current.elementos).toEqual([]);
      expect(result.current.indiceDestacado).toBeNull();
      expect(result.current.mensagemAcao).toBeNull();
      expect(result.current.capacidadeMaxima).toBe(20);
      expect(result.current.historico).toEqual([]);
    });

    it('deve inicializar com capacidade customizada', () => {
      const { result } = renderPilhaHook(10);
      expect(result.current.capacidadeMaxima).toBe(10);
    });
  });

  /**
   * Testes do método push
   */
  describe('push', () => {
    it('deve adicionar um elemento ao topo da pilha', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento 10 adicionado ao topo');
    });

    it('deve adicionar múltiplos elementos mantendo ordem LIFO', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('push', 20));
      await act(async () => await result.current.executarMetodo('push', 30));

      expect(result.current.elementos.length).toBe(3);
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.elementos[1].value).toBe(20);
      expect(result.current.elementos[2].value).toBe(30); // Topo
    });

    it('deve lançar erro ao exceder capacidade', async () => {
      const { result } = renderPilhaHook(2);
      await act(async () => await result.current.executarMetodo('push', 1));
      await act(async () => await result.current.executarMetodo('push', 2));

      await expect(
        act(async () => await result.current.executarMetodo('push', 3))
      ).rejects.toThrow('A pilha está cheia');
    });

    it('deve validar valores inválidos', async () => {
      const { result } = renderPilhaHook(5);

      await expect(
        act(async () => await result.current.executarMetodo('push', ''))
      ).rejects.toThrow('O valor não pode estar vazio');

      await expect(
        act(async () => await result.current.executarMetodo('push', 'abc'))
      ).rejects.toThrow('O valor deve ser um número');

      await expect(
        act(async () => await result.current.executarMetodo('push', 1.5))
      ).rejects.toThrow('O valor deve ser um número inteiro');

      await expect(
        act(async () => await result.current.executarMetodo('push', 1001))
      ).rejects.toThrow('O valor deve estar entre -1000 e 1000');

      await expect(
        act(async () => await result.current.executarMetodo('push', -1001))
      ).rejects.toThrow('O valor deve estar entre -1000 e 1000');
    });

    it('deve registrar operação push no histórico', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 42));

      expect(result.current.historico).toHaveLength(1);
      expect(result.current.historico[0].operacao).toBe('Push: 42');
      expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);
    });
  });

  /**
   * Testes do método pop
   */
  describe('pop', () => {
    it('deve remover elemento do topo', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('push', 20));

      await act(async () => await result.current.executarMetodo('pop'));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.mensagemAcao).toBe('Elemento 20 removido do topo');
    });

    it('deve lançar erro ao remover de pilha vazia', async () => {
      const { result } = renderPilhaHook(5);

      await expect(
        act(async () => await result.current.executarMetodo('pop'))
      ).rejects.toThrow('Pilha está vazia');
    });

    it('deve remover todos os elementos em ordem LIFO', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('push', 20));
      await act(async () => await result.current.executarMetodo('push', 30));

      await act(async () => await result.current.executarMetodo('pop'));
      expect(result.current.elementos[result.current.elementos.length - 1]?.value).toBe(20);

      await act(async () => await result.current.executarMetodo('pop'));
      expect(result.current.elementos[result.current.elementos.length - 1]?.value).toBe(10);

      await act(async () => await result.current.executarMetodo('pop'));
      expect(result.current.elementos.length).toBe(0);
    });

    it('deve registrar operação pop no histórico', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 42));
      await act(async () => await result.current.executarMetodo('pop'));

      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[0].operacao).toBe('Pop: 42');
    });
  });

  /**
   * Testes do método peek
   */
  describe('peek', () => {
    it('deve retornar topo sem remover', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('push', 20));

      await act(async () => await result.current.executarMetodo('peek'));

      expect(result.current.elementos.length).toBe(2);
      expect(result.current.mensagemAcao).toBe('Elemento no topo: 20');
      expect(result.current.indiceDestacado).toBe(1);
    });

    it('deve lançar erro ao fazer peek em pilha vazia', async () => {
      const { result } = renderPilhaHook(5);

      await expect(
        act(async () => await result.current.executarMetodo('peek'))
      ).rejects.toThrow('Pilha está vazia');
    });

    it('deve registrar operação peek no histórico', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 42));
      await act(async () => await result.current.executarMetodo('peek'));

      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[0].operacao).toBe('Peek');
    });
  });

  /**
   * Testes do método tamanho
   */
  describe('tamanho', () => {
    it('deve retornar tamanho correto da pilha', async () => {
      const { result } = renderPilhaHook(5);

      await act(async () => await result.current.executarMetodo('tamanho'));
      expect(result.current.mensagemAcao).toBe('Tamanho da pilha: 0');

      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('tamanho'));
      expect(result.current.mensagemAcao).toBe('Tamanho da pilha: 1');
    });

    it('deve registrar operação tamanho no histórico', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('tamanho'));

      expect(result.current.historico).toHaveLength(1);
      expect(result.current.historico[0].operacao).toBe('Tamanho consultado');
    });
  });

  /**
   * Testes do método estaVazio
   */
  describe('estaVazio', () => {
    it('deve retornar true para pilha vazia', async () => {
      const { result } = renderPilhaHook(5);

      await act(async () => await result.current.executarMetodo('estaVazio'));
      expect(result.current.mensagemAcao).toBe('A pilha está vazia');
    });

    it('deve retornar false para pilha com elementos', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));

      await act(async () => await result.current.executarMetodo('estaVazio'));
      expect(result.current.mensagemAcao).toBe('A pilha está não vazia');
    });

    it('deve registrar operação estaVazio no histórico', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('estaVazio'));

      expect(result.current.historico).toHaveLength(1);
      expect(result.current.historico[0].operacao).toBe('Verificação de vazio');
    });
  });

  /**
   * Testes do método limpar
   */
  describe('limpar', () => {
    it('deve limpar todos os elementos', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('push', 20));
      await act(async () => await result.current.executarMetodo('push', 30));

      await act(async () => await result.current.executarMetodo('limpar'));

      expect(result.current.elementos.length).toBe(0);
      expect(result.current.mensagemAcao).toBe('Pilha limpa');
    });

    it('deve registrar operação limpar no histórico', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('limpar'));

      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[0].operacao).toBe('Pilha limpa');
    });
  });

  /**
   * Testes do método contem
   */
  describe('contem', () => {
    it('deve encontrar elemento existente', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('push', 20));

      await act(async () => await result.current.executarMetodo('contem', 10));
      expect(result.current.mensagemAcao).toBe('A pilha contém o elemento 10');
      expect(result.current.indiceDestacado).toBe(0);
    });

    it('deve não encontrar elemento inexistente', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));

      await act(async () => await result.current.executarMetodo('contem', 99));
      expect(result.current.mensagemAcao).toBe('A pilha não contém o elemento 99');
      expect(result.current.indiceDestacado).toBeNull();
    });

    it('deve registrar operação contem no histórico', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('contem', 10));

      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[0].operacao).toBe('Contém: 10');
    });
  });

  /**
   * Testes do método buscar
   */
  describe('buscar', () => {
    it('deve retornar posição correta a partir do topo', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('push', 20));
      await act(async () => await result.current.executarMetodo('push', 30));

      // Elemento 10 está a 3 posições do topo (topo = 30, segundo = 20, terceiro = 10)
      await act(async () => await result.current.executarMetodo('buscar', 10));
      expect(result.current.mensagemAcao).toContain('Elemento 10 encontrado a 3 posição');
      expect(result.current.indiceDestacado).toBe(0);
    });

    it('deve retornar topo como posição 1', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('push', 20));

      await act(async () => await result.current.executarMetodo('buscar', 20));
      expect(result.current.mensagemAcao).toContain('Elemento 20 encontrado a 1 posição');
      expect(result.current.indiceDestacado).toBe(1);
    });

    it('deve retornar -1 para elemento não encontrado', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 10));

      await act(async () => await result.current.executarMetodo('buscar', 99));
      expect(result.current.mensagemAcao).toBe('Elemento 99 não encontrado');
      expect(result.current.indiceDestacado).toBeNull();
    });

    it('deve registrar operação buscar no histórico', async () => {
      const { result } = renderPilhaHook(5);
      await act(async () => await result.current.executarMetodo('push', 42));
      await act(async () => await result.current.executarMetodo('buscar', 42));

      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[0].operacao).toBe('Buscar: 42');
    });
  });

  /**
   * Testes de integração e cenários complexos
   */
  describe('Cenários complexos', () => {
    it('deve manter LIFO ao alternar push e pop', async () => {
      const { result } = renderPilhaHook(5);

      await act(async () => await result.current.executarMetodo('push', 1));
      await act(async () => await result.current.executarMetodo('push', 2));
      await act(async () => await result.current.executarMetodo('pop'));
      await act(async () => await result.current.executarMetodo('push', 3));

      expect(result.current.elementos.length).toBe(2);
      expect(result.current.elementos[0].value).toBe(1);
      expect(result.current.elementos[1].value).toBe(3); // Topo
    });

    it('deve gerenciar histórico corretamente com múltiplas operações', async () => {
      const { result } = renderPilhaHook(5);

      await act(async () => await result.current.executarMetodo('push', 1));
      await act(async () => await result.current.executarMetodo('push', 2));
      await act(async () => await result.current.executarMetodo('peek'));
      await act(async () => await result.current.executarMetodo('pop'));
      await act(async () => await result.current.executarMetodo('limpar'));

      expect(result.current.historico.length).toBeGreaterThanOrEqual(5);
    });

    it('deve permitir reutilização após limpar', async () => {
      const { result } = renderPilhaHook(5);

      await act(async () => await result.current.executarMetodo('push', 10));
      await act(async () => await result.current.executarMetodo('limpar'));
      await act(async () => await result.current.executarMetodo('push', 20));

      expect(result.current.elementos.length).toBe(1);
      expect(result.current.elementos[0].value).toBe(20);
    });

    it('deve lidar com valores negativos', async () => {
      const { result } = renderPilhaHook(5);

      await act(async () => await result.current.executarMetodo('push', -10));
      await act(async () => await result.current.executarMetodo('push', -20));

      expect(result.current.elementos[1].value).toBe(-20);
    });

    it('deve destacar índice correto após operações', async () => {
      const { result } = renderPilhaHook(5);

      await act(async () => await result.current.executarMetodo('push', 10));
      expect(result.current.indiceDestacado).toBe(0);

      await act(async () => await result.current.executarMetodo('push', 20));
      expect(result.current.indiceDestacado).toBe(1);
    });
  });

  /**
   * Testes de tratamento de erros
   */
  describe('Tratamento de erros', () => {
    it('deve registrar erro no histórico quando operação falha', async () => {
      const { result } = renderPilhaHook(5);

      try {
        await act(async () => await result.current.executarMetodo('pop'));
      } catch (error) {
        // Esperado
      }

      expect(result.current.historico[0].status).toBe(OperationState.ERROR);
    });

    it('deve lançar erro para método não implementado', async () => {
      const { result } = renderPilhaHook(5);

      await expect(
        act(async () => await result.current.executarMetodo('metodoInvalido', 10))
      ).rejects.toThrow('Método não implementado');
    });

    it('deve exibir mensagem de erro na UI', async () => {
      const { result } = renderPilhaHook(2);
      await act(async () => await result.current.executarMetodo('push', 1));
      await act(async () => await result.current.executarMetodo('push', 2));

      try {
        await act(async () => await result.current.executarMetodo('push', 3));
      } catch (error) {
        expect(result.current.mensagemAcao).toContain('Erro');
      }
    });
  });
});
