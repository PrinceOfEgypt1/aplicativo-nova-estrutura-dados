/**
 * Barrel export para o módulo Pilha
 *
 * @remarks
 * Centraliza todas as exportações relacionadas à estrutura de dados Pilha
 * para facilitar imports em outros módulos.
 */

export { Pilha } from './pilha';
export { usePilha, OperationState } from './usePilha';
export type { StackElement } from './usePilha';
export { InformacoesPilha } from './InformacoesPilha';
export { default as VisualizacaoPilha } from './VisualizacaoPilha';
export { default as StackCell } from './StackCell';
export type { StackCellProps } from './StackCell';
export { metodosInfo, metodosDisponiveis, gruposMetodos } from './metodosPilha';
export type { MetodoInfo, MetodoPilha, GrupoMetodo } from './metodosPilha';
