import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Toast, ToastType } from '../../ui/Toast';
import { EmptyState } from '../../shared/EmptyState';
import { PageContainer } from '../../shared/PageContainer';
import {
  Plus, Trash2, Search, Eye, ArrowRight, ListOrdered, Hash, RotateCcw, Scissors
} from 'lucide-react';

interface No {
  valor: number;
  id: string;
}

const VisualizacaoListaLigada: React.FC = () => {
  const [lista, setLista] = React.useState<No[]>([]);
  const [valor, setValor] = React.useState('');
  const [indice, setIndice] = React.useState('');
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
    if (!valor || !indice) {
      mostrarToast('Digite valor e índice', 'error');
      return;
    }
    const idx = parseInt(indice);
    if (idx < 0 || idx > lista.length) {
      mostrarToast('Índice inválido', 'error');
      return;
    }
    const novoNo: No = { valor: parseInt(valor), id: Date.now().toString() };
    const novaLista = [...lista];
    novaLista.splice(idx, 0, novoNo);
    setLista(novaLista);
    mostrarToast(`Valor ${valor} inserido na posição ${idx}`, 'success');
    setValor('');
    setIndice('');
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
    if (!indice) {
      mostrarToast('Digite o índice', 'error');
      return;
    }
    const idx = parseInt(indice);
    if (idx < 0 || idx >= lista.length) {
      mostrarToast('Índice inválido', 'error');
      return;
    }
    const removido = lista[idx].valor;
    const novaLista = lista.filter((_, i) => i !== idx);
    setLista(novaLista);
    mostrarToast(`Valor ${removido} removido da posição ${idx}`, 'success');
    setIndice('');
  };

  const buscar = () => {
    if (!valor) {
      mostrarToast('Digite um valor para buscar', 'error');
      return;
    }
    const idx = lista.findIndex(no => no.valor === parseInt(valor));
    if (idx !== -1) {
      mostrarToast(`Valor ${valor} encontrado na posição ${idx}`, 'success');
    } else {
      mostrarToast(`Valor ${valor} não encontrado`, 'warning');
    }
    setValor('');
  };

  const obterPorIndice = () => {
    if (!indice) {
      mostrarToast('Digite o índice', 'error');
      return;
    }
    const idx = parseInt(indice);
    if (idx < 0 || idx >= lista.length) {
      mostrarToast('Índice inválido', 'error');
      return;
    }
    mostrarToast(`Valor na posição ${idx}: ${lista[idx].valor}`, 'info');
    setIndice('');
  };

  const inverter = () => {
    setLista([...lista].reverse());
    mostrarToast('Lista invertida', 'success');
  };

  const limpar = () => {
    setLista([]);
    mostrarToast('Lista limpa', 'success');
  };

  const tamanho = () => {
    mostrarToast(`Tamanho da lista: ${lista.length}`, 'info');
  };

  const estaVazia = () => {
    mostrarToast(lista.length === 0 ? 'Lista vazia' : 'Lista contém elementos', 'info');
  };

  const contem = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const encontrado = lista.some(no => no.valor === parseInt(valor));
    mostrarToast(encontrado ? `Lista contém ${valor}` : `Lista não contém ${valor}`, 'info');
    setValor('');
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

  const metodos = [
    { id: 'inserirInicio', nome: 'Inserir no Início', acao: inserirNoInicio, requer: ['valor'], icon: Plus },
    { id: 'inserirFim', nome: 'Inserir no Fim', acao: inserirNoFim, requer: ['valor'], icon: ArrowRight },
    { id: 'inserirPosicao', nome: 'Inserir na Posição', acao: inserirNaPosicao, requer: ['valor', 'indice'], icon: Plus },
    { id: 'removerInicio', nome: 'Remover do Início', acao: removerDoInicio, requer: [], icon: Trash2 },
    { id: 'removerFim', nome: 'Remover do Fim', acao: removerDoFim, requer: [], icon: Trash2 },
    { id: 'removerPosicao', nome: 'Remover da Posição', acao: removerDaPosicao, requer: ['indice'], icon: Trash2 },
    { id: 'buscar', nome: 'Buscar Valor', acao: buscar, requer: ['valor'], icon: Search },
    { id: 'obterIndice', nome: 'Obter por Índice', acao: obterPorIndice, requer: ['indice'], icon: Eye },
    { id: 'inverter', nome: 'Inverter Lista', acao: inverter, requer: [], icon: RotateCcw },
    { id: 'limpar', nome: 'Limpar Lista', acao: limpar, requer: [], icon: Scissors },
    { id: 'tamanho', nome: 'Ver Tamanho', acao: tamanho, requer: [], icon: Hash },
    { id: 'estaVazia', nome: 'Está Vazia?', acao: estaVazia, requer: [], icon: ListOrdered },
    { id: 'contem', nome: 'Contém Valor?', acao: contem, requer: ['valor'], icon: Search },
    { id: 'obterPrimeiro', nome: 'Obter Primeiro', acao: obterPrimeiro, requer: [], icon: Eye },
    { id: 'obterUltimo', nome: 'Obter Último', acao: obterUltimo, requer: [], icon: Eye },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <PageContainer size="wide" className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <ListOrdered className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Lista Ligada</h1>
              </div>
              <p className="text-white/90">
                Estrutura com nós conectados através de referências
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
                  <span className="text-slate-400">Estado:</span>
                  <span className={`font-semibold ${lista.length > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {lista.length > 0 ? 'Com dados' : 'Vazia'}
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
                          ? 'bg-sky-500/20 border border-sky-500/50 text-white'
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
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('indice') && (
                    <div>
                      <label htmlFor="indice" className="block text-sm font-medium text-slate-300 mb-2">Índice</label>
                      <input
                        id="indice"
                        type="number"
                        value={indice}
                        onChange={(e) => setIndice(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
                  <Button
                    onClick={metodos.find(m => m.id === metodoSelecionado)?.acao}
                    variant="primary"
                    className="w-full"
                    size="lg"
                  >
                    Executar
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Visualização da Lista</h2>
              <div className="bg-slate-900 rounded-lg p-6 min-h-[120px] overflow-x-auto">
                {lista.length > 0 ? (
                  <div className="flex items-center gap-2">
                    {lista.map((no, idx) => (
                      <React.Fragment key={no.id}>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg p-4 min-w-[80px] text-center shadow-lg">
                            <div className="text-xs text-blue-200 mb-1">[{idx}]</div>
                            <div className="text-xl font-bold text-white">{no.valor}</div>
                          </div>
                        </motion.div>
                        {idx < lista.length - 1 && (
                          <ArrowRight className="h-6 w-6 text-slate-500" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={ListOrdered}
                    title="Lista vazia"
                    description="Adicione elementos usando as operações de inserção"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </main>
  );
};

export default VisualizacaoListaLigada;
