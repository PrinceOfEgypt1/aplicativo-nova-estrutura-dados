import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PropsVisualizacaoVetor<T> {
  elementos: T[];
  indiceDestacado?: number;
}

export function VisualizacaoVetor<T>({ 
  elementos, 
  indiceDestacado 
}: PropsVisualizacaoVetor<T>) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <AnimatePresence mode="popLayout">
        {elementos.map((elemento, indice) => (
          <motion.div
            key={indice}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              backgroundColor: indiceDestacado === indice ? "#3b82f6" : "#1f2937"
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center w-12 h-12 rounded-lg text-white font-mono relative"
          >
            <span className="absolute -top-6 text-xs text-gray-500">{indice}</span>
            {String(elemento)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
