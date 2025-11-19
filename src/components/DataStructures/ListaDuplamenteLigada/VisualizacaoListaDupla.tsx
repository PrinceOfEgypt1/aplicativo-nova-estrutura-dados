import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Toast, ToastType } from '../../ui/Toast';
import { EmptyState } from '../../shared/EmptyState';
import { PageContainer } from '../../shared/PageContainer';
import { Database, Plus, Trash2, Eye, Hash, RotateCcw, Search, ArrowLeftRight } from 'lucide-react';

interface No {
  valor: number;
  id: string;
}

const VisualizacaoListaDupla: React.FC = () => {
  const [lista, setLista] = React.useState<No[]>([]);
  const [valor, setValor] = React.useState('');
  const [posicao, setPosicao] = React.useState('');
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

  const inserirNoInicio = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const novoNo: No = { valor: parseInt(valor), id: Date.now().toString() };
    setLista([novoNo, ...lista]);
    mostrarToast(`Valor ${valor} inserido no início`, 'success');
    setValor('');
  };

  const inserirNoFim = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const novoNo: No = { valor: parseInt(valor), id: Date.now().toString() };
    setLista([...lista, novoNo]);
    mostrarToast(`Valor ${valor} inserido no fim`, 'success');
    setValor('');
  };

  const inserirNaPosicao = () => {
    if (!valor || !posicao) {
      mostrarToast('Digite valor e posição', 'error');
      return;
    }
    const pos = parseInt(posicao);
    if (pos < 0 || pos > lista.length) {
      mostrarToast('Posição inválida', 'error');
      return;
    }
    const novoNo: No = { valor: parseInt(valor), id: Date.now().toString() };
    const novaLista = [...lista];
    novaLista.splice(pos, 0, novoNo);
    setLista(novaLista);
    mostrarToast(`Valor ${valor} inserido na posição ${pos}`, 'success');
    setValor('');
    setPosicao('');
  };

  const removerDoInicio = () => {
    if (lista.length === 0) {
      mostrarToast('Lista vazia', 'error');
      return;
    }
    const removido = lista[0].valor;
    setLista(lista.slice(1));
    mostrarToast(`Valor ${removido} removido do início`, 'success');
  };

  const removerDoFim = () => {
    if (lista.length === 0) {
      mostrarToast('Lista vazia', 'error');
      return;
    }
    const removido = lista[lista.length - 1].valor;
    setLista(lista.slice(0, -1));
    mostrarToast(`Valor ${removido} removido do fim`, 'success');
  };

  const removerDaPosicao = () => {
    if (!posicao) {
      mostrarToast('Digite uma posição', 'error');
      return;
    }
    const pos = parseInt(posicao);
    if (pos < 0 || pos >= lista.length) {
      mostrarToast('Posição inválida', 'error');
      return;
    }
    const removido = lista[pos].valor;
    const novaLista = lista.filter((_, idx) => idx !== pos);
    setLista(novaLista);
    mostrarToast(`Valor ${removido} removido da posição ${pos}`, 'success');
    setPosicao('');
  };

  const buscarValor = () => {
    if (!valorBusca) {
      mostrarToast('Digite um valor para buscar', 'error');
      return;
    }
    const idx = lista.findIndex(no => no.valor === parseInt(valorBusca));
    if (idx !== -1) {
      mostrarToast(`Valor ${valorBusca} encontrado na posição ${idx}`, 'success');
    } else {
      mostrarToast(`Valor ${valorBusca} não encontrado`, 'warning');
    }
    setValorBusca('');
  };

  const obterPorIndice = () => {
    if (!posicao) {
      mostrarToast('Digite uma posição', 'error');
      return;
    }
    const pos = parseInt(posicao);
    if (pos < 0 || pos >= lista.length) {
      mostrarToast('Posição inválida', 'error');
      return;
    }
    mostrarToast(`Valor na posição ${pos}: ${lista[pos].valor}`, 'info');
    setPosicao('');
  };

  const inverterLista = () => {
    if (lista.length === 0) {
      mostrarToast('Lista vazia', 'error');
      return;
    }
    setLista([...lista].reverse());
    mostrarToast('Lista invertida', 'success');
  };

  const limparLista = () => {
    setLista([]);
    mostrarToast('Lista limpa', 'success');
  };

  const tamanho = () => {
    mostrarToast(`Tamanho da lista: ${lista.length}`, 'info');
  };

  const estaVazia = () => {
    mostrarToast(lista.length === 0 ? 'Lista vazia' : 'Lista contém elementos', 'info');
  };

  const contemValor = () => {
    if (!valorBusca) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const encontrado = lista.some(no => no.valor === parseInt(valorBusca));
    mostrarToast(encontrado ? `Lista contém ${valorBusca}` : `Lista não contém ${valorBusca}`, 'info');
    setValorBusca('');
  };

  const obterPrimeiro = () => {
    if (lista.length === 0) {
      mostrarToast('Lista vazia', 'error');
      return;
    }
    mostrarToast(`Primeiro elemento: ${lista[0].valor}`, 'info');
  };

  const obterUltimo = () => {
    if (lista.length === 0) {
      mostrarToast('Lista vazia', 'error');
      return;
    }
    mostrarToast(`Último elemento: ${lista[lista.length - 1].valor}`, 'info');
  };

  const trocarPosicoes = () => {
    if (!valor || !posicao) {
      mostrarToast('Digite duas posições (valor e posição)', 'error');
      return;
    }
    const pos1 = parseInt(valor);
    const pos2 = parseInt(posicao);
    if (pos1 < 0 || pos1 >= lista.length || pos2 < 0 || pos2 >= lista.length) {
      mostrarToast('Posições inválidas', 'error');
      return;
    }
    const novaLista = [...lista];
    const temp = novaLista[pos1];
    novaLista[pos1] = novaLista[pos2];
    novaLista[pos2] = temp;
    setLista(novaLista);
    mostrarToast(`Elementos nas posições ${pos1} e ${pos2} trocados`, 'success');
    setValor('');
    setPosicao('');
  };

  const metodos = [
    { id: 'inserirNoInicio', nome: 'Inserir no Início', acao: inserirNoInicio, requer: ['valor'], icon: Plus },
    { id: 'inserirNoFim', nome: 'Inserir no Fim', acao: inserirNoFim, requer: ['valor'], icon: Plus },
    { id: 'inserirNaPosicao', nome: 'Inserir na Posição', acao: inserirNaPosicao, requer: ['valor', 'posicao'], icon: Plus },
    { id: 'removerDoInicio', nome: 'Remover do Início', acao: removerDoInicio, requer: [], icon: Trash2 },
    { id: 'removerDoFim', nome: 'Remover do Fim', acao: removerDoFim, requer: [], icon: Trash2 },
    { id: 'removerDaPosicao', nome: 'Remover da Posição', acao: removerDaPosicao, requer: ['posicao'], icon: Trash2 },
    { id: 'buscarValor', nome: 'Buscar Valor', acao: buscarValor, requer: ['valorBusca'], icon: Search },
    { id: 'obterPorIndice', nome: 'Obter por Índice', acao: obterPorIndice, requer: ['posicao'], icon: Eye },
    { id: 'inverterLista', nome: 'Inverter Lista', acao: inverterLista, requer: [], icon: RotateCcw },
    { id: 'limparLista', nome: 'Limpar Lista', acao: limparLista, requer: [], icon: Trash2 },
    { id: 'tamanho', nome: 'Ver Tamanho', acao: tamanho, requer: [], icon: Hash },
    { id: 'estaVazia', nome: 'Está Vazia?', acao: estaVazia, requer: [], icon: Database },
    { id: 'contemValor', nome: 'Contém Valor?', acao: contemValor, requer: ['valorBusca'], icon: Search },
    { id: 'obterPrimeiro', nome: 'Obter Primeiro', acao: obterPrimeiro, requer: [], icon: Eye },
    { id: 'obterUltimo', nome: 'Obter Último', acao: obterUltimo, requer: [], icon: Eye },
    { id: 'trocarPosicoes', nome: 'Trocar Posições', acao: trocarPosicoes, requer: ['valor', 'posicao'], icon: ArrowLeftRight },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <PageContainer size="wide" className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <Database className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Lista Duplamente Ligada</h1>
              </div>
              <p className="text-white/90">
                Estrutura com nós que apontam para próximo e anterior
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
                  <span className="text-white font-semibold">{lista.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Primeiro:</span>
                  <span className="text-white font-semibold">
                    {lista.length > 0 ? lista[0].valor : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Último:</span>
                  <span className="text-white font-semibold">
                    {lista.length > 0 ? lista[lista.length - 1].valor : '-'}
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
                          ? 'bg-emerald-500/20 border border-emerald-500/50 text-white'
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
                      <label htmlFor="valor" className="block text-sm font-medium text-slate-300 mb-2">
                        {metodoSelecionado === 'trocarPosicoes' ? 'Posição 1' : 'Valor'}
                      </label>
                      <input
                        id="valor"
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('posicao') && (
                    <div>
                      <label htmlFor="posicao" className="block text-sm font-medium text-slate-300 mb-2">
                        {metodoSelecionado === 'trocarPosicoes' ? 'Posição 2' : 'Posição'}
                      </label>
                      <input
                        id="posicao"
                        type="number"
                        value={posicao}
                        onChange={(e) => setPosicao(e.target.value)}
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

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Visualização da Lista Duplamente Ligada</h2>
              <div className="bg-slate-900 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                {lista.length > 0 ? (
                  <div className="flex items-center gap-3 overflow-x-auto pb-4 w-full justify-center">
                    {lista.map((no, idx) => (
                      <React.Fragment key={no.id}>
                        <motion.div
                          initial={{ scale: 0, x: -20 }}
                          animate={{ scale: 1, x: 0 }}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg p-4 shadow-lg min-w-[100px]">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">{no.valor}</div>
                              <div className="text-xs text-emerald-200 mt-1">Índice: {idx}</div>
                            </div>
                          </div>
                          {idx === 0 && (
                            <div className="mt-2 text-xs text-emerald-400 font-semibold">← INÍCIO</div>
                          )}
                          {idx === lista.length - 1 && (
                            <div className="mt-2 text-xs text-green-400 font-semibold">FIM →</div>
                          )}
                        </motion.div>
                        {idx < lista.length - 1 && (
                          <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div className="text-emerald-400 text-sm">→</div>
                            <div className="text-emerald-400 text-sm">←</div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={Database} title="Lista vazia" description="Insira elementos na lista para visualizá-los" />
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

export default VisualizacaoListaDupla;
