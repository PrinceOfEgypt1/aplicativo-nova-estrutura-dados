/**
 * Testes para o componente StackCell
 *
 * @remarks
 * Suite de testes para validar a renderização e comportamento do componente StackCell
 */

import { render, screen } from '@testing-library/react';
import StackCell from './StackCell';

describe('StackCell', () => {
  /**
   * Testes de renderização básica
   */
  describe('Renderização', () => {
    it('deve renderizar o valor e o índice corretamente', () => {
      render(<StackCell value={42} indice={1} destacado={false} isTopo={false} />);

      expect(screen.getByTestId('stack-cell-1')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('deve renderizar célula com valor negativo', () => {
      render(<StackCell value={-10} indice={0} destacado={false} isTopo={false} />);

      expect(screen.getByText('-10')).toBeInTheDocument();
    });

    it('deve renderizar célula com valor zero', () => {
      render(<StackCell value={0} indice={0} destacado={false} isTopo={false} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  /**
   * Testes de estado destacado
   */
  describe('Estado destacado', () => {
    it('deve aplicar classes de destaque quando destacado=true', () => {
      render(<StackCell value={10} indice={0} destacado={true} isTopo={false} />);

      const cell = screen.getByTestId('stack-cell-0');
      expect(cell).toHaveClass('ring-4', 'ring-yellow-400', 'shadow-lg', 'scale-105');
    });

    it('não deve aplicar classes de destaque quando destacado=false', () => {
      render(<StackCell value={10} indice={0} destacado={false} isTopo={false} />);

      const cell = screen.getByTestId('stack-cell-0');
      expect(cell).not.toHaveClass('ring-4');
      expect(cell).not.toHaveClass('ring-yellow-400');
    });
  });

  /**
   * Testes de indicador de topo
   */
  describe('Indicador de topo', () => {
    it('deve exibir indicador TOPO quando isTopo=true', () => {
      render(<StackCell value={10} indice={2} destacado={false} isTopo={true} />);

      expect(screen.getByText('TOPO')).toBeInTheDocument();
    });

    it('não deve exibir indicador TOPO quando isTopo=false', () => {
      render(<StackCell value={10} indice={1} destacado={false} isTopo={false} />);

      expect(screen.queryByText('TOPO')).not.toBeInTheDocument();
    });

    it('deve aplicar classes especiais para topo', () => {
      render(<StackCell value={10} indice={0} destacado={false} isTopo={true} />);

      const cell = screen.getByTestId('stack-cell-0');
      expect(cell).toHaveClass('ring-2', 'ring-blue-400', 'font-bold');
    });
  });

  /**
   * Testes de acessibilidade
   */
  describe('Acessibilidade', () => {
    it('deve ter aria-label correto sem ser topo', () => {
      render(<StackCell value={42} indice={1} destacado={false} isTopo={false} />);

      const cell = screen.getByTestId('stack-cell-1');
      expect(cell).toHaveAttribute('aria-label', 'Elemento 1, valor 42');
    });

    it('deve ter aria-label correto indicando topo', () => {
      render(<StackCell value={99} indice={3} destacado={false} isTopo={true} />);

      const cell = screen.getByTestId('stack-cell-3');
      expect(cell).toHaveAttribute('aria-label', 'Elemento 3, valor 99 (topo)');
    });

    it('deve ter role listitem', () => {
      render(<StackCell value={10} indice={0} destacado={false} isTopo={false} />);

      const cell = screen.getByTestId('stack-cell-0');
      expect(cell).toHaveAttribute('role', 'listitem');
    });
  });

  /**
   * Testes de estilos visuais
   */
  describe('Estilos visuais', () => {
    it('deve ter classes de cor rose para pilha', () => {
      render(<StackCell value={10} indice={0} destacado={false} isTopo={false} />);

      const cell = screen.getByTestId('stack-cell-0');
      expect(cell).toHaveClass('bg-rose-600', 'hover:bg-rose-500');
    });

    it('deve ter transição suave', () => {
      render(<StackCell value={10} indice={0} destacado={false} isTopo={false} />);

      const cell = screen.getByTestId('stack-cell-0');
      expect(cell).toHaveClass('transition-all', 'duration-300');
    });

    it('deve ter altura e largura apropriadas', () => {
      render(<StackCell value={10} indice={0} destacado={false} isTopo={false} />);

      const cell = screen.getByTestId('stack-cell-0');
      expect(cell).toHaveClass('w-full', 'h-14');
    });
  });

  /**
   * Testes de combinações de estado
   */
  describe('Combinações de estado', () => {
    it('deve renderizar corretamente quando destacado E topo', () => {
      render(<StackCell value={42} indice={0} destacado={true} isTopo={true} />);

      const cell = screen.getByTestId('stack-cell-0');
      expect(cell).toHaveClass('ring-4', 'ring-yellow-400'); // Destacado
      expect(cell).toHaveClass('ring-2', 'ring-blue-400'); // Topo
      expect(screen.getByText('TOPO')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('deve renderizar índices diferentes corretamente', () => {
      const { rerender } = render(
        <StackCell value={10} indice={0} destacado={false} isTopo={false} />
      );

      expect(screen.getByTestId('stack-cell-0')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();

      rerender(<StackCell value={20} indice={5} destacado={false} isTopo={true} />);

      expect(screen.getByTestId('stack-cell-5')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('TOPO')).toBeInTheDocument();
    });
  });

  /**
   * Testes de valores extremos
   */
  describe('Valores extremos', () => {
    it('deve renderizar valor máximo permitido', () => {
      render(<StackCell value={1000} indice={0} destacado={false} isTopo={false} />);

      expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('deve renderizar valor mínimo permitido', () => {
      render(<StackCell value={-1000} indice={0} destacado={false} isTopo={false} />);

      expect(screen.getByText('-1000')).toBeInTheDocument();
    });

    it('deve renderizar com índice alto', () => {
      render(<StackCell value={42} indice={19} destacado={false} isTopo={true} />);

      expect(screen.getByTestId('stack-cell-19')).toBeInTheDocument();
      expect(screen.getByText('19')).toBeInTheDocument();
    });
  });
});
