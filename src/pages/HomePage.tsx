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
    description: 'Estrutura linear com elementos em posições contíguas',
    icon: Grid,
    color: 'bg-violet-500',
    hoverColor: 'hover:bg-violet-400',
    available: true,
    route: '/estrutura/vetor'
  },
  {
    id: 'lista-ligada',
    name: 'Lista Ligada',
    description: 'Nós conectados através de referências',
    icon: ListOrdered,
    color: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-400',
    available: true,
    route: '/estrutura/lista-ligada'
  },
  {
    id: 'lista-dupla',
    name: 'Lista Dupla',
    description: 'Referências para próximo e anterior',
    icon: Database,
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-400',
    available: true,
    route: '/estrutura/lista-dupla'
  },
  {
    id: 'fila',
    name: 'Fila',
    description: 'FIFO - First In, First Out',
    icon: LayoutList,
    color: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-400',
    available: true,
    route: '/estrutura/fila'
  },
  {
    id: 'pilha',
    name: 'Pilha',
    description: 'LIFO - Last In, First Out',
    icon: Component,
    color: 'bg-rose-500',
    hoverColor: 'hover:bg-rose-400',
    available: true,
    route: '/estrutura/pilha'
  },
  {
    id: 'arvore',
    name: 'Árvore Binária',
    description: 'Estrutura hierárquica com dois filhos',
    icon: Network,
    color: 'bg-indigo-500',
    hoverColor: 'hover:bg-indigo-400',
    available: true,
    route: '/estrutura/arvore-binaria'
  },
  {
    id: 'grafo',
    name: 'Grafo',
    description: 'Vértices e arestas para relações',
    icon: CircuitBoard,
    color: 'bg-cyan-500',
    hoverColor: 'hover:bg-cyan-400',
    available: true,
    route: '/estrutura/grafo'
  },
  {
    id: 'matriz',
    name: 'Matriz',
    description: 'Dados organizados em linhas e colunas',
    icon: Grid,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-400',
    available: true,
    route: '/estrutura/matriz'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const HomePage = () => {
  return (
    <main className="h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <PageContainer className="h-full py-6 flex flex-col">
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 flex-shrink-0"
        >
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Aprenda Estruturas de Dados
              <span className="block mt-1 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                de Forma Visual
              </span>
            </h2>

            <p className="text-base text-slate-300 max-w-2xl mx-auto">
              Explore e visualize estruturas de dados fundamentais através de operações interativas.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>Aprenda Fazendo</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>Tempo Real</span>
            </div>
          </div>
        </motion.section>

        <section className="flex-1 flex flex-col min-h-0 mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 flex-shrink-0"
          >
            <h3 className="text-xl font-semibold text-white mb-1">
              Escolha uma Estrutura de Dados
            </h3>
            <p className="text-sm text-slate-400">
              Clique para começar a explorar
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 min-h-0"
          >
            {dataStructures.map((structure) => {
              const Icon = structure.icon;

              return (
                <motion.div key={structure.id} variants={itemVariants} className="h-full">
                  <Link
                    to={structure.route}
                    className={`block h-full group ${!structure.available ? 'pointer-events-none' : ''}`}
                    aria-label={`Explorar ${structure.name}`}
                  >
                    <Card
                      className={`${structure.color} ${structure.available ? structure.hoverColor : ''}
                        transition-all duration-300 cursor-pointer h-full border-0
                        ${structure.available ? 'hover:scale-105 hover:shadow-2xl' : 'opacity-60 cursor-not-allowed'}
                        relative overflow-hidden flex flex-col
                      `}
                    >
                      {!structure.available && (
                        <div className="absolute top-2 right-2 bg-slate-900/80 text-xs font-medium text-slate-300 px-2 py-1 rounded-full border border-slate-700">
                          Em breve
                        </div>
                      )}

                      <CardHeader className="relative z-10 p-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
                            <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                          </div>
                          <CardTitle className="text-white text-base font-semibold">
                            {structure.name}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-white/90 text-sm flex-1">
                          {structure.description}
                        </CardDescription>

                        {structure.available && (
                          <div className="flex items-center gap-1 text-white/80 text-xs font-medium mt-2 group-hover:gap-2 transition-all">
                            <span>Explorar</span>
                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
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
      </PageContainer>
    </main>
  );
};

export default HomePage;
