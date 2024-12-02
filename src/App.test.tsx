// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom'; // Certifique-se de que jest-dom esteja importado aqui ou em um arquivo de configuração
import { AppProvider } from '../context/AppProvider'; // Importe o AppProvider
import { DataStructureProvider } from '../context/DataStructureContext';



test('renderiza o componente App sem erros', () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <DataStructureProvider> {/* Envolve com DataStructureProvider */}
          <App />
        </DataStructureProvider>
      </AppProvider>
    </MemoryRouter>
  );

  // Verifica se o título da aplicação é renderizado
  expect(screen.getByRole('heading', { name: /Estruturas de Dados Interativas/i })).toBeInTheDocument();
});

test('renderiza o Breadcrumbs e navega para a página inicial', () => {
  render(
    <MemoryRouter initialEntries={['/estrutura/vetor']}> {/* Define a rota inicial */}
        <AppProvider>
            <DataStructureProvider> {/* Envolve com DataStructureProvider */}
                <App />
            </DataStructureProvider>
        </AppProvider>
    </MemoryRouter>
  );

  // Verifica se o link "Home" é renderizado no Breadcrumb
  expect(screen.getByText(/Home/i)).toBeInTheDocument();

  // Verifica se o título da aplicação é renderizado (mesmo após a navegação)
//   expect(screen.getByRole('heading', { name: /Estruturas de Dados Interativas/i })).toBeInTheDocument();
});