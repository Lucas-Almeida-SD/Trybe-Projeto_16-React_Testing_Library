import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Generations', () => {
  test('Teste se a aplicação possui um link com o texto "Generations"', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: 'Generations' })).toBeInTheDocument();
  });

  test('Teste se ao clicar no link "Generations", a URL deve ser "/generations" '
  + 'e deverá conter uma tag h2 com o texto "Generations" na página', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Generations' }));
    const generationsH2 = screen.getByRole('heading', { level: 2, name: 'Generations' });
    expect(generationsH2).toBeInTheDocument();
    expect(history.location.pathname).toBe('/generations');
  });
});
