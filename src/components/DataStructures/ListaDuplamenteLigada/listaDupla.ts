// src/components/DataStructures/ListaDuplamenteLigada/listaDupla.ts

export interface DoublyLinkedListElement {
  value: number;
  id: string;
  timestamp: number;
}

export enum OperationState {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export interface OperationHistory {
  operacao: string;
  timestamp: number;
  status: OperationState;
  detalhes?: string;
}

export interface ValidationResult {
  valido: boolean;
  mensagem: string;
}

export interface DoublyLinkedListStats {
  tamanhoAtual: number;
  capacidadeMaxima: number;
  taxaOcupacao: number;
  totalOperacoes: number;
}

export type HighlightPosition = 'head' | 'tail' | 'middle' | null;

export interface AnimationConfig {
  duration: number;
  delay: number;
  type: 'spring' | 'tween' | 'inertia';
}
