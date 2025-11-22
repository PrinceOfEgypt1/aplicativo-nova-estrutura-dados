import React, { useState } from "react";
import { useGrafo } from "./useGrafo";

/**
 * Componente para visualizar e interagir com Grafo
 */
export function VisualizacaoGrafo() {
  const {
    adicionarVertice,
    removerVertice,
    adicionarAresta,
    removerAresta,
    buscaProfundidade,
    buscaLargura,
    limpar,
    info,
    mensagem,
    erro,
  } = useGrafo(false); // Grafo não-direcionado

  const [inputVertice, setInputVertice] = useState("");
  const [inputOrigem, setInputOrigem] = useState("");
  const [inputDestino, setInputDestino] = useState("");
  const [inputPeso, setInputPeso] = useState("1");
  const [inputBusca, setInputBusca] = useState("");

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Grafo</h2>

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

      {/* Visualização do Grafo */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Estrutura do Grafo
        </h3>
        {info.vertices.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Grafo vazio - Adicione vértices para começar
          </div>
        ) : (
          <div className="space-y-2">
            {info.vertices.map((v) => {
              const vizinhos = info.arestas
                .filter((a) => a[0] === v)
                .map((a) => a[1]);
              return (
                <div
                  key={v}
                  className="flex items-center p-2 bg-white border rounded"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    {v}
                  </div>
                  <div className="ml-4 flex-1">
                    {vizinhos.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">’</span>
                        {vizinhos.map((viz, idx) => (
                          <span key={idx}>
                            <span className="inline-flex w-8 h-8 rounded-full bg-green-500 text-white items-center justify-center text-sm">
                              {viz}
                            </span>
                            {idx < vizinhos.length - 1 && (
                              <span className="mx-1">,</span>
                            )}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Sem conexões</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 p-3 bg-white border rounded">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="font-semibold">Vértices:</span> {info.vertices.length}
            </div>
            <div>
              <span className="font-semibold">Arestas:</span> {info.arestas.length}
            </div>
            <div>
              <span className="font-semibold">Tipo:</span>{" "}
              {info.direcionado ? "Direcionado" : "Não-direcionado"}
            </div>
            <div>
              <span className="font-semibold">Densidade:</span>{" "}
              {(info.densidade * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="space-y-4">
        {/* Vértices */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">
            Gerenciar Vértices
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputVertice}
              onChange={(e) => setInputVertice(e.target.value)}
              placeholder="Vértice (0-99)"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <button
              onClick={() => {
                const v = parseInt(inputVertice);
                if (!isNaN(v)) {
                  adicionarVertice(v);
                  setInputVertice("");
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Adicionar
            </button>
            <button
              onClick={() => {
                const v = parseInt(inputVertice);
                if (!isNaN(v)) {
                  removerVertice(v);
                  setInputVertice("");
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remover
            </button>
          </div>
        </div>

        {/* Arestas */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-green-800">
            Gerenciar Arestas
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputOrigem}
              onChange={(e) => setInputOrigem(e.target.value)}
              placeholder="Origem"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              value={inputDestino}
              onChange={(e) => setInputDestino(e.target.value)}
              placeholder="Destino"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              value={inputPeso}
              onChange={(e) => setInputPeso(e.target.value)}
              placeholder="Peso"
              className="w-20 px-3 py-2 border rounded-md"
            />
            <button
              onClick={() => {
                const orig = parseInt(inputOrigem);
                const dest = parseInt(inputDestino);
                const peso = parseInt(inputPeso);
                if (!isNaN(orig) && !isNaN(dest)) {
                  adicionarAresta(orig, dest, peso);
                  setInputOrigem("");
                  setInputDestino("");
                }
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Adicionar
            </button>
            <button
              onClick={() => {
                const orig = parseInt(inputOrigem);
                const dest = parseInt(inputDestino);
                if (!isNaN(orig) && !isNaN(dest)) {
                  removerAresta(orig, dest);
                  setInputOrigem("");
                  setInputDestino("");
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remover
            </button>
          </div>
        </div>

        {/* Buscas */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-purple-800">
            Algoritmos de Busca
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputBusca}
              onChange={(e) => setInputBusca(e.target.value)}
              placeholder="Vértice inicial"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <button
              onClick={() => {
                const v = parseInt(inputBusca);
                if (!isNaN(v)) buscaProfundidade(v);
              }}
              disabled={info.vertices.length === 0}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
            >
              DFS (Profundidade)
            </button>
            <button
              onClick={() => {
                const v = parseInt(inputBusca);
                if (!isNaN(v)) buscaLargura(v);
              }}
              disabled={info.vertices.length === 0}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
            >
              BFS (Largura)
            </button>
            <button
              onClick={limpar}
              disabled={info.vertices.length === 0}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Informações */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">
          9 Características do Grafo
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Vértices:</strong> Nós do grafo (0-99)
          </li>
          <li>
            <strong>Arestas:</strong> Conexões entre vértices
          </li>
          <li>
            <strong>DFS:</strong> Busca em profundidade (stack)
          </li>
          <li>
            <strong>BFS:</strong> Busca em largura (queue)
          </li>
          <li>
            <strong>Peso:</strong> Valor da aresta (-100 a 100)
          </li>
        </ul>
      </div>
    </div>
  );
}
