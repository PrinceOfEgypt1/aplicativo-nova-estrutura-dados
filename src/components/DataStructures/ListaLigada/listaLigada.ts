// src/components/DataStructures/ListaLigada/listaLigada.ts

/**
 * Interface para nó da lista ligada
 */
export interface LinkedListNode {
  value: number;
  id: string;
  next: LinkedListNode | null;
  timestamp: number;
}

/**
 * Interface para elemento na visualização
 */
export interface LinkedListElement {
  value: number;
  id: string;
  timestamp: number;
}

/**
 * Estados possíveis de uma operação
 */
export enum OperationState {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  ERROR = 'error',
}

/**
 * Interface para histórico de operações
 */
export interface OperationHistory {
  operacao: string;
  timestamp: number;
  status: OperationState;
  detalhes?: string;
}

/**
 * Interface para o resultado de validação
 */
export interface ValidationResult {
  valido: boolean;
  mensagem: string;
}

/**
 * Interface para estatísticas da lista
 */
export interface LinkedListStats {
  tamanhoAtual: number;
  capacidadeMaxima: number;
  taxaOcupacao: number;
  totalOperacoes: number;
}

/**
 * Tipo para identificar a posição destacada na animação
 */
export type HighlightPosition = 'head' | 'tail' | 'middle' | null;

/**
 * Interface para configuração de animação
 */
export interface AnimationConfig {
  duration: number;
  delay: number;
  type: 'spring' | 'tween' | 'inertia';
}
