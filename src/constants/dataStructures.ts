// src/constants/dataStructures.ts
import { 
  ListTodo, 
  PilotFlight, 
  Network, 
  Binary, 
  Table2, 
  Stack, 
  List 
} from 'lucide-react';

export const dataStructures = [
  {
    type: 'vetor',
    name: 'Vetor',
    description: 'Estrutura de dados linear que armazena elementos em sequência.',
    icon: <ListTodo className="h-6 w-6" />,
  },
  {
    type: 'lista',
    name: 'Lista Ligada',
    description: 'Elementos conectados através de referências.',
    icon: <List className="h-6 w-6" />,
  },
  {
    type: 'pilha',
    name: 'Pilha',
    description: 'Estrutura LIFO (Last In, First Out).',
    icon: <Stack className="h-6 w-6" />,
  },
  {
    type: 'fila',
    name: 'Fila',
    description: 'Estrutura FIFO (First In, First Out).',
    icon: <PilotFlight className="h-6 w-6" />,
  },
  {
    type: 'arvore',
    name: 'Árvore Binária',
    description: 'Estrutura hierárquica com no máximo dois filhos por nó.',
    icon: <Binary className="h-6 w-6" />,
  },
  {
    type: 'grafo',
    name: 'Grafo',
    description: 'Conjunto de vértices conectados por arestas.',
    icon: <Network className="h-6 w-6" />,
  },
  {
    type: 'matriz',
    name: 'Matriz',
    description: 'Estrutura bidimensional de elementos.',
    icon: <Table2 className="h-6 w-6" />,
  },
];