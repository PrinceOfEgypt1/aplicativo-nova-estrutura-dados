// src/components/DataStructures/Vetor/useVetor.test.ts
import { useVetor, OperationState, VectorElement } from './useVetor'; // Importe VectorElement
import { renderHook, act } from '@testing-library/react'; // Importe de '@testing-library/react'

describe('useVetor', () => {
  it('deve inicializar o vetor corretamente', () => {
    const { result } = renderHook(() => useVetor(5));
    expect(result.current.elementos).toEqual([]);
    expect(result.current.historico).toEqual([]);
    expect(result.current.mensagemAcao).toEqual(null);
    expect(result.current.indiceDestacado).toEqual(null);
  });

  describe('inserir', () => {
        it('deve inserir um elemento no vetor', () => {
            const { result } = renderHook(() => useVetor(5));
            act(() => {
              result.current.executarMetodo("inserir", 10, 0);
            });
            expect(result.current.elementos[0].value).toBe(10)


          });

        it('deve lançar um erro se o indice for invalido', () => {
            const { result } = renderHook(() => useVetor(5));

            //Indice negativo
            // expect(() => {
            //     act(() => result.current.executarMetodo('inserir', 10, -1))
            // }).toThrowError()


            expect(() => {
                act(() => result.current.executarMetodo('inserir', 10, -1))
            }).toThrowError()

            //Indice maior que a capacidade
            expect(() => {
                act(() => result.current.executarMetodo('inserir', 10, 5))
            }).toThrowError()


            //Indice com lacuna
            expect(() => {
                act(() => result.current.executarMetodo('inserir', 10, 1))
            }).toThrowError()


          });


          it('deve inserir um elemento no final do array', () => {
            const { result } = renderHook(() => useVetor(5));
            act(() => {
                result.current.executarMetodo("inserir", 1, 0);
            });

            act(() => {
                result.current.executarMetodo('inserir', 2, 1)
            })
            expect(result.current.elementos.length).toBe(2);
            expect(result.current.elementos[1].value).toBe(2);


          });


          //Teste para verificar se a mensagem de erro é disparada para valores inválidos
        it('deve disparar mensagem de erro para valores inválidos', () => {
            const { result } = renderHook(() => useVetor(5));
            //Valor vazio
            expect(() => {
                act(() => result.current.executarMetodo('inserir', '', 0))
            }).toThrowError()
            //Valor não numérico
            expect(() => {
                act(() => result.current.executarMetodo('inserir', 'abc', 0))
            }).toThrowError()
            //Número decimal
            expect(() => {
                act(() => result.current.executarMetodo('inserir', 1.5, 0))
            }).toThrowError()
            //Número fora do range permitido (-1000 a 1000)
            expect(() => {
                act(() => result.current.executarMetodo('inserir', 1001, 0))
            }).toThrowError()
            expect(() => {
                act(() => result.current.executarMetodo('inserir', -1001, 0))
            }).toThrowError()
          });



        it('deve registrar a operação no histórico', () => {
            const { result } = renderHook(() => useVetor(5));
            act(() => {
              result.current.executarMetodo('inserir', 10, 0);
            });
            expect(result.current.historico).toHaveLength(1);
            expect(result.current.historico[0].operacao).toContain('inserido'); //pode usar toContain
            expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)
          });

    })

  describe('remover', () => {
    it('deve remover um elemento do vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      // inserir elementos para remover depois.
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('inserir', 2, 1));


      act(() => result.current.executarMetodo('remover', 0));
      expect(result.current.elementos).toEqual([{ value: 2, id: result.current.elementos[0].id }]);
    });

    it('deve lançar um erro se o indice for invalido', () => {
        const { result } = renderHook(() => useVetor(5));
        expect(() => {
            act(() => result.current.executarMetodo('remover', -1))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('remover', 5))
        }).toThrowError()


      });

    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 1, 0));
        act(() => result.current.executarMetodo('remover', 0));
        expect(result.current.historico).toHaveLength(2);
        expect(result.current.historico[0].operacao).toContain('removido');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)

      });

  });

  describe('buscar', () => {
    it('deve encontrar um elemento existente', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('buscar', 10));
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento 10 encontrado na posição 0');
    });

    it('deve retornar -1 para elemento inexistente', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('buscar', 5));
      expect(result.current.indiceDestacado).toBe(-1);
      expect(result.current.mensagemAcao).toBe('Elemento 5 não encontrado');


    });

    it('deve disparar mensagem de erro para valores inválidos', () => {
        const { result } = renderHook(() => useVetor(5));
        expect(() => {
            act(() => result.current.executarMetodo('buscar', ''))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('buscar', 'abc'))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('buscar', 1.5))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('buscar', 1001))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('buscar', -1001))
        }).toThrowError()


      });


    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 10, 0));
        act(() => result.current.executarMetodo('buscar', 10));
        expect(result.current.historico).toHaveLength(2);
        expect(result.current.historico[0].operacao).toContain('encontrado');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);


      });

  });

  describe('obterElemento', () => {
    it('deve retornar o elemento no índice correto', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('obterElemento', 0));
      expect(result.current.indiceDestacado).toBe(0);
      expect(result.current.mensagemAcao).toBe('Elemento na posição 0: 10');
    });

    it('deve lançar um erro se o indice for inválido', () => {
        const { result } = renderHook(() => useVetor(5));
        expect(() => {
            act(() => result.current.executarMetodo('obterElemento', -1))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('obterElemento', 5))
        }).toThrowError()


      });


    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 10, 0));
        act(() => result.current.executarMetodo('obterElemento', 0));
        expect(result.current.historico).toHaveLength(2);
        expect(result.current.historico[0].operacao).toBe('Elemento na posição 0: 10');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)


      });
  });

  describe('definirElemento', () => {
    it('deve definir o elemento no índice correto', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('definirElemento', 20, 0));
      expect(result.current.elementos[0].value).toBe(20);
      expect(result.current.mensagemAcao).toBe('Elemento 20 definido na posição 0');
    });

    it('deve lançar um erro se o indice for invalido', () => {
        const { result } = renderHook(() => useVetor(5));
        // inserir elemento para poder definir depois
        act(() => result.current.executarMetodo('inserir', 10, 0));
        expect(() => {
            act(() => result.current.executarMetodo('definirElemento', 10, -1))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('definirElemento', 10, 5))
        }).toThrowError()


      });

    it('deve disparar mensagem de erro para valores inválidos', () => {
        const { result } = renderHook(() => useVetor(5));
        // inserir elemento para poder definir depois
        act(() => result.current.executarMetodo('inserir', 10, 0));
        //Valor vazio
        expect(() => {
            act(() => result.current.executarMetodo('definirElemento', '', 0))
        }).toThrowError()
        //Valor não numérico
        expect(() => {
            act(() => result.current.executarMetodo('definirElemento', 'abc', 0))
        }).toThrowError()
        //Número decimal
        expect(() => {
            act(() => result.current.executarMetodo('definirElemento', 1.5, 0))
        }).toThrowError()
        //Número fora do range permitido (-1000 a 1000)
        expect(() => {
            act(() => result.current.executarMetodo('definirElemento', 1001, 0))
        }).toThrowError()
        expect(() => {
            act(() => result.current.executarMetodo('definirElemento', -1001, 0))
        }).toThrowError()
    });


    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 10, 0));
        act(() => result.current.executarMetodo('definirElemento', 20, 0));
        expect(result.current.historico).toHaveLength(2);
        expect(result.current.historico[0].operacao).toContain('definido'); //pode usar toContain
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)
      });
  });

  describe('tamanho', () => {
    it('deve retornar o tamanho correto do vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 10, 0));
      act(() => result.current.executarMetodo('tamanho'));
      expect(result.current.mensagemAcao).toBe('Tamanho do vetor: 1');
    });


    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 1, 0));
        act(() => result.current.executarMetodo('tamanho'));
        expect(result.current.historico).toHaveLength(2);
        expect(result.current.historico[0].operacao).toBe('Tamanho do vetor: 1');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);


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
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)


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
        expect(result.current.historico[0].operacao).toBe('Vetor limpo');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)
      });
  });

  describe('ordenar', () => {
    it('deve ordenar o vetor em ordem crescente', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 3, 0));
      act(() => result.current.executarMetodo('inserir', 1, 1));
      act(() => result.current.executarMetodo('ordenar'));
      expect(result.current.elementos.map((e: VectorElement) => e.value)).toEqual([1, 3]);

      expect(result.current.mensagemAcao).toBe('Vetor Ordenado');
    });


    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 3, 0));
        act(() => result.current.executarMetodo('inserir', 1, 1));
        act(() => result.current.executarMetodo('ordenar'));

        expect(result.current.historico).toHaveLength(3);
        expect(result.current.historico[0].operacao).toBe('Vetor Ordenado');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);



      });
  });

  describe('inverter', () => {
    it('deve inverter o vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('inserir', 2, 1));
      act(() => result.current.executarMetodo('inverter'));
      expect(result.current.elementos.map((e: VectorElement) => e.value)).toEqual([2, 1]);

      expect(result.current.mensagemAcao).toBe('Vetor Invertido');
    });


    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 1, 0));
        act(() => result.current.executarMetodo('inserir', 2, 1));
        act(() => result.current.executarMetodo('inverter'));
        expect(result.current.historico).toHaveLength(3);
        expect(result.current.historico[0].operacao).toBe('Vetor Invertido');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);



      });
  });

  describe('adicionarNoFinal', () => {
    it('deve adicionar um elemento no final do vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('adicionarNoFinal', 10));
      expect(result.current.elementos[0].value).toBe(10);
      expect(result.current.indiceDestacado).toBe(0); // indiceDestacado deve ser 0 após a primeira inserção
      expect(result.current.mensagemAcao).toBe('Elemento 10 adicionado ao final');

      act(() => {
        result.current.executarMetodo("adicionarNoFinal", 1);
      });
      expect(result.current.elementos.length).toBe(2);
      expect(result.current.elementos[1].value).toBe(1);
      expect(result.current.indiceDestacado).toBe(1) // indiceDestacado deve ser 1 após a segunda inserção
      expect(result.current.mensagemAcao).toBe('Elemento 1 adicionado ao final');



    });

    it('deve disparar mensagem de erro para valores inválidos', () => {
        const { result } = renderHook(() => useVetor(5));
        expect(() => {
            act(() => result.current.executarMetodo('adicionarNoFinal', ''))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('adicionarNoFinal', 'abc'))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('adicionarNoFinal', 1.5))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('adicionarNoFinal', 1001))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('adicionarNoFinal', -1001))
        }).toThrowError()


      });


    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('adicionarNoFinal', 10));
        expect(result.current.historico).toHaveLength(1);
        expect(result.current.historico[0].operacao).toBe('Elemento 10 adicionado ao final');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)



      });

  });

  describe('estender', () => {
    it('deve estender o vetor com multiplos elementos', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('estender', '1, 2, 3'));
      expect(result.current.elementos.map((e: VectorElement) => e.value)).toEqual([1, 2, 3]);

      expect(result.current.mensagemAcao).toBe('Elementos adicionados');
    });

    it('deve disparar mensagem de erro para valores inválidos', () => {
        const { result } = renderHook(() => useVetor(5));
        expect(() => {
            act(() => result.current.executarMetodo('estender', '1, abc, 3'))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('estender', '1, 1.5, 3'))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('estender', '1, 1001, 3'))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('estender', '1,-1001, 3'))
        }).toThrowError()


        //Teste para capacidade do vetor
        act(() => {
            result.current.executarMetodo('estender', '1, 2, 3, 4, 5')
          })
          expect(() => {
            act(() => result.current.executarMetodo('estender', '6'))
          }).toThrowError()




      });

    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));

        act(() => result.current.executarMetodo('estender', '1, 2, 3'));
        expect(result.current.historico).toHaveLength(1);
        expect(result.current.historico[0].operacao).toContain('Elementos adicionados');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)

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
        expect(result.current.historico[0].operacao).toBe('Elemento removido do final');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)


      });
  });

  describe('fatiar', () => {
    it('deve retornar uma fatia do vetor', () => {
      const { result } = renderHook(() => useVetor(5));
      act(() => result.current.executarMetodo('inserir', 1, 0));
      act(() => result.current.executarMetodo('inserir', 2, 1));
      act(() => result.current.executarMetodo('inserir', 3, 2));


      act(() => result.current.executarMetodo('fatiar', 0, 2));
      expect(result.current.elementos.map((e: VectorElement) => e.value)).toEqual([1, 2]);


    });


    it('deve disparar um erro se os índices forem inválidos', () => {
        const { result } = renderHook(() => useVetor(5));
        // inserir elemento para poder definir depois
        act(() => result.current.executarMetodo('inserir', 1, 0));

        act(() => result.current.executarMetodo('inserir', 2, 1));
        act(() => result.current.executarMetodo('inserir', 3, 2));



        expect(() => {act(() => result.current.executarMetodo('fatiar', -1, 2))}).toThrowError()
        expect(() => {act(() => result.current.executarMetodo('fatiar', 0, 5))}).toThrowError()
        expect(() => {act(() => result.current.executarMetodo('fatiar', 2, 0))}).toThrowError()




      });

    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 1, 0));


        act(() => result.current.executarMetodo('inserir', 2, 1));
        act(() => result.current.executarMetodo('inserir', 3, 2));
        act(() => result.current.executarMetodo('fatiar', 0, 2));
        expect(result.current.historico).toHaveLength(4);
        expect(result.current.historico[0].operacao).toContain('Fatiar');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)



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
        expect(() => {
            act(() => result.current.executarMetodo('contem', ''))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('contem', 'abc'))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('contem', 1.5))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('contem', 1001))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('contem', -1001))
        }).toThrowError()
      });


    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 10, 0));
        act(() => result.current.executarMetodo('contem', 10));
        expect(result.current.historico).toHaveLength(2);
        expect(result.current.historico[0].operacao).toBe('O vetor contém o elemento 10');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED);


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
        expect(() => {
            act(() => result.current.executarMetodo('indiceDe', ''))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('indiceDe', 'abc'))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('indiceDe', 1.5))
        }).toThrowError()

        expect(() => {
            act(() => result.current.executarMetodo('indiceDe', 1001))
        }).toThrowError()


        expect(() => {
            act(() => result.current.executarMetodo('indiceDe', -1001))
        }).toThrowError()



      });



    it('deve registrar a operação no histórico', () => {
        const { result } = renderHook(() => useVetor(5));
        act(() => result.current.executarMetodo('inserir', 10, 0));

        act(() => result.current.executarMetodo('indiceDe', 10));
        expect(result.current.historico).toHaveLength(2);
        expect(result.current.historico[0].operacao).toContain('Índice de 10');
        expect(result.current.historico[0].status).toBe(OperationState.COMPLETED)


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

});