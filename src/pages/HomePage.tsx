// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { ChevronRight, Grid, ListOrdered, Database, LayoutList, Component, Network, CircuitBoard } from "lucide-react";
import { Card } from '../components/ui/Card';

// Interface para definir a estrutura dos passos do tutorial
interface StepProps {
  number: number;
  title: string;
}

// Array com os passos do tutorial
const Steps: StepProps[] = [
  {
    number: 1,
    title: "Selecione uma estrutura",
  },
  {
    number: 2,
    title: "Explorar métodos de sistema operacional",
  },
  {
    number: 3,
    title: "Visualizar operações",
  },
  {
    number: 4,
    title: "envie resultados",
  }
];

export const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Texto de Boas-vindas */}
      <div className="bg-slate-900/20 p-6 rounded-lg">
        <p className="text-gray-300">
          Bem-vindo à nossa aplicação web dedicada ao universo das estruturas de dados fundamentais na computação. 
          Essas estruturas são componentes essenciais que permitem organizar e manipular informações de maneira eficiente.
        </p>
        <p className="mt-2 text-gray-300">
          Nesta plataforma, você explorará a importância e as aplicações práticas de cada estrutura, 
          além de entender os algoritmos que estão sendo implementados.
        </p>
      </div>

      {/* Seção de Estruturas de Dados */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Explorar as Estruturas de Dados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Vetor */}
          <Link to="/estrutura/vetor" className="block h-full">
            <Card className="group bg-violet-500 hover:bg-violet-400 transition-all cursor-pointer p-4 h-full">
              <div className="flex items-center gap-2 mb-2">
                <Grid className="w-5 h-5" />
                <h3 className="font-semibold">Vetor</h3>
              </div>
              <p className="text-sm text-violet-100 mb-4">
                Estrutura linear com elementos em posições contíguas de memória.
              </p>
              <div className="flex items-center justify-between text-sm text-violet-200 mt-auto">
                <span>16 métodos disponíveis</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          {/* Lista Ligada Simples */}
          <Link to="/estrutura/lista-ligada" className="block h-full">
            <Card className="group bg-sky-500 hover:bg-sky-400 transition-all cursor-pointer p-4 h-full">
              <div className="flex items-center gap-2 mb-2">
                <ListOrdered className="w-5 h-5" />
                <h3 className="font-semibold">Lista Ligada Simples</h3>
              </div>
              <p className="text-sm text-sky-100 mb-4">
                Estrutura com nós conectados através de referências.
              </p>
              <div className="flex items-center justify-between text-sm text-sky-200 mt-auto">
                <span>14 métodos disponíveis</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          {/* Lista Duplamente Ligada */}
          <Link to="/estrutura/lista-dupla" className="block h-full">
            <Card className="group bg-emerald-500 hover:bg-emerald-400 transition-all cursor-pointer p-4 h-full">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5" />
                <h3 className="font-semibold">Lista Duplamente Ligada</h3>
              </div>
              <p className="text-sm text-emerald-100 mb-4">
                Lista com referências para o próximo e anterior.
              </p>
              <div className="flex items-center justify-between text-sm text-emerald-200 mt-auto">
                <span>15 métodos disponíveis</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          {/* Fila */}
          <Link to="/estrutura/fila" className="block h-full">
            <Card className="group bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer p-4 h-full">
              <div className="flex items-center gap-2 mb-2">
                <LayoutList className="w-5 h-5" />
                <h3 className="font-semibold">Fila</h3>
              </div>
              <p className="text-sm text-amber-100 mb-4">
                Estrutura FIFO (First In, First Out) para gerenciamento de elementos.
              </p>
              <div className="flex items-center justify-between text-sm text-amber-200 mt-auto">
                <span>9 métodos disponíveis</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          {/* Pilha */}
          <Link to="/estrutura/pilha" className="block h-full">
            <Card className="group bg-rose-500 hover:bg-rose-400 transition-all cursor-pointer p-4 h-full">
              <div className="flex items-center gap-2 mb-2">
                <Component className="w-5 h-5" />
                <h3 className="font-semibold">Pilha</h3>
              </div>
              <p className="text-sm text-rose-100 mb-4">
                Estrutura LIFO (Last In, First Out) para processamento ordenado.
              </p>
              <div className="flex items-center justify-between text-sm text-rose-200 mt-auto">
                <span>9 métodos disponíveis</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          {/* Árvore Binária */}
          <Link to="/estrutura/arvore-binaria" className="block h-full">
            <Card className="group bg-indigo-500 hover:bg-indigo-400 transition-all cursor-pointer p-4 h-full">
              <div className="flex items-center gap-2 mb-2">
                <Network className="w-5 h-5" />
                <h3 className="font-semibold">Árvore Binária</h3>
              </div>
              <p className="text-sm text-indigo-100 mb-4">
                Estrutura hierárquica com no máximo dois filhos por nó.
              </p>
              <div className="flex items-center justify-between text-sm text-indigo-200 mt-auto">
                <span>17 métodos disponíveis</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          {/* Grafo */}
          <Link to="/estrutura/grafo" className="block h-full">
            <Card className="group bg-cyan-500 hover:bg-cyan-400 transition-all cursor-pointer p-4 h-full">
              <div className="flex items-center gap-2 mb-2">
                <CircuitBoard className="w-5 h-5" />
                <h3 className="font-semibold">Grafo</h3>
              </div>
              <p className="text-sm text-cyan-100 mb-4">
                Conjunto de vértices e arestas para modelagem de relações.
              </p>
              <div className="flex items-center justify-between text-sm text-cyan-200 mt-auto">
                <span>16 métodos disponíveis</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Como usar */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Como usar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Steps.map((step) => (
            <Card key={step.number} className="bg-slate-800/60 border border-slate-700 p-3">
              <div className="flex items-start gap-2">
                <span className="text-slate-400">{step.number}.</span>
                <p className="text-sm text-slate-300">{step.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;