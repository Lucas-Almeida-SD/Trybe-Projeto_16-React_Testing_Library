import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Testes do componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ readFavoritePokemonIds }
      />,
    );
  });

  const nextPokemonText = 'next-pokemon';
  const pokemonNameText = 'pokemon-name';

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    expect(screen.getByRole('heading', { name: 'Encountered pokémons' }))
      .toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon '
  + 'é clicado.', () => {
    const nextBtn = screen.getByTestId(nextPokemonText);
    expect(nextBtn).toHaveTextContent('Próximo pokémon');
    for (let index = 0; index <= pokemons.length; index += 1) {
      if (index < pokemons.length) {
        expect(screen.getByTestId(pokemonNameText))
          .toHaveTextContent(pokemons[index].name);
      } else {
        expect(screen.getByTestId(pokemonNameText)).toHaveTextContent(pokemons[0].name);
      }
      userEvent.click(nextBtn);
    }
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const nextBtn = screen.getByTestId(nextPokemonText);
    expect(nextBtn).toHaveTextContent('Próximo pokémon');
    for (let index = 0; index < pokemons.length; index += 1) {
      expect(screen.getAllByTestId(pokemonNameText)).toHaveLength(1);
    }
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const pokemonTypes = pokemons.reduce((acc, e) => (
      (acc.includes(e.type) === false) ? [...acc, e.type] : acc), []);

    for (let index = 0; index < pokemonTypes.length; index += 1) {
      expect(screen.getAllByRole('button', { name: pokemonTypes[index] }))
        .toHaveLength(1);
    }
    expect(screen.getAllByTestId('pokemon-type-button'))
      .toHaveLength(pokemonTypes.length);

    const nextBtn = screen.getByTestId(nextPokemonText);
    const allBtn = screen.getByRole('button', { name: /all/i });
    for (let indexFilterBtn = 0;
      indexFilterBtn < pokemonTypes.length;
      indexFilterBtn += 1) {
      const typeBtn = screen.getByRole('button', { name: pokemonTypes[indexFilterBtn] });
      userEvent.click(typeBtn);
      for (let indexType = 0; indexType < pokemonTypes.length; indexType += 1) {
        expect(allBtn).toBeInTheDocument();
        expect(screen.getByTestId('pokemon-type'))
          .toHaveTextContent(pokemonTypes[indexFilterBtn]);
        userEvent.click(nextBtn);
      }
    }
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const nextBtn = screen.getByTestId(nextPokemonText);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toHaveTextContent('All');

    userEvent.click(allBtn);
    for (let index = 0; index < pokemons.length; index += 1) {
      expect(screen.getByTestId(pokemonNameText)).toHaveTextContent(pokemons[index].name);
      userEvent.click(nextBtn);
    }
  });
});
