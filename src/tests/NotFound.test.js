import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente "NotFound"', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not '
  + 'found 😭', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent('Page requested not found 😭');
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    const pikachuImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(pikachuImg).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
