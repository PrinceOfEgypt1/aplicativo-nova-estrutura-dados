// src/pages/StructurePage.tsx
import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import VisualizacaoVetor from '../components/DataStructures/Vetor/VisualizacaoVetor';
// import { DataStructureProvider } from '../context/DataStructureContext'; // Não é mais necessário

export function StructurePage() {
  const { tipo } = useParams<{ tipo: string }>();

  if (!tipo) {
    return <Navigate to="/" replace />;
  }

  if (tipo !== 'vetor') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-xl font-bold text-white mb-4">Estrutura em Desenvolvimento</h2>
          <p className="text-gray-300 mb-6">
            A visualização para {tipo.replace('-', ' ')} está sendo implementada. Por favor, tente
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
      <VisualizacaoVetor />
    </motion.div>
  );
}

export default StructurePage;