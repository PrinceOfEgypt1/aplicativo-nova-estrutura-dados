// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Configuração dos plugins - necessário para trabalhar com React
  plugins: [react()],

  // Configuração de resolução de caminhos
  resolve: {
    alias: {
      // Permite usar o alias '@' para referenciar a pasta src
      // Isso simplifica as importações nos componentes
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Configuração do servidor de desenvolvimento
  server: {
    // Define a porta padrão como 3000
    port: 3000,
    // Abre automaticamente o navegador quando o servidor inicia
    open: true,
    // Permite acesso externo ao servidor de desenvolvimento
    host: true,
  },

  // Configuração de build para produção
  build: {
    // Define o diretório de saída para os arquivos compilados
    outDir: 'dist',
    // Gera source maps para melhor depuração
    sourcemap: true,
    // Configurações específicas para módulos CommonJS
    commonjsOptions: {
      // Array vazio para includes - pode ser expandido conforme necessidade
      include: [],
    },
  },
})