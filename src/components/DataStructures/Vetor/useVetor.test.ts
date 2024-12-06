// src/components/DataStructures/Vetor/useVetor.test.ts
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { useVetor, OperationState } from './useVetor';
import * as validationUtils from '../../../utils/validationUtils';
import { DataStructureProvider } from '../../../context/DataStructureContext'; // Import DataStructureProvider

// Define a interface para as props do Wrapper
interface WrapperProps {
  children: ReactNode;
}

// Função Wrapper corrigida:
const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <DataStructureProvider>{children}</DataStructureProvider>
);

const renderVetorHook = (capacidadeInicial?: number) =>
  renderHook(() => useVetor(capacidadeInicial), { wrapper: Wrapper });

describe('useVetor', () => {
    it('deve inicializar com o estado correto', () => {
        const { result } = renderVetorHook();
        expect(result.current.elementos).toEqual([]);
        expect(result.current.indiceDestacado).toBeNull();
        expect(result.current.mensagemAcao).toBeNull();
        expect(result.current.capacidadeMaxima).toBe(20);
        expect(result.current.historico).toEqual([]);
      });

      describe('inserir', () => {
        it('deve inserir um elemento no índice especificado', async () => {
            const { result } = renderVetorHook(5);
            await act(async () => await result.current.executarMetodo('inserir', 10, 0));
            expect(result.current.elementos[0].value).toBe(10);
            expect(result.current.indiceDestacado).toBe(0);
            expect(result.current.mensagemAcao).toBe('Elemento 10 inserido na posição 0');
          });
      
        it('deve inserir um elemento no final do array', async () => {
            const { result } = renderVetorHook(5);
            await act(async () => await result.current.executarMetodo('inserir', 1, 0));
            await act(async () => await result.current.executarMetodo('inserir', 2, 1));
            expect(result.current.elementos.length).toBe(2);
            expect(result.current.elementos[1].value).toBe(2);
            expect(result.current.mensagemAcao).toBe('Elemento 2 inserido na posição 1');
          });
      
        it('deve lançar um erro se o índice for negativo', async () => {
            const { result } = renderVetorHook(5);
            await expect(act(async () => await result.current.executarMetodo('inserir', 10, -1))).rejects.toThrow('Índice inválido');
          });
      
        it('deve lançar um erro se o índice for maior que o tamanho do array', async () => {
            const { result } = renderVetorHook(5);
            await act(async () => await result.current.executarMetodo('inserir', 1, 0));
            await expect(act(async () => await result.current.executarMetodo('inserir', 2, 2))).rejects.toThrow('Índice com lacuna');
          });
      
        it('deve lançar um erro se a capacidade for excedida', async () => {
            const { result } = renderVetorHook(2);
            await act(async () => await result.current.executarMetodo('inserir', 1, 0));
            await act(async () => await result.current.executarMetodo('inserir', 2, 1));
            await expect(act(async () => await result.current.executarMetodo('inserir', 3, 2))).rejects.toThrow('O vetor já está cheio');
          });
      
        it('deve disparar mensagem de erro para valores inválidos', async () => {
            const { result } = renderVetorHook(5);
            await expect(act(async () => await result.current.executarMetodo('inserir', '', 0))).rejects.toThrow('O valor não pode estar vazio');
            await expect(act(async () => await result.current.executarMetodo('inserir', 'abc', 0))).rejects.toThrow('O valor deve ser um número');
            await expect(act(async () => await result.current.executarMetodo('inserir', 1.5, 0))).rejects.toThrow('O valor deve ser um número inteiro');
            await expect(act(async () => await result.current.executarMetodo('inserir', 1001, 0))).rejects.toThrow('O valor deve estar entre -1000 e 1000');
            await expect(act(async () => await result.current.executarMetodo('inserir', -1001, 0))).rejects.toThrow('O valor deve estar entre -1000 e 1000');
          });
      
        it('deve registrar a operação no histórico', async () => {
            const { result } = renderVetorHook(5);
            await act(async () => await result.current.executarMetodo('inserir', 10, 0));
            expect(result.current.historico).toHaveLength(1);
            expect(result.current.historico[0].operacao).toBe('Elemento 10 inserido na posição 0');
            expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);
          });
      });

  describe('remover', () => {
    it('deve remover um elemento do vetor', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('remover', undefined, 0));
      expect(result.current.elementos).toEqual([]);
      expect(result.current.mensagemAcao).toBe('Elemento removido da posição 0');
    });

    it('deve lançar um erro se o índice for negativo', () => {
      const { result } = renderVetorHook(5);
      expect(() => act(() => result.current.executarMetodo('remover', undefined, -1))).toThrow('Índice inválido');
    });

    it('deve lançar um erro se o índice for maior ou igual ao tamanho do array', () => {
      const { result } = renderVetorHook(5);
      expect(() => act(() => result.current.executarMetodo('remover', undefined, 1))).toThrow('Índice fora dos limites');
    });

    it('deve registrar a operação no histórico', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('remover', undefined, 0));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('Elemento removido da posição 0');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('buscar', () => {
    it('deve encontrar um elemento existente', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('buscar', 10));
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento 10 encontrado na posição 0');
    });

    it('deve retornar -1 para elemento inexistente', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('buscar', 5));
      expect(result.current.indiceDestacado).toBe(-1);
      expect(result.current.mensagemAcao).toBe('Elemento 5 não encontrado');
    });

    it('deve disparar mensagem de erro para valores inválidos', () => {
      const { result } = renderVetorHook(5);
      expect(() => act(() => result.current.executarMetodo('buscar', ''))).toThrow('O valor não pode estar vazio');
      expect(() => act(() => result.current.executarMetodo('buscar', 'abc'))).toThrow('O valor deve ser um número');
      expect(() => act(() => result.current.executarMetodo('buscar', 1.5))).toThrow('O valor deve ser um número inteiro');
      expect(() => act(() => result.current.executarMetodo('buscar', 1001))).toThrow('O valor deve estar entre -1000 e 1000');
      expect(() => act(() => result.current.executarMetodo('buscar', -1001))).toThrow('O valor deve estar entre -1000 e 1000');
    });

    it('deve registrar a operação no histórico', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('buscar', 10));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('Elemento 10 encontrado na posição 0');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('obterElemento', () => {
    it('deve retornar o elemento no índice correto', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('obterElemento', 0));
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento na posição 0: 10');
    });

    it('deve lançar um erro se o indice for inválido', () => {
      const { result } = renderVetorHook(5);
      expect(() => act(() => result.current.executarMetodo('obterElemento', -1))).toThrow('Índice inválido');
      expect(() => act(() => result.current.executarMetodo('obterElemento', 5))).toThrow('Índice fora dos limites');
    });

    it('deve registrar a operação no histórico', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('obterElemento', 0));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('Elemento na posição 0: 10');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('definirElemento', () => {
    it('deve definir o elemento no índice correto', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('definirElemento', 20, 0));
      expect(result.current.elementos[0].value).toBe(20);
      expect(result.current.mensagemAcao).toBe('Elemento 20 definido na posição 0');
    });

    it('deve lançar um erro se o indice for inválido', () => {
      const { result } = renderVetorHook(5);
      expect(() => act(() => result.current.executarMetodo('definirElemento', 10, -1))).toThrow('Índice inválido');
      expect(() => act(() => result.current.executarMetodo('definirElemento', 10, 5))).toThrow('Índice fora dos limites');
    });

    it('deve disparar mensagem de erro para valores inválidos', () => {
      const { result } = renderVetorHook(5);
      expect(() => act(() => result.current.executarMetodo('definirElemento', '', 0))).toThrow('O valor não pode estar vazio');
      expect(() => act(() => result.current.executarMetodo('definirElemento', 'abc', 0))).toThrow('O valor deve ser um número');
      expect(() => act(() => result.current.executarMetodo('definirElemento', 1.5, 0))).toThrow('O valor deve ser um número inteiro');
      expect(() => act(() => result.current.executarMetodo('definirElemento', 1001, 0))).toThrow('O valor deve estar entre -1000 e 1000');
      expect(() => act(() => result.current.executarMetodo('definirElemento', -1001, 0))).toThrow('O valor deve estar entre -1000 e 1000');
    });

    it('deve registrar a operação no histórico', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('definirElemento', 20, 0));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('Elemento 20 definido na posição 0');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('tamanho', () => {
    it('deve retornar o tamanho correto do vetor', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('tamanho'));
      expect(result.current.mensagemAcao).toBe('Tamanho do vetor: 1');
    });
    
    it('deve registrar a operação no histórico', () => {
      const { result } = renderVetorHook(5);
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('tamanho'));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('Tamanho do vetor: 1');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });
  describe('estaVazio', () => {
    it('deve retornar true se o vetor estiver vazio', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('estaVazio'));
      expect(result.current.mensagemAcao).toBe('O vetor está vazio');
    });

    it('deve retornar false se o vetor não estiver vazio', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('estaVazio'));
      expect(result.current.mensagemAcao).toBe('O vetor está não vazio');
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('estaVazio'));
      expect(result.current.historico).toHaveLength(1);
      expect(result.current.historico[0].operacao).toBe('O vetor está vazio');
      expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('limpar', () => {
    it('deve limpar o vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('limpar'));
      expect(result.current.elementos).toEqual([]);
      expect(result.current.mensagemAcao).toBe('Vetor limpo');
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('limpar'));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('Vetor limpo');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('ordenar', () => {
    it('deve ordenar o vetor em ordem crescente', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 3, 0));
      act(() => result.current.executarMetodo('inserir', 1, 1));
      act(() => result.current.executarMetodo('ordenar'));
      expect(result.current.elementos.map(e => e.value)).toEqual([1, 3]);
      expect(result.current.mensagemAcao).toBe('Vetor Ordenado');
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 3, 0));
      act(() => result.current.executarMetodo('inserir', 1, 1));
      act(() => result.current.executarMetodo('ordenar'));
      expect(result.current.historico).toHaveLength(3);
      expect(result.current.historico[2].operacao).toBe('Vetor Ordenado');
      expect(result.current.historico[2].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('inverter', () => {
    it('deve inverter o vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('inserir', 2, 1));
      act(() => result.current.executarMetodo('inverter'));
      expect(result.current.elementos.map(e => e.value)).toEqual([2, 1]);
      expect(result.current.mensagemAcao).toBe('Vetor Invertido');
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('inserir', 2, 1));
      act(() => result.current.executarMetodo('inverter'));
      expect(result.current.historico).toHaveLength(3);
      expect(result.current.historico[2].operacao).toBe('Vetor Invertido');
      expect(result.current.historico[2].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('adicionarNoFinal', () => {
    it('deve adicionar um elemento no final do vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('adicionarNoFinal', 10));
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento 10 adicionado ao final');
    });
    it('deve disparar mensagem de erro para valores inválidos', () => {
      const { result } = renderHook(() => useVetor(5));
      expect(() => act(() => result.current.executarMetodo('adicionarNoFinal', ''))).toThrow('O valor não pode estar vazio');
      expect(() => act(() => result.current.executarMetodo('adicionarNoFinal', 'abc'))).toThrow('O valor deve ser um número');
      expect(() => act(() => result.current.executarMetodo('adicionarNoFinal', 1.5))).toThrow('O valor deve ser um número inteiro');
      expect(() => act(() => result.current.executarMetodo('adicionarNoFinal', 1001))).toThrow('O valor deve estar entre -1000 e 1000');
      expect(() => act(() => result.current.executarMetodo('adicionarNoFinal', -1001))).toThrow('O valor deve estar entre -1000 e 1000');
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('adicionarNoFinal', 10));
      expect(result.current.historico).toHaveLength(1);
      expect(result.current.historico[0].operacao).toBe('Elemento 10 adicionado ao final');
      expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);
    });
    it('deve lançar erro ao adicionar no final quando capacidade é excedida', () => {
      const { result } = renderHook(() => useVetor(1));
      act(() => result.current.executarMetodo('adicionarNoFinal', 10));
      expect(() => act(() => result.current.executarMetodo('adicionarNoFinal', 20))).toThrow('O vetor já está cheio');
    });
  });

  describe('estender', () => {
    it('deve estender o vetor com multiplos elementos', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('estender', '1, 2, 3'));
      expect(result.current.elementos.map(e => e.value)).toEqual([1, 2, 3]);
      expect(result.current.mensagemAcao).toBe('Elementos adicionados');
    });
    it('deve disparar mensagem de erro para valores inválidos', () => {
      const { result } = renderHook(() => useVetor(5));
      expect(() => act(() => result.current.executarMetodo('estender', '1, abc, 3'))).toThrowError();
      expect(() => act(() => result.current.executarMetodo('estender', '1, 1.5, 3'))).toThrowError();
      expect(() => act(() => result.current.executarMetodo('estender', '1, 1001, 3'))).toThrowError();
      expect(() => act(() => result.current.executarMetodo('estender', '1,-1001, 3'))).toThrowError();
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('estender', '1, 2, 3'));
      expect(result.current.historico).toHaveLength(1);
      expect(result.current.historico[0].operacao).toBe('Elementos adicionados');
      expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);
    });
    it('deve lançar erro ao estender o vetor além da capacidade', () => {
      const { result } = renderHook(() => useVetor(2));
      expect(() => act(() => result.current.executarMetodo('estender', '1,2,3'))).toThrow(
        'A capacidade do vetor seria excedida. Tamanho atual: 0, capacidade máxima: 2, valores para inserir: 3'
      );
    });
  });

  describe('removerDoFinal', () => {
    it('deve remover o último elemento do vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('removerDoFinal'));
      expect(result.current.elementos).toEqual([]);
      expect(result.current.mensagemAcao).toBe('Elemento removido do final');
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('removerDoFinal'));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('Elemento removido do final');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('fatiar', () => {
    it('deve retornar uma fatia do vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('inserir', 2, 1));
      act(() => result.current.executarMetodo('inserir', 3, 2));
      act(() => result.current.executarMetodo('fatiar', 0, 2));
      expect(result.current.elementos.map(e => e.value)).toEqual([1, 2]);
    });
    it('deve disparar um erro se os índices forem inválidos', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('inserir', 2, 1));
      act(() => result.current.executarMetodo('inserir', 3, 2));
      expect(() => act(() => result.current.executarMetodo('fatiar', -1, 2))).toThrowError();
      expect(() => act(() => result.current.executarMetodo('fatiar', 0, 5))).toThrowError();
      expect(() => act(() => result.current.executarMetodo('fatiar', 2, 0))).toThrowError();
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('inserir', 2, 1));
      act(() => result.current.executarMetodo('inserir', 3, 2));
      act(() => result.current.executarMetodo('fatiar', 0, 2));
      expect(result.current.historico).toHaveLength(4);
      expect(result.current.historico[3].operacao).toBe('Fatiar: 1,2');
      expect(result.current.historico[3].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('contem', () => {
    it('deve retornar true se o vetor contiver o elemento', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('contem', 10));
      expect(result.current.mensagemAcao).toBe('O vetor contém o elemento 10');
    });
    it('deve retornar false se o vetor não contiver o elemento', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('contem', 5));
      expect(result.current.mensagemAcao).toBe('O vetor não contém o elemento 5');
    });
    it('deve disparar mensagem de erro para valores inválidos', () => {
      const { result } = renderHook(() => useVetor(5));
      expect(() => act(() => result.current.executarMetodo('contem', ''))).toThrow('O valor não pode estar vazio');
      expect(() => act(() => result.current.executarMetodo('contem', 'abc'))).toThrow('O valor deve ser um número');
      expect(() => act(() => result.current.executarMetodo('contem', 1.5))).toThrow('O valor deve ser um número inteiro');
      expect(() => act(() => result.current.executarMetodo('contem', 1001))).toThrow('O valor deve estar entre -1000 e 1000');
      expect(() => act(() => result.current.executarMetodo('contem', -1001))).toThrow('O valor deve estar entre -1000 e 1000');
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('contem', 10));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('O vetor contém o elemento 10');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('indiceDe', () => {
    it('deve retornar o índice do elemento se encontrado', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('indiceDe', 10));
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Índice de 10: 0');
    });
    it('deve retornar -1 se o elemento não for encontrado', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('indiceDe', 5));
      expect(result.current.indiceDestacado).toBe(-1);
      expect(result.current.mensagemAcao).toBe('Índice de 5: -1');
    });
    it('deve disparar mensagem de erro para valores inválidos', () => {
      const { result } = renderHook(() => useVetor(5));
      expect(() => act(() => result.current.executarMetodo('indiceDe', ''))).toThrow('O valor não pode estar vazio');
      expect(() => act(() => result.current.executarMetodo('indiceDe', 'abc'))).toThrow('O valor deve ser um número');
      expect(() => act(() => result.current.executarMetodo('indiceDe', 1.5))).toThrow('O valor deve ser um número inteiro');
      expect(() => act(() => result.current.executarMetodo('indiceDe', 1001))).toThrow('O valor deve estar entre -1000 e 1000');
      expect(() => act(() => result.current.executarMetodo('indiceDe', -1001))).toThrow('O valor deve estar entre -1000 e 1000');
    });
    it('deve registrar a operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('indiceDe', 10));
      expect(result.current.historico).toHaveLength(2);
      expect(result.current.historico[1].operacao).toBe('Índice de 10: 0');
      expect(result.current.historico[1].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('registrarOperacao', () => {
    it('deve registrar uma operação no histórico', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => {
        result.current.registrarOperacao('Teste de operação', OperationState.COMPLETED);
      });
      expect(result.current.historico).toHaveLength(1);
      expect(result.current.historico[0].operacao).toBe('Teste de operação');
      expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);
    });
  });

  describe('setIndiceDestacado', () => {
    it('deve definir o índice destacado', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => {
        result.current.setIndiceDestacado(2);
      });
      expect(result.current.indiceDestacado).toBe(2);
    });
  });

  describe('setMensagemAcao', () => {
    it('deve definir a mensagem de ação', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => {
        result.current.setMensagemAcao('Nova mensagem');
      });
      expect(result.current.mensagemAcao).toBe('Nova mensagem');
    });
  });


  it('deve limpar o indice destacado', async () => {
    jest.useFakeTimers();
    const { result } = renderVetorHook();
    await act(async () => await result.current.setIndiceDestacado(1));
    expect(result.current.indiceDestacado).toBe(1);
    act(() => jest.advanceTimersByTime(1500));
    expect(result.current.indiceDestacado).toBeNull();
    jest.useRealTimers();
  });


  it('deve lançar erro ao inserir com valor inválido', async () => {
    const { result } = renderVetorHook();
    await expect(act(async () => await result.current.executarMetodo('inserir', 'abc', 0))).rejects.toThrow('O valor não pode estar vazio');
  });
  it('deve lançar erro ao inserir com índice inválido', async () => {
    const { result } = renderVetorHook();
    await expect(act(async () => await result.current.executarMetodo('inserir', 10, -1))).rejects.toThrow('Índice inválido');
  });
  it('deve lançar erro ao estender com valores inválidos', async () => {
    const { result } = renderVetorHook();
    await expect(act(async () => await result.current.executarMetodo('estender', '1,2,abc'))).rejects.toThrow('Valor inválido na lista: Apenas números inteiros são permitidos');
  });
  it('deve tratar erro ao validar número', async () => {
    jest.spyOn(validationUtils, 'validarNumero').mockImplementation(() => ({ valido: false, mensagem: 'Erro de validação' }));
    const { result } = renderVetorHook();
    await expect(act(async () => await result.current.executarMetodo('adicionarNoFinal', 'abc'))).rejects.toThrow('Erro de validação');
    jest.restoreAllMocks();
  });
  it('deve tratar erro ao validar índice', async () => {
    jest.spyOn(validationUtils, 'validarIndice').mockImplementation(() => ({ valido: false, mensagem: 'Erro de índice' }));
    const { result } = renderVetorHook();
    await expect(act(async () => await result.current.executarMetodo('inserir', 10, 0))).rejects.toThrow('Erro de índice');
    jest.restoreAllMocks();
  });
  it('deve lançar erro ao obter elemento com índice inválido', async () => {
    const { result } = renderVetorHook(5);
    await expect(act(async () => await result.current.executarMetodo('obterElemento', 5))).rejects.toThrow('Índice fora dos limites');
  });
  it('deve lançar erro ao definir elemento com índice inválido', async () => {
    const { result } = renderVetorHook(5);
    await act(async () => await result.current.executarMetodo('inserir', 1, 0));
    await expect(act(async () => await result.current.executarMetodo('definirElemento', 10, 5))).rejects.toThrow('Índice fora dos limites');
  });
  it('deve lançar erro ao remover com índice inválido', async () => {
    const { result } = renderVetorHook(5);
    await act(async () => await result.current.executarMetodo('inserir', 1, 0));
    await expect(act(async () => await result.current.executarMetodo('remover', 2))).rejects.toThrow('Índice fora dos limites');
  });
  it('deve lançar erro ao fatiar com índice inicial inválido', async () => {
    const { result } = renderVetorHook(5);
    await act(async () => await result.current.executarMetodo('inserir', 1, 0));
    await expect(act(async () => await result.current.executarMetodo('fatiar', -1, 2))).rejects.toThrow('Índice inicial fora dos limites');
  });
  it('deve lançar erro ao fatiar com índice final inválido', async () => {
    const { result } = renderVetorHook(5);
    await act(async () => await result.current.executarMetodo('inserir', 1, 0));
    await expect(act(async () => await result.current.executarMetodo('fatiar', 0, 2))).not.toThrow();
    await expect(act(async () => await result.current.executarMetodo('fatiar', 0, 5))).rejects.toThrow('Índice final inválido');
  });
  it('deve lançar erro ao fatiar com índice final menor que o inicial', async () => {
    const { result } = renderVetorHook(5);
    await act(async () => await result.current.executarMetodo('inserir', 1, 0));
    await expect(act(async () => await result.current.executarMetodo('fatiar', 1, 0))).rejects.toThrow('Índice final inválido');
  });
  it('deve lançar erro ao remover do final com vetor vazio', async () => {
    const { result } = renderVetorHook(5);
    await expect(act(async () => await result.current.executarMetodo('removerDoFinal'))).rejects.toThrow('Vetor está vazio');
  });
  it('deve lançar erro ao chamar um método não implementado', async () => {
    const { result } = renderVetorHook();
    await expect(act(async () => await result.current.executarMetodo('metodoInvalido'))).rejects.toThrow('Método não implementado');
  });
});