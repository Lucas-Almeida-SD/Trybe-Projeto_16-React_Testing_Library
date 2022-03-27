import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testes do componente "About"', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/this application simulates a pokédex/i)).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type,/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
