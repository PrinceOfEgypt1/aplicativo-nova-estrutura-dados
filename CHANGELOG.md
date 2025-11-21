# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/spec/v2.0.0.html).

## [Não Lançado]

### Em Desenvolvimento
- Sistema de animações avançado
- Design System completo
- Testes para Lista Ligada

---

## [0.4.0] - 2025-11-21

### ✨ Adicionado
- **Lista Ligada (Linked List)** - Estrutura de dados dinâmica completa com 12 métodos
  - `inserirNoInicio(valor)` - Insere nó no início O(1)
  - `inserirNoFim(valor)` - Insere nó no final O(n)
  - `inserirNaPosicao(indice, valor)` - Insere em posição específica O(n)
  - `removerDoInicio()` - Remove do início O(1)
  - `removerDoFim()` - Remove do final O(n)
  - `removerDaPosicao(indice)` - Remove de posição específica O(n)
  - `buscar(valor)` - Busca elemento e retorna índice O(n)
  - `obterPorIndice(indice)` - Obtém valor por índice O(n)
  - `tamanho()` - Retorna número de nós
  - `estaVazia()` - Verifica se está vazia
  - `limpar()` - Remove todos os nós
  - `obterCabeca()` - Retorna valor da cabeça
- **Componentes de UI**:
  - `NoListaLigada.tsx` - Componente de nó com setas de ligação (→)
  - `VisualizacaoListaLigada.tsx` - Interface horizontal com ponteiros visuais
  - `InformacoesListaLigada.tsx` - Documentação educacional completa
- **Arquitetura**:
  - Classe `No` com propriedades `valor` e `proximo`
  - Classe `ListaLigada` com ponteiro cabeça
  - Hook `useListaLigada` com useReducer (12 actions)
  - Metadados organizados em 5 grupos (inserção, remoção, busca, informação, manipulação)
- **Documentação**:
  - TSDoc completo em todos os arquivos
  - ADR-0004: Decisão de implementação da Lista Ligada
  - Atualização da API-OVERVIEW.md com 12 métodos
  - Seção de complexidade de tempo (Big O) no painel informativo

### 🔧 Modificado
- `StructurePage.tsx` - Adicionada rota `/estrutura/lista-ligada`
- `README.md` - Atualizado progresso para 50% (4/8 estruturas)

### 🎨 Design
- Cores verdes (green-600) para diferenciação visual
- Layout horizontal com setas → entre nós e → null no final
- Indicador "CABEÇA" em cyan no primeiro nó
- Inputs duplos para métodos que requerem índice + valor

---

## [0.3.0] - 2025-11-20

### ✨ Adicionado
- **Fila (Queue)** - Estrutura de dados completa com 8 métodos FIFO
  - `enqueue(valor)` - Adiciona elemento no final
  - `dequeue()` - Remove e retorna da frente
  - `primeiro()` - Visualiza a frente sem remover
  - `ultimo()` - Visualiza o final sem remover
  - `tamanho()` - Retorna número de elementos
  - `estaVazio()` - Verifica se está vazia
  - `limpar()` - Remove todos os elementos
  - `contem(valor)` - Busca elemento
- **Componentes de UI**:
  - `QueueCell.tsx` - Célula com layout horizontal e indicadores de frente/final
  - `VisualizacaoFila.tsx` - Interface principal com visualização horizontal
  - `InformacoesFila.tsx` - Painel informativo educacional
- **Testes**:
  - 45+ casos de teste para hook useFila
  - 30+ casos de teste para componente QueueCell
  - Cobertura de validações, erros e cenários FIFO complexos
- **Documentação**:
  - TSDoc completo em todos os arquivos
  - ADR-0003: Decisão de implementação da Fila
  - Atualização da API-OVERVIEW.md com métodos da Fila

### 🔧 Modificado
- `StructurePage.tsx` - Atualizado para incluir roteamento para Fila
- `README.md` - Atualizado progresso (45% implementado)

---

## [0.2.0] - 2025-11-20

### ✨ Adicionado
- **Pilha (Stack)** - Estrutura de dados completa com 8 métodos LIFO
  - `push(valor)` - Adiciona elemento no topo
  - `pop()` - Remove e retorna o topo
  - `peek()` - Visualiza o topo sem remover
  - `tamanho()` - Retorna número de elementos
  - `estaVazio()` - Verifica se está vazia
  - `limpar()` - Remove todos os elementos
  - `contem(valor)` - Busca elemento
  - `buscar(valor)` - Retorna distância do topo
- **Componentes de UI**:
  - `StackCell.tsx` - Célula com layout vertical e indicador de topo
  - `VisualizacaoPilha.tsx` - Interface principal interativa
  - `InformacoesPilha.tsx` - Painel informativo educacional
- **Testes**:
  - 40+ casos de teste para hook usePilha
  - 25+ casos de teste para componente StackCell
  - Cobertura de validações, erros e cenários complexos
- **Documentação**:
  - TSDoc completo em todos os arquivos
  - Comentários explicativos em português
  - README.md completo e profissional
  - CHANGELOG.md (este arquivo)
  - DEVELOPMENT.md com guia de desenvolvimento
  - ARCHITECTURE.md com decisões arquiteturais
  - ADRs (Architecture Decision Records)
  - Documentação de API

### 🔧 Modificado
- `StructurePage.tsx` - Atualizado para incluir roteamento para Pilha
- `tsconfig.json` - Configurado para incluir tipos Jest e Node

### 🐛 Corrigido
- Encoding de emojis em `metodosPilha.ts`
- Configuração TypeScript para compilação correta

---

## [0.1.0] - 2025-11-18

### ✨ Adicionado
- **Vetor** - Estrutura de dados completa com 16 métodos
  - Métodos básicos: inserir, remover, pesquisar, obter, definir
  - Métodos de informação: tamanho, estaVazio
  - Métodos de manipulação: limpar, ordenar, inverter
  - Métodos de final: adicionarNoFinal, removerDoFinal, estender
  - Métodos de busca: fatiar, contem, indiceDe
- **Infraestrutura Base**:
  - React 18.3 com TypeScript 5.7
  - Vite 6.0 como build tool
  - TailwindCSS 3.4 para estilização
  - Framer Motion 11.12 para animações
  - React Router 7.0 para roteamento
- **Componentes UI Básicos**:
  - Button, Card, Input, Alert, Progress, Slider
- **Sistema de Validação**:
  - `validationUtils.ts` - Validação de números e índices
  - `arrayUtils.ts` - Funções auxiliares para arrays
- **Testes**:
  - 582 linhas de testes para Vetor
  - Jest 29.7 configurado
  - Testing Library 16.1 configurado
- **Context API**:
  - `DataStructureContext` para gerenciamento de estado global

### 🏗️ Estrutura Inicial
- Organização de pastas por funcionalidade
- Barrel exports para imports limpos
- TSDoc em arquivos principais
- Configuração de ESLint e Prettier

---

## [0.0.1] - 2025-11-15

### 🎉 Inicial
- Inicialização do projeto com Vite + React + TypeScript
- Configuração básica do TailwindCSS
- Estrutura de pastas inicial
- Commit inicial no repositório

---

## Legenda dos Tipos de Mudança

- `✨ Adicionado` - Novas funcionalidades
- `🔧 Modificado` - Mudanças em funcionalidades existentes
- `🗑️ Removido` - Funcionalidades removidas
- `🐛 Corrigido` - Correções de bugs
- `🔒 Segurança` - Correções de vulnerabilidades
- `📚 Documentação` - Mudanças apenas em documentação
- `🎨 Estilo` - Mudanças que não afetam funcionalidade (formatação, etc)
- `♻️ Refatoração` - Refatoração de código sem mudança de funcionalidade
- `⚡ Performance` - Melhorias de performance
- `🧪 Testes` - Adição ou correção de testes

---

## Notas de Versão

### Versão 0.2.0 - Pilha (Stack)

Esta versão adiciona a estrutura de dados **Pilha** completa, seguindo o mesmo padrão de qualidade estabelecido pelo Vetor. A Pilha implementa o princípio LIFO (Last In, First Out) com 8 métodos principais e interface de visualização vertical otimizada.

**Destaques:**
- ✅ Layout vertical com indicador de topo
- ✅ Validação robusta em múltiplas camadas
- ✅ 40+ testes unitários
- ✅ TSDoc completo
- ✅ Acessibilidade (ARIA labels)
- ✅ Histórico de operações

**Rotas adicionadas:**
- `/estrutura/pilha` - Visualização interativa da Pilha

**Estatísticas:**
- ~1.900 linhas de código adicionadas
- ~650 linhas de testes
- 9 arquivos criados/modificados
- 100% type-safe (TypeScript strict mode)

### Versão 0.1.0 - Vetor

Versão inicial com a estrutura de dados **Vetor** completa. Implementa 16 métodos para manipulação de arrays dinâmicos com validação, testes abrangentes e interface interativa.

**Destaques:**
- ✅ 16 métodos completos
- ✅ 582 linhas de testes
- ✅ Infraestrutura base (React, Vite, TailwindCSS)
- ✅ Sistema de validação robusto

---

## Links Úteis

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)

---

**[⬆ Voltar ao topo](#changelog)**
