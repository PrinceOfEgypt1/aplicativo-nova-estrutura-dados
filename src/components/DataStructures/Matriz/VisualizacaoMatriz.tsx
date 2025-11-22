import React, { useState } from "react";
import { useMatriz } from "./useMatriz";

/**
 * Componente para visualizar e interagir com Matriz
 */
export function VisualizacaoMatriz() {
  const {
    definir,
    preencher,
    preencherLinha,
    preencherColuna,
    transpor,
    multiplicarPorEscalar,
    limpar,
    redimensionar,
    info,
    mensagem,
    erro,
  } = useMatriz(3, 3);

  const [linhaInput, setLinhaInput] = useState("");
  const [colunaInput, setColunaInput] = useState("");
  const [valorInput, setValorInput] = useState("");
  const [escalarInput, setEscalarInput] = useState("");
  const [novasLinhas, setNovasLinhas] = useState("");
  const [novasColunas, setNovasColunas] = useState("");

  const handleDefinir = () => {
    const linha = parseInt(linhaInput);
    const coluna = parseInt(colunaInput);
    const valor = parseInt(valorInput);
    if (!isNaN(linha) && !isNaN(coluna) && !isNaN(valor)) {
      definir(linha, coluna, valor);
      setValorInput("");
    }
  };

  const handlePreencher = () => {
    const valor = parseInt(valorInput);
    if (!isNaN(valor)) {
      preencher(valor);
      setValorInput("");
    }
  };

  const handlePreencherLinha = () => {
    const linha = parseInt(linhaInput);
    const valor = parseInt(valorInput);
    if (!isNaN(linha) && !isNaN(valor)) {
      preencherLinha(linha, valor);
      setValorInput("");
    }
  };

  const handlePreencherColuna = () => {
    const coluna = parseInt(colunaInput);
    const valor = parseInt(valorInput);
    if (!isNaN(coluna) && !isNaN(valor)) {
      preencherColuna(coluna, valor);
      setValorInput("");
    }
  };

  const handleMultiplicar = () => {
    const escalar = parseInt(escalarInput);
    if (!isNaN(escalar)) {
      multiplicarPorEscalar(escalar);
      setEscalarInput("");
    }
  };

  const handleRedimensionar = () => {
    const linhas = parseInt(novasLinhas);
    const colunas = parseInt(novasColunas);
    if (!isNaN(linhas) && !isNaN(colunas)) {
      redimensionar(linhas, colunas);
      setNovasLinhas("");
      setNovasColunas("");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Matriz</h2>

      {/* Mensagens */}
      {mensagem && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {mensagem}
        </div>
      )}
      {erro && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {erro}
        </div>
      )}

      {/* Visualização da Matriz */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Matriz {info.linhas}×{info.colunas}
        </h3>
        <div className="inline-block">
          {info.dados.map((linha, i) => (
            <div key={i} className="flex gap-1 mb-1">
              {linha.map((valor, j) => (
                <div
                  key={j}
                  className="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center bg-white font-semibold text-lg"
                >
                  {valor}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Informações */}
        <div className="mt-4 p-3 bg-white border border-gray-200 rounded">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="font-semibold">Dimensão:</span> {info.linhas}×
              {info.colunas}
            </div>
            <div>
              <span className="font-semibold">Elementos:</span>{" "}
              {info.totalElementos}
            </div>
            <div>
              <span className="font-semibold">Mín/Máx:</span> {info.min}/{info.max}
            </div>
            <div>
              <span className="font-semibold">Soma:</span> {info.soma}
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="space-y-4">
        {/* Definir Valor */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">
            Definir Valor
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={linhaInput}
              onChange={(e) => setLinhaInput(e.target.value)}
              placeholder="Linha"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              value={colunaInput}
              onChange={(e) => setColunaInput(e.target.value)}
              placeholder="Coluna"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
              placeholder="Valor"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleDefinir}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Definir
            </button>
          </div>
        </div>

        {/* Preencher */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-green-800">
            Preencher
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={valorInput}
                onChange={(e) => setValorInput(e.target.value)}
                placeholder="Valor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handlePreencher}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Tudo
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={linhaInput}
                onChange={(e) => setLinhaInput(e.target.value)}
                placeholder="Linha"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handlePreencherLinha}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Linha
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={colunaInput}
                onChange={(e) => setColunaInput(e.target.value)}
                placeholder="Coluna"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handlePreencherColuna}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Coluna
              </button>
            </div>
          </div>
        </div>

        {/* Operações */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-purple-800">
            Operações
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={transpor}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Transpor
            </button>
            <div className="flex gap-2 col-span-2">
              <input
                type="number"
                value={escalarInput}
                onChange={(e) => setEscalarInput(e.target.value)}
                placeholder="Escalar"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleMultiplicar}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Multiplicar
              </button>
            </div>
            <button
              onClick={limpar}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Redimensionar */}
        <div className="p-4 bg-orange-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-orange-800">
            Redimensionar
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={novasLinhas}
              onChange={(e) => setNovasLinhas(e.target.value)}
              placeholder="Linhas (1-10)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              value={novasColunas}
              onChange={(e) => setNovasColunas(e.target.value)}
              placeholder="Colunas (1-10)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleRedimensionar}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Redimensionar
            </button>
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">
          9 Características da Matriz
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Acesso:</strong> O(1) - acesso direto por índices
          </li>
          <li>
            <strong>Tamanho:</strong> 1 a 10 linhas e colunas
          </li>
          <li>
            <strong>Valores:</strong> Inteiros de -1000 a 1000
          </li>
          <li>
            <strong>Transpor:</strong> Troca linhas por colunas
          </li>
          <li>
            <strong>Multiplicação Escalar:</strong> Multiplica todos os elementos
          </li>
        </ul>
      </div>
    </div>
  );
}
