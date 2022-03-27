import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testes do componente "Pokemon"', () => {
  test('Teste se é renderizado um card com as informações de '
  + 'determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveProperty('alt', 'Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação '
  + 'para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, '
  + 'onde <id> é o id do Pokémon exibido;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokemonDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetailsLink).toBeInTheDocument();
    userEvent.click(pokemonDetailsLink);
    expect(pokemonDetailsLink.href).toContain('pokemons/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento '
  + 'da aplicação para a página de detalhes de Pokémon. Teste também se a URL exibida '
  + 'no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes '
  + 'se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    expect(screen.getByRole('heading', { name: /pikachu details/i }));
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favoriteImgIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImgIcon).toBeInTheDocument();
    expect(favoriteImgIcon.src).toContain('/star-icon.svg');
  });
});
