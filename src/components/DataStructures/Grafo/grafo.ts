// src/components/DataStructures/Grafo/grafo.ts

export interface Vertice {
  id: string;
  valor: number;
  x?: number; // Posição X para visualização
  y?: number; // Posição Y para visualização
}

export interface Aresta {
  origem: string; // ID do vértice de origem
  destino: string; // ID do vértice de destino
  peso?: number; // Peso da aresta (opcional)
}

export interface Grafo {
  vertices: Vertice[];
  arestas: Aresta[];
  direcionado: boolean;
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

export interface CaminhoResult {
  existe: boolean;
  caminho: string[];
  distancia: number;
}
