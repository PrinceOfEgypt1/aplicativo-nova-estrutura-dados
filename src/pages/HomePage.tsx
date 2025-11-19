import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Grid,
  ListOrdered,
  Database,
  LayoutList,
  Component,
  Network,
  CircuitBoard,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { PageContainer } from '../components/shared/PageContainer';

interface DataStructure {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  hoverColor: string;
  available: boolean;
  route: string;
}

const dataStructures: DataStructure[] = [
  {
    id: 'vetor',
    name: 'Vetor',
    description: 'Estrutura linear com elementos em posições contíguas de memória',
    icon: Grid,
    color: 'bg-violet-500',
    hoverColor: 'hover:bg-violet-400',
    available: true,
    route: '/estrutura/vetor'
  },
  {
    id: 'lista-ligada',
    name: 'Lista Ligada',
    description: 'Estrutura com nós conectados através de referências',
    icon: ListOrdered,
    color: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-400',
    available: false,
    route: '/estrutura/lista-ligada'
  },
  {
    id: 'lista-dupla',
    name: 'Lista Duplamente Ligada',
    description: 'Lista com referências para o próximo e anterior',
    icon: Database,
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-400',
    available: false,
    route: '/estrutura/lista-dupla'
  },
  {
    id: 'fila',
    name: 'Fila',
    description: 'Estrutura FIFO (First In, First Out) para gerenciamento',
    icon: LayoutList,
    color: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-400',
    available: false,
    route: '/estrutura/fila'
  },
  {
    id: 'pilha',
    name: 'Pilha',
    description: 'Estrutura LIFO (Last In, First Out) para processamento',
    icon: Component,
    color: 'bg-rose-500',
    hoverColor: 'hover:bg-rose-400',
    available: false,
    route: '/estrutura/pilha'
  },
  {
    id: 'arvore',
    name: 'Árvore Binária',
    description: 'Estrutura hierárquica com no máximo dois filhos por nó',
    icon: Network,
    color: 'bg-indigo-500',
    hoverColor: 'hover:bg-indigo-400',
    available: false,
    route: '/estrutura/arvore-binaria'
  },
  {
    id: 'grafo',
    name: 'Grafo',
    description: 'Conjunto de vértices e arestas para modelagem de relações',
    icon: CircuitBoard,
    color: 'bg-cyan-500',
    hoverColor: 'hover:bg-cyan-400',
    available: false,
    route: '/estrutura/grafo'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <PageContainer className="py-12 space-y-16">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6"
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                <span className="text-sm text-violet-300 font-medium">
                  Plataforma de Aprendizado Interativa
                </span>
              </div>
            </div>

            <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
              Aprenda Estruturas de Dados
              <span className="block mt-2 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                de Forma Visual
              </span>
            </h2>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore, manipule e visualize estruturas de dados fundamentais da computação.
              Entenda como funcionam através de operações interativas em tempo real.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center items-center pt-4">
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
              <span>Aprenda Fazendo</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
              <span>Visualização em Tempo Real</span>
            </div>
          </div>
        </motion.section>

        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-2">
              Escolha uma Estrutura de Dados
            </h3>
            <p className="text-slate-400">
              Clique em qualquer estrutura para começar a explorar e experimentar
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {dataStructures.map((structure) => {
              const Icon = structure.icon;

              return (
                <motion.div key={structure.id} variants={itemVariants}>
                  <Link
                    to={structure.route}
                    className={`block h-full group ${!structure.available ? 'pointer-events-none' : ''}`}
                    aria-label={`Explorar ${structure.name}`}
                  >
                    <Card
                      className={`${structure.color} ${structure.available ? structure.hoverColor : ''}
                        transition-all duration-300 cursor-pointer h-full border-0
                        ${structure.available ? 'hover:scale-105 hover:shadow-2xl' : 'opacity-60 cursor-not-allowed'}
                        relative overflow-hidden
                      `}
                    >
                      {!structure.available && (
                        <div className="absolute top-3 right-3 bg-slate-900/80 text-xs font-medium text-slate-300 px-2 py-1 rounded-full border border-slate-700">
                          Em breve
                        </div>
                      )}

                      <CardHeader className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <CardTitle className="text-white text-xl">
                            {structure.name}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-white/90 text-base">
                          {structure.description}
                        </CardDescription>

                        {structure.available && (
                          <div className="flex items-center gap-2 text-white/80 text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                            <span>Explorar agora</span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </div>
                        )}
                      </CardHeader>

                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm"
        >
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white">
              Como funciona?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Cada estrutura de dados possui um conjunto de operações que você pode executar.
              Escolha uma operação, forneça os parâmetros necessários e visualize em tempo real
              como a estrutura se modifica. Perfeito para estudantes, desenvolvedores e
              qualquer pessoa interessada em aprender sobre estruturas de dados.
            </p>
          </div>
        </motion.section>
      </PageContainer>
    </main>
  );
};

export default HomePage;
