// src/pages/StructurePage.tsx
import { motion } from 'framer-motion';
import VisualizacaoVetor from '../components/DataStructures/Vetor/VisualizacaoVetor';
import { DataStructureProvider } from '../context/DataStructureContext';


export function StructurePage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <DataStructureProvider>
                <VisualizacaoVetor />
            </DataStructureProvider>

        </motion.div>
    );
}

export default StructurePage;