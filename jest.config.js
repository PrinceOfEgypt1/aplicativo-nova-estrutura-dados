// jest.config.ts
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    roots: ['<rootDir>/src'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Expressão regular corrigida
    transform: {
        '^.+\\.[tj]sx?$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.json',
            },
        ],
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!src/pages/**/*.tsx',
        '!src/components/DataStructures/*/*.tsx',
        '!src/constants/**/*.ts',
        '!src/context/**/*.tsx',
        '!src/setupTests.ts',
        '!src/reportWebVitals.ts',
        '!src/react-app-env.d.ts',
        '!src/types/**/*.d.ts',
        '!src/**/index.ts',
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: './coverage',
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './reports',
                filename: 'report.html',
                expand: true,
            },
        ],
    ],
};