// src/pages/StructurePage.tsx
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import VisualizacaoVetor from '../components/DataStructures/Vetor/VisualizacaoVetor';

export function StructurePage() {
  const { tipo } = useParams<{ tipo: string }>();

  const renderEstrutura = () => {
    switch (tipo) {
      case 'vetor':
        return <VisualizacaoVetor />;
      default:
        return (
          <div className="flex justify-center items-center p-8">
            <p className="text-lg text-gray-400">
              Esta estrutura de dados ainda está em desenvolvimento.
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {renderEstrutura()}
    </motion.div>
  );
}

export default StructurePage;