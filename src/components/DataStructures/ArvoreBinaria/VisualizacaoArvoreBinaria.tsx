import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Toast, ToastType } from '../../ui/Toast';
import { EmptyState } from '../../shared/EmptyState';
import { PageContainer } from '../../shared/PageContainer';
import {
  Network, Plus, Trash2, Search, Eye, Hash, RotateCcw, TreePine, TrendingUp, TrendingDown, List
} from 'lucide-react';

interface NoArvore {
  valor: number;
  esquerda: NoArvore | null;
  direita: NoArvore | null;
  id: string;
}

interface PosicaoNo {
  x: number;
  y: number;
  valor: number;
  id: string;
}

const VisualizacaoArvoreBinaria: React.FC = () => {
  const [raiz, setRaiz] = React.useState<NoArvore | null>(null);
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

  // Função auxiliar para inserir um nó
  const inserirNo = (no: NoArvore | null, valor: number): NoArvore => {
    if (!no) {
      return { valor, esquerda: null, direita: null, id: Date.now().toString() + Math.random() };
    }

    if (valor < no.valor) {
      no.esquerda = inserirNo(no.esquerda, valor);
    } else if (valor > no.valor) {
      no.direita = inserirNo(no.direita, valor);
    }

    return no;
  };

  // Função auxiliar para encontrar o mínimo
  const encontrarMinimo = (no: NoArvore): NoArvore => {
    while (no.esquerda !== null) {
      no = no.esquerda;
    }
    return no;
  };

  // Função auxiliar para remover um nó
  const removerNo = (no: NoArvore | null, valor: number): NoArvore | null => {
    if (!no) return null;

    if (valor < no.valor) {
      no.esquerda = removerNo(no.esquerda, valor);
    } else if (valor > no.valor) {
      no.direita = removerNo(no.direita, valor);
    } else {
      // Nó encontrado
      if (!no.esquerda && !no.direita) {
        return null;
      }
      if (!no.esquerda) {
        return no.direita;
      }
      if (!no.direita) {
        return no.esquerda;
      }

      // Nó com dois filhos
      const minimo = encontrarMinimo(no.direita);
      no.valor = minimo.valor;
      no.direita = removerNo(no.direita, minimo.valor);
    }

    return no;
  };

  // Função auxiliar para buscar
  const buscarNo = (no: NoArvore | null, valor: number): boolean => {
    if (!no) return false;
    if (valor === no.valor) return true;
    if (valor < no.valor) return buscarNo(no.esquerda, valor);
    return buscarNo(no.direita, valor);
  };

  // Função auxiliar para calcular altura
  const calcularAltura = (no: NoArvore | null): number => {
    if (!no) return 0;
    return 1 + Math.max(calcularAltura(no.esquerda), calcularAltura(no.direita));
  };

  // Função auxiliar para calcular tamanho
  const calcularTamanho = (no: NoArvore | null): number => {
    if (!no) return 0;
    return 1 + calcularTamanho(no.esquerda) + calcularTamanho(no.direita);
  };

  // Função auxiliar para encontrar máximo
  const encontrarMaximo = (no: NoArvore): NoArvore => {
    while (no.direita !== null) {
      no = no.direita;
    }
    return no;
  };

  // Percursos
  const emOrdem = (no: NoArvore | null, resultado: number[] = []): number[] => {
    if (!no) return resultado;
    emOrdem(no.esquerda, resultado);
    resultado.push(no.valor);
    emOrdem(no.direita, resultado);
    return resultado;
  };

  const preOrdem = (no: NoArvore | null, resultado: number[] = []): number[] => {
    if (!no) return resultado;
    resultado.push(no.valor);
    preOrdem(no.esquerda, resultado);
    preOrdem(no.direita, resultado);
    return resultado;
  };

  const posOrdem = (no: NoArvore | null, resultado: number[] = []): number[] => {
    if (!no) return resultado;
    posOrdem(no.esquerda, resultado);
    posOrdem(no.direita, resultado);
    resultado.push(no.valor);
    return resultado;
  };

  // Contar folhas
  const contarFolhas = (no: NoArvore | null): number => {
    if (!no) return 0;
    if (!no.esquerda && !no.direita) return 1;
    return contarFolhas(no.esquerda) + contarFolhas(no.direita);
  };

  // Verificar se é BST válida
  const ehBSTValida = (no: NoArvore | null, min: number = -Infinity, max: number = Infinity): boolean => {
    if (!no) return true;
    if (no.valor <= min || no.valor >= max) return false;
    return ehBSTValida(no.esquerda, min, no.valor) && ehBSTValida(no.direita, no.valor, max);
  };

  // Balancear árvore
  const balancear = (no: NoArvore | null): NoArvore | null => {
    if (!no) return null;

    const valores = emOrdem(no);

    const construirBalanceada = (arr: number[], inicio: number, fim: number): NoArvore | null => {
      if (inicio > fim) return null;

      const meio = Math.floor((inicio + fim) / 2);
      const novoNo: NoArvore = {
        valor: arr[meio],
        esquerda: construirBalanceada(arr, inicio, meio - 1),
        direita: construirBalanceada(arr, meio + 1, fim),
        id: Date.now().toString() + Math.random()
      };

      return novoNo;
    };

    return construirBalanceada(valores, 0, valores.length - 1);
  };

  // Métodos públicos
  const inserir = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const novaRaiz = inserirNo(raiz, parseInt(valor));
    setRaiz({ ...novaRaiz });
    mostrarToast(`Valor ${valor} inserido`, 'success');
    setValor('');
  };

  const remover = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    if (!raiz) {
      mostrarToast('Árvore vazia', 'error');
      return;
    }
    const novaRaiz = removerNo(raiz, parseInt(valor));
    setRaiz(novaRaiz ? { ...novaRaiz } : null);
    mostrarToast(`Valor ${valor} removido`, 'success');
    setValor('');
  };

  const buscar = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const encontrado = buscarNo(raiz, parseInt(valor));
    mostrarToast(encontrado ? `Valor ${valor} encontrado` : `Valor ${valor} não encontrado`, encontrado ? 'success' : 'warning');
    setValor('');
  };

  const contem = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    const encontrado = buscarNo(raiz, parseInt(valor));
    mostrarToast(encontrado ? `Árvore contém ${valor}` : `Árvore não contém ${valor}`, 'info');
    setValor('');
  };

  const obterAltura = () => {
    const altura = calcularAltura(raiz);
    mostrarToast(`Altura da árvore: ${altura}`, 'info');
  };

  const obterTamanho = () => {
    const tamanho = calcularTamanho(raiz);
    mostrarToast(`Tamanho da árvore: ${tamanho} nós`, 'info');
  };

  const estaVazia = () => {
    mostrarToast(raiz === null ? 'Árvore vazia' : 'Árvore contém elementos', 'info');
  };

  const obterMinimo = () => {
    if (!raiz) {
      mostrarToast('Árvore vazia', 'error');
      return;
    }
    const minimo = encontrarMinimo(raiz);
    mostrarToast(`Valor mínimo: ${minimo.valor}`, 'info');
  };

  const obterMaximo = () => {
    if (!raiz) {
      mostrarToast('Árvore vazia', 'error');
      return;
    }
    const maximo = encontrarMaximo(raiz);
    mostrarToast(`Valor máximo: ${maximo.valor}`, 'info');
  };

  const limpar = () => {
    setRaiz(null);
    mostrarToast('Árvore limpa', 'success');
  };

  const percursoEmOrdem = () => {
    if (!raiz) {
      mostrarToast('Árvore vazia', 'error');
      return;
    }
    const resultado = emOrdem(raiz);
    mostrarToast(`Em ordem: ${resultado.join(', ')}`, 'info');
  };

  const percursoPreOrdem = () => {
    if (!raiz) {
      mostrarToast('Árvore vazia', 'error');
      return;
    }
    const resultado = preOrdem(raiz);
    mostrarToast(`Pré-ordem: ${resultado.join(', ')}`, 'info');
  };

  const percursoPosOrdem = () => {
    if (!raiz) {
      mostrarToast('Árvore vazia', 'error');
      return;
    }
    const resultado = posOrdem(raiz);
    mostrarToast(`Pós-ordem: ${resultado.join(', ')}`, 'info');
  };

  const contarFolhasArvore = () => {
    const folhas = contarFolhas(raiz);
    mostrarToast(`Número de folhas: ${folhas}`, 'info');
  };

  const verificarBST = () => {
    const valida = ehBSTValida(raiz);
    mostrarToast(valida ? 'Árvore é uma BST válida' : 'Árvore NÃO é uma BST válida', valida ? 'success' : 'warning');
  };

  const balancearArvore = () => {
    if (!raiz) {
      mostrarToast('Árvore vazia', 'error');
      return;
    }
    const novaRaiz = balancear(raiz);
    setRaiz(novaRaiz);
    mostrarToast('Árvore balanceada', 'success');
  };

  const metodos = [
    { id: 'inserir', nome: 'Inserir Valor', acao: inserir, requer: ['valor'], icon: Plus },
    { id: 'remover', nome: 'Remover Valor', acao: remover, requer: ['valor'], icon: Trash2 },
    { id: 'buscar', nome: 'Buscar Valor', acao: buscar, requer: ['valor'], icon: Search },
    { id: 'contem', nome: 'Contém Valor?', acao: contem, requer: ['valor'], icon: Search },
    { id: 'altura', nome: 'Ver Altura', acao: obterAltura, requer: [], icon: TrendingUp },
    { id: 'tamanho', nome: 'Ver Tamanho', acao: obterTamanho, requer: [], icon: Hash },
    { id: 'estaVazia', nome: 'Está Vazia?', acao: estaVazia, requer: [], icon: Eye },
    { id: 'minimo', nome: 'Obter Mínimo', acao: obterMinimo, requer: [], icon: TrendingDown },
    { id: 'maximo', nome: 'Obter Máximo', acao: obterMaximo, requer: [], icon: TrendingUp },
    { id: 'limpar', nome: 'Limpar Árvore', acao: limpar, requer: [], icon: Trash2 },
    { id: 'emOrdem', nome: 'Percurso Em Ordem', acao: percursoEmOrdem, requer: [], icon: List },
    { id: 'preOrdem', nome: 'Percurso Pré-Ordem', acao: percursoPreOrdem, requer: [], icon: List },
    { id: 'posOrdem', nome: 'Percurso Pós-Ordem', acao: percursoPosOrdem, requer: [], icon: List },
    { id: 'contarFolhas', nome: 'Contar Folhas', acao: contarFolhasArvore, requer: [], icon: TreePine },
    { id: 'verificarBST', nome: 'Verificar BST', acao: verificarBST, requer: [], icon: Eye },
    { id: 'balancear', nome: 'Balancear Árvore', acao: balancearArvore, requer: [], icon: RotateCcw },
  ];

  // Função para calcular posições dos nós para visualização
  const calcularPosicoes = (no: NoArvore | null, x: number, y: number, espacamento: number): PosicaoNo[] => {
    if (!no) return [];

    const posicoes: PosicaoNo[] = [{ x, y, valor: no.valor, id: no.id }];

    if (no.esquerda) {
      posicoes.push(...calcularPosicoes(no.esquerda, x - espacamento, y + 80, espacamento / 2));
    }

    if (no.direita) {
      posicoes.push(...calcularPosicoes(no.direita, x + espacamento, y + 80, espacamento / 2));
    }

    return posicoes;
  };

  // Função para desenhar linhas entre nós
  const desenharLinhas = (no: NoArvore | null, x: number, y: number, espacamento: number): JSX.Element[] => {
    if (!no) return [];

    const linhas: JSX.Element[] = [];

    if (no.esquerda) {
      const xEsq = x - espacamento;
      const yEsq = y + 80;
      linhas.push(
        <line
          key={`linha-${no.id}-esq`}
          x1={x}
          y1={y}
          x2={xEsq}
          y2={yEsq}
          stroke="#64748b"
          strokeWidth="2"
        />
      );
      linhas.push(...desenharLinhas(no.esquerda, xEsq, yEsq, espacamento / 2));
    }

    if (no.direita) {
      const xDir = x + espacamento;
      const yDir = y + 80;
      linhas.push(
        <line
          key={`linha-${no.id}-dir`}
          x1={x}
          y1={y}
          x2={xDir}
          y2={yDir}
          stroke="#64748b"
          strokeWidth="2"
        />
      );
      linhas.push(...desenharLinhas(no.direita, xDir, yDir, espacamento / 2));
    }

    return linhas;
  };

  const posicoes = raiz ? calcularPosicoes(raiz, 250, 40, 100) : [];
  const altura = calcularAltura(raiz);
  const tamanho = calcularTamanho(raiz);

  return (
    <main className="h-full bg-slate-950">
      <PageContainer size="wide" className="py-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
          <div className="lg:col-span-4 space-y-3 flex flex-col overflow-auto">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-xl flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Network className="h-5 w-5" />
                <h1 className="text-xl font-bold">Árvore Binária</h1>
              </div>
              <p className="text-white/90 text-sm">
                Estrutura hierárquica de busca
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
                  <span className="text-slate-400">Nós:</span>
                  <span className="text-white font-semibold">{tamanho}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Altura:</span>
                  <span className="text-white font-semibold">{altura}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Raiz:</span>
                  <span className="text-white font-semibold">{raiz ? raiz.valor : '-'}</span>
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
                          ? 'bg-indigo-500/20 border border-indigo-500/50 text-white'
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

          <div className="lg:col-span-8 flex flex-col h-full min-h-0">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-1 flex flex-col min-h-0">
              <h2 className="text-base font-semibold text-white mb-3 flex-shrink-0">Visualização da Árvore</h2>
              <div className="bg-slate-900 rounded-lg p-4 flex-1 flex items-center justify-center overflow-auto">
                {raiz ? (
                  <svg width="500" height={Math.max(300, altura * 80 + 40)} viewBox="0 0 500 500" className="max-w-full">
                    {desenharLinhas(raiz, 250, 40, 100)}
                    {posicoes.map((pos) => (
                      <g key={pos.id}>
                        <motion.circle
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          cx={pos.x}
                          cy={pos.y}
                          r="20"
                          className="fill-gradient-to-br from-indigo-500 to-purple-600"
                          fill="url(#gradient)"
                        />
                        <text
                          x={pos.x}
                          y={pos.y}
                          textAnchor="middle"
                          dy=".3em"
                          className="fill-white font-bold text-sm"
                        >
                          {pos.valor}
                        </text>
                      </g>
                    ))}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <EmptyState
                    icon={Network}
                    title="Árvore vazia"
                    description="Insira valores para construir a árvore binária de busca"
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

export default VisualizacaoArvoreBinaria;
