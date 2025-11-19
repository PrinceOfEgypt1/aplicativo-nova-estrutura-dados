import { PageContainer } from '../../shared/PageContainer';
import { EmptyState } from '../../shared/EmptyState';
import { Grid } from 'lucide-react';

export default function VisualizacaoMatriz() {
  return (
    <main className="min-h-screen bg-slate-950 py-12">
      <PageContainer>
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
          <EmptyState
            icon={Grid}
            title="Matriz - Em Desenvolvimento"
            description="A visualização e operações para Matriz estão sendo implementadas. Em breve você poderá explorar esta estrutura bidimensional."
          />
        </div>
      </PageContainer>
    </main>
  );
}
