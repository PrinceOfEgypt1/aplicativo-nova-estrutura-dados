// src/errors/errorHandlers.ts
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Erro da resposta da API
    return error.response.data.message || 'Erro na resposta do servidor';
  } else if (error.request) {
    // Erro na requisição
    return 'Não foi possível conectar ao servidor';
  } else {
    // Outros erros
    return error.message || 'Ocorreu um erro inesperado';
  }
};

export const logError = (error: Error, context?: string) => {
  console.error(`[${context || 'App'}] Error:`, error);
};