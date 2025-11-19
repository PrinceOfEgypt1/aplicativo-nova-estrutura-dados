// src/pages/StructurePage.tsx
import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import VisualizacaoVetor from '../components/DataStructures/Vetor/VisualizacaoVetor';
import VisualizacaoPilha from '../components/DataStructures/Pilha/VisualizacaoPilha';
import VisualizacaoFila from '../components/DataStructures/Fila/VisualizacaoFila';
import VisualizacaoListaLigada from '../components/DataStructures/ListaLigada/VisualizacaoListaLigada';
import VisualizacaoListaDupla from '../components/DataStructures/ListaDuplamenteLigada/VisualizacaoListaDupla';
import VisualizacaoArvoreBinaria from '../components/DataStructures/ArvoreBinaria/VisualizacaoArvoreBinaria';
import VisualizacaoGrafo from '../components/DataStructures/Grafo/VisualizacaoGrafo';

export function StructurePage() {
  const { tipo } = useParams<{ tipo: string }>();

  if (!tipo) {
    return <Navigate to="/" replace />;
  }

  // Mapeamento de tipos para componentes
  const componentMap: Record<string, React.ComponentType> = {
    'vetor': VisualizacaoVetor,
    'pilha': VisualizacaoPilha,
    'fila': VisualizacaoFila,
    'lista-ligada': VisualizacaoListaLigada,
    'lista-dupla': VisualizacaoListaDupla,
    'arvore-binaria': VisualizacaoArvoreBinaria,
    'grafo': VisualizacaoGrafo,
  };

  const Component = componentMap[tipo];

  // Se a estrutura não existe, mostrar mensagem
  if (!Component) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-xl font-bold text-white mb-4">Estrutura em Desenvolvimento</h2>
          <p className="text-gray-300 mb-6">
            A visualização para {tipo.replace(/-/g, ' ')} está sendo implementada. Por favor, tente
            novamente em breve.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-950"
    >
      <Component />
    </motion.div>
  );
}

export default StructurePage;
