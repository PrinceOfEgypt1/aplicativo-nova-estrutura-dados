# 🛠️ Guia de Desenvolvimento

> Documentação completa para desenvolvedores que desejam contribuir com o projeto.

---

## 📋 Índice

- [Configuração do Ambiente](#-configuração-do-ambiente)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Padrões de Código](#-padrões-de-código)
- [Implementando Nova Estrutura](#-implementando-nova-estrutura)
- [Sistema de Testes](#-sistema-de-testes)
- [Componentes e UI](#-componentes-e-ui)
- [Git Workflow](#-git-workflow)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Configuração do Ambiente

### Pré-requisitos

```bash
# Versões mínimas requeridas
Node.js >= 18.0.0
npm >= 9.0.0 (ou pnpm >= 8.0.0)
Git >= 2.30.0
```

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/PrinceOfEgypt1/aplicativo-nova-estrutura-dados.git
cd aplicativo-nova-estrutura-dados

# 2. Instale as dependências
npm install
# ou
pnpm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Execute os testes
npm test
```

### Configuração do Editor

**VS Code (Recomendado)**

Extensões recomendadas:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "orta.vscode-jest",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

**Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 📁 Estrutura do Projeto

### Organização de Pastas

```
src/
├── components/
│   ├── DataStructures/      # 🎯 ESTRUTURAS DE DADOS
│   │   ├── Vetor/           # Referência de padrão
│   │   │   ├── vetor.ts              # Classe core
│   │   │   ├── useVetor.ts           # Hook React
│   │   │   ├── metodosVetor.ts       # Metadados
│   │   │   ├── VisualizacaoVetor.tsx # UI principal
│   │   │   ├── VectorCell.tsx        # Componente de célula
│   │   │   ├── InformacoesVetor.tsx  # Painel de info
│   │   │   ├── useVetor.test.ts      # Testes do hook
│   │   │   ├── VectorCell.test.tsx   # Testes do componente
│   │   │   └── index.ts              # Barrel export
│   │   ├── Pilha/           # Implementação recente
│   │   └── [NovaEstrutura]/ # Template para novas
│   ├── shared/              # Componentes compartilhados
│   └── ui/                  # Componentes UI básicos
├── pages/                   # Páginas da aplicação
├── context/                 # Context API
├── hooks/                   # Custom hooks
├── utils/                   # Utilitários
├── validations/             # Schemas de validação
├── types/                   # Definições TypeScript
└── styles/                  # Estilos globais
```

### Padrão de Arquivo de Estrutura de Dados

Cada estrutura deve seguir este padrão (baseado em Vetor/Pilha):

```
NovaEstrutura/
├── novaEstrutura.ts           # Classe core com lógica
├── useNovaEstrutura.ts        # Hook React com useReducer
├── metodosNovaEstrutura.ts    # Metadados e interfaces
├── VisualizacaoNovaEstrutura.tsx  # UI principal
├── [Nome]Cell.tsx             # Componente de visualização
├── InformacoesNovaEstrutura.tsx   # Painel educacional
├── useNovaEstrutura.test.ts   # Testes do hook
├── [Nome]Cell.test.tsx        # Testes do componente
└── index.ts                   # Barrel export
```

---

## 📝 Padrões de Código

### TypeScript

**Sempre use TypeScript strict mode:**

```typescript
// ✅ BOM - Tipos explícitos
interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const Component: React.FC<Props> = ({ value, onChange }) => {
  // ...
};

// ❌ RUIM - Tipos implícitos
const Component = (props: any) => {
  // ...
};
```

**Use TSDoc para documentação:**

```typescript
/**
 * Adiciona um elemento no topo da pilha
 *
 * @param elemento - Valor a ser adicionado (número inteiro entre -1000 e 1000)
 * @throws {Error} Se a pilha estiver cheia ou o valor for inválido
 *
 * @example
 * ```typescript
 * pilha.push(42);
 * ```
 */
push(elemento: number): void {
  // implementação
}
```

### Nomenclatura

```typescript
// Classes: PascalCase
class Pilha { }

// Interfaces: PascalCase com "I" opcional
interface StackElement { }
interface Props { }

// Tipos: PascalCase
type GrupoMetodo = 'basicos' | 'informacao';

// Funções/Métodos: camelCase
function executarMetodo() { }

// Constantes: camelCase ou UPPER_SNAKE_CASE
const metodosDisponiveis = [];
const MAX_CAPACITY = 100;

// Componentes React: PascalCase
const StackCell: React.FC<Props> = () => { };

// Arquivos:
// - Componentes: PascalCase.tsx (StackCell.tsx)
// - Hooks: camelCase.ts (usePilha.ts)
// - Classes: camelCase.ts (pilha.ts)
// - Utilitários: camelCase.ts (validationUtils.ts)
```

### Imutabilidade

```typescript
// ✅ BOM - Imutável
const novosElementos = [...state.elementos, novoElemento];

// ✅ BOM - Imutável com slice
const semUltimo = state.elementos.slice(0, -1);

// ❌ RUIM - Mutação direta
state.elementos.push(novoElemento);
```

### Validação

Sempre valide em múltiplas camadas:

```typescript
// 1. Validação de tipo (validationUtils)
const validacao = validationUtils.validarNumero(valor);
if (!validacao.valido) {
  throw new Error(validacao.mensagem);
}

// 2. Validação de negócio (classe)
if (this.elementos.length >= this.capacidade) {
  throw new Error('A pilha está cheia');
}

// 3. Validação de contexto (hook)
if (state.elementos.length === 0) {
  throw new Error('Pilha está vazia');
}
```

---

## 🏗️ Implementando Nova Estrutura

### Passo a Passo Completo

#### **1. Criar a Classe Core**

```typescript
// src/components/DataStructures/Fila/fila.ts

/**
 * Classe Fila (Queue)
 *
 * Estrutura de dados FIFO (First In, First Out)
 */
export class Fila {
  private elementos: number[];
  private capacidade: number;

  constructor(capacidadeInicial: number = 20) {
    this.elementos = [];
    this.capacidade = capacidadeInicial;
  }

  /**
   * Adiciona elemento no final da fila
   */
  enqueue(elemento: number): void {
    if (this.elementos.length >= this.capacidade) {
      throw new Error('A fila está cheia');
    }
    this.validarNumeroInteiro(elemento);
    this.elementos.push(elemento);
  }

  /**
   * Remove e retorna o primeiro elemento
   */
  dequeue(): number {
    if (this.estaVazio()) {
      throw new Error('Fila está vazia');
    }
    return this.elementos.shift()!;
  }

  // ... demais métodos
}
```

#### **2. Criar Metadados**

```typescript
// src/components/DataStructures/Fila/metodosFila.ts

export interface MetodoInfo {
  titulo: string;
  descricao: string;
  requisitos: string[];
}

export const metodosInfo: Record<string, MetodoInfo> = {
  enqueue: {
    titulo: 'Enqueue',
    descricao: 'Adiciona elemento no final da fila',
    requisitos: ['Solicitar um valor']
  },
  // ... demais métodos
};
```

#### **3. Criar Hook React**

```typescript
// src/components/DataStructures/Fila/useFila.ts

import { useReducer, useCallback } from 'react';

export function useFila(capacidadeInicial: number = 20) {
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'enqueue':
        // Lógica de adicionar
        break;
      case 'dequeue':
        // Lógica de remover
        break;
      // ... demais casos
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const executarMetodo = useCallback(async (metodo: string, valor?: any) => {
    try {
      // Validação e execução
    } catch (error) {
      // Tratamento de erro
    }
  }, []);

  return {
    elementos: state.elementos,
    executarMetodo,
    // ... demais retornos
  };
}
```

#### **4. Criar Componente de Visualização**

```typescript
// src/components/DataStructures/Fila/VisualizacaoFila.tsx

const VisualizacaoFila: React.FC = () => {
  const {
    elementos,
    executarMetodo,
    mensagemAcao,
    historico
  } = useFila();

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Cabeçalho */}
      {/* Visualização */}
      {/* Grid de métodos */}
      {/* Formulário */}
      {/* Histórico */}
    </div>
  );
};
```

#### **5. Criar Testes**

```typescript
// src/components/DataStructures/Fila/useFila.test.ts

describe('useFila', () => {
  describe('enqueue', () => {
    it('deve adicionar elemento no final', async () => {
      const { result } = renderFilaHook();
      await act(async () => {
        await result.current.executarMetodo('enqueue', 10);
      });
      expect(result.current.elementos[0].value).toBe(10);
    });
  });

  // ... mínimo 20 testes
});
```

#### **6. Integrar ao Roteamento**

```typescript
// src/pages/StructurePage.tsx

const renderVisualizacao = () => {
  switch (tipo) {
    case 'vetor':
      return <VisualizacaoVetor />;
    case 'pilha':
      return <VisualizacaoPilha />;
    case 'fila':  // ← Adicionar aqui
      return <VisualizacaoFila />;
    default:
      return <MensagemDesenvolvimento />;
  }
};
```

---

## 🧪 Sistema de Testes

### Estrutura de Testes

**Cada estrutura deve ter no mínimo:**

- ✅ Testes de inicialização
- ✅ Testes de cada método (happy path)
- ✅ Testes de validação de erros
- ✅ Testes de edge cases
- ✅ Testes de integração
- ✅ Testes de componentes

### Exemplo de Teste Completo

```typescript
import { renderHook, act } from '@testing-library/react';
import { usePilha } from './usePilha';

const renderPilhaHook = (capacidadeInicial?: number) =>
  renderHook(() => usePilha(capacidadeInicial), { wrapper: Wrapper });

describe('usePilha', () => {
  describe('Inicialização', () => {
    it('deve inicializar com estado correto', () => {
      const { result } = renderPilhaHook();
      expect(result.current.elementos).toEqual([]);
      expect(result.current.capacidadeMaxima).toBe(20);
    });
  });

  describe('push', () => {
    it('deve adicionar elemento ao topo', async () => {
      const { result } = renderPilhaHook();
      await act(async () => {
        await result.current.executarMetodo('push', 10);
      });
      expect(result.current.elementos[0].value).toBe(10);
    });

    it('deve lançar erro ao exceder capacidade', async () => {
      const { result } = renderPilhaHook(1);
      await act(async () => {
        await result.current.executarMetodo('push', 1);
      });
      await expect(
        act(async () => {
          await result.current.executarMetodo('push', 2);
        })
      ).rejects.toThrow('A pilha está cheia');
    });
  });
});
```

### Comandos de Teste

```bash
# Executar todos os testes
npm test

# Executar testes em watch mode
npm test -- --watch

# Executar testes com cobertura
npm test -- --coverage

# Executar testes de uma estrutura específica
npm test -- Pilha
npm test -- Vetor

# Executar testes de um arquivo específico
npm test -- usePilha.test.ts
```

---

## 🎨 Componentes e UI

### Sistema de Cores por Estrutura

```typescript
// Vetor: Purple
className="bg-purple-600 hover:bg-purple-500"

// Pilha: Rose
className="bg-rose-600 hover:bg-rose-500"

// Fila: Blue (sugestão)
className="bg-blue-600 hover:bg-blue-500"

// Lista Ligada: Green (sugestão)
className="bg-green-600 hover:bg-green-500"
```

### Padrão de Componente de Célula

```typescript
interface CellProps {
  value: number;
  indice: number;
  destacado: boolean;
  // Props específicas da estrutura
}

const Cell: React.FC<CellProps> = ({ value, indice, destacado }) => {
  return (
    <li
      className={`
        rounded relative flex items-center justify-center
        text-white font-semibold text-lg
        transition-all duration-300
        ${destacado ? 'ring-4 ring-yellow-400 shadow-lg scale-105' : ''}
      `}
      data-testid={`cell-${indice}`}
      aria-label={`Elemento ${indice}, valor ${value}`}
      role="listitem"
    >
      <span className="absolute bottom-1 left-2 text-xs">{indice}</span>
      <span>{value}</span>
    </li>
  );
};
```

### Acessibilidade

```typescript
// ✅ Sempre use ARIA labels
<button aria-label="Executar operação">
  Executar
</button>

// ✅ Roles apropriados
<ul role="list">
  <li role="listitem">...</li>
</ul>

// ✅ Mensagens de erro com role="alert"
<div role="alert" className="text-red-400">
  {mensagemErro}
</div>

// ✅ Navegação por teclado
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

---

## 🔄 Git Workflow

### Branches

```bash
# Branch principal
main (ou master)

# Branches de desenvolvimento
feature/nome-da-feature
fix/nome-do-bug
docs/nome-da-doc
refactor/nome-do-refactor
test/nome-do-teste
```

### Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato
<tipo>: <descrição curta>

[corpo opcional]

[rodapé opcional]

# Tipos
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
style:    Formatação
refactor: Refatoração
test:     Testes
chore:    Manutenção

# Exemplos
feat: Implementa estrutura de dados Fila completa

fix: Corrige validação de índice em Vetor

docs: Adiciona guia de desenvolvimento

test: Adiciona testes para método push da Pilha
```

### Pull Requests

**Template de PR:**

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Nova funcionalidade (feat)
- [ ] Correção de bug (fix)
- [ ] Documentação (docs)
- [ ] Refatoração (refactor)
- [ ] Testes (test)

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Sem warnings de TypeScript
- [ ] Commit messages seguem Conventional Commits

## Screenshots (se aplicável)
...

## Testes
Descreva os testes realizados
```

---

## 🔧 Troubleshooting

### Problemas Comuns

#### **1. Erro de Tipos TypeScript**

```bash
# Limpar cache do TypeScript
rm -rf node_modules/.cache
npx tsc --noEmit

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

#### **2. Testes Falhando**

```bash
# Limpar cache do Jest
npm test -- --clearCache

# Executar testes em modo verbose
npm test -- --verbose

# Executar apenas um teste específico
npm test -- -t "nome do teste"
```

#### **3. Build Falhando**

```bash
# Verificar erros de TypeScript
npx tsc --noEmit

# Verificar erros de ESLint
npx eslint src/

# Build com logs detalhados
npm run build -- --debug
```

#### **4. Hot Reload Não Funcionando**

```bash
# Reiniciar o servidor
Ctrl+C
npm run dev

# Limpar cache do Vite
rm -rf node_modules/.vite
npm run dev
```

---

## 📚 Recursos Adicionais

### Documentação de Referência

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

### Ferramentas Úteis

- **TypeScript Playground**: [https://www.typescriptlang.org/play](https://www.typescriptlang.org/play)
- **Tailwind Play**: [https://play.tailwindcss.com/](https://play.tailwindcss.com/)
- **Can I Use**: [https://caniuse.com/](https://caniuse.com/)

---

## 🤝 Suporte

Se tiver dúvidas ou problemas:

1. Verifique a [documentação completa](./README.md)
2. Leia os [ADRs](./docs/ADR/) para entender decisões arquiteturais
3. Abra uma [Issue](https://github.com/PrinceOfEgypt1/aplicativo-nova-estrutura-dados/issues)
4. Entre em contato via [Discussions](https://github.com/PrinceOfEgypt1/aplicativo-nova-estrutura-dados/discussions)

---

**[⬆ Voltar ao topo](#-guia-de-desenvolvimento)**
