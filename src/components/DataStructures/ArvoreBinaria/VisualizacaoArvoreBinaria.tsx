// src/components/DataStructures/ArvoreBinaria/VisualizacaoArvoreBinaria.tsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useArvoreBinaria } from './useArvoreBinaria';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Minus, Search, CheckCircle, Trash2, TrendingDown, TrendingUp, Eye, GitBranch, Copy } from 'lucide-react';
import { Button } from '../../ui/Button';
import { TreeElement } from './arvore';

const VisualizacaoArvoreBinaria: React.FC = () => {
  const navigate = useNavigate();
  const { elementos, executarMetodo, mensagemAcao, elementoDestacado, capacidadeMaxima } = useArvoreBinaria();
  const [valor, setValor] = useState('');

  const handle = async (m: string, ...args: any[]) => {
    try {
      await executarMetodo(m, ...args);
      setValor('');
    } catch (e) {}
  };

  // Organiza elementos por nível
  const elementosPorNivel: TreeElement[][] = [];
  elementos.forEach(el => {
    if (!elementosPorNivel[el.level]) {
      elementosPorNivel[el.level] = [];
    }
    elementosPorNivel[el.level].push(el);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={() => navigate('/')} className="bg-slate-800"><ChevronLeft className="w-4 h-4 mr-2"/>Voltar</Button>
          <div className="flex gap-4">
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Nós: </span>
              <span className="text-green-400 font-bold">{elementos.length}</span>
              <span className="text-slate-500 text-sm"> / {capacidadeMaxima}</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Altura: </span>
              <span className="text-cyan-400 font-bold">{elementosPorNivel.length}</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-8 text-center">
          Árvore Binária de Busca
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-2xl text-white font-semibold mb-6 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-green-400" />
              Visualização Hierárquica
            </h2>
            <div className="min-h-[500px] p-6 bg-slate-950/50 rounded-xl overflow-auto">
              {elementos.length === 0 ? (
                <div className="text-slate-600 text-lg flex items-center justify-center h-full">Insira elementos para criar a árvore</div>
              ) : (
                <div className="flex flex-col items-center gap-8 py-4">
                  <AnimatePresence>
                    {elementosPorNivel.map((nivel, nivelIdx) => (
                      <motion.div key={nivelIdx} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4">
                        {nivel.map(el => (
                          <motion.div key={el.id} initial={{ scale: 0 }} animate={{ scale: elementoDestacado === el.id ? 1.2 : 1 }} transition={{ type: 'spring', stiffness: 300 }}
                            className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${
                              elementoDestacado === el.id ? 'bg-gradient-to-br from-yellow-500 to-orange-500 ring-4 ring-yellow-300 shadow-lg shadow-yellow-500/50' :
                              nivelIdx === 0 ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/50' :
                              'bg-gradient-to-br from-teal-600 to-cyan-700'
                            } text-white relative`}>
                            {el.value}
                            {nivelIdx === 0 && <div className="absolute -top-8 text-xs bg-green-500 px-2 py-1 rounded-full">RAIZ</div>}
                            <div className="absolute -bottom-6 text-xs text-slate-400">L{el.level}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
            {mensagemAcao && <div className="mt-6 p-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl border border-green-700/50 text-green-200">{mensagemAcao}</div>}
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2"><Plus className="w-5 h-5 text-emerald-400"/>Inserir</h3>
              <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handle('inserir', valor)} className="w-full p-3 rounded-xl bg-slate-800 text-white mb-3 border border-slate-700 focus:border-emerald-500 focus:outline-none" placeholder="Valor"/>
              <Button onClick={() => handle('inserir', valor)} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500" disabled={!valor}><Plus className="w-4 h-4 mr-2"/>Inserir</Button>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2"><Search className="w-5 h-5 text-cyan-400"/>Busca e Remoção</h3>
              <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700" placeholder="Buscar/Remover"/>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handle('buscar', valor)} className="bg-gradient-to-r from-cyan-500 to-blue-500" disabled={!valor || !elementos.length}><Search className="w-3 h-3"/>Buscar</Button>
                  <Button onClick={() => handle('contem', valor)} className="bg-gradient-to-r from-blue-500 to-indigo-500" disabled={!valor || !elementos.length}><CheckCircle className="w-3 h-3"/>Contém</Button>
                </div>
                <Button onClick={() => { handle('remover', valor); setValor(''); }} className="w-full bg-gradient-to-r from-rose-500 to-red-500" disabled={!valor || !elementos.length}><Minus className="w-4 h-4 mr-2"/>Remover</Button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold">Travessias</h3>
              <div className="space-y-2 text-sm">
                <Button onClick={() => handle('inOrder')} className="w-full bg-gradient-to-r from-purple-600 to-purple-700" disabled={!elementos.length}>InOrder (E-R-D)</Button>
                <Button onClick={() => handle('preOrder')} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700" disabled={!elementos.length}>PreOrder (R-E-D)</Button>
                <Button onClick={() => handle('postOrder')} className="w-full bg-gradient-to-r from-violet-600 to-violet-700" disabled={!elementos.length}>PostOrder (E-D-R)</Button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold">Informações</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handle('obterMin')} className="bg-gradient-to-r from-blue-600 to-blue-700" disabled={!elementos.length}><TrendingDown className="w-3 h-3"/>Min</Button>
                  <Button onClick={() => handle('obterMax')} className="bg-gradient-to-r from-red-600 to-red-700" disabled={!elementos.length}><TrendingUp className="w-3 h-3"/>Max</Button>
                  <Button onClick={() => handle('obterRaiz')} className="bg-gradient-to-r from-green-600 to-green-700" disabled={!elementos.length}><Eye className="w-3 h-3"/>Raiz</Button>
                  <Button onClick={() => handle('altura')} className="bg-gradient-to-r from-cyan-600 to-cyan-700" disabled={!elementos.length}><GitBranch className="w-3 h-3"/>Altura</Button>
                  <Button onClick={() => handle('tamanho')} className="bg-gradient-to-r from-slate-600 to-slate-700">Tamanho</Button>
                  <Button onClick={() => handle('estaVazia')} className="bg-gradient-to-r from-slate-600 to-slate-700">Vazia?</Button>
                </div>
                <Button onClick={() => handle('estaBalanceada')} className="w-full bg-gradient-to-r from-amber-600 to-orange-600" disabled={!elementos.length}>Balanceada?</Button>
                <Button onClick={() => handle('paraArray')} className="w-full bg-gradient-to-r from-teal-600 to-cyan-600" disabled={!elementos.length}>→ Array</Button>
                <Button onClick={() => handle('clonar')} className="w-full bg-gradient-to-r from-purple-600 to-pink-600" disabled={!elementos.length}><Copy className="w-4 h-4 mr-1"/>Clonar</Button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <Button onClick={() => handle('limpar')} className="w-full bg-gradient-to-r from-gray-600 to-gray-700" disabled={!elementos.length}><Trash2 className="w-4 h-4 mr-2"/>Limpar Árvore</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoArvoreBinaria;
