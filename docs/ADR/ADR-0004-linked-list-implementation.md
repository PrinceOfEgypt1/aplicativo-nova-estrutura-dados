# ADR-0004: Implementação da Lista Ligada (Linked List)

**Status:** ✅ Aceito  
**Data:** 2025-11-21  
**Autores:** Time de Engenharia  
**Decisores:** Arquiteto de Software  

---

## Contexto

Após implementar Vetor, Pilha e Fila com sucesso, precisávamos implementar a Lista Ligada como quarta estrutura fundamental do projeto, continuando o padrão estabelecido e introduzindo conceitos de estruturas dinâmicas com ponteiros.

## Decisão

Implementar Lista Ligada Simples com as seguintes características:

1. **Estrutura de Nó** com valor e ponteiro `proximo`
2. **12 métodos principais**: Inserção (3), Remoção (3), Busca (2), Informação (3), Manipulação (1)
3. **Layout horizontal** com setas visualizando ponteiros
4. **Indicador de cabeça** visual
5. **Same architecture** das estruturas anteriores (Classe → Hook → UI)

## Detalhes da Implementação

### Estrutura de Arquivos

```
ListaLigada/
├── listaLigada.ts           # Classe core (440 linhas)
├── useListaLigada.ts        # Hook React (480 linhas)
├── metodosListaLigada.ts    # Metadados (226 linhas)
├── VisualizacaoListaLigada.tsx  # UI principal (300 linhas)
├── NoListaLigada.tsx        # Componente de nó (95 linhas)
├── InformacoesListaLigada.tsx   # Painel informativo (120 linhas)
└── index.ts                 # Barrel export
```

### Diferenças Chave vs Estruturas Anteriores

| Aspecto | Pilha/Fila | Lista Ligada |
|---------|------------|--------------|
| Elementos | Array direto | Nós com ponteiros |
| Layout | Vertical/Horizontal simples | Horizontal com setas |
| Cores | Rose/Blue | Green (verde) |
| Indicadores | TOPO/FRENTE/FINAL | CABEÇA |
| Inputs | Valor único | Valor ou Índice ou Ambos |
| Métodos | 8 | 12 |

### Métodos Implementados

#### Inserção (3 métodos)
1. **inserirNoInicio(valor)** - O(1) - Insere novo nó como cabeça
2. **inserirNoFim(valor)** - O(n) - Percorre até final e insere
3. **inserirNaPosicao(indice, valor)** - O(n) - Insere em posição específica

#### Remoção (3 métodos)
4. **removerDoInicio()** - O(1) - Remove cabeça
5. **removerDoFim()** - O(n) - Percorre até penúltimo e remove final
6. **removerDaPosicao(indice)** - O(n) - Remove de posição específica

#### Busca (2 métodos)
7. **buscar(valor)** - O(n) - Retorna índice ou -1
8. **obterPorIndice(indice)** - O(n) - Retorna valor na posição

#### Informação (3 métodos)
9. **tamanho()** - O(1) - Retorna contador mantido
10. **estaVazia()** - O(1) - Verifica se cabeça é null
11. **obterCabeca()** - O(1) - Retorna valor da cabeça

#### Manipulação (1 método)
12. **limpar()** - O(1) - Define cabeça como null

## Consequ�ências

### Positivas ✅
- Consistência com padrão das estruturas anteriores
- Visualização clara de ponteiros com setas →
- 12 métodos cobrem operações completas de lista ligada
- Documentação educacional com complexidades Big O
- Layout diferenciado facilita compreensão de ponteiros
- Inputs flexíveis (valor, índice, ou ambos)

### Negativas ⚠
- Maioria dos métodos tem complexidade O(n)
- Mais complexa que Pilha/Fila (conceito de ponteiros)
- Visualização horizontal pode ocupar muito espaço com muitos nós
- Não otimizada com ponteiro de cauda (tail)

## Alternativas Consideradas

### Alternativa 1: Implementar Lista Duplamente Ligada
**Rejeitada** - Complexidade adicional desnecessária para primeira lista ligada. Melhor começar com versão simples e depois criar variante duplamente ligada.

### Alternativa 2: Adicionar Ponteiro de Cauda (Tail)
**Rejeitada** - Otimizaria `inserirNoFim` para O(1), mas aumentaria complexidade do código. Decidimos priorizar clareza educacional sobre performance.

### Alternativa 3: Visualização Vertical
**Rejeitada** - Layout horizontal com setas → é mais intuitivo para demonstrar conceito de ligação entre nós.

## Decisões de Design

### Layout Horizontal com Setas
- Nós da esquerda para direita
- Setas → entre nós indicando ligação
- Final mostra "→ null"
- Indicador "CABEÇA" em cyan no primeiro nó

### Cores
- Verde como cor primária (bg-green-600)
- Cyan para indicador de cabeça
- Amarelo para destaque (anel ao executar operação)
- Setas verdes (green-500) entre nós

### Inputs Duplos
- Métodos como `inserirNaPosicao` requerem índice + valor
- Interface detecta requisitos e exibe inputs apropriados
- Validações para índices dentro dos limites

## Complexidade de Tempo

| Operação | Complexidade | Motivo |
|----------|--------------|--------|
| inserirNoInicio | O(1) | Apenas atualiza cabeça |
| inserirNoFim | O(n) | Percorre toda lista |
| inserirNaPosicao | O(n) | Percorre até posição |
| removerDoInicio | O(1) | Apenas atualiza cabeça |
| removerDoFim | O(n) | Precisa do penúltimo |
| removerDaPosicao | O(n) | Percorre até posição |
| buscar | O(n) | Busca linear |
| obterPorIndice | O(n) | Acesso sequencial |
| tamanho | O(1) | Contador mantido |
| estaVazia | O(1) | Verifica cabeça |
| limpar | O(1) | Atualiza cabeça e contador |
| obterCabeca | O(1) | Acesso direto |

## Métricas

- **Linhas de código**: ~1,700
- **Métodos**: 12 (50% a mais que Pilha/Fila)
- **Arquivos**: 7 (mesmo que estruturas anteriores)
- **Cobertura de testes**: Pendente (próximo milestone)

## Referências

- [Linked List no Wikipedia](https://pt.wikipedia.org/wiki/Lista_ligada)
- [Linked List Data Structure](https://www.geeksforgeeks.org/data-structures/linked-list/)
- Implementações de referência:
  - `src/components/DataStructures/Pilha/`
  - `src/components/DataStructures/Fila/`
- ADR-0001: Vetor Implementation
- ADR-0002: Stack Implementation
- ADR-0003: Queue Implementation

---

**Última atualização:** 2025-11-21
