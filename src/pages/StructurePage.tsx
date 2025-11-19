import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import VisualizacaoVetor from '../components/DataStructures/Vetor/VisualizacaoVetor';
import VisualizacaoListaLigada from '../components/DataStructures/ListaLigada/VisualizacaoListaLigada';
import VisualizacaoListaDupla from '../components/DataStructures/ListaDuplamenteLigada/VisualizacaoListaDupla';
import VisualizacaoFila from '../components/DataStructures/Fila/VisualizacaoFila';
import VisualizacaoPilha from '../components/DataStructures/Pilha/VisualizacaoPilha';
import VisualizacaoArvoreBinaria from '../components/DataStructures/ArvoreBinaria/VisualizacaoArvoreBinaria';
import VisualizacaoGrafo from '../components/DataStructures/Grafo/VisualizacaoGrafo';
import VisualizacaoMatriz from '../components/DataStructures/Matriz/VisualizacaoMatriz';

export function StructurePage() {
  const { tipo } = useParams<{ tipo: string }>();

  if (!tipo) {
    return <Navigate to="/" replace />;
  }

  const renderVisualizacao = () => {
    switch (tipo) {
      case 'vetor':
        return <VisualizacaoVetor />;
      case 'lista-ligada':
        return <VisualizacaoListaLigada />;
      case 'lista-dupla':
        return <VisualizacaoListaDupla />;
      case 'fila':
        return <VisualizacaoFila />;
      case 'pilha':
        return <VisualizacaoPilha />;
      case 'arvore-binaria':
        return <VisualizacaoArvoreBinaria />;
      case 'grafo':
        return <VisualizacaoGrafo />;
      case 'matriz':
        return <VisualizacaoMatriz />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-950"
    >
      {renderVisualizacao()}
    </motion.div>
  );
}

export default StructurePage;
