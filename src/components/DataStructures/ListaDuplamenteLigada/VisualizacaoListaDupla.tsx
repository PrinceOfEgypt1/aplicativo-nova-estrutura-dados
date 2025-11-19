import { PageContainer } from '../../shared/PageContainer';
import { EmptyState } from '../../shared/EmptyState';
import { Database } from 'lucide-react';

export default function VisualizacaoListaDupla() {
  return (
    <main className="min-h-screen bg-slate-950 py-12">
      <PageContainer>
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
          <EmptyState
            icon={Database}
            title="Lista Duplamente Ligada - Em Desenvolvimento"
            description="A visualização e operações para Lista Duplamente Ligada estão sendo implementadas. Em breve você poderá explorar esta estrutura de dados."
          />
        </div>
      </PageContainer>
    </main>
  );
}
