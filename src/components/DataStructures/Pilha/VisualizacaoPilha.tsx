// src/components/DataStructures/Pilha/VisualizacaoPilha.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePilha } from './usePilha';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';

const VisualizacaoPilha: React.FC = () => {
  const navigate = useNavigate();
  const { elementos, executarMetodo, mensagemAcao, elementoDestacado } = usePilha();
  const [valor, setValor] = useState('');

  const handlePush = async () => {
    try {
      await executarMetodo('push', valor);
      setValor('');
    } catch (e) {
      // Erro tratado no hook
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <Button onClick={() => navigate('/')}>
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Button>

      <h1 className="text-4xl font-bold text-white my-6">Pilha (Stack)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-lg">
          <h2 className="text-xl text-white mb-4">Visualização</h2>

          <div className="min-h-[400px] flex flex-col-reverse items-center gap-2">
            <AnimatePresence>
              {elementos.map((el, idx) => (
                <motion.div
                  key={el.id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className={`w-full p-4 rounded ${
                    elementoDestacado === el.id ? 'bg-yellow-500' :
                    idx === elementos.length - 1 ? 'bg-emerald-500' : 'bg-slate-700'
                  } text-white text-center font-bold`}
                >
                  {el.value}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {mensagemAcao && (
            <div className="mt-4 p-3 bg-blue-900 rounded text-blue-200">
              {mensagemAcao}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-white mb-4">Push (Empilhar)</h3>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full p-2 rounded bg-slate-800 text-white mb-2"
              placeholder="Valor"
            />
            <Button onClick={handlePush} className="w-full bg-emerald-500">Push</Button>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg">
            <Button
              onClick={() => executarMetodo('pop')}
              className="w-full bg-rose-500 mb-2"
            >
              Pop (Desempilhar)
            </Button>
            <Button
              onClick={() => executarMetodo('peek')}
              className="w-full bg-blue-500 mb-2"
            >
              Peek (Ver Topo)
            </Button>
            <Button
              onClick={() => executarMetodo('clear')}
              className="w-full bg-gray-500"
            >
              Clear (Limpar)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoPilha;
