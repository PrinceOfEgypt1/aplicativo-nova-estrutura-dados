/**
 * Barrel export para o módulo Fila
 *
 * @remarks
 * Centraliza todas as exportações relacionadas à estrutura de dados Fila
 * para facilitar imports em outros módulos.
 */

export { Fila } from './fila';
export { useFila, OperationState } from './useFila';
export type { QueueElement } from './useFila';
export { InformacoesFila } from './InformacoesFila';
export { default as VisualizacaoFila } from './VisualizacaoFila';
export { default as QueueCell } from './QueueCell';
export type { QueueCellProps } from './QueueCell';
export { metodosInfo, metodosDisponiveis, gruposMetodos } from './metodosFila';
export type { MetodoInfo, MetodoFila, GrupoMetodo } from './metodosFila';
