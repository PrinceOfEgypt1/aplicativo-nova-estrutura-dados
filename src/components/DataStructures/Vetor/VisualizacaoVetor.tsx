
// src/components/DataStructures/Vetor/VisualizacaoVetor.tsx
import * as React from 'react';

interface VectorElement {
  value: number;  // Alterado para aceitar apenas number
  id: string;
}

interface HistoryOperation {
  operacao: string;
  timestamp: number;
}

interface MetodoVetor {
  id: string;
  titulo: string;
  icone: string;
  requisitos: string[];
  mensagemExplicativa: string;
}

const validarNumeroInteiro = (valor: string): { valido: boolean; valor?: number; mensagem: string } => {
  if (!valor.trim()) {
    return { valido: false, mensagem: 'O valor não pode estar vazio' };
  }

  const numero = Number(valor);
  
  if (isNaN(numero)) {
    return { valido: false, mensagem: 'O valor deve ser um número inteiro' };
  }

  if (numero !== Math.floor(numero)) {
    return { valido: false, mensagem: 'O valor deve ser um número inteiro' };
  }

  if (numero < -1000 || numero > 1000) {
    return { valido: false, mensagem: 'O valor deve estar entre -1000 e 1000' };
  }

  return { valido: true, valor: numero, mensagem: 'Valor válido' };
};

const VisualizacaoVetor: React.FC = () => {
  const [elementos, setElementos] = React.useState<VectorElement[]>([]);
  const [metodoAtual, setMetodoAtual] = React.useState<string | null>(null);
  const [valor, setValor] = React.useState('');
  const [indice, setIndice] = React.useState('');
  const [indiceSecundario, setIndiceSecundario] = React.useState('');
  const [mensagemAcao, setMensagemAcao] = React.useState<string | null>(null);
  const [historico, setHistorico] = React.useState<HistoryOperation[]>([]);
  const [indiceDestacado, setIndiceDestacado] = React.useState<number | null>(null);
  const capacidade = 20;

  const metodosDisponiveis: MetodoVetor[] = [
    { 
      id: 'inserir',
      titulo: 'Inserir',
      icone: '⬇',
      requisitos: ['valor', 'indice'],
      mensagemExplicativa: 'Insira o valor (número inteiro) e a posição onde deseja inserir o elemento no vetor.'
    },
    { 
      id: 'remover',
      titulo: 'Remover',
      icone: '🗑',
      requisitos: ['indice'],
      mensagemExplicativa: 'Digite a posição do elemento que deseja remover do vetor.'
    },
    { 
      id: 'buscar',
      titulo: 'Buscar',
      icone: '🔍',
      requisitos: ['valor'],
      mensagemExplicativa: 'Digite o valor (número inteiro) que deseja buscar no vetor.'
    },
    { 
      id: 'obterElemento',
      titulo: 'Obter Elemento',
      icone: '👁',
      requisitos: ['indice'],
      mensagemExplicativa: 'Digite o índice do elemento que deseja obter.'
    },
    { 
      id: 'definirElemento',
      titulo: 'Definir Elemento',
      icone: '✏️',
      requisitos: ['valor', 'indice'],
      mensagemExplicativa: 'Informe o índice e o novo valor (número inteiro) que substituirá o elemento.'
    },
    {
      id: 'tamanho',
      titulo: 'Tamanho',
      icone: '📏',
      requisitos: [],
      mensagemExplicativa: 'Clique para ver o tamanho do vetor.'
    },
    { 
      id: 'estaVazio',
      titulo: 'Está Vazio',
      icone: '❓',
      requisitos: [],
      mensagemExplicativa: 'Clique para verificar se o vetor está vazio.'
    },
    { 
      id: 'limpar',
      titulo: 'Limpar',
      icone: '🧹',
      requisitos: [],
      mensagemExplicativa: 'Clique para limpar (remover) todos os elementos do vetor.'
    },
    { 
      id: 'ordenar',
      titulo: 'Ordenar',
      icone: '📊',
      requisitos: [],
      mensagemExplicativa: 'Clique para ordenar os elementos do vetor.'
    },
    { 
      id: 'inverter',
      titulo: 'Inverter',
      icone: '🔄',
      requisitos: [],
      mensagemExplicativa: 'Clique para inverter a ordem dos elementos do vetor.'
    },
    { 
      id: 'adicionarNoFinal',
      titulo: 'Adicionar no Final',
      icone: '➕',
      requisitos: ['valor'],
      mensagemExplicativa: 'Insira o valor (número inteiro) que deseja adicionar no final do vetor.'
    },
    { 
      id: 'estender',
      titulo: 'Estender',
      icone: '📑',
      requisitos: ['valor'],
      mensagemExplicativa: 'Digite os valores (números inteiros) separados por vírgula.'
    },
    { 
      id: 'removerDoFinal',
      titulo: 'Remover do Final',
      icone: '⛔',
      requisitos: [],
      mensagemExplicativa: 'Clique para remover o último elemento do vetor.'
    },
    { 
      id: 'fatiar',
      titulo: 'Fatiar',
      icone: '✂️',
      requisitos: ['indice', 'indiceSecundario'],
      mensagemExplicativa: 'Digite o índice inicial e final para fatiar.'
    },
    { 
      id: 'contem',
      titulo: 'Contém',
      icone: '🎯',
      requisitos: ['valor'],
      mensagemExplicativa: 'Digite o valor (número inteiro) que deseja verificar se ele está contido no vetor.'
    },
    { 
      id: 'indiceDe',
      titulo: 'Índice De',
      icone: '🔢',
      requisitos: ['valor'],
      mensagemExplicativa: 'Digite o valor (número inteiro) para localização do índice dele no vetor.'
    }
  ];

  const registrarOperacao = React.useCallback((operacao: string): void => {
    setHistorico(prev => [{
      operacao,
      timestamp: Date.now()
    }, ...prev]);
    setMensagemAcao(operacao);
  }, []);

  const executarMetodo = React.useCallback(() => {
    if (!metodoAtual) return;

    try {
      switch (metodoAtual) {
        case 'inserir': {
          if (!valor || !indice) throw new Error('Preencha todos os campos');
          const validacao = validarNumeroInteiro(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          
          const idx = parseInt(indice);
          if (isNaN(idx)) throw new Error('Índice inválido');
          if (idx < 0 || idx > elementos.length) throw new Error('Índice fora dos limites');
          if (elementos.length >= capacidade) throw new Error('Vetor está cheio');
          
          const novosElementos = [...elementos];
          novosElementos.splice(idx, 0, { value: validacao.valor!, id: Date.now().toString() });
          setElementos(novosElementos);
          setIndiceDestacado(idx);
          registrarOperacao(`Elemento ${validacao.valor} inserido na posição ${idx}`);
          break;
        }
        case 'remover': {
          if (!indice) throw new Error('Informe o índice');
          const idx = parseInt(indice);
          if (isNaN(idx)) throw new Error('Índice inválido');
          if (idx < 0 || idx >= elementos.length) throw new Error('Índice fora dos limites');
          
          const elementoRemovido = elementos[idx].value;
          const novosElementos = [...elementos];
          novosElementos.splice(idx, 1);
          setElementos(novosElementos);
          registrarOperacao(`Elemento ${elementoRemovido} removido da posição ${idx}`);
          break;
        }

        case 'buscar': {
          if (!valor) throw new Error('Informe o valor para buscar');
          const validacao = validarNumeroInteiro(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          
          const encontrado = elementos.findIndex(el => el.value === validacao.valor);
          if (encontrado >= 0) {
            setIndiceDestacado(encontrado);
            registrarOperacao(`Elemento ${validacao.valor} encontrado na posição ${encontrado}`);
          } else {
            registrarOperacao(`Elemento ${validacao.valor} não encontrado`);
          }
          break;
        }

        case 'obterElemento': {
          if (!indice) throw new Error('Informe o índice');
          const idx = parseInt(indice);
          if (isNaN(idx)) throw new Error('Índice inválido');
          if (idx < 0 || idx >= elementos.length) throw new Error('Índice fora dos limites');
          
          setIndiceDestacado(idx);
          registrarOperacao(`Elemento na posição ${idx}: ${elementos[idx].value}`);
          break;
        }

        case 'definirElemento': {
          if (!valor || !indice) throw new Error('Preencha todos os campos');
          const validacao = validarNumeroInteiro(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          
          const idx = parseInt(indice);
          if (isNaN(idx)) throw new Error('Índice inválido');
          if (idx < 0 || idx >= elementos.length) throw new Error('Índice fora dos limites');
          
          const novosElementos = [...elementos];
          novosElementos[idx] = { value: validacao.valor!, id: Date.now().toString() };
          setElementos(novosElementos);
          setIndiceDestacado(idx);
          registrarOperacao(`Elemento na posição ${idx} atualizado para ${validacao.valor}`);
          break;
        }

        case 'tamanho': {
          registrarOperacao(`Tamanho atual do vetor: ${elementos.length}`);
          break;
        }

        case 'estaVazio': {
          const vazio = elementos.length === 0;
          registrarOperacao(`O vetor ${vazio ? 'está' : 'não está'} vazio`);
          break;
        }

        case 'limpar': {
          setElementos([]);
          registrarOperacao('Vetor foi limpo');
          break;
        }

        case 'ordenar': {
          if (elementos.length === 0) throw new Error('Vetor está vazio');
          const novosElementos = [...elementos].sort((a, b) => a.value - b.value);
          setElementos(novosElementos);
          registrarOperacao('Vetor ordenado');
          break;
        }

        case 'inverter': {
          if (elementos.length === 0) throw new Error('Vetor está vazio');
          const novosElementos = [...elementos].reverse();
          setElementos(novosElementos);
          registrarOperacao('Vetor invertido');
          break;
        }

        case 'adicionarNoFinal': {
          if (!valor) throw new Error('Informe o valor');
          const validacao = validarNumeroInteiro(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          
          if (elementos.length >= capacidade) throw new Error('Vetor está cheio');
          
          setElementos([...elementos, { value: validacao.valor!, id: Date.now().toString() }]);
          setIndiceDestacado(elementos.length);
          registrarOperacao(`Elemento ${validacao.valor} adicionado ao final`);
          break;
        }

        case 'estender': {
          if (!valor) throw new Error('Informe os valores separados por vírgula');
          const valoresBrutos = valor.split(',').map(v => v.trim());
          
          const valoresValidados = [];
          for (const valorBruto of valoresBrutos) {
            const validacao = validarNumeroInteiro(valorBruto);
            if (!validacao.valido) throw new Error(`Valor inválido na lista: ${valorBruto} - ${validacao.mensagem}`);
            valoresValidados.push(validacao.valor!);
          }
          
          if (elementos.length + valoresValidados.length > capacidade) {
            throw new Error('Capacidade seria excedida');
          }
          
          const elementosAdicionados = valoresValidados.map(valor => ({
            value: valor,
            id: Date.now().toString() + Math.random()
          }));
          setElementos([...elementos, ...elementosAdicionados]);
          registrarOperacao(`${valoresValidados.length} elementos adicionados ao final`);
          break;
        }

        case 'removerDoFinal': {
          if (elementos.length === 0) throw new Error('Vetor está vazio');
          const removido = elementos[elementos.length - 1].value;
          setElementos(prev => prev.slice(0, -1));
          registrarOperacao(`Elemento ${removido} removido do final`);
          break;
        }

        case 'fatiar': {
          if (!indice || !indiceSecundario) throw new Error('Informe os índices inicial e final');
          const inicio = parseInt(indice);
          const fim = parseInt(indiceSecundario);
          
          if (isNaN(inicio) || isNaN(fim)) throw new Error('Índices inválidos');
          if (inicio < 0 || inicio >= elementos.length) throw new Error('Índice inicial inválido');
          if (fim < inicio || fim > elementos.length) throw new Error('Índice final inválido');
          
          const elementosFatiados = elementos.slice(inicio, fim);
          registrarOperacao(`Vetor fatiado: [${elementosFatiados.map(el => el.value).join(', ')}]`);
          break;
        }

        case 'contem': {
          if (!valor) throw new Error('Informe o valor para verificar');
          const validacao = validarNumeroInteiro(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          
          const contem = elementos.some(el => el.value === validacao.valor);
          registrarOperacao(`O vetor ${contem ? 'contém' : 'não contém'} o elemento ${validacao.valor}`);
          break;
        }

        case 'indiceDe': {
          if (!valor) throw new Error('Informe o valor para buscar');
          const validacao = validarNumeroInteiro(valor);
          if (!validacao.valido) throw new Error(validacao.mensagem);
          
          const indice = elementos.findIndex(el => el.value === validacao.valor);
          if (indice >= 0) {
            setIndiceDestacado(indice);
            registrarOperacao(`Primeira ocorrência do elemento ${validacao.valor} está no índice ${indice}`);
          } else {
            registrarOperacao(`Elemento ${validacao.valor} não encontrado`);
          }
          break;
        }

        default:
          throw new Error('Método não implementado');
      }

      setValor('');
      setIndice('');
      setIndiceSecundario('');
      
      if (indiceDestacado !== null) {
        setTimeout(() => setIndiceDestacado(null), 1500);
      }
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        setMensagemAcao(`Erro: ${erro.message}`);
      } else {
        setMensagemAcao('Erro desconhecido');
      }
    }
  }, [metodoAtual, elementos, valor, indice, indiceSecundario, indiceDestacado, capacidade, registrarOperacao]);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
            aria-label="Voltar para a página inicial"
          >
            <span>←</span>
            Voltar
          </button>

          <button
            onClick={() => window.close()}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-white rounded-lg border border-red-700 hover:bg-red-700 transition-colors"
            aria-label="Sair da aplicação"
          >
            <span>✕</span>
            Sair
          </button>
        </div>

        <h1 className="text-xl font-bold mt-4">Vetor</h1>
        <p className="mt-4">Estrutura linear com elementos em posições contíguas de memória.</p>
        <span className="text-purple-400">16 métodos disponíveis</span>
      </div>

      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: capacidade }).map((_, index) => (
            <div
              key={`cell-${index}`}
              className={`
                w-14 h-14 rounded relative flex items-center justify-center
                ${elementos[index] ? 'bg-purple-600' : 'bg-gray-700'}
                ${indiceDestacado === index ? 'ring-2 ring-blue-400' : ''}
              `}
              aria-label={elementos[index] 
                ? `Célula ${index} contendo ${elementos[index].value}`
                : `Célula ${index} vazia`}
            >
              <span className="absolute top-1 left-1 text-xs">{index}</span>
              {elementos[index]?.value}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {metodosDisponiveis.map(metodo => (
          <button 
            key={metodo.id}
            onClick={() => setMetodoAtual(metodo.id)}
            className={`p-2 rounded text-left flex items-center gap-2
              ${metodoAtual === metodo.id ? 'bg-purple-600' : 'bg-gray-700'}
              hover:bg-purple-500 transition-colors`}
            aria-label={`Selecionar método ${metodo.titulo}`}
          >
            <span role="img" aria-hidden="true">{metodo.icone}</span>
            <span>{metodo.titulo}</span>
          </button>
        ))}
      </div>

      {metodoAtual && (
        <div className="mb-6 bg-gray-800 p-4 rounded">
          <p className="text-gray-300 mb-4">
            {metodosDisponiveis.find(m => m.id === metodoAtual)?.mensagemExplicativa}
          </p>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
            {metodosDisponiveis.find(m => m.id === metodoAtual)?.requisitos.includes('valor') && (
              <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Digite um número inteiro"
                className="flex-1 bg-gray-700 p-2 rounded border-none text-white min-w-[120px]"
                aria-label="Valor para a operação (apenas números inteiros)"
              />
            )}
            
            {metodosDisponiveis.find(m => m.id === metodoAtual)?.requisitos.includes('indice') && (
              <input
                type="number"
                value={indice}
                onChange={(e) => setIndice(e.target.value)}
                placeholder="Índice"
                className="flex-1 bg-gray-700 p-2 rounded border-none text-white min-w-[120px]"
                aria-label="Índice para a operação"
              />
            )}
            
            {metodosDisponiveis.find(m => m.id === metodoAtual)?.requisitos.includes('indiceSecundario') && (
              <input
                type="number"
                value={indiceSecundario}
                onChange={(e) => setIndiceSecundario(e.target.value)}
                placeholder="Índice Final"
                className="flex-1 bg-gray-700 p-2 rounded border-none text-white min-w-[120px]"
                aria-label="Índice final para a operação"
              />
            )}

            <button 
              onClick={executarMetodo}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white transition-colors"
              aria-label={`Executar ${metodosDisponiveis.find(m => m.id === metodoAtual)?.titulo}`}
            >
              Executar
            </button>
          </div>
        </div>
      )}

      {mensagemAcao && (
        <div className="mb-6 bg-gray-800 p-3 rounded">
          <p 
            className={mensagemAcao.startsWith('Erro') ? 'text-red-400' : 'text-green-400'}
            role="alert"
          >
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
          <span className="text-blue-400">Capacidade:</span>
          <span>{capacidade}</span>
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
            <div 
              key={index}
              className="bg-gray-700 p-2 rounded"
            >
              {op.operacao} {new Date(op.timestamp).toLocaleTimeString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoVetor;