/**
 * Barrel export para o módulo Lista Ligada
 *
 * @remarks
 * Centraliza todas as exportações relacionadas à estrutura de dados Lista Ligada
 * para facilitar imports em outros módulos.
 */

export { ListaLigada, No } from './listaLigada';
export { useListaLigada, OperationState } from './useListaLigada';
export type { LinkedListElement } from './useListaLigada';
export { InformacoesListaLigada } from './InformacoesListaLigada';
export { default as VisualizacaoListaLigada } from './VisualizacaoListaLigada';
export { default as NoListaLigada } from './NoListaLigada';
export type { NoListaLigadaProps } from './NoListaLigada';
export { metodosInfo, metodosDisponiveis, gruposMetodos } from './metodosListaLigada';
export type { MetodoInfo, MetodoListaLigada, GrupoMetodo } from './metodosListaLigada';
