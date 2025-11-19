// src/components/DataStructures/ListaLigada/VisualizacaoListaLigada.tsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useListaLigada } from './useListaLigada';
import { useNavigate } from 'react-router-dom';
import NoListaLigada from './NoListaLigada';
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
  List
} from 'lucide-react';
import { Button } from '../../ui/Button';

const VisualizacaoListaLigada: React.FC = () => {
  const navigate = useNavigate();
  const { elementos, executarMetodo, mensagemAcao, elementoDestacado, capacidadeMaxima } = useListaLigada();
  const [valor, setValor] = useState('');
  const [posicao, setPosicao] = useState('');
  const [valorBusca, setValorBusca] = useState('');

  const handleAction = async (metodo: string, ...args: any[]) => {
    try {
      await executarMetodo(metodo, ...args);
      setValor('');
      setPosicao('');
    } catch (e) {
      // Erro tratado no hook
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') action();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={() => navigate('/')} className="bg-slate-800 hover:bg-slate-700">
            <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <div className="flex gap-4">
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Tamanho: </span>
              <span className="text-indigo-400 font-bold">{elementos.length}</span>
              <span className="text-slate-500 text-sm"> / {capacidadeMaxima}</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8 text-center">
          Lista Ligada Simples
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Visualização */}
          <div className="xl:col-span-2 bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 shadow-2xl">
            <h2 className="text-2xl text-white font-semibold mb-6">Visualização da Lista</h2>

            <div className="min-h-[400px] max-h-[600px] overflow-x-auto overflow-y-auto p-6 bg-slate-950/50 rounded-xl">
              <div className="flex items-center min-w-max py-8">
                <AnimatePresence>
                  {elementos.length === 0 ? (
                    <div className="text-slate-600 text-lg">Adicione elementos usando Inserir</div>
                  ) : (
                    elementos.map((el, idx) => (
                      <NoListaLigada
                        key={el.id}
                        valor={el.value}
                        posicao={idx}
                        isHead={idx === 0}
                        isTail={idx === elementos.length - 1}
                        isDestacado={elementoDestacado === el.id}
                        mostrarSeta={idx < elementos.length - 1}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {mensagemAcao && (
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-900/50 to-cyan-900/50 rounded-xl border border-indigo-700/50 text-indigo-200">
                {mensagemAcao}
              </div>
            )}
          </div>

          {/* Controles */}
          <div className="space-y-4">
            {/* Inserir */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />Inserir
              </h3>
              <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} onKeyPress={(e) => handleKeyPress(e, () => handleAction('inserirInicio', valor))} className="w-full p-3 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700 focus:border-emerald-500 focus:outline-none" placeholder="Valor"/>
              <div className="space-y-2">
                <Button onClick={() => handleAction('inserirInicio', valor)} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500" disabled={!valor}><Plus className="w-4 h-4 mr-2"/>No Início</Button>
                <Button onClick={() => handleAction('inserirFim', valor)} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500" disabled={!valor}><Plus className="w-4 h-4 mr-2"/>No Final</Button>
                <div className="flex gap-2">
                  <input type="number" value={posicao} onChange={(e) => setPosicao(e.target.value)} className="flex-1 p-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none" placeholder="Posição"/>
                  <Button onClick={() => handleAction('inserirPosicao', valor, posicao)} className="bg-gradient-to-r from-cyan-500 to-indigo-500" disabled={!valor || !posicao}><Plus className="w-4 h-4"/></Button>
                </div>
              </div>
            </div>

            {/* Remover */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                <Minus className="w-5 h-5 text-rose-400"/>Remover
              </h3>
              <div className="space-y-2">
                <Button onClick={() => handleAction('removerInicio')} className="w-full bg-gradient-to-r from-rose-500 to-pink-500" disabled={elementos.length === 0}><Minus className="w-4 h-4 mr-2"/>Do Início</Button>
                <Button onClick={() => handleAction('removerFim')} className="w-full bg-gradient-to-r from-pink-500 to-rose-500" disabled={elementos.length === 0}><Minus className="w-4 h-4 mr-2"/>Do Final</Button>
                <div className="flex gap-2">
                  <input type="number" value={posicao} onChange={(e) => setPosicao(e.target.value)} className="flex-1 p-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-rose-500 focus:outline-none" placeholder="Posição"/>
                  <Button onClick={() => handleAction('removerPosicao', posicao)} className="bg-gradient-to-r from-rose-600 to-red-600" disabled={!posicao || elementos.length === 0}><Minus className="w-4 h-4"/></Button>
                </div>
                <input type="number" value={valorBusca} onChange={(e) => setValorBusca(e.target.value)} className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-orange-500 focus:outline-none" placeholder="Remover por valor"/>
                <Button onClick={() => { handleAction('removerPorValor', valorBusca); setValorBusca(''); }} className="w-full bg-gradient-to-r from-orange-500 to-red-500" disabled={!valorBusca || elementos.length === 0}>Remover Valor</Button>
              </div>
            </div>

            {/* Busca */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-400"/>Busca e Acesso
              </h3>
              <input type="number" value={valorBusca} onChange={(e) => setValorBusca(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700 focus:border-purple-500 focus:outline-none" placeholder="Buscar valor"/>
              <div className="space-y-2">
                <Button onClick={() => handleAction('buscar', valorBusca)} className="w-full bg-gradient-to-r from-purple-500 to-violet-500" disabled={!valorBusca || elementos.length === 0}><Search className="w-4 h-4 mr-2"/>Buscar</Button>
                <Button onClick={() => handleAction('contem', valorBusca)} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500" disabled={!valorBusca || elementos.length === 0}><CheckCircle className="w-4 h-4 mr-2"/>Contém?</Button>
                <input type="number" value={posicao} onChange={(e) => setPosicao(e.target.value)} className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-indigo-500 focus:outline-none" placeholder="Obter posição"/>
                <Button onClick={() => handleAction('obterPosicao', posicao)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500" disabled={!posicao || elementos.length === 0}><Eye className="w-4 h-4 mr-2"/>Ver Posição</Button>
              </div>
            </div>

            {/* Operações */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold">Operações</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handleAction('obterCabeca')} className="bg-gradient-to-r from-blue-600 to-blue-700" disabled={elementos.length === 0}><Eye className="w-3 h-3 mr-1"/>Head</Button>
                  <Button onClick={() => handleAction('obterCauda')} className="bg-gradient-to-r from-emerald-600 to-emerald-700" disabled={elementos.length === 0}><Eye className="w-3 h-3 mr-1"/>Tail</Button>
                  <Button onClick={() => handleAction('obterMin')} className="bg-gradient-to-r from-blue-600 to-blue-700" disabled={elementos.length === 0}><TrendingDown className="w-3 h-3 mr-1"/>Min</Button>
                  <Button onClick={() => handleAction('obterMax')} className="bg-gradient-to-r from-red-600 to-red-700" disabled={elementos.length === 0}><TrendingUp className="w-3 h-3 mr-1"/>Max</Button>
                  <Button onClick={() => handleAction('inverter')} className="bg-gradient-to-r from-orange-500 to-amber-500" disabled={elementos.length === 0}><RefreshCw className="w-3 h-3 mr-1"/>Inverter</Button>
                  <Button onClick={() => handleAction('clonar')} className="bg-gradient-to-r from-teal-500 to-cyan-500" disabled={elementos.length === 0}><Copy className="w-3 h-3 mr-1"/>Clonar</Button>
                  <Button onClick={() => handleAction('paraArray')} className="bg-gradient-to-r from-slate-600 to-slate-700" disabled={elementos.length === 0}><List className="w-3 h-3 mr-1"/>Array</Button>
                  <Button onClick={() => handleAction('tamanho')} className="bg-gradient-to-r from-slate-600 to-slate-700"><List className="w-3 h-3 mr-1"/>Size</Button>
                </div>
                <Button onClick={() => handleAction('estaVazia')} className="w-full bg-gradient-to-r from-slate-600 to-slate-700"><CheckCircle className="w-4 h-4 mr-2"/>Está Vazia?</Button>
                <Button onClick={() => handleAction('limpar')} className="w-full bg-gradient-to-r from-gray-600 to-gray-700" disabled={elementos.length === 0}><Trash2 className="w-4 h-4 mr-2"/>Limpar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoListaLigada;
