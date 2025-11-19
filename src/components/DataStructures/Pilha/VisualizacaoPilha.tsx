import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Toast, ToastType } from '../../ui/Toast';
import { EmptyState } from '../../shared/EmptyState';
import { PageContainer } from '../../shared/PageContainer';
import { Component, Plus, Trash2, Eye, Hash, RotateCcw, Search, Layers } from 'lucide-react';

interface Elemento {
  valor: number;
  id: string;
}

const VisualizacaoPilha: React.FC = () => {
  const [pilha, setPilha] = React.useState<Elemento[]>([]);
  const [valor, setValor] = React.useState('');
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastType, setToastType] = React.useState<ToastType>('success');
  const [metodoSelecionado, setMetodoSelecionado] = React.useState<string | null>(null);

  const mostrarToast = (mensagem: string, tipo: ToastType) => {
    setToastMessage(mensagem);
    setToastType(tipo);
    setToastVisible(true);
  };

  const empilhar = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const novo: Elemento = { valor: parseInt(valor), id: Date.now().toString() };
    setPilha([...pilha, novo]);
    mostrarToast(`Valor ${valor} empilhado`, 'success');
    setValor('');
  };

  const desempilhar = () => {
    if (pilha.length === 0) {
      mostrarToast('Pilha vazia', 'error');
      return;
    }
    const removido = pilha[pilha.length - 1].valor;
    setPilha(pilha.slice(0, -1));
    mostrarToast(`Valor ${removido} desempilhado`, 'success');
  };

  const topo = () => {
    if (pilha.length === 0) {
      mostrarToast('Pilha vazia', 'error');
      return;
    }
    mostrarToast(`Topo: ${pilha[pilha.length - 1].valor}`, 'info');
  };

  const base = () => {
    if (pilha.length === 0) {
      mostrarToast('Pilha vazia', 'error');
      return;
    }
    mostrarToast(`Base: ${pilha[0].valor}`, 'info');
  };

  const tamanho = () => {
    mostrarToast(`Tamanho da pilha: ${pilha.length}`, 'info');
  };

  const estaVazia = () => {
    mostrarToast(pilha.length === 0 ? 'Pilha vazia' : 'Pilha contém elementos', 'info');
  };

  const limpar = () => {
    setPilha([]);
    mostrarToast('Pilha limpa', 'success');
  };

  const buscar = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const idx = pilha.findIndex(e => e.valor === parseInt(valor));
    if (idx !== -1) {
      mostrarToast(`Valor ${valor} encontrado na posição ${idx}`, 'success');
    } else {
      mostrarToast(`Valor ${valor} não encontrado`, 'warning');
    }
    setValor('');
  };

  const contem = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const encontrado = pilha.some(e => e.valor === parseInt(valor));
    mostrarToast(encontrado ? `Pilha contém ${valor}` : `Pilha não contém ${valor}`, 'info');
    setValor('');
  };

  const duplicarTopo = () => {
    if (pilha.length === 0) {
      mostrarToast('Pilha vazia', 'error');
      return;
    }
    const topoAtual = pilha[pilha.length - 1];
    setPilha([...pilha, { valor: topoAtual.valor, id: Date.now().toString() }]);
    mostrarToast('Topo duplicado', 'success');
  };

  const trocarTopo = () => {
    if (pilha.length < 2) {
      mostrarToast('Necessário pelo menos 2 elementos', 'error');
      return;
    }
    const novaPilha = [...pilha];
    const temp = novaPilha[novaPilha.length - 1];
    novaPilha[novaPilha.length - 1] = novaPilha[novaPilha.length - 2];
    novaPilha[novaPilha.length - 2] = temp;
    setPilha(novaPilha);
    mostrarToast('Topo trocado com segundo elemento', 'success');
  };

  const inverter = () => {
    setPilha([...pilha].reverse());
    mostrarToast('Pilha invertida', 'success');
  };

  const listar = () => {
    if (pilha.length === 0) {
      mostrarToast('Pilha vazia', 'error');
      return;
    }
    const valores = pilha.map(e => e.valor).join(', ');
    mostrarToast(`Elementos (base → topo): ${valores}`, 'info');
  };

  const somatorio = () => {
    if (pilha.length === 0) {
      mostrarToast('Pilha vazia', 'error');
      return;
    }
    const soma = pilha.reduce((acc, e) => acc + e.valor, 0);
    mostrarToast(`Soma total: ${soma}`, 'info');
  };

  const media = () => {
    if (pilha.length === 0) {
      mostrarToast('Pilha vazia', 'error');
      return;
    }
    const med = pilha.reduce((acc, e) => acc + e.valor, 0) / pilha.length;
    mostrarToast(`Média: ${med.toFixed(2)}`, 'info');
  };

  const metodos = [
    { id: 'empilhar', nome: 'Empilhar (Push)', acao: empilhar, requer: ['valor'], icon: Plus },
    { id: 'desempilhar', nome: 'Desempilhar (Pop)', acao: desempilhar, requer: [], icon: Trash2 },
    { id: 'topo', nome: 'Ver Topo', acao: topo, requer: [], icon: Eye },
    { id: 'base', nome: 'Ver Base', acao: base, requer: [], icon: Layers },
    { id: 'tamanho', nome: 'Ver Tamanho', acao: tamanho, requer: [], icon: Hash },
    { id: 'estaVazia', nome: 'Está Vazia?', acao: estaVazia, requer: [], icon: Component },
    { id: 'limpar', nome: 'Limpar Pilha', acao: limpar, requer: [], icon: Trash2 },
    { id: 'buscar', nome: 'Buscar Valor', acao: buscar, requer: ['valor'], icon: Search },
    { id: 'contem', nome: 'Contém Valor?', acao: contem, requer: ['valor'], icon: Search },
    { id: 'duplicarTopo', nome: 'Duplicar Topo', acao: duplicarTopo, requer: [], icon: Plus },
    { id: 'trocarTopo', nome: 'Trocar 2 Topos', acao: trocarTopo, requer: [], icon: RotateCcw },
    { id: 'inverter', nome: 'Inverter Pilha', acao: inverter, requer: [], icon: RotateCcw },
    { id: 'listar', nome: 'Listar Elementos', acao: listar, requer: [], icon: Eye },
    { id: 'somatorio', nome: 'Somatório', acao: somatorio, requer: [], icon: Hash },
    { id: 'media', nome: 'Calcular Média', acao: media, requer: [], icon: Hash },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <PageContainer size="wide" className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <Component className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Pilha</h1>
              </div>
              <p className="text-white/90">
                Estrutura LIFO (Last In, First Out)
              </p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm text-white/80">
                  <strong>{metodos.length} operações</strong> disponíveis
                </p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Informações</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tamanho:</span>
                  <span className="text-white font-semibold">{pilha.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Topo:</span>
                  <span className="text-white font-semibold">
                    {pilha.length > 0 ? pilha[pilha.length - 1].valor : '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <h2 className="text-lg font-semibold text-white">Operações</h2>
              </div>
              <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                {metodos.map(metodo => {
                  const Icon = metodo.icon;
                  return (
                    <button
                      key={metodo.id}
                      onClick={() => setMetodoSelecionado(metodo.id)}
                      className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-all ${
                        metodoSelecionado === metodo.id
                          ? 'bg-rose-500/20 border border-rose-500/50 text-white'
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-white font-semibold mb-4">{metodos.find(m => m.id === metodoSelecionado)?.nome}</h3>
                <div className="space-y-4">
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('valor') && (
                    <div>
                      <label htmlFor="valor" className="block text-sm font-medium text-slate-300 mb-2">Valor</label>
                      <input
                        id="valor"
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
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

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Visualização da Pilha</h2>
              <div className="bg-slate-900 rounded-lg p-6 min-h-[300px] flex flex-col-reverse items-center justify-end">
                {pilha.length > 0 ? (
                  <div className="flex flex-col-reverse gap-2 w-full max-w-xs">
                    {pilha.map((elemento, idx) => (
                      <motion.div key={elemento.id} initial={{ scale: 0, y: -20 }} animate={{ scale: 1, y: 0 }} className="relative">
                        <div className={`bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg p-4 text-center shadow-lg ${
                          idx === pilha.length - 1 ? 'ring-4 ring-yellow-400' : ''
                        }`}>
                          <div className="text-2xl font-bold text-white">{elemento.valor}</div>
                          <div className="text-xs text-rose-200 mt-1">Posição: {idx}</div>
                        </div>
                        {idx === pilha.length - 1 && (
                          <div className="absolute -top-8 left-0 right-0 text-center">
                            <span className="text-yellow-400 text-sm font-bold">← TOPO</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                    <div className="border-t-4 border-slate-600 pt-2 text-center">
                      <span className="text-slate-500 text-sm font-bold">BASE</span>
                    </div>
                  </div>
                ) : (
                  <EmptyState icon={Component} title="Pilha vazia" description="Empilhe elementos usando a operação Push" />
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

export default VisualizacaoPilha;
