# ADR-0001: Implementação da Pilha (Stack)

**Status:** ✅ Aceito
**Data:** 2025-11-20
**Autores:** Time de Engenharia
**Decisores:** Arquiteto de Software

---

## Contexto

Precisávamos implementar a estrutura de dados Pilha (Stack) como segunda estrutura do projeto, seguindo o padrão estabelecido pelo Vetor.

## Decisão

Implementar Pilha (Stack) com as seguintes características:

1. **Padrão LIFO** (Last In, First Out)
2. **8 métodos principais**: push, pop, peek, tamanho, estaVazio, limpar, contem, buscar
3. **Layout vertical** para visualização (diferente do Vetor horizontal)
4. **Indicador de topo** visual
5. **Same architecture** do Vetor (Classe → Hook → UI)

## Consequências

### Positivas ✅
- Consistência com padrão do Vetor
- Visualização intuitiva (vertical = pilha)
- Testes abrangentes (40+ casos)
- Documentação completa (TSDoc)

### Negativas ❌
- Código duplicado entre estruturas (aceitável para clareza)
- Necessidade de criar componentes específicos (StackCell vs VectorCell)

## Alternativas Consideradas

### Alternativa 1: Reutilizar componentes do Vetor
**Rejeitada** - Layout vertical exige componentes específicos

### Alternativa 2: Implementar mais métodos
**Parcialmente aceita** - 8 métodos cobrem casos de uso essenciais

## Implementação

```typescript
// Classe core
export class Pilha {
  private elementos: number[];
  push(elemento: number): void
  pop(): number
  peek(): number
}

// Hook React
export function usePilha(capacidade: number) {
  const reducer = (state, action) => { /* ... */ }
  const [state, dispatch] = useReducer(reducer, initialState)
}

// UI
const VisualizacaoPilha: React.FC = () => {
  const { elementos, executarMetodo } = usePilha()
  return <div>{ /* layout vertical */ }</div>
}
```

## Referências

- [Pilha no Wikipedia](https://pt.wikipedia.org/wiki/Pilha_(inform%C3%A1tica))
- [Stack Data Structure](https://www.geeksforgeeks.org/stack-data-structure/)
- Implementação de referência: `src/components/DataStructures/Vetor/`

---

**Última atualização:** 2025-11-20
