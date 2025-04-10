import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PanierItem from './PanierItem';

beforeAll(() => {
  window.alert = jest.fn(); // Mock pour éviter l’erreur
});

jest.mock('../../api', () => ({
  __esModule: true,
  default: {
    getOrderByStatus: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          price: "20",
          deliveryTime: "10",
          distance: "8.7",
          restaurantAddress: "25 Avenue du McDo, 13290 Aix",
          deliveryAddress: "280 Avenue du Bidule, 13290 Aix"
        },
        // ajoute 4 autres objets ici pour avoir 5 commandes
        { id: 2, price: "18", deliveryTime: "15", distance: "5.5", restaurantAddress: "", deliveryAddress: "" },
        { id: 3, price: "22", deliveryTime: "8", distance: "7.1", restaurantAddress: "", deliveryAddress: "" },
        { id: 4, price: "19", deliveryTime: "12", distance: "6.3", restaurantAddress: "", deliveryAddress: "" },
        { id: 5, price: "21", deliveryTime: "9", distance: "9.0", restaurantAddress: "", deliveryAddress: "" },
      ]
    }),
    default: {
      deleteItemToCart: jest.fn().mockResolvedValue({}),
      deleteMenuToCart: jest.fn().mockResolvedValue({}),
      getOrderByStatus: jest.fn().mockResolvedValue({ data: [] }) // optionnel ici
    }
  }
}));

describe('PanierItem', () => {
  const mockUpdateQuantity = jest.fn();
  const mockRemoveItem = jest.fn();

  const props = {
    id: 1,
    name: "nuggies+",
    price: 14.0,
    description: "20 nuggets",
    quantity: 2,
    updateQuantity: mockUpdateQuantity,
    removeItem: mockRemoveItem
  };

  beforeEach(() => {
    mockUpdateQuantity.mockClear();
    mockRemoveItem.mockClear();
  });

  test('affichage correct des informations', () => {
    render(<PanierItem {...props} />);
    expect(screen.getByText(/nuggies+/i)).toBeInTheDocument();
    expect(screen.getByText(/20 nuggets/i)).toBeInTheDocument();
    expect(screen.getByText("28.00 $US")).toBeInTheDocument(); // Also test price mutliplication
  });

  test('incrémente la quantité', () => {
    render(<PanierItem {...props} />);
    const plusBtn = screen.getByText('+');
    fireEvent.click(plusBtn);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  test('décrémente la quantité (minimum 1)', () => {
    render(<PanierItem {...props} />);
    const moinsBtn = screen.getByText('-');
    fireEvent.click(moinsBtn);
    fireEvent.click(moinsBtn);
    fireEvent.click(moinsBtn);
    fireEvent.click(moinsBtn);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  // test('supprime l’item correctement', () => {
  //   const { container } = render(<PanierItem {...props} />);
  //   const trashDiv = container.querySelector('.remove-icon');
  //   fireEvent.click(trashDiv);
  //   expect(mockRemoveItem).toHaveBeenCalledWith(1);
  // });
  
});
