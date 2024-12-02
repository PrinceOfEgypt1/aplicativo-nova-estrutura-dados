import { useState, useCallback } from "react";
import { Vetor } from "./vetor";

export function useVetor<T>(capacidadeInicial: number = 10) {
  const [vetor] = useState(() => new Vetor<T>(capacidadeInicial));
  const [elementos, setElementos] = useState<T[]>([]);
  const [historico, setHistorico] = useState<string[]>([]);

  const adicionarAoHistorico = (operacao: string) => {
    setHistorico(anterior => [...anterior, operacao]);
  };

  const inserir = useCallback((indice: number, elemento: T) => {
    vetor.inserir(indice, elemento);
    setElementos(vetor.paraArray());
    adicionarAoHistorico(`Inserido ${elemento} no indice ${indice}`);
  }, [vetor]);

  const remover = useCallback((indice: number) => {
    const removido = vetor.remover(indice);
    setElementos(vetor.paraArray());
    adicionarAoHistorico(`Removido ${removido} do indice ${indice}`);
    return removido;
  }, [vetor]);

  const buscar = useCallback((elemento: T) => {
    const indice = vetor.buscar(elemento);
    adicionarAoHistorico(`Buscado elemento ${elemento}`);
    return indice;
  }, [vetor]);

  const obter = useCallback((indice: number) => {
    const elemento = vetor.obter(indice);
    adicionarAoHistorico(`Obtido elemento do indice ${indice}`);
    return elemento;
  }, [vetor]);

  const definir = useCallback((indice: number, elemento: T) => {
    vetor.definir(indice, elemento);
    setElementos(vetor.paraArray());
    adicionarAoHistorico(`Definido elemento ${elemento} no indice ${indice}`);
  }, [vetor]);

  const adicionarNoFinal = useCallback((elemento: T) => {
    vetor.adicionarNoFinal(elemento);
    setElementos(vetor.paraArray());
    adicionarAoHistorico(`Adicionado ${elemento} no final`);
  }, [vetor]);

  const estender = useCallback((novosElementos: T[]) => {
    vetor.estender(novosElementos);
    setElementos(vetor.paraArray());
    adicionarAoHistorico(`Estendido com ${novosElementos.length} elementos`);
  }, [vetor]);

  const removerDoFinal = useCallback(() => {
    const removido = vetor.removerDoFinal();
    setElementos(vetor.paraArray());
    adicionarAoHistorico(`Removido ${removido} do final`);
    return removido;
  }, [vetor]);

  const fatiar = useCallback((inicio: number, fim?: number) => {
    const novoVetor = vetor.fatiar(inicio, fim);
    adicionarAoHistorico(`Fatiado do índice ${inicio}${fim ? ` até ${fim}` : ''}`);
    return novoVetor;
  }, [vetor]);

  const ordenar = useCallback((comparador?: (a: T, b: T) => number) => {
    vetor.ordenar(comparador);
    setElementos(vetor.paraArray());
    adicionarAoHistorico("Vetor ordenado");
  }, [vetor]);

  const inverter = useCallback(() => {
    vetor.inverter();
    setElementos(vetor.paraArray());
    adicionarAoHistorico("Vetor invertido");
  }, [vetor]);

  const contem = useCallback((elemento: T) => {
    const resultado = vetor.contem(elemento);
    adicionarAoHistorico(`Verificado se contém ${elemento}`);
    return resultado;
  }, [vetor]);

  const indiceDe = useCallback((elemento: T) => {
    const indice = vetor.indiceDe(elemento);
    adicionarAoHistorico(`Buscado índice de ${elemento}`);
    return indice;
  }, [vetor]);

  return {
    elementos,
    historico,
    inserir,
    remover,
    buscar,
    obter,
    definir,
    adicionarNoFinal,
    estender,
    removerDoFinal,
    fatiar,
    ordenar,
    inverter,
    contem,
    indiceDe,
    limpar: useCallback(() => {
      vetor.limpar();
      setElementos(vetor.paraArray());
      adicionarAoHistorico("Vetor limpo");
    }, [vetor]),
    tamanho: useCallback(() => vetor.tamanho(), [vetor]),
    estaVazio: useCallback(() => vetor.estaVazio(), [vetor]),
  };
}