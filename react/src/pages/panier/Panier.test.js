// Panier.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Panier from './Panier';

beforeAll(() => {
  window.alert = jest.fn(); // Mock pour éviter l’erreur
});

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { reload: jest.fn() },
  });
});


jest.mock('../../api', () => ({
  __esModule: true,
  default: {
    getCart: jest.fn().mockResolvedValue({
      data: {
        Items: [
          {
            item_id: 'ITEM001',
            name: '6 CHICKEN McNUGGETS',
            price: '6.50',
            description: 'Test item',
            Cart_Item: { quantity: 2 }
          },
          {
            item_id: 'ITEM002',
            name: 'DOUBLE CHEESE',
            price: '5.00',
            description: 'Test item',
            Cart_Item: { quantity: 1 }
          }
        ],
        Menus: []
      }
    }),
    changeQuantityToCart: jest.fn(),
    deleteItemToCart: jest.fn(),
    deleteMenuToCart: jest.fn()
  }
}));



describe('Panier', () => {
  test('affiche les items si ouvert', () => {
    render(
      <MemoryRouter>
        <Panier isOpen={true} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Votre Panier/i)).toBeInTheDocument();
    expect(screen.getByText(/6 CHICKEN McNUGGETS/i)).toBeInTheDocument();
    expect(screen.getByText(/DOUBLE CHEESE/i)).toBeInTheDocument();
  });

  test('cache les items si fermé', () => {
    const { container } = render(
      <MemoryRouter>
        <Panier isOpen={false} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  test('fermeture automatisée au retour', () => {
    const onCloseMock = jest.fn();
    render(
      <MemoryRouter>
        <Panier isOpen={true} onClose={onCloseMock} />
      </MemoryRouter>
    );
    const retourBtn = screen.getByText(/Retour/i);
    fireEvent.click(retourBtn);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
