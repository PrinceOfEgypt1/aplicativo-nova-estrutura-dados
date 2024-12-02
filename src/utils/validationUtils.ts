// src/utils/validationUtils.ts

export function validarNumero(valor: any): { valido: boolean; valor?: number; mensagem: string } {
    if (valor === undefined || valor === null || valor.toString().trim() === '') {
      return { valido: false, mensagem: 'O valor não pode estar vazio' };
    }
  
    const numero = Number(valor);
  
    if (isNaN(numero)) {
      return { valido: false, mensagem: 'O valor deve ser um número' };
    }
  
    if (!Number.isInteger(numero)) {
      return { valido: false, mensagem: 'O valor deve ser um número inteiro' };
    }
  
    if (numero < -1000 || numero > 1000) {
      return { valido: false, mensagem: 'O valor deve estar entre -1000 e 1000' };
    }
  
    return { valido: true, valor: numero, mensagem: 'Valor válido' };
  }
  
  export function validarIndice(indice: number, tamanho: number, capacidade: number): { valido: boolean; mensagem: string } {
    if (isNaN(indice) || !Number.isInteger(indice) || indice < 0) {
      return { valido: false, mensagem: "Índice inválido" };
    }
  
    if (indice >= capacidade) {
      return { valido: false, mensagem: `Índice fora dos limites. A capacidade máxima é ${capacidade - 1}.` };
    }
  
    // Permite inserção no final do vetor se houver espaço
    if (indice > tamanho && indice !== tamanho) {
        return { valido: false, mensagem: `Índice com lacuna. Próximo índice disponível: ${tamanho}` };
    }
  
    return { valido: true, mensagem: 'Índice válido' };
  }