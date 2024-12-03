
import { render, screen } from '@testing-library/react';
import VectorCell from './VectorCell';
describe('VectorCell', () => {
    test('renderiza o valor e o índice corretamente', () => {
        render(<VectorCell value={5} indice={2} destacado={false} />);
        expect(screen.getByTestId('vector-cell-2')).toBeInTheDocument(); // Usando data-testid
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
      });


      test('aplica a classe de destaque quando destacado=true', () => {
        render(<VectorCell value={10} indice={0} destacado={true} />);
        expect(screen.getByTestId('vector-cell-0')).toHaveClass('ring-2', 'ring-blue-400');
      });


      test('renderiza com classe de fundo diferente quando value é undefined', () => {
        render(<VectorCell value={undefined} indice={1} destacado={false} />);
        expect(screen.getByTestId('vector-cell-1')).toHaveClass('bg-gray-700');
    });
});