/**
 * Testes para o componente NoListaLigada
 */

import { render, screen } from '@testing-library/react';
import NoListaLigada from './NoListaLigada';

describe('NoListaLigada', () => {
  it('deve renderizar o valor e o índice corretamente', () => {
    render(
      <NoListaLigada
        value={42}
        indice={1}
        destacado={false}
        isCabeca={false}
        isUltimo={false}
      />
    );

    expect(screen.getByTestId('node-cell-1')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
