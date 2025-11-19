# 🎯 GUIA COMPLETO - Desenvolvimento de Estruturas de Dados

## 📋 Estruturas Completadas
- ✅ **Vetor** (Array) - 100% funcional
- ⚠️ **Pilha** (Stack) - Tipos, métodos e hook criados (falta visualização)

## 🚀 Estruturas Pendentes
- ⏳ Fila (Queue)
- ⏳ Lista Ligada Simples
- ⏳ Lista Duplamente Ligada  
- ⏳ Árvore Binária
- ⏳ Grafo

---

## 🏗️ ESTRUTURA DE ARQUIVOS (Padrão)

Para cada estrutura de dados, crie estes arquivos:

```
src/components/DataStructures/[NomeDaEstrutura]/
├── [nome].ts                    # Tipos e interfaces
├── metodos[Nome].ts              # Implementação dos métodos (10-15 métodos)
├── use[Nome].ts                  # Hook React personalizado
├── Visualizacao[Nome].tsx        # Componente visual com animações
├── Informacoes[Nome].tsx         # Painel de informações (opcional)
└── index.ts                      # Barrel export
```

---

## 📝 TEMPLATE DE DESENVOLVIMENTO

### PASSO 1: Tipos e Interfaces ([nome].ts)

```typescript
// src/components/DataStructures/Fila/fila.ts

export interface QueueElement {
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
}
```

### PASSO 2: Métodos (metodos[Nome].ts)

**Exemplo para FILA (Queue) - 12 métodos:**

```typescript
// src/components/DataStructures/Fila/metodosFila.ts

import { QueueElement } from './fila';

// 1. ENQUEUE - Adiciona no final
export function enqueue(fila: QueueElement[], valor: number, id: string): QueueElement[] {
  return [...fila, { value: valor, id, timestamp: Date.now() }];
}

// 2. DEQUEUE - Remove do início
export function dequeue(fila: QueueElement[]): {
  novaFila: QueueElement[];
  elementoRemovido: QueueElement | null;
} {
  if (fila.length === 0) return { novaFila: fila, elementoRemovido: null };
  return {
    novaFila: fila.slice(1),
    elementoRemovido: fila[0],
  };
}

// 3. FRONT - Ver primeiro elemento
export function front(fila: QueueElement[]): QueueElement | null {
  return fila.length > 0 ? fila[0] : null;
}

// 4. REAR - Ver último elemento  
export function rear(fila: QueueElement[]): QueueElement | null {
  return fila.length > 0 ? fila[fila.length - 1] : null;
}

// 5. IS_EMPTY
export function isEmpty(fila: QueueElement[]): boolean {
  return fila.length === 0;
}

// 6. SIZE
export function size(fila: QueueElement[]): number {
  return fila.length;
}

// 7. CLEAR
export function clear(): QueueElement[] {
  return [];
}

// 8. CONTAINS
export function contains(fila: QueueElement[], valor: number): boolean {
  return fila.some(el => el.value === valor);
}

// 9. TO_ARRAY
export function toArray(fila: QueueElement[]): number[] {
  return fila.map(el => el.value);
}

// 10. SEARCH - Retorna posição do elemento
export function search(fila: QueueElement[], valor: number): number {
  return fila.findIndex(el => el.value === valor);
}

// 11. ENQUEUE_MULTIPLE
export function enqueueMultiple(
  fila: QueueElement[],
  valores: number[],
  idGenerator: () => string
): QueueElement[] {
  const novos = valores.map(v => ({
    value: v,
    id: idGenerator(),
    timestamp: Date.now(),
  }));
  return [...fila, ...novos];
}

// 12. REVERSE
export function reverse(fila: QueueElement[]): QueueElement[] {
  return [...fila].reverse();
}
```

### PASSO 3: Hook Personalizado (use[Nome].ts)

```typescript
// src/components/DataStructures/Fila/useFila.ts

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as metodosFila from './metodosFila';
import { QueueElement, OperationState, OperationHistory } from './fila';
import { validarNumero } from '../../../utils/validationUtils';

export function useFila(capacidadeMaxima: number = 20) {
  const [elementos, setElementos] = useState<QueueElement[]>([]);
  const [elementoDestacado, setElementoDestacado] = useState<string | null>(null);
  const [mensagemAcao, setMensagemAcao] = useState<string | null>(null);
  const [historico, setHistorico] = useState<OperationHistory[]>([]);

  const registrarOperacao = useCallback((operacao: string, status: OperationState) => {
    setHistorico(prev => [...prev, {
      operacao,
      timestamp: Date.now(),
      status,
    }]);
  }, []);

  const executarMetodo = useCallback(async (metodo: string, ...args: any[]) => {
    try {
      let mensagem: string;

      switch (metodo) {
        case 'enqueue': {
          const [valor] = args;
          const validacao = validarNumero(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);

          if (elementos.length >= capacidadeMaxima) {
            throw new Error(`Fila cheia! Capacidade: ${capacidadeMaxima}`);
          }

          const novaFila = metodosFila.enqueue(elementos, Number(valor), uuidv4());
          setElementos(novaFila);
          setElementoDestacado(novaFila[novaFila.length - 1].id);
          mensagem = `Elemento ${valor} adicionado ao final da fila`;
          break;
        }

        case 'dequeue': {
          if (elementos.length === 0) throw new Error('Fila vazia!');
          const { novaFila, elementoRemovido } = metodosFila.dequeue(elementos);
          setElementos(novaFila);
          mensagem = `Elemento ${elementoRemovido?.value} removido do início`;
          break;
        }

        case 'front': {
          const primeiro = metodosFila.front(elementos);
          if (!primeiro) throw new Error('Fila vazia!');
          setElementoDestacado(primeiro.id);
          mensagem = `Primeiro da fila: ${primeiro.value}`;
          break;
        }

        // ... implementar outros casos

        default:
          throw new Error(`Método '${metodo}' não implementado`);
      }

      setMensagemAcao(mensagem);
      registrarOperacao(mensagem, OperationState.COMPLETED);
      setTimeout(() => setElementoDestacado(null), 2000);

    } catch (error: any) {
      const mensagemErro = error.message || 'Erro desconhecido';
      setMensagemAcao(`❌ ${mensagemErro}`);
      registrarOperacao(mensagemErro, OperationState.ERROR);
      throw error;
    }
  }, [elementos, capacidadeMaxima, registrarOperacao]);

  return {
    elementos,
    elementoDestacado,
    mensagemAcao,
    historico,
    capacidadeMaxima,
    executarMetodo,
    setElementoDestacado,
    setMensagemAcao,
    registrarOperacao,
  };
}
```

### PASSO 4: Componente de Visualização

Use **Framer Motion** para animações:

```tsx
// src/components/DataStructures/Fila/VisualizacaoFila.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFila } from './useFila';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Eye } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';

const VisualizacaoFila: React.FC = () => {
  const navigate = useNavigate();
  const { elementos, elementoDestacado, mensagemAcao, executarMetodo } = useFila();
  const [metodoAtual, setMetodoAtual] = useState<string | null>(null);
  const [valor, setValor] = useState('');

  const metodos = [
    { id: 'enqueue', nome: 'Enfileirar', icon: ArrowRight },
    { id: 'dequeue', nome: 'Desenfileirar', icon: ArrowRight },
    { id: 'front', nome: 'Ver Primeiro', icon: Eye },
    // ... adicionar outros
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-6">
      <Button onClick={() => navigate('/')}>
        <ChevronLeft /> Voltar
      </Button>

      <h1 className="text-4xl font-bold text-white my-4">Fila (Queue) - FIFO</h1>

      {/* Visualização horizontal da fila */}
      <Card className="p-6 bg-slate-900/50">
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="text-sm text-gray-400">Início →</div>
          
          <AnimatePresence>
            {elementos.map((elemento, index) => (
              <motion.div
                key={elemento.id}
                initial={{ opacity: 0, x: -100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: elementoDestacado === elemento.id ? 1.2 : 1,
                }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: 'spring' }}
                className={`
                  p-4 rounded-lg font-bold
                  ${elementoDestacado === elemento.id
                    ? 'bg-yellow-400 text-black'
                    : index === 0
                    ? 'bg-emerald-500'
                    : 'bg-slate-700'
                  }
                `}
              >
                {elemento.value}
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="text-sm text-gray-400">← Final</div>
        </div>
      </Card>

      {/* Controles e histórico ... */}
    </div>
  );
};

export default VisualizacaoFila;
```

---

## 🎨 ANIMAÇÕES ENCANTADORAS

### Técnicas com Framer Motion:

```tsx
// 1. Entrada com Spring
<motion.div
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: 'spring', stiffness: 500 }}
>

// 2. Destaque pulsante
<motion.div
  animate={{
    scale: [1, 1.1, 1],
    boxShadow: ['0 0 0 0 rgba(0,0,0,0)', '0 0 0 8px rgba(59,130,246,0.2)', '0 0 0 0 rgba(0,0,0,0)']
  }}
  transition={{ duration: 1, repeat: Infinity }}
>

// 3. Lista com Stagger
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>

// 4. Arrastar (para Árvore/Grafo)
<motion.div drag dragConstraints={{ left: 0, right: 300 }} />
```

---

## 🎯 CHECKLIST POR ESTRUTURA

### FILA (Queue - FIFO)
- [ ] Criar arquivos base (fila.ts, metodosFila.ts, useFila.ts)
- [ ] Implementar 12 métodos
- [ ] Visualização horizontal animada
- [ ] Destacar primeiro e último elemento
- [ ] Testar todas as operações

### LISTA LIGADA
- [ ] Criar struct Node com { value, next, id }
- [ ] Métodos: inserir início/fim/posição, remover, buscar, inverter
- [ ] Visualização com setas conectando nós
- [ ] Animação de percorrer lista

### LISTA DUPLA
- [ ] Similar a Ligada, mas Node tem { value, prev, next, id }
- [ ] Métodos bidirecionais
- [ ] Setas duplas na visualização

### ÁRVORE BINÁRIA
- [ ] Node: { value, left, right, id }
- [ ] Métodos: inserir, remover, buscar, travessias (in/pre/post-order)
- [ ] Visualização em níveis (use D3.js ou SVG)
- [ ] Animação de percorrer níveis

### GRAFO
- [ ] Representação: lista de adjacência
- [ ] Métodos: addVertice, addAresta, BFS, DFS
- [ ] Visualização com nós e arestas
- [ ] Animação de algoritmos de busca

---

## 🚀 COMANDOS ÚTEIS

```bash
# Testar uma estrutura específica
npm test -- Fila

# Build de produção
npm run build

# Lint
npm run lint

# Desenvolvimento
npm start
```

---

## 📚 RECURSOS

- **Framer Motion**: https://www.framer.com/motion/
- **Lucide Icons**: https://lucide.dev/
- **Tailwind**: https://tailwindcss.com/docs

---

**Desenvolvido com ❤️ para educar sobre Estruturas de Dados**
