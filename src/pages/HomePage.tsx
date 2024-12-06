// src/pages/HomePage.tsx 
import { Link } from 'react-router-dom';
import {
  Grid,
  ListOrdered,
  Database,
  LayoutList,
  Component,
  Network,
  CircuitBoard,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

interface StepProps {
  number: number;
  title: string;
}

const Steps: StepProps[] = [
  { number: 1, title: 'Selecione uma estrutura' },
  { number: 2, title: 'Explorar métodos de sistema operacional' },
  { number: 3, title: 'Visualizar operações' },
  { number: 4, title: 'Envie resultados' },
];

export const HomePage = () => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900/20 p-6 rounded-lg">
        <p className="text-gray-300">
          Bem-vindo à nossa aplicação web dedicada ao universo das estruturas de dados fundamentais na
          computação. Essas estruturas são componentes essenciais que permitem organizar e manipular
          informações de maneira eficiente.
        </p>
        <p className="mt-2 text-gray-300">
          Nesta plataforma, você explorará a importância e as aplicações práticas de cada estrutura, além
          de entender os algoritmos que estão sendo implementados.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Explorar as Estruturas de Dados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/estrutura/vetor" className="block h-full">
            <Card className="group bg-violet-500 hover:bg-violet-400 transition-all cursor-pointer p-4 h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Grid size={20} />
                  <CardTitle>Vetor</CardTitle>
                </div>
                <CardDescription>
                  Estrutura linear com elementos em posições contíguas de memória.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/estrutura/lista-ligada" className="block h-full">
            <Card className="group bg-sky-500 hover:bg-sky-400 transition-all cursor-pointer p-4 h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <ListOrdered size={20} />
                  <CardTitle>Lista Ligada Simples</CardTitle>
                </div>
                <CardDescription>Estrutura com nós conectados através de referências.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/estrutura/lista-dupla" className="block h-full">
            <Card className="group bg-emerald-500 hover:bg-emerald-400 transition-all cursor-pointer p-4 h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Database size={20} />
                  <CardTitle>Lista Duplamente Ligada</CardTitle>
                </div>
                <CardDescription>Lista com referências para o próximo e anterior.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/estrutura/fila" className="block h-full">
            <Card className="group bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer p-4 h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <LayoutList size={20} />
                  <CardTitle>Fila</CardTitle>
                </div>
                <CardDescription>
                  Estrutura FIFO (First In, First Out) para gerenciamento de elementos.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/estrutura/pilha" className="block h-full">
            <Card className="group bg-rose-500 hover:bg-rose-400 transition-all cursor-pointer p-4 h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Component size={20} />
                  <CardTitle>Pilha</CardTitle>
                </div>
                <CardDescription>
                  Estrutura LIFO (Last In, First Out) para processamento ordenado.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/estrutura/arvore-binaria" className="block h-full">
            <Card className="group bg-indigo-500 hover:bg-indigo-400 transition-all cursor-pointer p-4 h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Network size={20} />
                  <CardTitle>Árvore Binária</CardTitle>
                </div>
                <CardDescription>Estrutura hierárquica com no máximo dois filhos por nó.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/estrutura/grafo" className="block h-full">
            <Card className="group bg-cyan-500 hover:bg-cyan-400 transition-all cursor-pointer p-4 h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CircuitBoard size={20} />
                  <CardTitle>Grafo</CardTitle>
                </div>
                <CardDescription>Conjunto de vértices e arestas para modelagem de relações.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

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