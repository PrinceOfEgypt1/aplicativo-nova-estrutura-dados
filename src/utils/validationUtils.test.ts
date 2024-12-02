// src/utils/validationUtils.test.ts
import * as validationUtils from './validationUtils';

describe('validationUtils', () => {
    describe('validarNumero', () => {
        it('deve retornar válido para números inteiros entre -1000 e 1000', () => {
          expect(validationUtils.validarNumero(500)).toEqual({ valido: true, valor: 500, mensagem: 'Valor válido' });
          expect(validationUtils.validarNumero(-1000)).toEqual({ valido: true, valor: -1000, mensagem: 'Valor válido' });
          expect(validationUtils.validarNumero(0)).toEqual({ valido: true, valor: 0, mensagem: 'Valor válido' });
          expect(validationUtils.validarNumero(1000)).toEqual({ valido: true, valor: 1000, mensagem: 'Valor válido' });
        });


        it('deve retornar inválido para outros valores', () => {
            expect(validationUtils.validarNumero(1001)).toEqual({ valido: false, mensagem: 'O valor deve estar entre -1000 e 1000'});
            expect(validationUtils.validarNumero(-1001)).toEqual({ valido: false, mensagem: 'O valor deve estar entre -1000 e 1000'});
            expect(validationUtils.validarNumero(500.5)).toEqual({ valido: false, mensagem: 'O valor deve ser um número inteiro' });
            expect(validationUtils.validarNumero('abc')).toEqual({ valido: false, mensagem: 'O valor deve ser um número' });
            expect(validationUtils.validarNumero(undefined)).toEqual({ valido: false, mensagem: 'O valor não pode estar vazio' });
            expect(validationUtils.validarNumero(null)).toEqual({ valido: false, mensagem: 'O valor não pode estar vazio' });
            expect(validationUtils.validarNumero('')).toEqual({ valido: false, mensagem: 'O valor não pode estar vazio' });
        });


    })

    describe('validarIndice', () => {
        it('deve retornar válido para um índice válido', () => {
          expect(validationUtils.validarIndice(5, 10, 20)).toEqual({ valido: true, mensagem: 'Índice válido' });
          expect(validationUtils.validarIndice(0, 0, 20)).toEqual({ valido: true, mensagem: 'Índice válido' });
          expect(validationUtils.validarIndice(10, 10, 20)).toEqual({ valido: true, mensagem: 'Índice válido' });
        });


        it('deve retornar inválido para outros valores', () => {
          expect(validationUtils.validarIndice(20, 10, 20)).toEqual({ valido: false, mensagem: 'Índice fora dos limites. A capacidade máxima é 19.' });
          expect(validationUtils.validarIndice(-1, 10, 20)).toEqual({ valido: false, mensagem: 'Índice inválido' });
          expect(validationUtils.validarIndice(11, 10, 20)).toEqual({ valido: false, mensagem: 'Índice com lacuna. Próximo índice disponível: 10' });
        });
    })

});