# ADR-0002: Estratégia de Testes

**Status:** ✅ Aceito
**Data:** 2025-11-20
**Autores:** Time de Qualidade

---

## Contexto

Precisávamos definir uma estratégia de testes consistente para garantir qualidade industrial em todas as estruturas de dados.

## Decisão

Adotar a **Pirâmide de Testes** com foco em testes unitários e de integração:

```
      ▲
     /E2E\           (Poucos - Futuro)
    /─────\
   /  INT  \         (Alguns - Hook + UI)
  /─────────\
 /   UNIT    \       (Muitos - Funções puras)
/─────────────\
```

### Estratégia por Camada

**1. Testes Unitários (Base)**
- Funções puras (`validationUtils`, `arrayUtils`)
- Classes core (`Pilha`, `Vetor`)
- Cobertura: 100% das funções

**2. Testes de Integração (Meio)**
- Custom hooks (`usePilha`, `useVetor`)
- Componentes React (`StackCell`, `VectorCell`)
- Cobertura: 80%+ dos cenários

**3. Testes E2E (Topo - Futuro)**
- Fluxos completos de usuário
- Cypress/Playwright
- Cobertura: Cenários críticos

### Ferramentas

- **Jest** 29.7 - Framework de testes
- **Testing Library** 16.1 - Testes React
- **ts-jest** - Suporte TypeScript

## Padrões de Teste

### Estrutura de Testes

```typescript
describe('ComponenteOuFuncao', () => {
  describe('Funcionalidade1', () => {
    it('deve fazer X quando Y', () => {
      // Arrange
      // Act
      // Assert
    });

    it('deve lançar erro quando Z', () => {
      // Teste de erro
    });
  });
});
```

### Casos de Teste Mínimos por Estrutura

- ✅ Inicialização
- ✅ Cada método (happy path)
- ✅ Validação de erros
- ✅ Edge cases
- ✅ Cenários complexos

**Total mínimo**: 20+ testes por estrutura

## Consequências

### Positivas ✅
- Confiança em refatorações
- Documentação viva (testes = exemplos)
- Menos bugs em produção
- Cobertura mensurável

### Negativas ❌
- Tempo adicional de desenvolvimento
- Manutenção de testes

## Métricas

```bash
# Comando
npm test -- --coverage

# Alvo de Cobertura
Statements: > 80%
Branches: > 75%
Functions: > 80%
Lines: > 80%
```

## Referências

- [Testing Library Principles](https://testing-library.com/docs/guiding-principles/)
- [Jest Best Practices](https://jestjs.io/docs/tutorial-react)

---

**Última atualização:** 2025-11-20
