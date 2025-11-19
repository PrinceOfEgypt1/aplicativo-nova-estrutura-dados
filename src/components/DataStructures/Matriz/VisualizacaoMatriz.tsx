import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Toast, ToastType } from '../../ui/Toast';
import { EmptyState } from '../../shared/EmptyState';
import { PageContainer } from '../../shared/PageContainer';
import { Grid, Plus, Trash2, Eye, Hash, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

const VisualizacaoMatriz: React.FC = () => {
  const [matriz, setMatriz] = React.useState<number[][]>([]);
  const [linhas, setLinhas] = React.useState('');
  const [colunas, setColunas] = React.useState('');
  const [linha, setLinha] = React.useState('');
  const [coluna, setColuna] = React.useState('');
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

  const criarMatriz = () => {
    if (!linhas || !colunas) {
      mostrarToast('Digite número de linhas e colunas', 'error');
      return;
    }
    const l = parseInt(linhas);
    const c = parseInt(colunas);
    if (l <= 0 || c <= 0 || l > 10 || c > 10) {
      mostrarToast('Linhas e colunas devem estar entre 1 e 10', 'error');
      return;
    }
    const novaMatriz = Array(l).fill(0).map(() => Array(c).fill(0));
    setMatriz(novaMatriz);
    mostrarToast(`Matriz ${l}x${c} criada`, 'success');
    setLinhas('');
    setColunas('');
  };

  const definirValor = () => {
    if (!linha || !coluna || !valor) {
      mostrarToast('Digite linha, coluna e valor', 'error');
      return;
    }
    const l = parseInt(linha);
    const c = parseInt(coluna);
    const v = parseInt(valor);

    if (l < 0 || l >= matriz.length || c < 0 || c >= (matriz[0]?.length || 0)) {
      mostrarToast('Posição inválida', 'error');
      return;
    }

    const novaMatriz = matriz.map(row => [...row]);
    novaMatriz[l][c] = v;
    setMatriz(novaMatriz);
    mostrarToast(`Valor ${v} definido na posição [${l}][${c}]`, 'success');
    setLinha('');
    setColuna('');
    setValor('');
  };

  const obterValor = () => {
    if (!linha || !coluna) {
      mostrarToast('Digite linha e coluna', 'error');
      return;
    }
    const l = parseInt(linha);
    const c = parseInt(coluna);

    if (l < 0 || l >= matriz.length || c < 0 || c >= (matriz[0]?.length || 0)) {
      mostrarToast('Posição inválida', 'error');
      return;
    }

    mostrarToast(`Valor em [${l}][${c}]: ${matriz[l][c]}`, 'info');
    setLinha('');
    setColuna('');
  };

  const preencherMatriz = () => {
    if (!valor) {
      mostrarToast('Digite um valor', 'error');
      return;
    }
    if (matriz.length === 0) {
      mostrarToast('Crie uma matriz primeiro', 'error');
      return;
    }
    const v = parseInt(valor);
    const novaMatriz = matriz.map(row => row.map(() => v));
    setMatriz(novaMatriz);
    mostrarToast(`Matriz preenchida com ${v}`, 'success');
    setValor('');
  };

  const transpor = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    const transposta = matriz[0].map((_, colIndex) =>
      matriz.map(row => row[colIndex])
    );
    setMatriz(transposta);
    mostrarToast('Matriz transposta', 'success');
  };

  const somaMatriz = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    const soma = matriz.reduce((acc, row) =>
      acc + row.reduce((sum, val) => sum + val, 0), 0
    );
    mostrarToast(`Soma de todos os elementos: ${soma}`, 'info');
  };

  const obterLinha = () => {
    if (!linha) {
      mostrarToast('Digite o número da linha', 'error');
      return;
    }
    const l = parseInt(linha);
    if (l < 0 || l >= matriz.length) {
      mostrarToast('Linha inválida', 'error');
      return;
    }
    mostrarToast(`Linha ${l}: [${matriz[l].join(', ')}]`, 'info');
    setLinha('');
  };

  const obterColuna = () => {
    if (!coluna) {
      mostrarToast('Digite o número da coluna', 'error');
      return;
    }
    const c = parseInt(coluna);
    if (c < 0 || c >= (matriz[0]?.length || 0)) {
      mostrarToast('Coluna inválida', 'error');
      return;
    }
    const colunaValores = matriz.map(row => row[c]);
    mostrarToast(`Coluna ${c}: [${colunaValores.join(', ')}]`, 'info');
    setColuna('');
  };

  const diagonalPrincipal = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    if (matriz.length !== matriz[0].length) {
      mostrarToast('Matriz deve ser quadrada', 'warning');
      return;
    }
    const diagonal = matriz.map((row, i) => row[i]);
    mostrarToast(`Diagonal principal: [${diagonal.join(', ')}]`, 'info');
  };

  const somaPorLinha = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    const somas = matriz.map((row, i) => {
      const soma = row.reduce((acc, val) => acc + val, 0);
      return `Linha ${i}: ${soma}`;
    });
    mostrarToast(somas.join(', '), 'info');
  };

  const somaPorColuna = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    const numColunas = matriz[0].length;
    const somas = Array(numColunas).fill(0).map((_, c) => {
      const soma = matriz.reduce((acc, row) => acc + row[c], 0);
      return `Coluna ${c}: ${soma}`;
    });
    mostrarToast(somas.join(', '), 'info');
  };

  const maiorElemento = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    const maior = Math.max(...matriz.flat());
    mostrarToast(`Maior elemento: ${maior}`, 'info');
  };

  const menorElemento = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    const menor = Math.min(...matriz.flat());
    mostrarToast(`Menor elemento: ${menor}`, 'info');
  };

  const limpar = () => {
    setMatriz([]);
    mostrarToast('Matriz limpa', 'success');
  };

  const dimensoes = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    mostrarToast(`Dimensões: ${matriz.length} x ${matriz[0].length}`, 'info');
  };

  const zerarMatriz = () => {
    if (matriz.length === 0) {
      mostrarToast('Matriz vazia', 'error');
      return;
    }
    const novaMatriz = matriz.map(row => row.map(() => 0));
    setMatriz(novaMatriz);
    mostrarToast('Matriz zerada', 'success');
  };

  const metodos = [
    { id: 'criarMatriz', nome: 'Criar Matriz', acao: criarMatriz, requer: ['linhas', 'colunas'], icon: Plus },
    { id: 'definirValor', nome: 'Definir Valor', acao: definirValor, requer: ['linha', 'coluna', 'valor'], icon: Plus },
    { id: 'obterValor', nome: 'Obter Valor', acao: obterValor, requer: ['linha', 'coluna'], icon: Eye },
    { id: 'preencherMatriz', nome: 'Preencher Matriz', acao: preencherMatriz, requer: ['valor'], icon: Grid },
    { id: 'transpor', nome: 'Transpor', acao: transpor, requer: [], icon: RotateCcw },
    { id: 'somaMatriz', nome: 'Soma Total', acao: somaMatriz, requer: [], icon: Hash },
    { id: 'obterLinha', nome: 'Obter Linha', acao: obterLinha, requer: ['linha'], icon: Eye },
    { id: 'obterColuna', nome: 'Obter Coluna', acao: obterColuna, requer: ['coluna'], icon: Eye },
    { id: 'diagonalPrincipal', nome: 'Diagonal Principal', acao: diagonalPrincipal, requer: [], icon: Eye },
    { id: 'somaPorLinha', nome: 'Soma por Linha', acao: somaPorLinha, requer: [], icon: Hash },
    { id: 'somaPorColuna', nome: 'Soma por Coluna', acao: somaPorColuna, requer: [], icon: Hash },
    { id: 'maiorElemento', nome: 'Maior Elemento', acao: maiorElemento, requer: [], icon: TrendingUp },
    { id: 'menorElemento', nome: 'Menor Elemento', acao: menorElemento, requer: [], icon: TrendingDown },
    { id: 'limpar', nome: 'Limpar Matriz', acao: limpar, requer: [], icon: Trash2 },
    { id: 'dimensoes', nome: 'Ver Dimensões', acao: dimensoes, requer: [], icon: Grid },
    { id: 'zerarMatriz', nome: 'Zerar Matriz', acao: zerarMatriz, requer: [], icon: Trash2 },
  ];

  return (
    <main className="h-screen overflow-hidden bg-slate-950">
      <PageContainer size="wide" className="py-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
          <div className="lg:col-span-4 space-y-3 flex flex-col overflow-auto">
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-4 text-white shadow-xl flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Grid className="h-5 w-5" />
                <h1 className="text-xl font-bold">Matriz</h1>
              </div>
              <p className="text-white/90 text-sm">
                Estrutura bidimensional de dados
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
                  <span className="text-slate-400">Linhas:</span>
                  <span className="text-white font-semibold">{matriz.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Colunas:</span>
                  <span className="text-white font-semibold">
                    {matriz.length > 0 ? matriz[0].length : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total elementos:</span>
                  <span className="text-white font-semibold">
                    {matriz.length > 0 ? matriz.length * matriz[0].length : 0}
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
                          ? 'bg-purple-500/20 border border-purple-500/50 text-white'
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
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('linhas') && (
                    <div>
                      <label htmlFor="linhas" className="block text-sm font-medium text-slate-300 mb-2">Linhas</label>
                      <input
                        id="linhas"
                        type="number"
                        value={linhas}
                        onChange={(e) => setLinhas(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('colunas') && (
                    <div>
                      <label htmlFor="colunas" className="block text-sm font-medium text-slate-300 mb-2">Colunas</label>
                      <input
                        id="colunas"
                        type="number"
                        value={colunas}
                        onChange={(e) => setColunas(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('linha') && (
                    <div>
                      <label htmlFor="linha" className="block text-sm font-medium text-slate-300 mb-2">Linha</label>
                      <input
                        id="linha"
                        type="number"
                        value={linha}
                        onChange={(e) => setLinha(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
                  {metodos.find(m => m.id === metodoSelecionado)?.requer.includes('coluna') && (
                    <div>
                      <label htmlFor="coluna" className="block text-sm font-medium text-slate-300 mb-2">Coluna</label>
                      <input
                        id="coluna"
                        type="number"
                        value={coluna}
                        onChange={(e) => setColuna(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  )}
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

          <div className="lg:col-span-8 flex flex-col h-full min-h-0">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-1 flex flex-col min-h-0">
              <h2 className="text-base font-semibold text-white mb-3 flex-shrink-0">Visualização da Matriz</h2>
              <div className="bg-slate-900 rounded-lg p-4 flex-1 flex items-center justify-center overflow-auto">
                {matriz.length > 0 ? (
                  <div className="inline-block">
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matriz[0].length}, minmax(0, 1fr))` }}>
                      {matriz.map((row, i) => (
                        <React.Fragment key={i}>
                          {row.map((valor, j) => (
                            <motion.div
                              key={`${i}-${j}`}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: (i * row.length + j) * 0.02 }}
                              className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg p-4 shadow-lg min-w-[60px] min-h-[60px] flex items-center justify-center"
                            >
                              <div className="text-center">
                                <div className="text-xl font-bold text-white">{valor}</div>
                                <div className="text-xs text-purple-200 mt-1">[{i},{j}]</div>
                              </div>
                            </motion.div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyState icon={Grid} title="Matriz vazia" description="Crie uma matriz usando a operação 'Criar Matriz'" />
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

export default VisualizacaoMatriz;
