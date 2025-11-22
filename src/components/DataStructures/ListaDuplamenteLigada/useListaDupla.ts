import { useState, useCallback, useMemo } from "react";
import { ListaDuplamenteLigada, NoDuplo } from "./listaDupla";
import { formatarLista, obterEstatisticas } from "./metodosListaDupla";

/**
 * Representa um nó para visualização
 */
export interface NoVisual {
  valor: number;
  indice: number;
  isHead: boolean;
  isTail: boolean;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Hook personalizado para gerenciar uma Lista Duplamente Ligada
 *
 * @returns Objeto contendo a lista e métodos para manipulá-la
 */
export function useListaDupla() {
  const [lista] = useState(() => new ListaDuplamenteLigada());
  const [versao, setVersao] = useState(0);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Força re-render quando a lista muda
  const atualizarEstado = useCallback(() => {
    setVersao((v) => v + 1);
  }, []);

  // Limpa mensagens após um tempo
  const mostrarMensagem = useCallback((msg: string, isErro = false) => {
    if (isErro) {
      setErro(msg);
      setMensagem(null);
    } else {
      setMensagem(msg);
      setErro(null);
    }
    setTimeout(() => {
      setMensagem(null);
      setErro(null);
    }, 3000);
  }, []);

  /**
   * Insere um valor no início da lista
   */
  const inserirNoInicio = useCallback(
    (valor: number) => {
      try {
        lista.inserirNoInicio(valor);
        atualizarEstado();
        mostrarMensagem(`Valor ${valor} inserido no início`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao inserir",
          true
        );
      }
    },
    [lista, atualizarEstado, mostrarMensagem]
  );

  /**
   * Insere um valor no fim da lista
   */
  const inserirNoFim = useCallback(
    (valor: number) => {
      try {
        lista.inserirNoFim(valor);
        atualizarEstado();
        mostrarMensagem(`Valor ${valor} inserido no fim`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao inserir",
          true
        );
      }
    },
    [lista, atualizarEstado, mostrarMensagem]
  );

  /**
   * Insere um valor em uma posição específica
   */
  const inserirNaPosicao = useCallback(
    (indice: number, valor: number) => {
      try {
        lista.inserirNaPosicao(indice, valor);
        atualizarEstado();
        mostrarMensagem(`Valor ${valor} inserido na posição ${indice}`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao inserir",
          true
        );
      }
    },
    [lista, atualizarEstado, mostrarMensagem]
  );

  /**
   * Remove o primeiro elemento da lista
   */
  const removerDoInicio = useCallback(() => {
    try {
      const valor = lista.removerDoInicio();
      atualizarEstado();
      mostrarMensagem(`Valor ${valor} removido do início`);
      return valor;
    } catch (e) {
      mostrarMensagem(
        e instanceof Error ? e.message : "Erro ao remover",
        true
      );
      return null;
    }
  }, [lista, atualizarEstado, mostrarMensagem]);

  /**
   * Remove o último elemento da lista
   */
  const removerDoFim = useCallback(() => {
    try {
      const valor = lista.removerDoFim();
      atualizarEstado();
      mostrarMensagem(`Valor ${valor} removido do fim`);
      return valor;
    } catch (e) {
      mostrarMensagem(
        e instanceof Error ? e.message : "Erro ao remover",
        true
      );
      return null;
    }
  }, [lista, atualizarEstado, mostrarMensagem]);

  /**
   * Remove um elemento de uma posição específica
   */
  const removerDaPosicao = useCallback(
    (indice: number) => {
      try {
        const valor = lista.removerDaPosicao(indice);
        atualizarEstado();
        mostrarMensagem(`Valor ${valor} removido da posição ${indice}`);
        return valor;
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao remover",
          true
        );
        return null;
      }
    },
    [lista, atualizarEstado, mostrarMensagem]
  );

  /**
   * Busca um valor na lista
   */
  const buscar = useCallback(
    (valor: number) => {
      try {
        const indice = lista.buscar(valor);
        if (indice === -1) {
          mostrarMensagem(`Valor ${valor} não encontrado`);
        } else {
          mostrarMensagem(`Valor ${valor} encontrado na posição ${indice}`);
        }
        return indice;
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao buscar",
          true
        );
        return -1;
      }
    },
    [lista, mostrarMensagem]
  );

  /**
   * Obtém o valor de um elemento por índice
   */
  const obterPorIndice = useCallback(
    (indice: number) => {
      try {
        const valor = lista.obterPorIndice(indice);
        mostrarMensagem(`Valor na posição ${indice}: ${valor}`);
        return valor;
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao obter valor",
          true
        );
        return null;
      }
    },
    [lista, mostrarMensagem]
  );

  /**
   * Atualiza o valor de um elemento por índice
   */
  const atualizar = useCallback(
    (indice: number, valor: number) => {
      try {
        lista.atualizar(indice, valor);
        atualizarEstado();
        mostrarMensagem(`Posição ${indice} atualizada para ${valor}`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao atualizar",
          true
        );
      }
    },
    [lista, atualizarEstado, mostrarMensagem]
  );

  /**
   * Inverte a ordem dos elementos da lista
   */
  const inverter = useCallback(() => {
    try {
      lista.inverter();
      atualizarEstado();
      mostrarMensagem("Lista invertida com sucesso");
    } catch (e) {
      mostrarMensagem(
        e instanceof Error ? e.message : "Erro ao inverter",
        true
      );
    }
  }, [lista, atualizarEstado, mostrarMensagem]);

  /**
   * Limpa todos os elementos da lista
   */
  const limpar = useCallback(() => {
    lista.limpar();
    atualizarEstado();
    mostrarMensagem("Lista limpa");
  }, [lista, atualizarEstado, mostrarMensagem]);

  /**
   * Retorna o primeiro elemento sem removê-lo
   */
  const obterPrimeiro = useCallback(() => {
    try {
      return lista.obterPrimeiro();
    } catch (e) {
      return null;
    }
  }, [lista]);

  /**
   * Retorna o último elemento sem removê-lo
   */
  const obterUltimo = useCallback(() => {
    try {
      return lista.obterUltimo();
    } catch (e) {
      return null;
    }
  }, [lista]);

  // Cálculos derivados usando useMemo para evitar recalcular em cada render
  const info = useMemo(() => {
    const elementos = lista.paraArray();
    const stats = obterEstatisticas(lista);

    return {
      elementos,
      tamanho: lista.tamanho(),
      estaVazia: lista.estaVazia(),
      representacao: formatarLista(lista),
      primeiro: obterPrimeiro(),
      ultimo: obterUltimo(),
      ...stats,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versao, lista]);

  /**
   * Converte a lista em nós visuais para renderização
   */
  const nosVisuais = useMemo((): NoVisual[] => {
    if (lista.estaVazia()) {
      return [];
    }

    const elementos = lista.paraArray();
    const tamanho = lista.tamanho();

    return elementos.map((valor, indice) => ({
      valor,
      indice,
      isHead: indice === 0,
      isTail: indice === tamanho - 1,
      hasNext: indice < tamanho - 1,
      hasPrev: indice > 0,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versao, lista]);

  return {
    // Métodos de manipulação
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
    obterPrimeiro,
    obterUltimo,

    // Informações da lista
    info,
    nosVisuais,
    mensagem,
    erro,

    // Acesso direto à lista (use com cuidado)
    lista,
  };
}
