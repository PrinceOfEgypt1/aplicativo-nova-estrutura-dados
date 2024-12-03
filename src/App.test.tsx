// src/App.test.tsx
import { TextEncoder, TextDecoder } from 'util'; // Polyfill para Node.js
globalThis.TextEncoder = TextEncoder as any;
globalThis.TextDecoder = TextDecoder as any;

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import App from './App';
import '@testing-library/jest-dom';
import { AppProvider } from './context/AppProvider';
import { DataStructureProvider } from './context/DataStructureContext';

test('renderiza o componente App sem erros', () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <DataStructureProvider>
          <App />
        </DataStructureProvider>
      </AppProvider>
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /Estruturas de Dados Interativas/i, level: 1 })
  ).toBeInTheDocument();
});

test('renderiza o Breadcrumbs e navega para a página inicial', async () => {
  render(
    <MemoryRouter initialEntries={['/estrutura/vetor']}>
      <AppProvider>
        <DataStructureProvider>
          <App />
        </DataStructureProvider>
      </AppProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /Estruturas de Dados Interativas/i, level: 1 })
  ).toBeInTheDocument();
});
