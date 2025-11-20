# 🏛️ Arquitetura do Projeto

> Decisões arquiteturais, padrões e estrutura técnica do aplicativo de Estruturas de Dados.

---

## 📐 Visão Geral

Este projeto segue uma **arquitetura em camadas** com separação clara de responsabilidades, seguindo princípios de Clean Architecture e SOLID.

### Princípios Fundamentais

1. **Separação de Responsabilidades** - Cada camada tem um propósito específico
2. **Imutabilidade** - Estado nunca é mutado diretamente
3. **Type Safety** - TypeScript strict mode em todo o código
4. **Testabilidade** - Código facilmente testável em isolamento
5. **Escalabilidade** - Estrutura preparada para crescimento

---

## 🏗️ Camadas da Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                      UI LAYER (React)                    │
│  VisualizacaoXXX.tsx, XXXCell.tsx, InformacoesXXX.tsx   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT LAYER                 │
│         useXXX.ts (Custom Hooks com useReducer)          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    VALIDATION LAYER                      │
│      validationUtils.ts, arrayUtils.ts, etc.            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                         │
│         Classes Core (pilha.ts, vetor.ts, etc.)          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Padrões Arquiteturais

### 1. Padrão de Estrutura de Dados

Cada estrutura segue o **Data Structure Pattern** estabelecido:

```
DataStructure/
├── [nome].ts                 # Classe core (Domain)
├── use[Nome].ts              # Hook React (State Management)
├── metodos[Nome].ts          # Metadados (Configuration)
├── Visualizacao[Nome].tsx    # UI principal
├── [Nome]Cell.tsx            # Componente de célula
├── Informacoes[Nome].tsx     # Painel informativo
├── use[Nome].test.ts         # Testes do hook
├── [Nome]Cell.test.tsx       # Testes do componente
└── index.ts                  # Barrel export
```

**Benefícios:**
- Consistência entre estruturas
- Facilita onboarding de novos desenvolvedores
- Simplifica manutenção
- Permite reutilização de código

### 2. State Management com useReducer

**Por que useReducer em vez de useState?**

```typescript
// ❌ useState - Difícil de testar e debug
const [elementos, setElementos] = useState([]);
const push = (valor) => {
  setElementos([...elementos, valor]);
};

// ✅ useReducer - Testável, previsível, com histórico
const reducer = (state, action) => {
  switch (action.type) {
    case 'push':
      return {
        ...state,
        elementos: [...state.elementos, action.payload],
        historico: [...state.historico, { operacao: 'push', timestamp: Date.now() }]
      };
  }
};
```

**Vantagens:**
- ✅ Estado centralizado
- ✅ Ações explícitas e testáveis
- ✅ Facilita debugging (Redux DevTools)
- ✅ Histórico de operações built-in

### 3. Validação em Camadas

```
Input do Usuário
    │
    ▼
Camada 1: validationUtils (Tipos e Ranges)
    │
    ▼
Camada 2: arrayUtils (Operações de Array)
    │
    ▼
Camada 3: Classe Core (Regras de Negócio)
    │
    ▼
Camada 4: Hook (Contexto e Estado)
    │
    ▼
Camada 5: UI (Feedback Visual)
```

**Exemplo:**
```typescript
// Camada 1: validationUtils
validarNumero(valor) → { valido: true/false, mensagem }

// Camada 2: Classe
if (elementos.length >= capacidade) throw Error()

// Camada 3: Hook
if (state.elementos.length === 0) throw Error()

// Camada 4: UI
{erro && <div role="alert">{erro}</div>}
```

---

## 📊 Fluxo de Dados

### Push em Pilha - Exemplo Completo

```
1. Usuário clica em "Push"
           │
           ▼
2. UI chama executarMetodo('push', valor)
           │
           ▼
3. Hook valida valor (validationUtils)
           │
           ▼
4. Hook dispara action { type: 'push', payload: { value, capacidadeInicial } }
           │
           ▼
5. Reducer processa action
           │
           ▼
6. Reducer retorna novo estado (imutável)
           │
           ▼
7. React re-renderiza UI com novo estado
           │
           ▼
8. Animação de feedback visual (Framer Motion)
           │
           ▼
9. Histórico é atualizado
           │
           ▼
10. Timeout remove destaque após 1.5s
```

---

## 🧩 Decisões Técnicas

### Por que React + TypeScript?

- **React**: Biblioteca comprovada, grande comunidade, performance
- **TypeScript**: Type safety, melhor DX, menos bugs em produção
- **Strict Mode**: Máxima segurança de tipos

### Por que Vite em vez de CRA/Webpack?

- ⚡ **10x mais rápido** em desenvolvimento
- 🔥 **HMR instantâneo**
- 📦 **Build otimizado** com Rollup
- 🎯 **ESM nativo** no browser

### Por que TailwindCSS?

- 🎨 **Utilitário** - Classes compostas
- 📱 **Mobile-first** - Responsivo por padrão
- 🎭 **Customizável** - Design tokens
- 📦 **Tree-shaking** - CSS mínimo em produção

### Por que Jest + Testing Library?

- ✅ **Padrão da indústria**
- 🧪 **Testes focados no usuário** (não em implementação)
- 📊 **Cobertura de código** built-in
- 🔍 **Debugging** excelente

---

## 🔐 Segurança

### Prevenção de Vulnerabilidades

**1. Sanitização de Inputs**
```typescript
// ✅ Validação estrita
validarNumero(valor) {
  if (!Number.isInteger(valor)) throw Error();
  if (valor < -1000 || valor > 1000) throw Error();
}
```

**2. Type Safety**
```typescript
// ✅ TypeScript previne undefined/null
interface Props {
  value: number; // Nunca undefined
}
```

**3. Imutabilidade**
```typescript
// ✅ Previne mutações acidentais
const novosElementos = [...elementos]; // Cópia
```

---

## 📈 Performance

### Otimizações Implementadas

1. **React.memo** (quando necessário)
2. **useCallback** para funções estáveis
3. **useMemo** para cálculos pesados
4. **Code splitting** com lazy loading (futuro)
5. **Tree shaking** do TailwindCSS

### Métricas de Performance

```
Lighthouse Score (Target):
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90
```

---

## 🔄 Escalabilidade

### Preparado para Crescimento

**Estrutura modular:**
- Cada estrutura é independente
- Componentes UI compartilhados
- Utilitários reutilizáveis
- Testes isolados

**Futuras melhorias:**
- [ ] Server-Side Rendering (SSR)
- [ ] Progressive Web App (PWA)
- [ ] Web Workers para operações pesadas
- [ ] Virtual scrolling para listas grandes
- [ ] Lazy loading de estruturas

---

## 📚 Referências

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**Ver também:**
- [ADR-0001: Stack Implementation](./docs/ADR/ADR-0001-stack-implementation.md)
- [ADR-0002: Testing Strategy](./docs/ADR/ADR-0002-testing-strategy.md)
- [API Documentation](./docs/API/API-OVERVIEW.md)

---

**[⬆ Voltar ao topo](#-arquitetura-do-projeto)**
