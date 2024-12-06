// src/components/DataStructures/Vetor/VisualizacaoVetor.tsx
import * as React from 'react';
import { useVetor } from './useVetor';
import VectorCell from './VectorCell';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';

interface MetodoVetor {
  id: string;
  titulo: string;
  icone: string;
  requisitos: string[];
  mensagemExplicativa: string;
}

const VisualizacaoVetor: React.FC = () => {
  const navigate = useNavigate();
  const {
    elementos,
    executarMetodo,
    mensagemAcao,
    historico,
    indiceDestacado,
    capacidadeMaxima,
    setIndiceDestacado,
    setMensagemAcao,
    registrarOperacao,
  } = useVetor();

  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [valor, setValor] = React.useState('');
  const [indice, setIndice] = React.useState('');
  const [indiceSecundario, setIndiceSecundario] = React.useState('');

  const capacidade = capacidadeMaxima;
  const metodosDisponiveis: MetodoVetor[] = [
    {
      id: 'inserir',
      titulo: 'Inserir',
      icone: '⬇',
      requisitos: ['valor', 'indice'],
      mensagemExplicativa:
        'Insira o valor (número inteiro) e a posição onde deseja inserir o elemento no vetor.',
    },
    {
      id: 'remover',
      titulo: 'Remover',
      icone: '🗑',
      requisitos: ['indice'],
      mensagemExplicativa:
        'Digite a posição do elemento que deseja remover do vetor.',
    },
    {
      id: 'buscar',
      titulo: 'Buscar',
      icone: '🔍',
      requisitos: ['valor'],
      mensagemExplicativa:
        'Digite o valor (número inteiro) que deseja buscar no vetor.',
    },
    {
      id: 'obterElemento',
      titulo: 'Obter Elemento',
      icone: '👁',
      requisitos: ['indice'],
      mensagemExplicativa:
        'Digite o índice do elemento que deseja obter.',
    },
    {
      id: 'definirElemento',
      titulo: 'Definir Elemento',
      icone: '✏️',
      requisitos: ['valor', 'indice'],
      mensagemExplicativa:
        'Informe o índice e o novo valor (número inteiro) que substituirá o elemento.',
    },
    {
      id: 'tamanho',
      titulo: 'Tamanho',
      icone: '📏',
      requisitos: [],
      mensagemExplicativa: 'Clique para ver o tamanho do vetor.',
    },
    {
      id: 'estaVazio',
      titulo: 'Está Vazio',
      icone: '❓',
      requisitos: [],
      mensagemExplicativa: 'Clique para verificar se o vetor está vazio.',
    },
    {
      id: 'limpar',
      titulo: 'Limpar',
      icone: '🧹',
      requisitos: [],
      mensagemExplicativa: 'Clique para limpar (remover) todos os elementos do vetor.',
    },
    {
      id: 'ordenar',
      titulo: 'Ordenar',
      icone: '📊',
      requisitos: [],
      mensagemExplicativa: 'Clique para ordenar os elementos do vetor.',
    },
    {
      id: 'inverter',
      titulo: 'Inverter',
      icone: '🔄',
      requisitos: [],
      mensagemExplicativa: 'Clique para inverter a ordem dos elementos do vetor.',
    },
    {
      id: 'adicionarNoFinal',
      titulo: 'Adicionar no Final',
      icone: '➕',
      requisitos: ['valor'],
      mensagemExplicativa:
        'Insira o valor (número inteiro) que deseja adicionar no final do vetor.',
    },
    {
      id: 'estender',
      titulo: 'Estender',
      icone: '📑',
      requisitos: ['valor'],
      mensagemExplicativa:
        'Digite os valores (números inteiros) separados por vírgula.',
    },
    {
      id: 'removerDoFinal',
      titulo: 'Remover do Final',
      icone: '⛔',
      requisitos: [],
      mensagemExplicativa: 'Clique para remover o último elemento do vetor.',
    },
    {
      id: 'fatiar',
      titulo: 'Fatiar',
      icone: '✂️',
      requisitos: ['indice', 'indiceSecundario'],
      mensagemExplicativa: 'Digite o índice inicial e final para fatiar.',
    },
    {
      id: 'contem',
      titulo: 'Contém',
      icone: '🎯',
      requisitos: ['valor'],
      mensagemExplicativa:
        'Digite o valor (número inteiro) que deseja verificar se ele está contido no vetor.',
    },
    {
      id: 'indiceDe',
      titulo: 'Índice De',
      icone: '🔢',
      requisitos: ['valor'],
      mensagemExplicativa:
        'Digite o valor (número inteiro) para localização do índice dele no vetor.',
    },
  ];

  const executar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const metodoInfo = metodosDisponiveis.find(m => m.id === metodoAtual);
      if (!metodoInfo) return;

      await executarMetodo(metodoAtual!, valor, indice, indiceSecundario);

      let mensagemSucesso = '';
      switch (metodoAtual) {
        case 'inserir':
          mensagemSucesso = `Elemento ${valor} inserido na posição ${indice}`;
          break;
        case 'remover':
          mensagemSucesso = `Elemento removido da posição ${indice}`;
          break;
        case 'buscar':
          mensagemSucesso = `Busca realizada pelo elemento ${valor}`;
          break;
        case 'obterElemento':
          mensagemSucesso = `Elemento obtido da posição ${indice}`;
          break;
        case 'definirElemento':
          mensagemSucesso = `Elemento ${valor} definido na posição ${indice}`;
          break;
        case 'tamanho':
          mensagemSucesso = 'Tamanho do vetor consultado';
          break;
        case 'estaVazio':
          mensagemSucesso = 'Verificação de vetor vazio realizada';
          break;
        case 'limpar':
          mensagemSucesso = 'Vetor limpo com sucesso';
          break;
        case 'ordenar':
          mensagemSucesso = 'Vetor ordenado com sucesso';
          break;
        case 'inverter':
          mensagemSucesso = 'Vetor invertido com sucesso';
          break;
        case 'adicionarNoFinal':
          mensagemSucesso = `Elemento ${valor} adicionado ao final do vetor`;
          break;
        case 'estender':
          mensagemSucesso = `Elementos [${valor}] adicionados ao vetor`;
          break;
        case 'removerDoFinal':
          mensagemSucesso = 'Elemento removido do final do vetor';
          break;
        case 'fatiar':
          mensagemSucesso = `Vetor fatiado do índice ${indice} até ${indiceSecundario}`;
          break;
        case 'contem':
          mensagemSucesso = `Verificação de existência do elemento ${valor} realizada`;
          break;
        case 'indiceDe':
          mensagemSucesso = `Busca do índice do elemento ${valor} realizada`;
          break;
        default:
          mensagemSucesso = 'Operação realizada com sucesso';
      }

      registrarOperacao(mensagemSucesso);
      setMensagemAcao(mensagemSucesso);

      setValor('');
      setIndice('');
      setIndiceSecundario('');
      
      setTimeout(() => {
        setIndiceDestacado(null);
      }, 1500);

    } catch (error: unknown) {
      let mensagemErro = 'Erro desconhecido';
      if (typeof error === 'string') {
        mensagemErro = `Erro: ${error}`;
      } else if (error instanceof Error) {
        mensagemErro = `Erro: ${error.message}`;
      }
      
      registrarOperacao(mensagemErro);
      setMensagemAcao(mensagemErro);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <Button onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button onClick={() => window.close()} variant="destructive" aria-label="Sair">
          Sair
        </Button>
      </div>

      <h1 className="text-xl font-bold mt-4">Vetor</h1>
      <p className="mt-4">Estrutura linear com elementos em posições contíguas de memória.</p>
      <span className="text-purple-400">16 métodos disponíveis</span>

      <div className="mb-6 bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <ul className="flex flex-row gap-2 min-w-min" role="list">
          {elementos.length > 0 ? (
            Array.from({ length: capacidade }).map((_, index) => (
              <VectorCell
                key={`${elementos[index]?.id}-${index}`}
                value={elementos[index]?.value}
                indice={index}
                destacado={indiceDestacado === index}
              />
            ))
          ) : (
            <li role="listitem" className="text-gray-400 text-center mt-4">
              Vetor vazio.
            </li>
          )}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {metodosDisponiveis.map((metodo) => (
          <button
            key={metodo.id}
            onClick={() => setMetodoAtual(metodo.id)}
            className={`p-2 rounded text-left flex items-center gap-2 ${
              metodoAtual === metodo.id ? 'bg-purple-600' : 'bg-gray-700'
            } hover:bg-purple-500 transition-colors`}
            aria-label={`Selecionar método ${metodo.titulo}`}
          >
            <span role="img" aria-hidden="true">
              {metodo.icone}
            </span>
            <span>{metodo.titulo}</span>
          </button>
        ))}
      </div>

      {metodoAtual && (
        <div className="mb-6 bg-gray-800 p-4 rounded">
          <p className="text-gray-300 mb-4">
            {metodosDisponiveis.find(m => m.id === metodoAtual)?.mensagemExplicativa}
          </p>
          <form onSubmit={executar} className="flex flex-wrap md:flex-nowrap items-center gap-4">
            {metodosDisponiveis.find(m => m.id === metodoAtual)?.requisitos.includes('valor') && (
              <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            )}
            {metodosDisponiveis.find(m => m.id === metodoAtual)?.requisitos.includes('indice') && (
              <input
                type="number"
                value={indice}
                onChange={(e) => setIndice(e.target.value)}
                placeholder="Índice"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            )}
            {metodosDisponiveis.find(m => m.id === metodoAtual)?.requisitos.includes('indiceSecundario') && (
              <input
                type="number"
                value={indiceSecundario}
                onChange={(e) => setIndiceSecundario(e.target.value)}
                placeholder="Índice Final"
                className="p-2 rounded bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            )}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Executar
            </button>
          </form>
        </div>
      )}

      {mensagemAcao && (
        <div className="mb-6 bg-gray-800 p-3 rounded">
          <p className={`${mensagemAcao.startsWith('Erro') ? 'text-red-400' : 'text-green-400'}`} role="alert">
            {mensagemAcao}
          </p>
        </div>
      )}

      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-blue-400">Tamanho:</span>
          <span>{elementos.length}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded flex items-center justify-between min-w-[150px]">
          <span className="text-blue-400">Estado:</span>
          <span>{elementos.length > 0 ? 'Com elementos' : 'Vazio'}</span>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold mb-3">Histórico de Operações</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {historico.map((op, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded">
              {op.operacao} {new Date(op.timestamp).toLocaleTimeString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoVetor;