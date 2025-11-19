// src/components/DataStructures/ListaLigada/NoListaLigada.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface NoListaLigadaProps {
  valor: number;
  posicao: number;
  isHead: boolean;
  isTail: boolean;
  isDestacado: boolean;
  mostrarSeta: boolean;
}

const NoListaLigada: React.FC<NoListaLigadaProps> = ({
  valor,
  posicao,
  isHead,
  isTail,
  isDestacado,
  mostrarSeta,
}) => {
  return (
    <div className="flex items-center">
      {/* Nó */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: isDestacado ? 1.1 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`w-32 h-24 rounded-xl transition-all duration-300 flex flex-col items-center justify-center ${
            isDestacado
              ? 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50 ring-4 ring-yellow-300'
              : isHead
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50'
              : isTail
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50'
              : 'bg-gradient-to-br from-indigo-600 to-purple-700'
          } text-white font-bold relative overflow-hidden border-2 border-white/20`}
        >
          {/* Valor */}
          <div className="relative z-10">
            <div className="text-3xl">{valor}</div>
            <div className="text-xs opacity-70 mt-1">
              {isHead ? 'HEAD' : isTail ? 'TAIL' : `Node ${posicao}`}
            </div>
          </div>

          {/* Animação de pulso quando destacado */}
          {isDestacado && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}

          {/* Indicador de posição */}
          <div className="absolute top-1 right-2 text-xs bg-black/30 px-2 py-0.5 rounded">
            [{posicao}]
          </div>
        </motion.div>

        {/* Labels HEAD e TAIL */}
        {isHead && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
            HEAD (início)
          </div>
        )}
        {isTail && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
            TAIL (fim)
          </div>
        )}
      </div>

      {/* Seta para o próximo nó */}
      {mostrarSeta && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-3 flex flex-col items-center"
        >
          <ArrowRight className="w-8 h-8 text-indigo-400" strokeWidth={3} />
          <span className="text-xs text-indigo-400/70 mt-1">next</span>
        </motion.div>
      )}

      {/* NULL no final */}
      {isTail && !mostrarSeta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-3 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 text-sm font-mono border-2 border-slate-600">
            NULL
          </div>
          <span className="text-xs text-slate-500 mt-1">fim</span>
        </motion.div>
      )}
    </div>
  );
};

export default NoListaLigada;
