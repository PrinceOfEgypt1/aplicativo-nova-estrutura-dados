import { PageContainer } from '../../shared/PageContainer';
import { EmptyState } from '../../shared/EmptyState';
import { Network } from 'lucide-react';

export default function VisualizacaoArvoreBinaria() {
  return (
    <main className="h-full bg-slate-950">
      <PageContainer className="py-4 h-full flex items-center justify-center">
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <EmptyState
            icon={Network}
            title="Árvore Binária - Em Desenvolvimento"
            description="A visualização e operações para Árvore Binária estão sendo implementadas. Em breve você poderá explorar esta estrutura hierárquica."
          />
        </div>
      </PageContainer>
    </main>
  );
}
