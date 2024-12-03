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

  describe('buscar()', () => {
    it('retorna o índice do elemento se encontrado', () => {
      expect(arrayUtils.buscar([1, 2, 3], 2)).toBe(1);
    });


    it('retorna -1 se o elemento não for encontrado', () => {
      expect(arrayUtils.buscar([1, 2, 3], 4)).toBe(-1);
    });
});

describe('obter()', () => {
    it('retorna o elemento no índice especificado', () => {
        expect(arrayUtils.obter([1, 2, 3], 1)).toBe(2);
    });

    it('lança um erro se o índice for negativo', () => {
        expect(() => arrayUtils.obter([1, 2, 3], -1)).toThrow('Índice fora dos limites');
    });


    it('lança um erro se o índice for maior ou igual ao tamanho do array', () => {
        expect(() => arrayUtils.obter([1, 2, 3], 3)).toThrow('Índice fora dos limites');
    });
});

describe('definir()', () => { // describe correto (definir)
  it('define o elemento no índice especificado', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.definir(arr, 1, 4);
      expect(novoArr).toEqual([1, 4, 3]);
  });

  it('não modifica o array original', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.definir(arr, 1, 4);
      expect(novoArr).not.toBe(arr); // Usa novoArr na asserção
      expect(arr).toEqual([1, 2, 3]);
  });

  it('lança um erro se o índice for negativo', () => {
      expect(() => arrayUtils.definir([1, 2, 3], -1, 4)).toThrow('Índice fora dos limites');
  });

  it('lança um erro se o índice for maior que o tamanho do array', () => {
      expect(() => arrayUtils.definir([1, 2, 3], 3, 4)).toThrow('Índice fora dos limites');
  });
});

describe('tamanho()', () => {
    it('retorna o tamanho do array', () => {
      expect(arrayUtils.tamanho([1, 2, 3])).toBe(3);
      expect(arrayUtils.tamanho([])).toBe(0);


    });
});


describe('estaVazio()', () => {
    it('retorna true se o array estiver vazio', () => {
        expect(arrayUtils.estaVazio([])).toBe(true);
    });


    it('retorna false se o array não estiver vazio', () => {
        expect(arrayUtils.estaVazio([1, 2, 3])).toBe(false);
    });
});


describe('limpar()', () => {
    it('retorna um array vazio com a capacidade especificada', () => {
      expect(arrayUtils.limpar(5)).toEqual([undefined, undefined, undefined, undefined, undefined]);
    });
  });


  describe('ordenar()', () => {
    it('ordena o array em ordem crescente', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6];
      expect(arrayUtils.ordenar(arr)).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    it('não modifica o array original', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6];
      const novoArr = arrayUtils.ordenar(arr);
      expect(novoArr).not.toBe(arr); // Certifica-se de que um novo array foi retornado
      expect(arr).toEqual([3, 1, 4, 1, 5, 9, 2, 6]); // Verifica se o array original não foi modificado
    });
  });

describe('inverter()', () => {
    it('inverte o array', () => {
        const arr = [1, 2, 3];
        const novoArr = arrayUtils.inverter(arr);
        expect(novoArr).toEqual([3, 2, 1]);
      });


      it('não modifica o array original', () => {
        const arr = [1, 2, 3];
        arrayUtils.inverter(arr)
        expect(arr).toEqual([1, 2, 3]);


      });
});


describe('adicionarNoFinal()', () => {
    it('adiciona um elemento no final do array', () => {
        const arr = [1, 2, 3];
        const novoArr = arrayUtils.adicionarNoFinal(arr, 4);
        expect(novoArr).toEqual([1, 2, 3, 4]);


      });


    it('não modifica o array original', () => {
        const arr = [1, 2, 3];
        arrayUtils.adicionarNoFinal(arr, 4)
        expect(arr).toEqual([1, 2, 3]);


      });
});



describe('estender()', () => {
    it('adiciona os elementos ao final do array', () => {
      const arr1 = [1, 2];
      const arr2 = [3, 4];
      const novoArr = arrayUtils.estender(arr1, arr2);
      expect(novoArr).toEqual([1, 2, 3, 4]);
    });


    it('não modifica os arrays originais', () => {
        const arr1 = [1, 2];
        const arr2 = [3, 4];
        arrayUtils.estender(arr1, arr2);
        expect(arr1).toEqual([1, 2]);
        expect(arr2).toEqual([3, 4]);


      });
});



describe('removerDoFinal()', () => {
    it('remove o ultimo elemento do array', () => {
      const arr = [1, 2, 3];
      const novoArr = arrayUtils.removerDoFinal(arr);
      expect(novoArr).toEqual([1, 2]);
    });


    it('lança um erro se o array estiver vazio', () => {
        expect(() => arrayUtils.removerDoFinal([])).toThrow('Vetor está vazio');
      });
});



describe('fatiar()', () => {
    it('retorna uma fatia do array entre os índices especificados', () => {
      const arr = [1, 2, 3, 4, 5];
      const fatia = arrayUtils.fatiar(arr, 1, 4);
      expect(fatia).toEqual([2, 3, 4]);
    });

    it('retorna uma fatia do array a partir do índice inicial, se o índice final não for especificado', () => {
        const arr = [1, 2, 3, 4, 5];
        const fatia = arrayUtils.fatiar(arr, 2);
        expect(fatia).toEqual([3, 4, 5]);


      });

    it('lança um erro se o índice inicial for negativo', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(() => arrayUtils.fatiar(arr, -1)).toThrow("Índice inicial fora dos limites");
    });


    it('lança um erro se o índice inicial for maior ou igual ao tamanho do array', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(() => arrayUtils.fatiar(arr, 5)).toThrow("Índice inicial fora dos limites");
    });

    it('lança um erro se o índice final for menor que o índice inicial', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(() => arrayUtils.fatiar(arr, 2, 1)).toThrow("Índice final inválido");
      });


      it('lança um erro se o índice final for maior que o tamanho do array', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(() => arrayUtils.fatiar(arr, 1, 6)).toThrow("Índice final inválido");
      });
});

describe('contem()', () => {
    it('retorna true se o array contiver o elemento', () => {
        expect(arrayUtils.contem([1, 2, 3], 2)).toBe(true);
    });

    it('retorna false se o array não contiver o elemento', () => {
        expect(arrayUtils.contem([1, 2, 3], 4)).toBe(false);
    });
});


describe('indiceDe()', () => {
    it('retorna o índice da primeira ocorrência do elemento no array', () => {
        expect(arrayUtils.indiceDe([1, 2, 3, 2], 2)).toBe(1);
    });


    it('retorna -1 se o elemento não for encontrado', () => {
        expect(arrayUtils.indiceDe([1, 2, 3, 2], 4)).toBe(-1);
    });
});



describe('validarNumeroInteiro()', () => {
    it('não lança erro se o valor for um número inteiro entre -1000 e 1000', () => {
        expect(() => arrayUtils.validarNumeroInteiro(100)).not.toThrow()
        expect(() => arrayUtils.validarNumeroInteiro(-100)).not.toThrow()
        expect(() => arrayUtils.validarNumeroInteiro(1000)).not.toThrow()
        expect(() => arrayUtils.validarNumeroInteiro(-1000)).not.toThrow()
    });

    it('lança um erro se o valor não for um número inteiro', () => {
        expect(() => arrayUtils.validarNumeroInteiro(100.5)).toThrow('Apenas números inteiros são permitidos');
    });

    it('lança um erro se o valor for menor que -1000', () => {
        expect(() => arrayUtils.validarNumeroInteiro(-1001)).toThrow('O valor deve estar entre -1000 e 1000');
    });


    it('lança um erro se o valor for maior que 1000', () => {
        expect(() => arrayUtils.validarNumeroInteiro(1001)).toThrow('O valor deve estar entre -1000 e 1000');
    });
});

});