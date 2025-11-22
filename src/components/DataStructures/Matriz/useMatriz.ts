import { useState, useCallback, useMemo } from "react";
import { Matriz } from "./matriz";
import { obterEstatisticas } from "./metodosMatriz";

/**
 * Hook personalizado para gerenciar uma Matriz
 *
 * @param linhasIniciais - Número inicial de linhas (padrão: 3)
 * @param colunasIniciais - Número inicial de colunas (padrão: 3)
 * @returns Objeto contendo a matriz e métodos para manipulá-la
 */
export function useMatriz(linhasIniciais: number = 3, colunasIniciais: number = 3) {
  const [matriz, setMatriz] = useState(() => new Matriz(linhasIniciais, colunasIniciais));
  const [versao, setVersao] = useState(0);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Força re-render quando a matriz muda
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
   * Define um valor em uma posição específica
   */
  const definir = useCallback(
    (linha: number, coluna: number, valor: number) => {
      try {
        matriz.definir(linha, coluna, valor);
        atualizarEstado();
        mostrarMensagem(`Valor ${valor} definido em [${linha}][${coluna}]`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao definir valor",
          true
        );
      }
    },
    [matriz, atualizarEstado, mostrarMensagem]
  );

  /**
   * Obtém um valor de uma posição específica
   */
  const obter = useCallback(
    (linha: number, coluna: number) => {
      try {
        return matriz.obter(linha, coluna);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao obter valor",
          true
        );
        return null;
      }
    },
    [matriz, mostrarMensagem]
  );

  /**
   * Preenche toda a matriz com um valor
   */
  const preencher = useCallback(
    (valor: number) => {
      try {
        matriz.preencher(valor);
        atualizarEstado();
        mostrarMensagem(`Matriz preenchida com ${valor}`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao preencher",
          true
        );
      }
    },
    [matriz, atualizarEstado, mostrarMensagem]
  );

  /**
   * Preenche uma linha específica
   */
  const preencherLinha = useCallback(
    (linha: number, valor: number) => {
      try {
        matriz.preencherLinha(linha, valor);
        atualizarEstado();
        mostrarMensagem(`Linha ${linha} preenchida com ${valor}`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao preencher linha",
          true
        );
      }
    },
    [matriz, atualizarEstado, mostrarMensagem]
  );

  /**
   * Preenche uma coluna específica
   */
  const preencherColuna = useCallback(
    (coluna: number, valor: number) => {
      try {
        matriz.preencherColuna(coluna, valor);
        atualizarEstado();
        mostrarMensagem(`Coluna ${coluna} preenchida com ${valor}`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao preencher coluna",
          true
        );
      }
    },
    [matriz, atualizarEstado, mostrarMensagem]
  );

  /**
   * Transpõe a matriz
   */
  const transpor = useCallback(() => {
    try {
      const transposta = matriz.transpor();
      setMatriz(transposta);
      atualizarEstado();
      mostrarMensagem("Matriz transposta com sucesso");
    } catch (e) {
      mostrarMensagem(
        e instanceof Error ? e.message : "Erro ao transpor",
        true
      );
    }
  }, [matriz, atualizarEstado, mostrarMensagem]);

  /**
   * Multiplica a matriz por um escalar
   */
  const multiplicarPorEscalar = useCallback(
    (escalar: number) => {
      try {
        const resultado = matriz.multiplicarPorEscalar(escalar);
        setMatriz(resultado);
        atualizarEstado();
        mostrarMensagem(`Matriz multiplicada por ${escalar}`);
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao multiplicar",
          true
        );
      }
    },
    [matriz, atualizarEstado, mostrarMensagem]
  );

  /**
   * Limpa a matriz (preenche com zeros)
   */
  const limpar = useCallback(() => {
    matriz.limpar();
    atualizarEstado();
    mostrarMensagem("Matriz limpa");
  }, [matriz, atualizarEstado, mostrarMensagem]);

  /**
   * Redimensiona a matriz (cria uma nova)
   */
  const redimensionar = useCallback(
    (novasLinhas: number, novasColunas: number) => {
      try {
        const novaMatriz = new Matriz(novasLinhas, novasColunas);
        setMatriz(novaMatriz);
        atualizarEstado();
        mostrarMensagem(
          `Matriz redimensionada para ${novasLinhas}×${novasColunas}`
        );
      } catch (e) {
        mostrarMensagem(
          e instanceof Error ? e.message : "Erro ao redimensionar",
          true
        );
      }
    },
    [atualizarEstado, mostrarMensagem]
  );

  // Cálculos derivados
  const info = useMemo(() => {
    const stats = obterEstatisticas(matriz);
    const dados = matriz.paraArray();

    return {
      ...stats,
      dados,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versao, matriz]);

  return {
    // Métodos de manipulação
    definir,
    obter,
    preencher,
    preencherLinha,
    preencherColuna,
    transpor,
    multiplicarPorEscalar,
    limpar,
    redimensionar,

    // Informações da matriz
    info,
    mensagem,
    erro,

    // Acesso direto à matriz
    matriz,
  };
}
