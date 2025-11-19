import * as React from 'react';
import { motion } from 'framer-motion';

interface VectorCellProps {
  value?: number;
  indice: number;
  destacado: boolean;
}

const VectorCell: React.FC<VectorCellProps> = ({ value, indice, destacado }) => {
  const isEmpty = value === undefined;

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: destacado ? 1.1 : 1,
      }}
      transition={{
        duration: 0.3,
        scale: {
          type: 'spring',
          stiffness: 300,
          damping: 20
        }
      }}
      className={`
        min-w-[4rem] h-16
        rounded-lg relative
        flex flex-col items-center justify-center
        border-2
        transition-all duration-300
        ${isEmpty
          ? 'bg-slate-800 border-slate-700'
          : 'bg-gradient-to-br from-violet-500 to-indigo-600 border-violet-400 shadow-lg shadow-violet-500/20'
        }
        ${destacado ? 'ring-4 ring-cyan-500 ring-offset-2 ring-offset-slate-950 shadow-xl shadow-cyan-500/30' : ''}
      `}
      data-testid={`vector-cell-${indice}`}
      aria-label={`Célula ${indice}, valor ${value !== undefined ? value : 'vazio'}`}
    >
      <span className="absolute top-1 left-2 text-xs font-medium text-slate-400">
        {indice}
      </span>

      {!isEmpty && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className="text-xl font-bold text-white"
        >
          {value}
        </motion.span>
      )}

      {isEmpty && (
        <span className="text-slate-600 text-sm font-medium">
          vazio
        </span>
      )}
    </motion.li>
  );
};

export default VectorCell;
