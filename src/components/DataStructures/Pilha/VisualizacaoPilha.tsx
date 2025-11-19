import { PageContainer } from '../../shared/PageContainer';
import { EmptyState } from '../../shared/EmptyState';
import { Component } from 'lucide-react';

export default function VisualizacaoPilha() {
  return (
    <main className="min-h-screen bg-slate-950 py-12">
      <PageContainer>
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
          <EmptyState
            icon={Component}
            title="Pilha - Em Desenvolvimento"
            description="A visualização e operações para Pilha estão sendo implementadas. Em breve você poderá explorar esta estrutura de dados LIFO (Last In, First Out)."
          />
        </div>
      </PageContainer>
    </main>
  );
}
