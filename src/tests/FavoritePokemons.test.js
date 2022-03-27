import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testes do componente FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa '
  + 'não tiver pokémons favoritos.', () => {
    localStorage.clear();
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    let moreDeatils = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDeatils);
    let favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    userEvent.click(homeLink);
    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);
    moreDeatils = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDeatils);
    favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    userEvent.click(favoritePokemonsLink);

    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(2);
  });
});
