import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Toast, ToastType } from '../../ui/Toast';
import { EmptyState } from '../../shared/EmptyState';
import { PageContainer } from '../../shared/PageContainer';
import { LayoutList, Plus, Trash2, Eye, Hash, RotateCcw, Search, Layers } from 'lucide-react';

interface Elemento {
  valor: number;
  id: string;
}

const VisualizacaoFila: React.FC = () => {
  const [fila, setFila] = React.useState<Elemento[]>([]);
  const [valor, setValor] = React.useState('');
  const [valorBusca, setValorBusca] = React.useState('');
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastType, setToastType] = React.useState<ToastType>('success');
  const [metodoSelecionado, setMetodoSelecionado] = React.useState<string | null>(null);

  const mostrarToast = (mensagem: string, tipo: ToastType) => {
    setToastMessage(mensagem);
    setToastType(tipo);
    setToastVisible(true);
  };

  const enfileirar = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const novo: Elemento = { valor: parseInt(valor), id: Date.now().toString() };
    setFila([...fila, novo]);
    mostrarToast(`Valor ${valor} enfileirado`, 'success');
    setValor('');
  };

  const desenfileirar = () => {
    if (fila.length === 0) {
      mostrarToast('Fila vazia', 'error');
      return;
    }
    const removido = fila[0].valor;
    setFila(fila.slice(1));
    mostrarToast(`Valor ${removido} desenfileirado`, 'success');
  };

  const frente = () => {
    if (fila.length === 0) {
      mostrarToast('Fila vazia', 'error');
      return;
    }
    mostrarToast(`Frente: ${fila[0].valor}`, 'info');
  };

  const fim = () => {
    if (fila.length === 0) {
      mostrarToast('Fila vazia', 'error');
      return;
    }
    const ultimoIdx = fila.length - 1;
    mostrarToast(`Fim: ${fila[ultimoIdx].valor}`, 'info');
  };

  const tamanho = () => {
    mostrarToast(`Tamanho da fila: ${fila.length}`, 'info');
  };

  const estaVazia = () => {
    mostrarToast(fila.length === 0 ? 'Fila vazia' : 'Fila contém elementos', 'info');
  };

  const limpar = () => {
    setFila([]);
    mostrarToast('Fila limpa', 'success');
  };

  const buscar = () => {
    if (!valorBusca) {
      mostrarToast('Digite um valor para buscar', 'error');
      return;
    }
    const idx = fila.findIndex(e => e.valor === parseInt(valorBusca));
    if (idx !== -1) {
      mostrarToast(`Valor ${valorBusca} encontrado na posição ${idx}`, 'success');
    } else {
      mostrarToast(`Valor ${valorBusca} não encontrado`, 'warning');
    }
    setValorBusca('');
  };

  const contem = () => {
    if (!valorBusca) {
      mostrarToast('Digite um valor para verificar', 'error');
      return;
    }
    const encontrado = fila.some(e => e.valor === parseInt(valorBusca));
    mostrarToast(encontrado ? `Fila contém ${valorBusca}` : `Fila não contém ${valorBusca}`, 'info');
    setValorBusca('');
  };

  const inverter = () => {
    if (fila.length === 0) {
      mostrarToast('Fila vazia', 'error');
      return;
    }
    setFila([...fila].reverse());
    mostrarToast('Fila invertida', 'success');
  };

  const listar = () => {
    if (fila.length === 0) {
      mostrarToast('Fila vazia', 'error');
      return;
    }
    const valores = fila.map(e => e.valor).join(', ');
    mostrarToast(`Elementos (frente → fim): ${valores}`, 'info');
  };

  const somatorio = () => {
    if (fila.length === 0) {
      mostrarToast('Fila vazia', 'error');
      return;
    }
    const soma = fila.reduce((acc, e) => acc + e.valor, 0);
    mostrarToast(`Soma total: ${soma}`, 'info');
  };

  const media = () => {
    if (fila.length === 0) {
      mostrarToast('Fila vazia', 'error');
      return;
    }
    const med = fila.reduce((acc, e) => acc + e.valor, 0) / fila.length;
    mostrarToast(`Média: ${med.toFixed(2)}`, 'info');
  };

  const removerTodos = () => {
    if (!valorBusca) {
      mostrarToast('Digite um valor para remover', 'error');
      return;
    }
    const valorNum = parseInt(valorBusca);
    const novaFila = fila.filter(e => e.valor !== valorNum);
    const removidos = fila.length - novaFila.length;
    if (removidos > 0) {
      setFila(novaFila);
      mostrarToast(`${removidos} ocorrência(s) de ${valorBusca} removida(s)`, 'success');
    } else {
      mostrarToast(`Valor ${valorBusca} não encontrado`, 'warning');
    }
    setValorBusca('');
  };

  const duplicarFrente = () => {
    if (fila.length === 0) {
      mostrarToast('Fila vazia', 'error');
      return;
    }
    const frenteAtual = fila[0];
    setFila([frenteAtual, { valor: frenteAtual.valor, id: Date.now().toString() }, ...fila.slice(1)]);
    mostrarToast('Frente duplicada', 'success');
  };

  const metodos = [
    { id: 'enfileirar', nome: 'Enfileirar (Enqueue)', acao: enfileirar, requer: ['valor'], icon: Plus },
    { id: 'desenfileirar', nome: 'Desenfileirar (Dequeue)', acao: desenfileirar, requer: [], icon: Trash2 },
    { id: 'frente', nome: 'Ver Frente', acao: frente, requer: [], icon: Eye },
    { id: 'fim', nome: 'Ver Fim', acao: fim, requer: [], icon: Layers },
    { id: 'tamanho', nome: 'Ver Tamanho', acao: tamanho, requer: [], icon: Hash },
    { id: 'estaVazia', nome: 'Está Vazia?', acao: estaVazia, requer: [], icon: LayoutList },
    { id: 'limpar', nome: 'Limpar Fila', acao: limpar, requer: [], icon: Trash2 },
    { id: 'buscar', nome: 'Buscar Valor', acao: buscar, requer: ['valorBusca'], icon: Search },
    { id: 'contem', nome: 'Contém Valor?', acao: contem, requer: ['valorBusca'], icon: Search },
    { id: 'inverter', nome: 'Inverter Fila', acao: inverter, requer: [], icon: RotateCcw },
    { id: 'listar', nome: 'Listar Elementos', acao: listar, requer: [], icon: Eye },
    { id: 'somatorio', nome: 'Somatório', acao: somatorio, requer: [], icon: Hash },
    { id: 'media', nome: 'Calcular Média', acao: media, requer: [], icon: Hash },
    { id: 'removerTodos', nome: 'Remover Todas Ocorrências', acao: removerTodos, requer: ['valorBusca'], icon: Trash2 },
    { id: 'duplicarFrente', nome: 'Duplicar Frente', acao: duplicarFrente, requer: [], icon: Plus },
  ];

  return (
    <main className="h-full bg-slate-950">
      <PageContainer size="wide" className="py-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
          <div className="lg:col-span-4 space-y-3 flex flex-col overflow-auto">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 text-white shadow-xl flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <LayoutList className="h-5 w-5" />
                <h1 className="text-xl font-bold">Fila</h1>
              </div>
              <p className="text-white/90 text-sm">
                Estrutura FIFO (First In, First Out)
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
                  <span className="text-slate-400">Tamanho:</span>
                  <span className="text-white font-semibold">{fila.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Frente:</span>
                  <span className="text-white font-semibold">
                    {fila.length > 0 ? fila[0].valor : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Fim:</span>
                  <span className="text-white font-semibold">
                    {fila.length > 0 ? fila[fila.length - 1].valor : '-'}
                  </span>
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
                          ? 'bg-amber-500/20 border border-amber-500/50 text-white'
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
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('valorBusca') && (
                    <div>
                      <label htmlFor="valorBusca" className="block text-sm font-medium text-slate-300 mb-2">Valor</label>
                      <input
                        id="valorBusca"
                        type="number"
                        value={valorBusca}
                        onChange={(e) => setValorBusca(e.target.value)}
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
              <h2 className="text-base font-semibold text-white mb-3 flex-shrink-0">Visualização da Fila</h2>
              <div className="bg-slate-900 rounded-lg p-4 flex-1 flex items-center justify-center overflow-auto">
                {fila.length > 0 ? (
                  <div className="w-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-emerald-400 text-sm font-bold">FRENTE →</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-4">
                      {fila.map((elemento, idx) => (
                        <motion.div key={elemento.id} initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: 0 }} className="relative flex-shrink-0">
                          <div className={`bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg p-4 text-center shadow-lg min-w-[80px] ${
                            idx === 0 ? 'ring-4 ring-emerald-400' : ''
                          }`}>
                            <div className="text-2xl font-bold text-white">{elemento.valor}</div>
                            <div className="text-xs text-amber-200 mt-1">Pos: {idx}</div>
                          </div>
                          {idx === 0 && (
                            <div className="absolute -top-8 left-0 right-0 text-center">
                              <span className="text-emerald-400 text-sm font-bold">↓</span>
                            </div>
                          )}
                          {idx === fila.length - 1 && (
                            <div className="absolute -bottom-8 left-0 right-0 text-center">
                              <span className="text-orange-400 text-sm font-bold">FIM ↑</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyState icon={LayoutList} title="Fila vazia" description="Enfileire elementos usando a operação Enqueue" />
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

export default VisualizacaoFila;
