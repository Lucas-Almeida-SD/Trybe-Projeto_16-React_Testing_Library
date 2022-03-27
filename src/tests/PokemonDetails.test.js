import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';
import pokemons from '../data';
import App from '../App';

describe('Testes do componente PokemonDetails', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são '
  + 'mostradas na tela.', () => {
    const alakazam = pokemons.find((e) => e.name === 'Alakazam');
    const match = { params: { id: alakazam.id } };

    // Renderiza o pokémon Alakazam
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 65: true } }
      match={ match }
    />);

    expect(screen.getByRole('heading', { name: /alakazam details/i }))
      .toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'More details' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' }))
      .toBeInTheDocument();
    expect(screen.getByText(alakazam.summary)).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações '
  + 'do pokémon', () => {
    const alakazam = pokemons.find((e) => e.name === 'Alakazam');
    const match = { params: { id: alakazam.id } };

    // Renderiza o pokémon Alakazam
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 65: true } }
      match={ match }
    />);

    const gameLoacationH2 = screen
      .getByRole('heading', { level: 2, name: `Game Locations of ${alakazam.name}` });
    expect(gameLoacationH2).toBeInTheDocument();

    for (let index = 0; index < alakazam.foundAt.length; index += 1) {
      const locationName = screen.getByText(`${alakazam.foundAt[index].location}`);
      const locationImg = screen.getByRole('img', { name: `${alakazam.name} location` });
      expect(locationName).toBeInTheDocument();
      expect(locationImg).toBeInTheDocument();
      expect(locationImg).toHaveProperty('src', alakazam.foundAt[index].map);
      expect(locationImg).toHaveProperty('alt', `${alakazam.name} location`);
    }
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de '
  + 'detalhes.', () => {
    renderWithRouter(<App />);

    localStorage.clear();
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    const pokemon = pokemons[0];

    let markedAsFavorite = screen
      .queryByRole('img', { name: `${pokemon.name} is marked as favorite` });
    const favoriteLabelCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(markedAsFavorite).not.toBeInTheDocument();
    expect(favoriteLabelCheckbox).toBeInTheDocument();

    userEvent.click(favoriteLabelCheckbox);
    markedAsFavorite = screen
      .queryByRole('img', { name: `${pokemon.name} is marked as favorite` });
    expect(markedAsFavorite).toBeInTheDocument();

    userEvent.click(favoriteLabelCheckbox);
    markedAsFavorite = screen
      .queryByRole('img', { name: `${pokemon.name} is marked as favorite` });
    expect(markedAsFavorite).not.toBeInTheDocument();
  });
});
