// src/components/DataStructures/ListaDuplamenteLigada/VisualizacaoListaDupla.tsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useListaDupla } from './useListaDupla';
import { useNavigate } from 'react-router-dom';
import NoListaDupla from './NoListaDupla';
import { ChevronLeft, Plus, Minus, Eye, Trash2, Search, CheckCircle, Copy, RefreshCw, TrendingUp, TrendingDown, List, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Button';

const VisualizacaoListaDupla: React.FC = () => {
  const navigate = useNavigate();
  const { elementos, executarMetodo, mensagemAcao, elementoDestacado, capacidadeMaxima, posicaoNavegacao } = useListaDupla();
  const [valor, setValor] = useState('');
  const [posicao, setPosicao] = useState('');
  const [valorBusca, setValorBusca] = useState('');

  const handle = async (m: string, ...args: any[]) => {
    try {
      await executarMetodo(m, ...args);
      setValor('');
      setPosicao('');
    } catch (e) {}
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') action();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={() => navigate('/')} className="bg-slate-800"><ChevronLeft className="w-4 h-4 mr-2"/>Voltar</Button>
          <div className="flex gap-4">
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Tamanho: </span>
              <span className="text-pink-400 font-bold">{elementos.length}</span>
              <span className="text-slate-500 text-sm"> / {capacidadeMaxima}</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">PosiÁ„o Atual: </span>
              <span className="text-cyan-400 font-bold">{posicaoNavegacao}</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 text-center">
          Lista Duplamente Ligada
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-2xl text-white font-semibold mb-6">VisualizaÁ„o</h2>
            <div className="min-h-[400px] max-h-[600px] overflow-auto p-6 bg-slate-950/50 rounded-xl">
              <div className="flex items-center min-w-max py-8">
                <AnimatePresence>
                  {elementos.length === 0 ? (
                    <div className="text-slate-600 text-lg">Adicione elementos</div>
                  ) : (
                    elementos.map((el, idx) => (
                      <NoListaDupla key={el.id} valor={el.value} posicao={idx} isHead={idx === 0} isTail={idx === elementos.length - 1} isDestacado={elementoDestacado === el.id} mostrarSetaProx={idx < elementos.length - 1} />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
            {mensagemAcao && <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl border border-purple-700/50 text-purple-200">{mensagemAcao}</div>}
          </div>

          <div className="space-y-4">
            {/* NavegaÁ„o Bidirecional */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-cyan-400" />NavegaÁ„o
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handle('navegarTras')} className="bg-gradient-to-r from-pink-500 to-rose-500" disabled={elementos.length === 0 || posicaoNavegacao === 0}>
                  <ArrowLeft className="w-4 h-4 mr-2"/>ê Prev
                </Button>
                <Button onClick={() => handle('navegarFrente')} className="bg-gradient-to-r from-purple-500 to-indigo-500" disabled={elementos.length === 0 || posicaoNavegacao === elementos.length - 1}>
                  <ArrowRight className="w-4 h-4 mr-2"/>Next í
                </Button>
              </div>
            </div>

            {/* Inserir */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2"><Plus className="w-5 h-5 text-emerald-400"/>Inserir</h3>
              <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} onKeyPress={(e) => handleKeyPress(e, () => handle('inserirInicio', valor))} className="w-full p-3 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700 focus:border-emerald-500 focus:outline-none" placeholder="Valor"/>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handle('inserirInicio', valor)} className="bg-gradient-to-r from-blue-500 to-cyan-500" disabled={!valor}><Plus className="w-3 h-3"/>InÌcio</Button>
                  <Button onClick={() => handle('inserirFim', valor)} className="bg-gradient-to-r from-emerald-500 to-teal-500" disabled={!valor}><Plus className="w-3 h-3"/>Fim</Button>
                </div>
                <input type="number" value={posicao} onChange={(e) => setPosicao(e.target.value)} className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none" placeholder="PosiÁ„o"/>
                <div className="grid grid-cols-3 gap-2">
                  <Button onClick={() => handle('inserirPosicao', valor, posicao)} className="bg-gradient-to-r from-cyan-500 to-indigo-500" disabled={!valor || !posicao}><Plus className="w-3 h-3"/></Button>
                  <Button onClick={() => handle('inserirAntes', valor, posicao)} className="bg-gradient-to-r from-purple-500 to-pink-500" disabled={!valor || !posicao}>Antes</Button>
                  <Button onClick={() => handle('inserirDepois', valor, posicao)} className="bg-gradient-to-r from-pink-500 to-rose-500" disabled={!valor || !posicao}>Depois</Button>
                </div>
              </div>
            </div>

            {/* Remover */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2"><Minus className="w-5 h-5 text-rose-400"/>Remover</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handle('removerInicio')} className="bg-gradient-to-r from-rose-500 to-pink-500" disabled={elementos.length === 0}><Minus className="w-3 h-3"/>InÌcio</Button>
                  <Button onClick={() => handle('removerFim')} className="bg-gradient-to-r from-pink-500 to-rose-500" disabled={elementos.length === 0}><Minus className="w-3 h-3"/>Fim</Button>
                </div>
                <div className="flex gap-2">
                  <input type="number" value={posicao} onChange={(e) => setPosicao(e.target.value)} className="flex-1 p-2 rounded bg-slate-800 text-white border border-slate-700" placeholder="Pos"/>
                  <Button onClick={() => handle('removerPosicao', posicao)} className="bg-gradient-to-r from-rose-600 to-red-600" disabled={!posicao || elementos.length === 0}><Minus className="w-3 h-3"/></Button>
                </div>
                <input type="number" value={valorBusca} onChange={(e) => setValorBusca(e.target.value)} className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700" placeholder="Remover por valor"/>
                <Button onClick={() => { handle('removerPorValor', valorBusca); setValorBusca(''); }} className="w-full bg-gradient-to-r from-orange-500 to-red-500" disabled={!valorBusca}>Remover Valor</Button>
              </div>
            </div>

            {/* Busca */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2"><Search className="w-5 h-5 text-purple-400"/>Busca</h3>
              <input type="number" value={valorBusca} onChange={(e) => setValorBusca(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700" placeholder="Valor"/>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handle('buscar', valorBusca)} className="bg-gradient-to-r from-purple-500 to-violet-500" disabled={!valorBusca || !elementos.length}><Search className="w-3 h-3"/>Buscar</Button>
                  <Button onClick={() => handle('contem', valorBusca)} className="bg-gradient-to-r from-violet-500 to-fuchsia-500" disabled={!valorBusca || !elementos.length}><CheckCircle className="w-3 h-3"/>ContÈm</Button>
                </div>
                <input type="number" value={posicao} onChange={(e) => setPosicao(e.target.value)} className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700" placeholder="Ver posiÁ„o"/>
                <Button onClick={() => handle('obterPosicao', posicao)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500" disabled={!posicao || !elementos.length}><Eye className="w-4 h-4 mr-1"/>Ver</Button>
              </div>
            </div>

            {/* OperaÁıes */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold">OperaÁıes</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handle('obterCabeca')} className="bg-gradient-to-r from-blue-600 to-blue-700" disabled={!elementos.length}><Eye className="w-3 h-3"/>Head</Button>
                  <Button onClick={() => handle('obterCauda')} className="bg-gradient-to-r from-emerald-600 to-emerald-700" disabled={!elementos.length}><Eye className="w-3 h-3"/>Tail</Button>
                  <Button onClick={() => handle('obterMin')} className="bg-gradient-to-r from-blue-600 to-blue-700" disabled={!elementos.length}><TrendingDown className="w-3 h-3"/>Min</Button>
                  <Button onClick={() => handle('obterMax')} className="bg-gradient-to-r from-red-600 to-red-700" disabled={!elementos.length}><TrendingUp className="w-3 h-3"/>Max</Button>
                  <Button onClick={() => handle('inverter')} className="bg-gradient-to-r from-orange-500 to-amber-500" disabled={!elementos.length}><RefreshCw className="w-3 h-3"/>Inverter</Button>
                  <Button onClick={() => handle('clonar')} className="bg-gradient-to-r from-teal-500 to-cyan-500" disabled={!elementos.length}><Copy className="w-3 h-3"/>Clonar</Button>
                  <Button onClick={() => handle('paraArray')} className="bg-gradient-to-r from-slate-600 to-slate-700" disabled={!elementos.length}><List className="w-3 h-3"/>Array</Button>
                  <Button onClick={() => handle('tamanho')} className="bg-gradient-to-r from-slate-600 to-slate-700"><List className="w-3 h-3"/>Size</Button>
                </div>
                <Button onClick={() => handle('estaVazia')} className="w-full bg-gradient-to-r from-slate-600 to-slate-700"><CheckCircle className="w-4 h-4 mr-1"/>Vazia?</Button>
                <Button onClick={() => handle('limpar')} className="w-full bg-gradient-to-r from-gray-600 to-gray-700" disabled={!elementos.length}><Trash2 className="w-4 h-4 mr-2"/>Limpar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoListaDupla;
