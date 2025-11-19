// src/components/DataStructures/ArvoreBinaria/arvore.ts

export interface TreeNode {
  value: number;
  id: string;
  timestamp: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface TreeElement {
  value: number;
  id: string;
  level: number; // Nível na árvore (0 = raiz)
  position: number; // Posição no nível
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

export type TraversalOrder = 'inOrder' | 'preOrder' | 'postOrder';
