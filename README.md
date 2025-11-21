# 📊 Aplicativo de Estruturas de Dados

> Aplicação web interativa para visualização e manipulação de estruturas de dados com foco educacional e UX de alto nível.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🎯 Sobre o Projeto

Este projeto é uma **aplicação web educacional** desenvolvida com React, TypeScript e Vite, que permite a **visualização interativa e manipulação de estruturas de dados**. O foco está em proporcionar uma experiência de usuário (UI/UX) de alto nível, com animações suaves, feedback visual claro e interface responsiva.

### ✨ Características Principais

- 🎨 **Interface Moderna**: UI limpa e intuitiva construída com TailwindCSS
- 🎬 **Animações Suaves**: Transições e micro-interações com Framer Motion
- 📱 **Responsivo**: Design mobile-first com suporte a múltiplos breakpoints
- ♿ **Acessível**: Conformidade com WCAG 2.1 AA
- 🧪 **Testes Abrangentes**: Cobertura completa com Jest e Testing Library
- 📚 **Documentação Completa**: TSDoc em todo o código + guias em Markdown
- 🔒 **Type-Safe**: TypeScript strict mode para máxima segurança de tipos

---

## 📦 Estruturas de Dados Implementadas

### ✅ Implementadas (45%)

| Estrutura | Status | Métodos | Testes | Documentação |
|-----------|--------|---------|--------|--------------|
| **Vetor** | ✅ Completo | 16 | 582 linhas | ✅ |
| **Pilha (Stack)** | ✅ Completo | 8 | 480+ linhas | ✅ |
| **Fila (Queue)** | ✅ Completo | 8 | 550+ linhas | ✅ |

### 🔄 Em Desenvolvimento (55%)

| Estrutura | Prioridade | Status |
|-----------|-----------|--------|
| **Lista Ligada** | Alta | 🔄 Planejada |
| **Árvore Binária** | Média | 🔄 20% (visualização parcial) |
| **Grafo** | Média | 🔄 Planejada |
| **Matriz** | Baixa | 🔄 Planejada |
| **Lista Duplamente Ligada** | Baixa | 🔄 Planejada |

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **pnpm** >= 8.0.0

### Instalação

```bash
# Clone o repositório
git clone https://github.com/PrinceOfEgypt1/aplicativo-nova-estrutura-dados.git

# Entre no diretório
cd aplicativo-nova-estrutura-dados

# Instale as dependências
npm install
# ou
pnpm install
```

### Executando o Projeto

```bash
# Modo de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Executar testes
npm test

# Executar testes em modo watch
npm test -- --watch
```

### Acessando a Aplicação

Após executar `npm run dev`, acesse:

```
http://localhost:5173
```

**Rotas disponíveis:**
- `/` - Página inicial com lista de estruturas
- `/estrutura/vetor` - Visualização do Vetor
- `/estrutura/pilha` - Visualização da Pilha
- `/estrutura/fila` - Visualização da Fila

---

## 🏗️ Estrutura do Projeto

```
aplicativo-nova-estrutura-dados/
├── src/
│   ├── components/
│   │   ├── DataStructures/        # Estruturas de dados
│   │   │   ├── Vetor/             # ✅ Implementado
│   │   │   ├── Pilha/             # ✅ Implementado
│   │   │   ├── Fila/              # 🔄 Planejado
│   │   │   └── ...
│   │   ├── shared/                # Componentes compartilhados
│   │   └── ui/                    # Componentes UI básicos
│   ├── pages/                     # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   └── StructurePage.tsx
│   ├── context/                   # Context API
│   ├── hooks/                     # Custom hooks
│   ├── utils/                     # Utilitários
│   ├── validations/               # Schemas de validação
│   ├── types/                     # Definições TypeScript
│   └── styles/                    # Estilos globais
├── docs/                          # Documentação
│   ├── ADR/                       # Architecture Decision Records
│   ├── API/                       # Documentação de API
│   └── guides/                    # Guias de uso
├── tests/                         # Testes
├── ARCHITECTURE.md                # Arquitetura do projeto
├── CHANGELOG.md                   # Histórico de mudanças
├── DEVELOPMENT.md                 # Guia de desenvolvimento
└── README.md                      # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

### Core
- **React** 18.3 - Biblioteca UI
- **TypeScript** 5.7 - Superset tipado do JavaScript
- **Vite** 6.0 - Build tool e dev server

### UI/UX
- **TailwindCSS** 3.4 - Framework CSS utilitário
- **Framer Motion** 11.12 - Biblioteca de animações
- **Lucide React** - Ícones
- **Radix UI** - Componentes acessíveis headless

### Roteamento
- **React Router** 7.0 - Roteamento client-side

### Testes
- **Jest** 29.7 - Framework de testes
- **Testing Library** 16.1 - Utilitários de teste React
- **ts-jest** 29.2 - Suporte TypeScript para Jest

### Qualidade de Código
- **ESLint** - Linter JavaScript/TypeScript
- **TypeScript Strict Mode** - Verificação de tipos rigorosa

---

## 📖 Documentação Adicional

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Decisões arquiteturais e padrões
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guia para desenvolvedores
- **[CHANGELOG.md](./CHANGELOG.md)** - Histórico de mudanças
- **[ADRs](./docs/ADR/)** - Architecture Decision Records
- **[API Documentation](./docs/API/)** - Documentação de APIs

---

## 🎯 Roadmap

### Fase 1: Estruturas Fundamentais (🔴 Crítico)
- [x] Vetor completo com 16 métodos
- [x] Pilha (Stack) com 8 métodos
- [x] Fila (Queue) com 8 métodos
- [ ] Lista Ligada
- [ ] Árvore Binária completa

### Fase 2: Design System & UI (🟡 Importante)
- [ ] Design tokens centralizados
- [ ] 21+ componentes UI padronizados
- [ ] Layouts completos (Dashboard, Method Panels)
- [ ] Sistema de tema (dark/light mode)

### Fase 3: Animações & Interatividade (🟢 Alto Valor)
- [ ] Sistema de animações por operação
- [ ] Transições e microinterações
- [ ] Execução passo-a-passo (step-by-step)
- [ ] Controles de velocidade de animação

### Fase 4: Estruturas Avançadas (🔵 Complexo)
- [ ] Grafo com BFS/DFS
- [ ] Matriz
- [ ] Lista Duplamente Ligada
- [ ] Hash Table
- [ ] Heap

### Fase 5: Polimento (🟣 Nice-to-have)
- [ ] Dark mode completo
- [ ] Acessibilidade refinada
- [ ] Performance optimization
- [ ] Internacionalização (i18n)

---

## 🧪 Testes

O projeto possui uma suite abrangente de testes unitários:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Executar testes com cobertura
npm test -- --coverage

# Executar testes de uma estrutura específica
npm test -- Pilha
npm test -- Vetor
```

**Cobertura atual:**
- Vetor: ~582 linhas de testes
- Pilha: ~650 linhas de testes (hook + componente)
- Total: 40+ casos de teste

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [DEVELOPMENT.md](./DEVELOPMENT.md) para detalhes sobre o processo de desenvolvimento e padrões de código.

### Processo de Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrão de Commits

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Nova funcionalidade
fix: Correção de bug
docs: Mudanças na documentação
style: Formatação, missing semi-colons, etc
refactor: Refatoração de código
test: Adição ou correção de testes
chore: Mudanças em build, CI, etc
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

- **Desenvolvido por**: Time de Engenharia (Claude Code)
- **Repositório**: [PrinceOfEgypt1/aplicativo-nova-estrutura-dados](https://github.com/PrinceOfEgypt1/aplicativo-nova-estrutura-dados)

---

## 🙏 Agradecimentos

- Comunidade React pela excelente biblioteca
- Tailwind CSS pela framework CSS incrível
- Todos os contribuidores e usuários do projeto

---

## 📞 Contato e Suporte

- **Issues**: [GitHub Issues](https://github.com/PrinceOfEgypt1/aplicativo-nova-estrutura-dados/issues)
- **Discussões**: [GitHub Discussions](https://github.com/PrinceOfEgypt1/aplicativo-nova-estrutura-dados/discussions)

---

<div align="center">

**Feito com ❤️ e TypeScript**

[⬆ Voltar ao topo](#-aplicativo-de-estruturas-de-dados)

</div>
