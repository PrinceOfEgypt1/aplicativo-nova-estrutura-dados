import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import '@testing-library/jest-dom';
import { AppProvider } from './context/AppProvider';

const mockNavigate = jest.fn();

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <AppProvider navigate={mockNavigate}>
      {children}
    </AppProvider>
  </MemoryRouter>
);

test('renderiza o componente App sem erros', () => {
  render(<App />, { wrapper: AllTheProviders });
  expect(screen.getByRole('heading', { name: /Estruturas de Dados Interativas/i, level: 1 })).toBeInTheDocument();
});

test('renderiza o Breadcrumbs e navega para a página inicial', () => {
  render(
    <MemoryRouter initialEntries={['/estrutura/vetor']}>
      <AppProvider navigate={mockNavigate}>
        <App />
      </AppProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Estruturas de Dados Interativas/i, level: 1 })).toBeInTheDocument();
});