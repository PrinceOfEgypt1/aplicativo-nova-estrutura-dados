import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Usar ts-jest para suportar TypeScript
  testEnvironment: 'jsdom', // Definir jsdom como ambiente de teste
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Configurar o arquivo de setup
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Atalho para resolver caminhos com "@/"
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Mock de estilos
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json' // Garantir uso do arquivo de configuração do TypeScript
      }
    ]
  }
};

export default config;
