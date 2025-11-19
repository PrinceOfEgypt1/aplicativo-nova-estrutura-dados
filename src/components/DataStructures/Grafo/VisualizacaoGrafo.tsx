import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Toast, ToastType } from '../../ui/Toast';
import { EmptyState } from '../../shared/EmptyState';
import { PageContainer } from '../../shared/PageContainer';
import { CircuitBoard, Plus, Trash2, Eye, Hash, Link as LinkIcon, Unlink, Network } from 'lucide-react';

interface Aresta {
  de: number;
  para: number;
  id: string;
}

const VisualizacaoGrafo: React.FC = () => {
  const [vertices, setVertices] = React.useState<number[]>([]);
  const [arestas, setArestas] = React.useState<Aresta[]>([]);
  const [vertice, setVertice] = React.useState('');
  const [verticeOrigem, setVerticeOrigem] = React.useState('');
  const [verticeDestino, setVerticeDestino] = React.useState('');
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastType, setToastType] = React.useState<ToastType>('success');
  const [metodoSelecionado, setMetodoSelecionado] = React.useState<string | null>(null);

  const mostrarToast = (mensagem: string, tipo: ToastType) => {
    setToastMessage(mensagem);
    setToastType(tipo);
    setToastVisible(true);
  };

  const adicionarVertice = () => {
    if (!vertice) {
      mostrarToast('Digite um vértice', 'error');
      return;
    }
    const v = parseInt(vertice);
    if (vertices.includes(v)) {
      mostrarToast('Vértice já existe', 'warning');
      return;
    }
    setVertices([...vertices, v]);
    mostrarToast(`Vértice ${v} adicionado`, 'success');
    setVertice('');
  };

  const removerVertice = () => {
    if (!vertice) {
      mostrarToast('Digite um vértice', 'error');
      return;
    }
    const v = parseInt(vertice);
    if (!vertices.includes(v)) {
      mostrarToast('Vértice não existe', 'error');
      return;
    }
    setVertices(vertices.filter(vert => vert !== v));
    setArestas(arestas.filter(a => a.de !== v && a.para !== v));
    mostrarToast(`Vértice ${v} removido`, 'success');
    setVertice('');
  };

  const adicionarAresta = () => {
    if (!verticeOrigem || !verticeDestino) {
      mostrarToast('Digite origem e destino', 'error');
      return;
    }
    const origem = parseInt(verticeOrigem);
    const destino = parseInt(verticeDestino);

    if (!vertices.includes(origem) || !vertices.includes(destino)) {
      mostrarToast('Vértices não existem', 'error');
      return;
    }

    if (arestas.some(a => a.de === origem && a.para === destino)) {
      mostrarToast('Aresta já existe', 'warning');
      return;
    }

    const novaAresta: Aresta = { de: origem, para: destino, id: Date.now().toString() };
    setArestas([...arestas, novaAresta]);
    mostrarToast(`Aresta ${origem} → ${destino} adicionada`, 'success');
    setVerticeOrigem('');
    setVerticeDestino('');
  };

  const removerAresta = () => {
    if (!verticeOrigem || !verticeDestino) {
      mostrarToast('Digite origem e destino', 'error');
      return;
    }
    const origem = parseInt(verticeOrigem);
    const destino = parseInt(verticeDestino);

    const arestaExiste = arestas.some(a => a.de === origem && a.para === destino);
    if (!arestaExiste) {
      mostrarToast('Aresta não existe', 'error');
      return;
    }

    setArestas(arestas.filter(a => !(a.de === origem && a.para === destino)));
    mostrarToast(`Aresta ${origem} → ${destino} removida`, 'success');
    setVerticeOrigem('');
    setVerticeDestino('');
  };

  const listarVertices = () => {
    if (vertices.length === 0) {
      mostrarToast('Grafo sem vértices', 'error');
      return;
    }
    mostrarToast(`Vértices: ${vertices.sort((a, b) => a - b).join(', ')}`, 'info');
  };

  const listarArestas = () => {
    if (arestas.length === 0) {
      mostrarToast('Grafo sem arestas', 'error');
      return;
    }
    const lista = arestas.map(a => `${a.de}→${a.para}`).join(', ');
    mostrarToast(`Arestas: ${lista}`, 'info');
  };

  const verificarVertice = () => {
    if (!vertice) {
      mostrarToast('Digite um vértice', 'error');
      return;
    }
    const v = parseInt(vertice);
    mostrarToast(vertices.includes(v) ? `Vértice ${v} existe` : `Vértice ${v} não existe`, 'info');
    setVertice('');
  };

  const verificarAresta = () => {
    if (!verticeOrigem || !verticeDestino) {
      mostrarToast('Digite origem e destino', 'error');
      return;
    }
    const origem = parseInt(verticeOrigem);
    const destino = parseInt(verticeDestino);
    const existe = arestas.some(a => a.de === origem && a.para === destino);
    mostrarToast(existe ? `Aresta ${origem}→${destino} existe` : `Aresta ${origem}→${destino} não existe`, 'info');
    setVerticeOrigem('');
    setVerticeDestino('');
  };

  const grauVertice = () => {
    if (!vertice) {
      mostrarToast('Digite um vértice', 'error');
      return;
    }
    const v = parseInt(vertice);
    if (!vertices.includes(v)) {
      mostrarToast('Vértice não existe', 'error');
      return;
    }
    const grauSaida = arestas.filter(a => a.de === v).length;
    const grauEntrada = arestas.filter(a => a.para === v).length;
    mostrarToast(`Vértice ${v}: Grau de entrada=${grauEntrada}, Grau de saída=${grauSaida}`, 'info');
    setVertice('');
  };

  const obterVizinhos = () => {
    if (!vertice) {
      mostrarToast('Digite um vértice', 'error');
      return;
    }
    const v = parseInt(vertice);
    if (!vertices.includes(v)) {
      mostrarToast('Vértice não existe', 'error');
      return;
    }
    const vizinhos = arestas.filter(a => a.de === v).map(a => a.para);
    if (vizinhos.length === 0) {
      mostrarToast(`Vértice ${v} não tem vizinhos`, 'info');
    } else {
      mostrarToast(`Vizinhos de ${v}: ${vizinhos.join(', ')}`, 'info');
    }
    setVertice('');
  };

  const eConectado = () => {
    if (vertices.length === 0) {
      mostrarToast('Grafo vazio', 'info');
      return;
    }

    const visitados = new Set<number>();
    const pilha = [vertices[0]];

    while (pilha.length > 0) {
      const atual = pilha.pop()!;
      if (!visitados.has(atual)) {
        visitados.add(atual);
        arestas.filter(a => a.de === atual).forEach(a => pilha.push(a.para));
        arestas.filter(a => a.para === atual).forEach(a => pilha.push(a.de));
      }
    }

    mostrarToast(
      visitados.size === vertices.length ? 'Grafo é conectado' : 'Grafo não é conectado',
      'info'
    );
  };

  const limpar = () => {
    setVertices([]);
    setArestas([]);
    mostrarToast('Grafo limpo', 'success');
  };

  const totalVertices = () => {
    mostrarToast(`Total de vértices: ${vertices.length}`, 'info');
  };

  const totalArestas = () => {
    mostrarToast(`Total de arestas: ${arestas.length}`, 'info');
  };

  const estaVazio = () => {
    mostrarToast(vertices.length === 0 ? 'Grafo vazio' : 'Grafo contém vértices', 'info');
  };

  const metodos = [
    { id: 'adicionarVertice', nome: 'Adicionar Vértice', acao: adicionarVertice, requer: ['vertice'], icon: Plus },
    { id: 'removerVertice', nome: 'Remover Vértice', acao: removerVertice, requer: ['vertice'], icon: Trash2 },
    { id: 'adicionarAresta', nome: 'Adicionar Aresta', acao: adicionarAresta, requer: ['origem', 'destino'], icon: LinkIcon },
    { id: 'removerAresta', nome: 'Remover Aresta', acao: removerAresta, requer: ['origem', 'destino'], icon: Unlink },
    { id: 'listarVertices', nome: 'Listar Vértices', acao: listarVertices, requer: [], icon: Eye },
    { id: 'listarArestas', nome: 'Listar Arestas', acao: listarArestas, requer: [], icon: Eye },
    { id: 'verificarVertice', nome: 'Verificar Vértice', acao: verificarVertice, requer: ['vertice'], icon: Eye },
    { id: 'verificarAresta', nome: 'Verificar Aresta', acao: verificarAresta, requer: ['origem', 'destino'], icon: Eye },
    { id: 'grauVertice', nome: 'Grau do Vértice', acao: grauVertice, requer: ['vertice'], icon: Hash },
    { id: 'obterVizinhos', nome: 'Obter Vizinhos', acao: obterVizinhos, requer: ['vertice'], icon: Network },
    { id: 'eConectado', nome: 'É Conectado?', acao: eConectado, requer: [], icon: Network },
    { id: 'limpar', nome: 'Limpar Grafo', acao: limpar, requer: [], icon: Trash2 },
    { id: 'totalVertices', nome: 'Total de Vértices', acao: totalVertices, requer: [], icon: Hash },
    { id: 'totalArestas', nome: 'Total de Arestas', acao: totalArestas, requer: [], icon: Hash },
    { id: 'estaVazio', nome: 'Está Vazio?', acao: estaVazio, requer: [], icon: CircuitBoard },
  ];

  const calcularPosicao = (index: number, total: number, raio: number = 120) => {
    const angulo = (2 * Math.PI * index) / total;
    const x = 200 + raio * Math.cos(angulo - Math.PI / 2);
    const y = 200 + raio * Math.sin(angulo - Math.PI / 2);
    return { x, y };
  };

  return (
    <main className="h-screen overflow-hidden bg-slate-950">
      <PageContainer size="wide" className="py-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
          <div className="lg:col-span-4 space-y-3 flex flex-col overflow-auto">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4 text-white shadow-xl flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <CircuitBoard className="h-5 w-5" />
                <h1 className="text-xl font-bold">Grafo</h1>
              </div>
              <p className="text-white/90 text-sm">
                Estrutura de vértices e arestas
              </p>
              <div className="mt-2 pt-2 border-t border-white/20">
                <p className="text-xs text-white/80">
                  <strong>{metodos.length} operações</strong> disponíveis
                </p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-shrink-0">
              <h2 className="text-base font-semibold text-white mb-3">Informações</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Vértices:</span>
                  <span className="text-white font-semibold">{vertices.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Arestas:</span>
                  <span className="text-white font-semibold">{arestas.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="p-3 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-base font-semibold text-white">Operações</h2>
              </div>
              <div className="p-2 space-y-1 overflow-y-auto flex-1">
                {metodos.map(metodo => {
                  const Icon = metodo.icon;
                  return (
                    <button
                      key={metodo.id}
                      onClick={() => setMetodoSelecionado(metodo.id)}
                      className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-all ${
                        metodoSelecionado === metodo.id
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-white'
                          : 'hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{metodo.nome}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {metodoSelecionado && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-shrink-0">
                <h3 className="text-white text-sm font-semibold mb-3">{metodos.find(m => m.id === metodoSelecionado)?.nome}</h3>
                <div className="space-y-4">
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('vertice') && (
                    <div>
                      <label htmlFor="vertice" className="block text-sm font-medium text-slate-300 mb-2">Vértice</label>
                      <input
                        id="vertice"
                        type="number"
                        value={vertice}
                        onChange={(e) => setVertice(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('origem') && (
                    <div>
                      <label htmlFor="origem" className="block text-sm font-medium text-slate-300 mb-2">Vértice Origem</label>
                      <input
                        id="origem"
                        type="number"
                        value={verticeOrigem}
                        onChange={(e) => setVerticeOrigem(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('destino') && (
                    <div>
                      <label htmlFor="destino" className="block text-sm font-medium text-slate-300 mb-2">Vértice Destino</label>
                      <input
                        id="destino"
                        type="number"
                        value={verticeDestino}
                        onChange={(e) => setVerticeDestino(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
                  <Button onClick={metodos.find(m => m.id === metodoSelecionado)?.acao} variant="primary" className="w-full" size="lg">
                    Executar
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-8 flex flex-col h-full min-h-0">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-1 flex flex-col min-h-0">
              <h2 className="text-base font-semibold text-white mb-3 flex-shrink-0">Visualização do Grafo</h2>
              <div className="bg-slate-900 rounded-lg p-4 flex-1 flex items-center justify-center overflow-auto">
                {vertices.length > 0 ? (
                  <svg width="400" height="400" viewBox="0 0 400 400">
                    {arestas.map((aresta) => {
                      const origem = vertices.indexOf(aresta.de);
                      const destino = vertices.indexOf(aresta.para);
                      const posOrigem = calcularPosicao(origem, vertices.length);
                      const posDestino = calcularPosicao(destino, vertices.length);

                      return (
                        <g key={aresta.id}>
                          <line
                            x1={posOrigem.x}
                            y1={posOrigem.y}
                            x2={posDestino.x}
                            y2={posDestino.y}
                            stroke="#06b6d4"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                        </g>
                      );
                    })}

                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="9"
                        refY="3"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3, 0 6" fill="#06b6d4" />
                      </marker>
                    </defs>

                    {vertices.map((v, idx) => {
                      const pos = calcularPosicao(idx, vertices.length);
                      return (
                        <motion.g
                          key={v}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="25"
                            className="fill-gradient-to-br from-cyan-500 to-blue-600"
                            fill="url(#gradient)"
                            stroke="#0891b2"
                            strokeWidth="2"
                          />
                          <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-white font-bold text-lg"
                            fill="white"
                          >
                            {v}
                          </text>
                        </motion.g>
                      );
                    })}

                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <EmptyState icon={CircuitBoard} title="Grafo vazio" description="Adicione vértices e arestas para visualizar o grafo" />
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <Toast message={toastMessage} type={toastType} isVisible={toastVisible} onClose={() => setToastVisible(false)} />
    </main>
  );
};

export default VisualizacaoGrafo;
