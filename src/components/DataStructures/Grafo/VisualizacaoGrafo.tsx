// src/components/DataStructures/Grafo/VisualizacaoGrafo.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGrafo } from './useGrafo';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Minus, Search, GitBranch, Trash2, Network, ArrowRight, Copy } from 'lucide-react';
import { Button } from '../../ui/Button';

const VisualizacaoGrafo: React.FC = () => {
  const navigate = useNavigate();
  const { grafo, executarMetodo, mensagemAcao, verticeDestacado, arestaDestacada, capacidadeMaxima } = useGrafo();
  const [valor, setValor] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');

  const handle = async (m: string, ...args: any[]) => {
    try {
      await executarMetodo(m, ...args);
      setValor('');
      setOrigem('');
      setDestino('');
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={() => navigate('/')} className="bg-slate-800"><ChevronLeft className="w-4 h-4 mr-2"/>Voltar</Button>
          <div className="flex gap-4">
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Vértices: </span>
              <span className="text-cyan-400 font-bold">{grafo.vertices.length}</span>
              <span className="text-slate-500 text-sm"> / {capacidadeMaxima}</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Arestas: </span>
              <span className="text-emerald-400 font-bold">{grafo.arestas.length}</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Tipo: </span>
              <span className="text-purple-400 font-bold">{grafo.direcionado ? 'Direcionado' : 'Não-Dir.'}</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-8 text-center">
          Grafo
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-2xl text-white font-semibold mb-6 flex items-center gap-2">
              <Network className="w-6 h-6 text-cyan-400" />Rede de Vértices e Arestas
            </h2>
            <div className="min-h-[500px] p-6 bg-slate-950/50 rounded-xl relative">
              {grafo.vertices.length === 0 ? (
                <div className="text-slate-600 text-lg flex items-center justify-center h-full">Adicione vértices para criar o grafo</div>
              ) : (
                <svg className="w-full h-[500px]">
                  <AnimatePresence>
                    {grafo.arestas.map((aresta, idx) => {
                      const v1 = grafo.vertices.find(v => v.id === aresta.origem);
                      const v2 = grafo.vertices.find(v => v.id === aresta.destino);
                      if (!v1 || !v2) return null;
                      const destacada = arestaDestacada?.origem === aresta.origem && arestaDestacada?.destino === aresta.destino;
                      return (
                        <motion.line key={`${aresta.origem}-${aresta.destino}-${idx}`} x1={v1.x} y1={v1.y} x2={v2.x} y2={v2.y}
                          stroke={destacada ? '#fbbf24' : '#06b6d4'} strokeWidth={destacada ? 3 : 2}
                          initial={{ opacity: 0 }} animate={{ opacity: destacada ? 1 : 0.6 }} exit={{ opacity: 0 }}
                          markerEnd={grafo.direcionado ? 'url(#arrowhead)' : undefined}
                        />
                      );
                    })}
                  </AnimatePresence>
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#06b6d4" />
                    </marker>
                  </defs>
                  <AnimatePresence>
                    {grafo.vertices.map(vertice => (
                      <motion.g key={vertice.id} initial={{ scale: 0 }} animate={{ scale: verticeDestacado === vertice.id ? 1.3 : 1 }} exit={{ scale: 0 }}>
                        <circle cx={vertice.x} cy={vertice.y} r={25}
                          className={`${verticeDestacado === vertice.id ? 'fill-yellow-500' : 'fill-cyan-600'} stroke-white stroke-2`}
                        />
                        <text x={vertice.x} y={vertice.y} textAnchor="middle" dy=".3em" className="text-white font-bold text-lg fill-white">{vertice.valor}</text>
                      </motion.g>
                    ))}
                  </AnimatePresence>
                </svg>
              )}
            </div>
            {mensagemAcao && <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl border border-cyan-700/50 text-cyan-200">{mensagemAcao}</div>}
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2"><Plus className="w-5 h-5 text-emerald-400"/>Vértices</h3>
              <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700 focus:border-emerald-500 focus:outline-none" placeholder="Valor"/>
              <div className="space-y-2">
                <Button onClick={() => handle('adicionarVertice', valor)} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500" disabled={!valor}><Plus className="w-4 h-4 mr-2"/>Adicionar</Button>
                <Button onClick={() => handle('removerVertice', valor)} className="w-full bg-gradient-to-r from-rose-500 to-red-500" disabled={!valor}><Minus className="w-4 h-4 mr-2"/>Remover</Button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2"><GitBranch className="w-5 h-5 text-cyan-400"/>Arestas</h3>
              <input type="number" value={origem} onChange={(e) => setOrigem(e.target.value)} className="w-full p-2 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700" placeholder="Origem"/>
              <input type="number" value={destino} onChange={(e) => setDestino(e.target.value)} className="w-full p-2 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700" placeholder="Destino"/>
              <div className="space-y-2 text-sm">
                <Button onClick={() => handle('adicionarAresta', origem, destino)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500" disabled={!origem || !destino}><Plus className="w-3 h-3 mr-2"/>Adicionar</Button>
                <Button onClick={() => handle('removerAresta', origem, destino)} className="w-full bg-gradient-to-r from-orange-500 to-red-500" disabled={!origem || !destino}><Minus className="w-3 h-3 mr-2"/>Remover</Button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold flex items-center gap-2"><Search className="w-5 h-5 text-purple-400"/>Consultas</h3>
              <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full p-2 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700" placeholder="Vértice"/>
              <div className="space-y-2 text-sm">
                <Button onClick={() => handle('obterVizinhos', valor)} className="w-full bg-gradient-to-r from-purple-600 to-purple-700" disabled={!valor || !grafo.vertices.length}>Vizinhos</Button>
                <Button onClick={() => handle('obterGrau', valor)} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700" disabled={!valor || !grafo.vertices.length}>Grau</Button>
                <Button onClick={() => handle('contemVertice', valor)} className="w-full bg-gradient-to-r from-violet-600 to-violet-700" disabled={!valor}>Contém?</Button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold">Buscas</h3>
              <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full p-2 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700" placeholder="Vértice inicial"/>
              <div className="space-y-2 text-sm">
                <Button onClick={() => handle('bfs', valor)} className="w-full bg-gradient-to-r from-blue-600 to-blue-700" disabled={!valor || !grafo.vertices.length}>BFS</Button>
                <Button onClick={() => handle('dfs', valor)} className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700" disabled={!valor || !grafo.vertices.length}>DFS</Button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold">Caminhos</h3>
              <input type="number" value={origem} onChange={(e) => setOrigem(e.target.value)} className="w-full p-2 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700" placeholder="De"/>
              <input type="number" value={destino} onChange={(e) => setDestino(e.target.value)} className="w-full p-2 rounded-xl bg-slate-800 text-white mb-2 border border-slate-700" placeholder="Para"/>
              <div className="space-y-2 text-sm">
                <Button onClick={() => handle('estaConectado', origem, destino)} className="w-full bg-gradient-to-r from-emerald-600 to-teal-700" disabled={!origem || !destino || !grafo.vertices.length}>Conectado?</Button>
                <Button onClick={() => handle('obterCaminho', origem, destino)} className="w-full bg-gradient-to-r from-teal-600 to-cyan-700" disabled={!origem || !destino || !grafo.vertices.length}><ArrowRight className="w-3 h-3 mr-1"/>Caminho</Button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white mb-4 font-semibold">Operações</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handle('tamanhoVertices')} className="bg-gradient-to-r from-slate-600 to-slate-700">Vértices</Button>
                  <Button onClick={() => handle('totalArestas')} className="bg-gradient-to-r from-slate-600 to-slate-700">Arestas</Button>
                  <Button onClick={() => handle('estaVazio')} className="bg-gradient-to-r from-slate-600 to-slate-700">Vazio?</Button>
                  <Button onClick={() => handle('clonar')} className="bg-gradient-to-r from-purple-600 to-pink-600" disabled={!grafo.vertices.length}><Copy className="w-3 h-3"/>Clonar</Button>
                </div>
                <Button onClick={() => handle('toggleDirecionado')} className="w-full bg-gradient-to-r from-amber-600 to-orange-600">{grafo.direcionado ? 'Não-Direcionado' : 'Direcionado'}</Button>
                <Button onClick={() => handle('limpar')} className="w-full bg-gradient-to-r from-gray-600 to-gray-700" disabled={!grafo.vertices.length}><Trash2 className="w-4 h-4 mr-2"/>Limpar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoGrafo;
