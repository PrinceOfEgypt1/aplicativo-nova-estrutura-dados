# 📚 API Documentation

> Documentação completa das APIs públicas das estruturas de dados.

---

## 🗂️ Estruturas Disponíveis

### ✅ Vetor

**Importação:**
```typescript
import { Vetor, useVetor } from '@/components/DataStructures/Vetor';
```

**API da Classe:**
```typescript
class Vetor {
  constructor(capacidadeInicial?: number)

  // Métodos básicos
  inserir(indice: number, elemento: number): void
  remover(indice: number): number
  buscar(elemento: number): number
  obter(indice: number): number
  definir(indice: number, elemento: number): void

  // Informação
  tamanho(): number
  estaVazio(): boolean

  // Manipulação
  limpar(): void
  ordenar(): void
  inverter(): void

  // Final
  adicionarNoFinal(elemento: number): void
  removerDoFinal(): number
  estender(elementos: number[]): void

  // Busca
  fatiar(inicio: number, fim?: number): number[]
  contem(elemento: number): boolean
  indiceDe(elemento: number): number
  paraArray(): number[]
}
```

**Hook React:**
```typescript
function useVetor(capacidadeInicial?: number) {
  return {
    elementos: VectorElement[],
    executarMetodo: (metodo: string, ...args) => Promise<void>,
    mensagemAcao: string | null,
    historico: OperationHistory[],
    indiceDestacado: number | null,
    capacidadeMaxima: number,
    setIndiceDestacado: (indice: number | null) => void,
    setMensagemAcao: (mensagem: string | null) => void,
    registrarOperacao: (operacao: string, status?: OperationState) => void
  }
}
```

---

### ✅ Pilha (Stack)

**Importação:**
```typescript
import { Pilha, usePilha } from '@/components/DataStructures/Pilha';
```

**API da Classe:**
```typescript
class Pilha {
  constructor(capacidadeInicial?: number)

  // Operações principais
  push(elemento: number): void
  pop(): number
  peek(): number

  // Informação
  tamanho(): number
  estaVazio(): boolean

  // Manipulação
  limpar(): void

  // Busca
  contem(elemento: number): boolean
  buscar(elemento: number): number  // Retorna distância do topo

  // Utilitários
  paraArray(): number[]
  capacidadeMaxima(): number
}
```

**Hook React:**
```typescript
function usePilha(capacidadeInicial?: number) {
  return {
    elementos: StackElement[],
    executarMetodo: (metodo: string, valor?: string | number) => Promise<void>,
    mensagemAcao: string | null,
    historico: OperationHistory[],
    indiceDestacado: number | null,
    capacidadeMaxima: number,
    setIndiceDestacado: (indice: number | null) => void,
    setMensagemAcao: (mensagem: string | null) => void,
    registrarOperacao: (operacao: string, status?: OperationState) => void
  }
}
```

**Tipos:**
```typescript
interface StackElement {
  value: number;
  id: string;
}

enum OperationState {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  ERROR = 'error'
}

interface OperationHistory {
  operacao: string;
  timestamp: number;
  status: OperationState;
}
```

---

### ✅ Fila (Queue)

**Importação:**
```typescript
import { Fila, useFila } from '@/components/DataStructures/Fila';
```

**API da Classe:**
```typescript
class Fila {
  constructor(capacidadeInicial?: number)

  // Operações principais
  enqueue(elemento: number): void
  dequeue(): number
  primeiro(): number
  ultimo(): number

  // Informação
  tamanho(): number
  estaVazio(): boolean

  // Manipulação
  limpar(): void

  // Busca
  contem(elemento: number): boolean

  // Utilitários
  paraArray(): number[]
  capacidadeMaxima(): number
}
```

**Hook React:**
```typescript
function useFila(capacidadeInicial?: number) {
  return {
    elementos: QueueElement[],
    executarMetodo: (metodo: string, valor?: string | number) => Promise<void>,
    mensagemAcao: string | null,
    historico: OperationHistory[],
    indiceDestacado: number | null,
    capacidadeMaxima: number,
    setIndiceDestacado: (indice: number | null) => void,
    setMensagemAcao: (mensagem: string | null) => void,
    registrarOperacao: (operacao: string, status?: OperationState) => void
  }
}
```

**Tipos:**
```typescript
interface QueueElement {
  value: number;
  id: string;
}

enum OperationState {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  ERROR = 'error'
}

interface OperationHistory {
  operacao: string;
  timestamp: number;
  status: OperationState;
}
```

---

## 🔧 Utilitários

### validationUtils

```typescript
// Valida números
validarNumero(valor: any): {
  valido: boolean;
  valor?: number;
  mensagem: string;
}

// Valida índices
validarIndice(
  indice: number,
  tamanho: number,
  capacidade: number
): {
  valido: boolean;
  mensagem: string;
}
```

### arrayUtils

```typescript
// Inserir elemento
inserir(array: number[], indice: number, elemento: number): number[]

// Remover elemento
remover(array: number[], indice: number): number[]

// Buscar elemento
buscar(array: number[], elemento: number): number

// Validar número inteiro
validarNumeroInteiro(valor: number): void
```

---

## 🎨 Componentes UI

### Button

```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}
```

### Card

```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
}
```

---

## 📌 Exemplos de Uso

### Uso da Classe Pilha

```typescript
import { Pilha } from '@/components/DataStructures/Pilha';

const pilha = new Pilha(10);  // Capacidade: 10

// Adicionar elementos
pilha.push(5);
pilha.push(10);
pilha.push(15);

// Visualizar topo
const topo = pilha.peek();  // 15

// Remover topo
const removido = pilha.pop();  // 15

// Buscar elemento
const posicao = pilha.buscar(5);  // 2 (distância do topo)

// Verificar se contém
const contem = pilha.contem(10);  // true

// Tamanho
const tamanho = pilha.tamanho();  // 2

// Limpar
pilha.limpar();
```

### Uso do Hook usePilha

```typescript
import { usePilha } from '@/components/DataStructures/Pilha';

function MeuComponente() {
  const {
    elementos,
    executarMetodo,
    mensagemAcao,
    historico
  } = usePilha(20);

  const handlePush = async () => {
    try {
      await executarMetodo('push', 42);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handlePush}>Push 42</button>
      {mensagemAcao && <p>{mensagemAcao}</p>}
      <ul>
        {elementos.map(el => (
          <li key={el.id}>{el.value}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Uso da Classe Fila

```typescript
import { Fila } from '@/components/DataStructures/Fila';

const fila = new Fila(10);  // Capacidade: 10

// Adicionar elementos
fila.enqueue(5);
fila.enqueue(10);
fila.enqueue(15);

// Visualizar frente
const frente = fila.primeiro();  // 5

// Visualizar final
const final = fila.ultimo();  // 15

// Remover da frente (FIFO)
const removido = fila.dequeue();  // 5

// Verificar se contém
const contem = fila.contem(10);  // true

// Tamanho
const tamanho = fila.tamanho();  // 2

// Limpar
fila.limpar();
```

### Uso do Hook useFila

```typescript
import { useFila } from '@/components/DataStructures/Fila';

function MeuComponente() {
  const {
    elementos,
    executarMetodo,
    mensagemAcao,
    historico
  } = useFila(20);

  const handleEnqueue = async () => {
    try {
      await executarMetodo('enqueue', 42);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleEnqueue}>Enqueue 42</button>
      {mensagemAcao && <p>{mensagemAcao}</p>}
      <ul>
        {elementos.map(el => (
          <li key={el.id}>{el.value}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ⚠️ Tratamento de Erros

Todas as operações podem lançar erros:

```typescript
try {
  pilha.push(valor);
} catch (error) {
  if (error.message === 'A pilha está cheia') {
    // Tratar pilha cheia
  } else if (error.message === 'O valor deve ser um número inteiro') {
    // Tratar valor inválido
  }
}
```

**Erros comuns da Pilha:**
- `"A pilha está cheia"` - Capacidade excedida
- `"Pilha está vazia"` - Pop/Peek em pilha vazia
- `"O valor deve ser um número inteiro"` - Valor não é inteiro
- `"O valor deve estar entre -1000 e 1000"` - Fora do range

**Erros comuns da Fila:**
- `"A fila está cheia"` - Capacidade excedida
- `"Fila está vazia"` - Dequeue/Primeiro/Ultimo em fila vazia
- `"Apenas números inteiros são permitidos"` - Valor não é inteiro
- `"O valor deve estar entre -1000 e 1000"` - Fora do range

---

## 📝 Notas

- Todos os valores são números inteiros entre `-1000` e `1000`
- Capacidade padrão é `20`
- Operações são **imutáveis** (não modificam o estado diretamente)
- IDs únicos (UUID) são gerados automaticamente para elementos

---

**[⬆ Voltar ao topo](#-api-documentation)**
