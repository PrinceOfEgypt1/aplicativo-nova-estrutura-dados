import { PageContainer } from '../../shared/PageContainer';
import { EmptyState } from '../../shared/EmptyState';
import { CircuitBoard } from 'lucide-react';

export default function VisualizacaoGrafo() {
  return (
    <main className="min-h-screen bg-slate-950 py-12">
      <PageContainer>
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
          <EmptyState
            icon={CircuitBoard}
            title="Grafo - Em Desenvolvimento"
            description="A visualização e operações para Grafo estão sendo implementadas. Em breve você poderá explorar vértices, arestas e algoritmos de grafos."
          />
        </div>
      </PageContainer>
    </main>
  );
}
