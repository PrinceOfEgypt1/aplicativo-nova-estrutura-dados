import { PageContainer } from '../../shared/PageContainer';
import { EmptyState } from '../../shared/EmptyState';
import { LayoutList } from 'lucide-react';

export default function VisualizacaoFila() {
  return (
    <main className="min-h-screen bg-slate-950 py-12">
      <PageContainer>
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
          <EmptyState
            icon={LayoutList}
            title="Fila - Em Desenvolvimento"
            description="A visualização e operações para Fila estão sendo implementadas. Em breve você poderá explorar esta estrutura de dados FIFO (First In, First Out)."
          />
        </div>
      </PageContainer>
    </main>
  );
}
