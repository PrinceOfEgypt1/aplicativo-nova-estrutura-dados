/**
 * Testes para o componente QueueCell
 *
 * @remarks
 * Suite de testes para validar a renderiza��o e comportamento do componente QueueCell
 */

import { render, screen } from '@testing-library/react';
import QueueCell from './QueueCell';

describe('QueueCell', () => {
  /**
   * Testes de renderiza��o b�sica
   */
  describe('Renderiza��o', () => {
    it('deve renderizar o valor e o �ndice corretamente', () => {
      render(
        <QueueCell
          value={42}
          indice={1}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      expect(screen.getByTestId('queue-cell-1')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('deve renderizar c�lula com valor negativo', () => {
      render(
        <QueueCell
          value={-10}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      expect(screen.getByText('-10')).toBeInTheDocument();
    });

    it('deve renderizar c�lula com valor zero', () => {
      render(
        <QueueCell
          value={0}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveTextContent('0');
    });
  });

  /**
   * Testes de estado destacado
   */
  describe('Estado destacado', () => {
    it('deve aplicar classes de destaque quando destacado=true', () => {
      render(
        <QueueCell
          value={10}
          indice={0}
          destacado={true}
          isFrente={false}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveClass('ring-4', 'ring-yellow-400', 'shadow-lg', 'scale-105');
    });

    it('n�o deve aplicar classes de destaque quando destacado=false', () => {
      render(
        <QueueCell
          value={10}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).not.toHaveClass('ring-4');
      expect(cell).not.toHaveClass('ring-yellow-400');
    });
  });

  /**
   * Testes de indicador de frente
   */
  describe('Indicador de frente', () => {
    it('deve exibir indicador FRENTE quando isFrente=true', () => {
      render(
        <QueueCell
          value={10}
          indice={0}
          destacado={false}
          isFrente={true}
          isFinal={false}
        />
      );

      expect(screen.getByText('FRENTE')).toBeInTheDocument();
    });

    it('n�o deve exibir indicador FRENTE quando isFrente=false', () => {
      render(
        <QueueCell
          value={10}
          indice={1}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      expect(screen.queryByText('FRENTE')).not.toBeInTheDocument();
    });

    it('deve aplicar classes especiais para frente', () => {
      render(
        <QueueCell
          value={10}
          indice={0}
          destacado={false}
          isFrente={true}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveClass('ring-2', 'ring-green-400', 'font-bold');
    });
  });

  /**
   * Testes de indicador de final
   */
  describe('Indicador de final', () => {
    it('deve exibir indicador FINAL quando isFinal=true e n�o � frente', () => {
      render(
        <QueueCell
          value={10}
          indice={2}
          destacado={false}
          isFrente={false}
          isFinal={true}
        />
      );

      expect(screen.getByText('FINAL')).toBeInTheDocument();
    });

    it('n�o deve exibir indicador FINAL quando isFinal=false', () => {
      render(
        <QueueCell
          value={10}
          indice={1}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      expect(screen.queryByText('FINAL')).not.toBeInTheDocument();
    });

    it('deve aplicar classes especiais para final', () => {
      render(
        <QueueCell
          value={10}
          indice={2}
          destacado={false}
          isFrente={false}
          isFinal={true}
        />
      );

      const cell = screen.getByTestId('queue-cell-2');
      expect(cell).toHaveClass('ring-2', 'ring-purple-400', 'font-bold');
    });

    it('n�o deve exibir FINAL quando � frente E final (fila com 1 elemento)', () => {
      render(
        <QueueCell
          value={42}
          indice={0}
          destacado={false}
          isFrente={true}
          isFinal={true}
        />
      );

      expect(screen.getByText('FRENTE')).toBeInTheDocument();
      expect(screen.queryByText('FINAL')).not.toBeInTheDocument();
    });
  });

  /**
   * Testes de acessibilidade
   */
  describe('Acessibilidade', () => {
    it('deve ter aria-label correto sem ser frente nem final', () => {
      render(
        <QueueCell
          value={42}
          indice={1}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-1');
      expect(cell).toHaveAttribute('aria-label', 'Elemento 1, valor 42');
    });

    it('deve ter aria-label correto indicando frente', () => {
      render(
        <QueueCell
          value={99}
          indice={0}
          destacado={false}
          isFrente={true}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveAttribute('aria-label', 'Elemento 0, valor 99 (frente)');
    });

    it('deve ter aria-label correto indicando final', () => {
      render(
        <QueueCell
          value={77}
          indice={3}
          destacado={false}
          isFrente={false}
          isFinal={true}
        />
      );

      const cell = screen.getByTestId('queue-cell-3');
      expect(cell).toHaveAttribute('aria-label', 'Elemento 3, valor 77 (final)');
    });

    it('deve ter aria-label correto indicando frente e final', () => {
      render(
        <QueueCell
          value={100}
          indice={0}
          destacado={false}
          isFrente={true}
          isFinal={true}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveAttribute('aria-label', 'Elemento 0, valor 100 (frente) (final)');
    });

    it('deve ter role listitem', () => {
      render(
        <QueueCell
          value={10}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveAttribute('role', 'listitem');
    });
  });

  /**
   * Testes de estilos visuais
   */
  describe('Estilos visuais', () => {
    it('deve ter classes de cor azul para fila', () => {
      render(
        <QueueCell
          value={10}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveClass('bg-blue-600', 'hover:bg-blue-500');
    });

    it('deve ter transi��o suave', () => {
      render(
        <QueueCell
          value={10}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveClass('transition-all', 'duration-300');
    });

    it('deve ter largura m�nima e altura apropriadas', () => {
      render(
        <QueueCell
          value={10}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveClass('min-w-[80px]', 'h-16');
    });
  });

  /**
   * Testes de combina��es de estado
   */
  describe('Combina��es de estado', () => {
    it('deve renderizar corretamente quando destacado E frente', () => {
      render(
        <QueueCell
          value={42}
          indice={0}
          destacado={true}
          isFrente={true}
          isFinal={false}
        />
      );

      const cell = screen.getByTestId('queue-cell-0');
      expect(cell).toHaveClass('ring-4', 'ring-yellow-400'); // Destacado
      expect(cell).toHaveClass('ring-2', 'ring-green-400'); // Frente
      expect(screen.getByText('FRENTE')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('deve renderizar corretamente quando destacado E final', () => {
      render(
        <QueueCell
          value={99}
          indice={5}
          destacado={true}
          isFrente={false}
          isFinal={true}
        />
      );

      const cell = screen.getByTestId('queue-cell-5');
      expect(cell).toHaveClass('ring-4', 'ring-yellow-400'); // Destacado
      expect(cell).toHaveClass('ring-2', 'ring-purple-400'); // Final
      expect(screen.getByText('FINAL')).toBeInTheDocument();
    });

    it('deve renderizar �ndices diferentes corretamente', () => {
      const { rerender } = render(
        <QueueCell
          value={10}
          indice={0}
          destacado={false}
          isFrente={true}
          isFinal={false}
        />
      );

      expect(screen.getByTestId('queue-cell-0')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();

      rerender(
        <QueueCell
          value={20}
          indice={5}
          destacado={false}
          isFrente={false}
          isFinal={true}
        />
      );

      expect(screen.getByTestId('queue-cell-5')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('FINAL')).toBeInTheDocument();
    });
  });

  /**
   * Testes de valores extremos
   */
  describe('Valores extremos', () => {
    it('deve renderizar valor m�ximo permitido', () => {
      render(
        <QueueCell
          value={1000}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('deve renderizar valor m�nimo permitido', () => {
      render(
        <QueueCell
          value={-1000}
          indice={0}
          destacado={false}
          isFrente={false}
          isFinal={false}
        />
      );

      expect(screen.getByText('-1000')).toBeInTheDocument();
    });

    it('deve renderizar com �ndice alto', () => {
      render(
        <QueueCell
          value={42}
          indice={19}
          destacado={false}
          isFrente={false}
          isFinal={true}
        />
      );

      expect(screen.getByTestId('queue-cell-19')).toBeInTheDocument();
      expect(screen.getByText('19')).toBeInTheDocument();
    });
  });
});
