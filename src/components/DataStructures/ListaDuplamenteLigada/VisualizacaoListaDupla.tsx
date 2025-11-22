import React, { useState } from "react";
import { useListaDupla } from "./useListaDupla";

/**
 * Componente para visualizar e interagir com Lista Duplamente Ligada
 */
export function VisualizacaoListaDupla() {
  const {
    inserirNoInicio,
    inserirNoFim,
    inserirNaPosicao,
    removerDoInicio,
    removerDoFim,
    removerDaPosicao,
    buscar,
    obterPorIndice,
    atualizar,
    inverter,
    limpar,
    info,
    nosVisuais,
    mensagem,
    erro,
  } = useListaDupla();

  const [inputValor, setInputValor] = useState("");
  const [inputIndice, setInputIndice] = useState("");
  const [inputBusca, setInputBusca] = useState("");
  const [inputAtualizarIndice, setInputAtualizarIndice] = useState("");
  const [inputAtualizarValor, setInputAtualizarValor] = useState("");

  const handleInserirInicio = () => {
    const valor = parseInt(inputValor);
    if (!isNaN(valor)) {
      inserirNoInicio(valor);
      setInputValor("");
    }
  };

  const handleInserirFim = () => {
    const valor = parseInt(inputValor);
    if (!isNaN(valor)) {
      inserirNoFim(valor);
      setInputValor("");
    }
  };

  const handleInserirPosicao = () => {
    const valor = parseInt(inputValor);
    const indice = parseInt(inputIndice);
    if (!isNaN(valor) && !isNaN(indice)) {
      inserirNaPosicao(indice, valor);
      setInputValor("");
      setInputIndice("");
    }
  };

  const handleBuscar = () => {
    const valor = parseInt(inputBusca);
    if (!isNaN(valor)) {
      buscar(valor);
    }
  };

  const handleAtualizar = () => {
    const indice = parseInt(inputAtualizarIndice);
    const valor = parseInt(inputAtualizarValor);
    if (!isNaN(indice) && !isNaN(valor)) {
      atualizar(indice, valor);
      setInputAtualizarIndice("");
      setInputAtualizarValor("");
    }
  };

  const handleObterPorIndice = () => {
    const indice = parseInt(inputAtualizarIndice);
    if (!isNaN(indice)) {
      obterPorIndice(indice);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Lista Duplamente Ligada
      </h2>

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

      {/* VisualizaÁ„o da Lista */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          VisualizaÁ„o
        </h3>
        {info.estaVazia ? (
          <div className="text-center text-gray-500 py-8">
            Lista vazia - Insira elementos para comeÁar
          </div>
        ) : (
          <div className="flex items-center justify-start overflow-x-auto pb-4">
            <div className="flex items-center space-x-2">
              {nosVisuais.map((no, idx) => (
                <React.Fragment key={idx}>
                  {/* NÛ */}
                  <div className="flex flex-col items-center">
                    {/* Indicador de CabeÁa/Cauda */}
                    <div className="h-6 mb-1">
                      {no.isHead && (
                        <span className="text-xs font-semibold text-blue-600">
                          HEAD
                        </span>
                      )}
                      {no.isTail && (
                        <span className="text-xs font-semibold text-green-600">
                          TAIL
                        </span>
                      )}
                    </div>

                    {/* Caixa do NÛ */}
                    <div
                      className={`
                        border-2 rounded-lg p-3 min-w-[80px] text-center
                        ${no.isHead ? "border-blue-500 bg-blue-50" : ""}
                        ${no.isTail ? "border-green-500 bg-green-50" : ""}
                        ${!no.isHead && !no.isTail ? "border-gray-400 bg-white" : ""}
                      `}
                    >
                      <div className="font-bold text-lg">{no.valor}</div>
                      <div className="text-xs text-gray-500">
                        Ìndice: {no.indice}
                      </div>
                    </div>

                    {/* Setas de navegaÁ„o */}
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{no.hasPrev ? "ê" : " "}</span>
                      <span className="mx-1">prev/next</span>
                      <span>{no.hasNext ? "í" : " "}</span>
                    </div>
                  </div>

                  {/* Setas Bidirecionais entre nÛs */}
                  {no.hasNext && (
                    <div className="flex flex-col items-center mx-2">
                      <div className="text-2xl text-gray-400">ƒ</div>
                      <div className="text-xs text-gray-400">dupla</div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* InformaÁıes da Lista */}
        <div className="mt-4 p-3 bg-white border border-gray-200 rounded">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="font-semibold">Tamanho:</span> {info.tamanho}
            </div>
            <div>
              <span className="font-semibold">Primeiro:</span>{" "}
              {info.primeiro ?? "N/A"}
            </div>
            <div>
              <span className="font-semibold">⁄ltimo:</span>{" "}
              {info.ultimo ?? "N/A"}
            </div>
            <div>
              <span className="font-semibold">Status:</span>{" "}
              {info.estaVazia ? "Vazia" : "Com elementos"}
            </div>
          </div>
          {!info.estaVazia && (
            <div className="mt-2 text-sm">
              <span className="font-semibold">Array:</span> [{info.elementos.join(", ")}]
            </div>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="space-y-4">
        {/* Inserir */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">
            Inserir Elemento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <input
                type="number"
                value={inputValor}
                onChange={(e) => setInputValor(e.target.value)}
                placeholder="Valor (-1000 a 1000)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleInserirInicio}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Inserir no InÌcio
                </button>
                <button
                  onClick={handleInserirFim}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Inserir no Fim
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={inputIndice}
                  onChange={(e) => setInputIndice(e.target.value)}
                  placeholder="Õndice"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  value={inputValor}
                  onChange={(e) => setInputValor(e.target.value)}
                  placeholder="Valor"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleInserirPosicao}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Inserir na PosiÁ„o
              </button>
            </div>
          </div>
        </div>

        {/* Remover */}
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-red-800">
            Remover Elemento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <button
              onClick={removerDoInicio}
              disabled={info.estaVazia}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Remover do InÌcio
            </button>
            <button
              onClick={removerDoFim}
              disabled={info.estaVazia}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Remover do Fim
            </button>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputIndice}
                onChange={(e) => setInputIndice(e.target.value)}
                placeholder="Õndice"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => {
                  const indice = parseInt(inputIndice);
                  if (!isNaN(indice)) {
                    removerDaPosicao(indice);
                    setInputIndice("");
                  }
                }}
                disabled={info.estaVazia}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Remover
              </button>
            </div>
          </div>
        </div>

        {/* Buscar e Atualizar */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-green-800">
            Buscar e Atualizar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex gap-2">
              <input
                type="number"
                value={inputBusca}
                onChange={(e) => setInputBusca(e.target.value)}
                placeholder="Valor para buscar"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleBuscar}
                disabled={info.estaVazia}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Buscar
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputAtualizarIndice}
                onChange={(e) => setInputAtualizarIndice(e.target.value)}
                placeholder="Õndice"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                value={inputAtualizarValor}
                onChange={(e) => setInputAtualizarValor(e.target.value)}
                placeholder="Novo Valor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleAtualizar}
                disabled={info.estaVazia}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>

        {/* OperaÁıes Especiais */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-purple-800">
            OperaÁıes Especiais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button
              onClick={inverter}
              disabled={info.tamanho <= 1}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Inverter Lista
            </button>
            <button
              onClick={limpar}
              disabled={info.estaVazia}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Limpar Lista
            </button>
          </div>
        </div>
      </div>

      {/* EstatÌsticas */}
      {!info.estaVazia && info.min !== null && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            EstatÌsticas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="font-semibold">MÌnimo:</span> {info.min}
            </div>
            <div>
              <span className="font-semibold">M·ximo:</span> {info.max}
            </div>
            <div>
              <span className="font-semibold">Soma:</span> {info.soma}
            </div>
            <div>
              <span className="font-semibold">MÈdia:</span>{" "}
              {info.media?.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* InformaÁıes Adicionais */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">
          9 CaracterÌsticas da Lista Duplamente Ligada
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>NavegaÁ„o Bidirecional:</strong> Cada nÛ tem referÍncia para
            o prÛximo E anterior
          </li>
          <li>
            <strong>InserÁ„o/RemoÁ„o no InÌcio:</strong> O(1) - muito eficiente
          </li>
          <li>
            <strong>InserÁ„o/RemoÁ„o no Fim:</strong> O(1) - graÁas ao ponteiro
            de cauda
          </li>
          <li>
            <strong>Busca por Õndice:</strong> O(n/2) - pode buscar da cabeÁa ou
            cauda
          </li>
          <li>
            <strong>Vantagem:</strong> RemoÁ„o e navegaÁ„o reversa mais
            eficientes
          </li>
          <li>
            <strong>Desvantagem:</strong> Usa mais memÛria (2 ponteiros por nÛ)
          </li>
        </ul>
      </div>
    </div>
  );
}
