// src/components/DataStructures/Fila/VisualizacaoFila.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFila } from './useFila';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Plus,
  Minus,
  Eye,
  Trash2,
  Search,
  CheckCircle,
  Copy,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  List,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../ui/Button';

const VisualizacaoFila: React.FC = () => {
  const navigate = useNavigate();
  const { elementos, executarMetodo, mensagemAcao, elementoDestacado, capacidadeMaxima } = useFila();
  const [valor, setValor] = useState('');
  const [valorBusca, setValorBusca] = useState('');
  const [valoresMultiplos, setValoresMultiplos] = useState('');

  const handleEnqueue = async () => {
    try {
      await executarMetodo('enqueue', valor);
      setValor('');
    } catch (e) {
      // Erro tratado no hook
    }
  };

  const handleEnqueueMultiple = async () => {
    try {
      await executarMetodo('enqueueMultiple', valoresMultiplos);
      setValoresMultiplos('');
    } catch (e) {
      // Erro tratado no hook
    }
  };

  const handleSearch = async () => {
    try {
      await executarMetodo('search', valorBusca);
    } catch (e) {
      // Erro tratado no hook
    }
  };

  const handleContains = async () => {
    try {
      await executarMetodo('contains', valorBusca);
    } catch (e) {
      // Erro tratado no hook
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            className="bg-slate-800 hover:bg-slate-700 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Tamanho: </span>
              <span className="text-purple-400 font-bold">{elementos.length}</span>
              <span className="text-slate-500 text-sm"> / {capacidadeMaxima}</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">OcupaÁ„o: </span>
              <span className={`font-bold ${
                elementos.length / capacidadeMaxima > 0.8 ? 'text-rose-400' :
                elementos.length / capacidadeMaxima > 0.5 ? 'text-yellow-400' :
                'text-purple-400'
              }`}>
                {Math.round((elementos.length / capacidadeMaxima) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 text-center">
          Fila (Queue - FIFO)
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* VisualizaÁ„o */}
          <div className="xl:col-span-2 bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white font-semibold flex items-center gap-2">
                <Layers className="w-6 h-6 text-purple-400" />
                VisualizaÁ„o da Fila
              </h2>
              <div className="text-slate-400 text-sm">
                {elementos.length === 0 ? 'Fila Vazia' : `${elementos.length} elemento(s)`}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-rose-400" />
                <span className="text-rose-400 font-semibold">DEQUEUE (SaÌda)</span>
                <span className="text-slate-500">ê FRONT (InÌcio)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">REAR (Final) í</span>
                <span className="text-emerald-400 font-semibold">ENQUEUE (Entrada)</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            <div className="min-h-[400px] flex items-center justify-center p-6 bg-slate-950/50 rounded-xl overflow-x-auto">
              <div className="flex items-center gap-3 min-w-max">
                <AnimatePresence>
                  {elementos.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-slate-600 text-lg"
                    >
                      Adicione elementos usando Enqueue
                    </motion.div>
                  ) : (
                    elementos.map((el, idx) => (
                      <motion.div
                        key={el.id}
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: elementoDestacado === el.id ? 1.1 : 1
                        }}
                        exit={{ opacity: 0, x: -100, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="relative"
                      >
                        <div className={`w-24 h-24 rounded-xl transition-all duration-300 flex flex-col items-center justify-center ${
                          elementoDestacado === el.id
                            ? 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50 ring-4 ring-yellow-300' :
                          idx === 0
                            ? 'bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/50'
                            : idx === elementos.length - 1
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50'
                            : 'bg-gradient-to-br from-purple-600 to-purple-700'
                        } text-white font-bold relative overflow-hidden`}>
                          <div className="relative z-10">
                            <div className="text-2xl">{el.value}</div>
                            <div className="text-xs opacity-70 mt-1">
                              {idx === 0 ? 'FRONT' : idx === elementos.length - 1 ? 'REAR' : `Pos ${idx}`}
                            </div>
                          </div>
                          {elementoDestacado === el.id && (
                            <motion.div
                              className="absolute inset-0 bg-white"
                              initial={{ opacity: 0.3 }}
                              animate={{ opacity: [0.3, 0, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </div>
                        {idx < elementos.length - 1 && (
                          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-0">
                            <ArrowRight className="w-6 h-6 text-purple-400/50" />
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {mensagemAcao && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl border border-purple-700/50 text-purple-200 backdrop-blur-sm"
              >
                {mensagemAcao}
              </motion.div>
            )}
          </div>

          {/* Controles */}
          <div className="space-y-4">
            {/* Enqueue ⁄nico */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                Enqueue (Adicionar)
              </h3>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleEnqueue)}
                className="w-full p-3 rounded-xl bg-slate-800 text-white mb-3 border border-slate-700 focus:border-emerald-500 focus:outline-none transition-all"
                placeholder="Digite um valor"
              />
              <Button
                onClick={handleEnqueue}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
                disabled={!valor}
              >
                <Plus className="w-4 h-4 mr-2" />
                Enqueue
              </Button>
            </div>

            {/* Enqueue M˙ltiplo */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Enqueue M˙ltiplo
              </h3>
              <input
                type="text"
                value={valoresMultiplos}
                onChange={(e) => setValoresMultiplos(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleEnqueueMultiple)}
                className="w-full p-3 rounded-xl bg-slate-800 text-white mb-3 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-all"
                placeholder="Ex: 10, 20, 30"
              />
              <Button
                onClick={handleEnqueueMultiple}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                disabled={!valoresMultiplos}
              >
                <Layers className="w-4 h-4 mr-2" />
                Enqueue M˙ltiplo
              </Button>
            </div>

            {/* OperaÁıes B·sicas */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-white mb-4 font-semibold">OperaÁıes B·sicas</h3>
              <div className="space-y-2">
                <Button
                  onClick={() => executarMetodo('dequeue')}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-rose-500/50"
                  disabled={elementos.length === 0}
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Dequeue (Remover)
                </Button>
                <Button
                  onClick={() => executarMetodo('front')}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                  disabled={elementos.length === 0}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Front (Ver InÌcio)
                </Button>
                <Button
                  onClick={() => executarMetodo('rear')}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
                  disabled={elementos.length === 0}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Rear (Ver Final)
                </Button>
                <Button
                  onClick={() => executarMetodo('clear')}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                  disabled={elementos.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear (Limpar)
                </Button>
              </div>
            </div>

            {/* Busca e VerificaÁ„o */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-400" />
                Busca e VerificaÁ„o
              </h3>
              <input
                type="number"
                value={valorBusca}
                onChange={(e) => setValorBusca(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleSearch)}
                className="w-full p-3 rounded-xl bg-slate-800 text-white mb-3 border border-slate-700 focus:border-purple-500 focus:outline-none transition-all"
                placeholder="Valor a buscar"
              />
              <div className="space-y-2">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                  disabled={!valorBusca || elementos.length === 0}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search (Buscar)
                </Button>
                <Button
                  onClick={handleContains}
                  className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 shadow-lg hover:shadow-violet-500/50"
                  disabled={!valorBusca || elementos.length === 0}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Contains (ContÈm)
                </Button>
              </div>
            </div>

            {/* InformaÁıes e Utilidades */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-white mb-4 font-semibold">InformaÁıes</h3>
              <div className="space-y-2">
                <Button
                  onClick={() => executarMetodo('isEmpty')}
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  isEmpty (Est· Vazia?)
                </Button>
                <Button
                  onClick={() => executarMetodo('size')}
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 transition-all duration-300"
                >
                  <List className="w-4 h-4 mr-2" />
                  Size (Tamanho)
                </Button>
                <Button
                  onClick={() => executarMetodo('toArray')}
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 transition-all duration-300"
                  disabled={elementos.length === 0}
                >
                  <List className="w-4 h-4 mr-2" />
                  toArray (Converter)
                </Button>
              </div>
            </div>

            {/* OperaÁıes AvanÁadas */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-white mb-4 font-semibold">OperaÁıes AvanÁadas</h3>
              <div className="space-y-2">
                <Button
                  onClick={() => executarMetodo('reverse')}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
                  disabled={elementos.length === 0}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reverse (Inverter)
                </Button>
                <Button
                  onClick={() => executarMetodo('clone')}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-teal-500/50"
                  disabled={elementos.length === 0}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Clone (Clonar)
                </Button>
                <Button
                  onClick={() => executarMetodo('getMin')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-600/50"
                  disabled={elementos.length === 0}
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  getMin (Menor)
                </Button>
                <Button
                  onClick={() => executarMetodo('getMax')}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-600/50"
                  disabled={elementos.length === 0}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  getMax (Maior)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoFila;
