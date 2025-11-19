import { PageContainer } from '../../shared/PageContainer';
import { EmptyState } from '../../shared/EmptyState';
import { ListOrdered } from 'lucide-react';

export default function VisualizacaoListaLigada() {
  return (
    <main className="min-h-screen bg-slate-950 py-12">
      <PageContainer>
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
          <EmptyState
            icon={ListOrdered}
            title="Lista Ligada - Em Desenvolvimento"
            description="A visualização e operações para Lista Ligada estão sendo implementadas. Em breve você poderá explorar esta estrutura de dados."
          />
        </div>
      </PageContainer>
    </main>
  );
}
