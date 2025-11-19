// src/components/DataStructures/Fila/fila.ts

/**
 * Interface para elemento da fila com ID único para animações
 */
export interface QueueElement {
  value: number;
  id: string;
  timestamp: number; // Para animações de entrada/saída
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
 * Interface para estatísticas da fila
 */
export interface QueueStats {
  tamanhoAtual: number;
  capacidadeMaxima: number;
  taxaOcupacao: number; // Porcentagem de ocupação
  totalOperacoes: number;
}

/**
 * Tipo para identificar a posição destacada na animação
 */
export type HighlightPosition = 'front' | 'rear' | 'middle' | null;

/**
 * Interface para configuração de animação
 */
export interface AnimationConfig {
  duration: number;
  delay: number;
  type: 'spring' | 'tween' | 'inertia';
}
