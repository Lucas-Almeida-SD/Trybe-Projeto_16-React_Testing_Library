import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente "App"', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de '
  + 'navegação.', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao '
    + 'clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao '
    + 'clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, '
  + 'na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.',
  () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);
    expect(history.location.pathname).toBe('/favorites');
  });
});
