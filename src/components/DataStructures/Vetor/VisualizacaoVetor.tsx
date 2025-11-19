import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVetor } from './useVetor';
import VectorCell from './VectorCell';
import { Button } from '../../ui/Button';
import { Toast, ToastType } from '../../ui/Toast';
import { EmptyState } from '../../shared/EmptyState';
import { PageContainer } from '../../shared/PageContainer';
import {
  ArrowDownCircle,
  Trash2,
  Search,
  Eye,
  Edit,
  Ruler,
  HelpCircle,
  Eraser,
  BarChart3,
  RotateCcw,
  Plus,
  FileSpreadsheet,
  Minus,
  Scissors,
  Target,
  Hash,
  Box,
  Activity
} from 'lucide-react';

interface MetodoVetor {
  id: string;
  titulo: string;
  icon: React.ElementType;
  requisitos: string[];
  mensagemExplicativa: string;
  categoria: 'insercao' | 'remocao' | 'consulta' | 'transformacao';
}

const metodosDisponiveis: MetodoVetor[] = [
  {
    id: 'inserir',
    titulo: 'Inserir em Posição',
    icon: ArrowDownCircle,
    requisitos: ['valor', 'indice'],
    mensagemExplicativa: 'Insira um valor em uma posição específica do vetor',
    categoria: 'insercao'
  },
  {
    id: 'adicionarNoFinal',
    titulo: 'Adicionar no Final',
    icon: Plus,
    requisitos: ['valor'],
    mensagemExplicativa: 'Adicione um valor ao final do vetor',
    categoria: 'insercao'
  },
  {
    id: 'estender',
    titulo: 'Estender Vetor',
    icon: FileSpreadsheet,
    requisitos: ['valor'],
    mensagemExplicativa: 'Adicione múltiplos valores separados por vírgula (ex: 1,2,3)',
    categoria: 'insercao'
  },
  {
    id: 'remover',
    titulo: 'Remover Posição',
    icon: Trash2,
    requisitos: ['indice'],
    mensagemExplicativa: 'Remova o elemento de uma posição específica',
    categoria: 'remocao'
  },
  {
    id: 'removerDoFinal',
    titulo: 'Remover do Final',
    icon: Minus,
    requisitos: [],
    mensagemExplicativa: 'Remova o último elemento do vetor',
    categoria: 'remocao'
  },
  {
    id: 'limpar',
    titulo: 'Limpar Vetor',
    icon: Eraser,
    requisitos: [],
    mensagemExplicativa: 'Remove todos os elementos do vetor',
    categoria: 'remocao'
  },
  {
    id: 'buscar',
    titulo: 'Buscar Valor',
    icon: Search,
    requisitos: ['valor'],
    mensagemExplicativa: 'Busque um valor no vetor',
    categoria: 'consulta'
  },
  {
    id: 'obterElemento',
    titulo: 'Obter Elemento',
    icon: Eye,
    requisitos: ['indice'],
    mensagemExplicativa: 'Obtenha o elemento de uma posição',
    categoria: 'consulta'
  },
  {
    id: 'contem',
    titulo: 'Contém Valor',
    icon: Target,
    requisitos: ['valor'],
    mensagemExplicativa: 'Verifique se o vetor contém um valor',
    categoria: 'consulta'
  },
  {
    id: 'indiceDe',
    titulo: 'Índice do Valor',
    icon: Hash,
    requisitos: ['valor'],
    mensagemExplicativa: 'Encontre o índice de um valor',
    categoria: 'consulta'
  },
  {
    id: 'tamanho',
    titulo: 'Ver Tamanho',
    icon: Ruler,
    requisitos: [],
    mensagemExplicativa: 'Veja quantos elementos existem no vetor',
    categoria: 'consulta'
  },
  {
    id: 'estaVazio',
    titulo: 'Está Vazio?',
    icon: HelpCircle,
    requisitos: [],
    mensagemExplicativa: 'Verifique se o vetor está vazio',
    categoria: 'consulta'
  },
  {
    id: 'definirElemento',
    titulo: 'Substituir Valor',
    icon: Edit,
    requisitos: ['valor', 'indice'],
    mensagemExplicativa: 'Substitua o valor de uma posição específica',
    categoria: 'transformacao'
  },
  {
    id: 'ordenar',
    titulo: 'Ordenar',
    icon: BarChart3,
    requisitos: [],
    mensagemExplicativa: 'Ordene os elementos em ordem crescente',
    categoria: 'transformacao'
  },
  {
    id: 'inverter',
    titulo: 'Inverter',
    icon: RotateCcw,
    requisitos: [],
    mensagemExplicativa: 'Inverta a ordem dos elementos',
    categoria: 'transformacao'
  },
  {
    id: 'fatiar',
    titulo: 'Fatiar',
    icon: Scissors,
    requisitos: ['indice', 'indiceSecundario'],
    mensagemExplicativa: 'Extraia uma parte do vetor (início e fim)',
    categoria: 'transformacao'
  }
];

const categorias = {
  insercao: { titulo: 'Inserção', icon: ArrowDownCircle, cor: 'violet' },
  remocao: { titulo: 'Remoção', icon: Trash2, cor: 'red' },
  consulta: { titulo: 'Consulta', icon: Search, cor: 'cyan' },
  transformacao: { titulo: 'Transformação', icon: Activity, cor: 'amber' }
};

const VisualizacaoVetor: React.FC = () => {
  const {
    elementos,
    executarMetodo,
    historico,
    indiceDestacado,
    capacidadeMaxima,
    setIndiceDestacado,
    setMensagemAcao
  } = useVetor();

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [categoriaAberta, setCategoriaAberta] = React.useState<string | null>('insercao');
  const [valor, setValor] = React.useState('');
  const [indice, setIndice] = React.useState('');
  const [indiceSecundario, setIndiceSecundario] = React.useState('');
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastType, setToastType] = React.useState<ToastType>('success');

  const metodoSelecionado = metodosDisponiveis.find(m => m.id === metodoAtual);

  const executar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!metodoSelecionado) return;

    try {
      await executarMetodo(metodoAtual!, valor, indice, indiceSecundario);

      const mensagemSucesso = obterMensagemSucesso(metodoAtual!, valor, indice, indiceSecundario);

      setToastMessage(mensagemSucesso);
      setToastType('success');
      setToastVisible(true);
      setMensagemAcao(null);

      setValor('');
      setIndice('');
      setIndiceSecundario('');

      setTimeout(() => {
        setIndiceDestacado(null);
      }, 1500);

    } catch (error: unknown) {
      let mensagemErro = 'Erro desconhecido';
      if (typeof error === 'string') {
        mensagemErro = error;
      } else if (error instanceof Error) {
        mensagemErro = error.message;
      }

      setToastMessage(mensagemErro);
      setToastType('error');
      setToastVisible(true);
      setMensagemAcao(mensagemErro);
    }
  };

  const obterMensagemSucesso = (metodo: string, valor: string, indice: string, indiceSecundario: string): string => {
    const mensagens: Record<string, string> = {
      inserir: `Elemento ${valor} inserido na posição ${indice}`,
      remover: `Elemento removido da posição ${indice}`,
      buscar: `Busca realizada pelo elemento ${valor}`,
      obterElemento: `Elemento obtido da posição ${indice}`,
      definirElemento: `Elemento ${valor} definido na posição ${indice}`,
      tamanho: `Tamanho do vetor: ${elementos.length}`,
      estaVazio: elementos.length === 0 ? 'O vetor está vazio' : 'O vetor não está vazio',
      limpar: 'Vetor limpo com sucesso',
      ordenar: 'Vetor ordenado com sucesso',
      inverter: 'Vetor invertido com sucesso',
      adicionarNoFinal: `Elemento ${valor} adicionado ao final`,
      estender: `Elementos adicionados ao vetor`,
      removerDoFinal: 'Elemento removido do final',
      fatiar: `Vetor fatiado do índice ${indice} até ${indiceSecundario}`,
      contem: elementos.some(e => e.value === parseInt(valor)) ? `O vetor contém ${valor}` : `O vetor não contém ${valor}`,
      indiceDe: `Índice do elemento ${valor} encontrado`
    };

    return mensagens[metodo] || 'Operação realizada com sucesso';
  };

  const toggleCategoria = (categoria: string) => {
    setCategoriaAberta(categoriaAberta === categoria ? null : categoria);
  };

  const selecionarMetodo = (metodoId: string) => {
    setMetodoAtual(metodoId);
    setValor('');
    setIndice('');
    setIndiceSecundario('');
  };

  return (
    <main className="h-full bg-slate-950">
      <PageContainer size="wide" className="py-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
          <div className="lg:col-span-4 space-y-3 flex flex-col overflow-auto">
            <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl p-4 text-white shadow-xl flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Box className="h-5 w-5" aria-hidden="true" />
                </div>
                <h1 className="text-xl font-bold">Vetor</h1>
              </div>
              <p className="text-white/90 text-sm">
                Estrutura linear com elementos contíguos
              </p>
              <div className="mt-2 pt-2 border-t border-white/20">
                <p className="text-xs text-white/80">
                  <strong>{metodosDisponiveis.length} operações</strong> disponíveis
                </p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-shrink-0">
              <h2 className="text-base font-semibold text-white mb-3">Informações</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tamanho atual:</span>
                  <span className="text-white font-semibold">{elementos.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Capacidade:</span>
                  <span className="text-white font-semibold">{capacidadeMaxima}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Espaços livres:</span>
                  <span className="text-white font-semibold">{capacidadeMaxima - elementos.length}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-700">
                  <span className="text-slate-400">Estado:</span>
                  <span className={`font-semibold ${elementos.length > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {elementos.length > 0 ? 'Com dados' : 'Vazio'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="p-3 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-base font-semibold text-white">Operações</h2>
              </div>

              <div className="divide-y divide-slate-700 overflow-y-auto flex-1">
                {Object.entries(categorias).map(([key, config]) => {
                  const metodosDaCategoria = metodosDisponiveis.filter(m => m.categoria === key);
                  const CategIcon = config.icon;
                  const isAberta = categoriaAberta === key;

                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggleCategoria(key)}
                        className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                        aria-expanded={isAberta}
                        aria-controls={`categoria-${key}`}
                      >
                        <div className="flex items-center gap-3">
                          <CategIcon className={`h-5 w-5 text-${config.cor}-500`} aria-hidden="true" />
                          <span className="text-white font-medium">{config.titulo}</span>
                          <span className="text-xs text-slate-500">({metodosDaCategoria.length})</span>
                        </div>
                        <motion.div
                          animate={{ rotate: isAberta ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isAberta && (
                          <motion.div
                            id={`categoria-${key}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-slate-900/50"
                          >
                            <div className="p-2 space-y-1">
                              {metodosDaCategoria.map(metodo => {
                                const MetodoIcon = metodo.icon;
                                const isSelected = metodoAtual === metodo.id;

                                return (
                                  <button
                                    key={metodo.id}
                                    onClick={() => selecionarMetodo(metodo.id)}
                                    className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-all ${
                                      isSelected
                                        ? `bg-${config.cor}-500/20 border border-${config.cor}-500/50 text-white`
                                        : 'hover:bg-slate-800 text-slate-300'
                                    }`}
                                    aria-pressed={isSelected}
                                  >
                                    <MetodoIcon className={`h-4 w-4 ${isSelected ? `text-${config.cor}-400` : 'text-slate-500'}`} aria-hidden="true" />
                                    <span className="text-sm font-medium">{metodo.titulo}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {metodoSelecionado && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-shrink-0"
              >
                <h3 className="text-white text-sm font-semibold mb-2">{metodoSelecionado.titulo}</h3>
                <p className="text-slate-400 text-xs mb-3">{metodoSelecionado.mensagemExplicativa}</p>

                <form onSubmit={executar} className="space-y-4">
                  {metodoSelecionado.requisitos.includes('valor') && (
                    <div>
                      <label htmlFor="valor-input" className="block text-sm font-medium text-slate-300 mb-2">
                        Valor
                      </label>
                      <input
                        id="valor-input"
                        type="text"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder={metodoSelecionado.id === 'estender' ? 'ex: 1,2,3' : 'Digite um número'}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}

                  {metodoSelecionado.requisitos.includes('indice') && (
                    <div>
                      <label htmlFor="indice-input" className="block text-sm font-medium text-slate-300 mb-2">
                        Índice (posição)
                      </label>
                      <input
                        id="indice-input"
                        type="number"
                        value={indice}
                        onChange={(e) => setIndice(e.target.value)}
                        placeholder="ex: 0"
                        min="0"
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}

                  {metodoSelecionado.requisitos.includes('indiceSecundario') && (
                    <div>
                      <label htmlFor="indice-final-input" className="block text-sm font-medium text-slate-300 mb-2">
                        Índice Final
                      </label>
                      <input
                        id="indice-final-input"
                        type="number"
                        value={indiceSecundario}
                        onChange={(e) => setIndiceSecundario(e.target.value)}
                        placeholder="ex: 5"
                        min="0"
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full" size="lg">
                    Executar Operação
                  </Button>
                </form>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-8 flex flex-col h-full min-h-0 space-y-3">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-1 flex flex-col min-h-0">
              <h2 className="text-base font-semibold text-white mb-3 flex-shrink-0">Visualização do Vetor</h2>

              <div className="bg-slate-900 rounded-lg p-4 flex-1 flex items-center overflow-x-auto">
                {elementos.length > 0 ? (
                  <ul className="flex gap-2 min-w-min" role="list">
                    {Array.from({ length: capacidadeMaxima }).map((_, index) => (
                      <VectorCell
                        key={`${elementos[index]?.id || 'empty'}-${index}`}
                        value={elementos[index]?.value}
                        indice={index}
                        destacado={indiceDestacado === index}
                      />
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    icon={Box}
                    title="Vetor vazio"
                    description="Adicione elementos usando as operações de inserção"
                  />
                )}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex-shrink-0">
              <h2 className="text-base font-semibold text-white mb-3">Histórico de Operações</h2>

              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {historico.length > 0 ? (
                  historico.slice(-10).reverse().map((op, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-900 rounded-lg p-3 flex items-center justify-between"
                    >
                      <span className="text-slate-300 text-sm">{op.operacao}</span>
                      <span className="text-slate-500 text-xs">
                        {new Date(op.timestamp).toLocaleTimeString('pt-BR')}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm text-center py-8">
                    Nenhuma operação realizada ainda
                  </p>
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

export default VisualizacaoVetor;
