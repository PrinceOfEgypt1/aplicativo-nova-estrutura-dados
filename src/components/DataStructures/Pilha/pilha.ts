// src/components/DataStructures/Pilha/pilha.ts

/**
 * Interface para elemento da pilha com ID único para animações
 */
export interface StackElement {
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
 * Interface para estatísticas da pilha
 */
export interface StackStats {
  tamanhoAtual: number;
  capacidadeMaxima: number;
  taxaOcupacao: number; // Porcentagem de ocupação
  totalOperacoes: number;
}

/**
 * Tipo para identificar a posição destacada na animação
 */
export type HighlightPosition = 'top' | 'bottom' | 'middle' | null;

/**
 * Interface para configuração de animação
 */
export interface AnimationConfig {
  duration: number;
  delay: number;
  type: 'spring' | 'tween' | 'inertia';
}
