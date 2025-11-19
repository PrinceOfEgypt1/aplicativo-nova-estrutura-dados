// src/components/DataStructures/ListaDuplamenteLigada/NoListaDupla.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  valor: number;
  posicao: number;
  isHead: boolean;
  isTail: boolean;
  isDestacado: boolean;
  mostrarSetaProx: boolean;
}

const NoListaDupla: React.FC<Props> = ({ valor, posicao, isHead, isTail, isDestacado, mostrarSetaProx }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: isDestacado ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`w-32 h-24 rounded-xl flex flex-col items-center justify-center ${
            isDestacado ? 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50 ring-4 ring-yellow-300' :
            isHead ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50' :
            isTail ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50' :
            'bg-gradient-to-br from-purple-600 to-pink-700'
          } text-white font-bold relative overflow-hidden border-2 border-white/20`}
        >
          <div className="relative z-10">
            <div className="text-3xl">{valor}</div>
            <div className="text-xs opacity-70 mt-1">{isHead ? 'HEAD' : isTail ? 'TAIL' : `Node ${posicao}`}</div>
          </div>
          {isDestacado && (
            <motion.div className="absolute inset-0 bg-white" initial={{ opacity: 0.3 }} animate={{ opacity: [0.3, 0, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
          )}
          <div className="absolute top-1 right-2 text-xs bg-black/30 px-2 py-0.5 rounded">[{posicao}]</div>
        </motion.div>

        {isHead && <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">HEAD</div>}
        {isTail && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">TAIL</div>}
      </div>

      {mostrarSetaProx && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-2 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <ArrowRight className="w-6 h-6 text-purple-400" strokeWidth={3} />
            <span className="text-xs text-purple-400/70">next</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-pink-400/70">prev</span>
            <ArrowLeft className="w-6 h-6 text-pink-400" strokeWidth={3} />
          </div>
        </motion.div>
      )}

      {isTail && !mostrarSetaProx && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-3">
          <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 text-sm font-mono border-2 border-slate-600">NULL</div>
        </motion.div>
      )}
    </div>
  );
};

export default NoListaDupla;
