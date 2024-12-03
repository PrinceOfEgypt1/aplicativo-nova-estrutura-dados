// jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/src'], // Define a pasta raiz onde o Jest procura por testes
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Padrão para encontrar arquivos de teste
  testPathIgnorePatterns: [ // Ignora pastas específicas
    "<rootDir>/backups/",
    "/node_modules/",
  ],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**", // exclui node modules do coverage
    "!**/vendor/**", // exclui a pasta vendor, se houver
    "!src/pages/*.tsx",
    "!src/components/DataStructures/*/*.tsx",
    "!src/constants/*.ts",
    "!src/context/*.tsx",
    "!src/setupTests.ts",
    "!src/reportWebVitals.ts",
    "!src/react-app-env.d.ts",
    "!src/types/*.d.ts",
    "!src/**/index.ts",
  ],
  coverageDirectory: './coverage', // pasta onde será gerado o coverage
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // reportes para gerar o coverage
  collectCoverage: true,
  reporters: [ /* ... (sem alterações) */ ],
};

export default config;
