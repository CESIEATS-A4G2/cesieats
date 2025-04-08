import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PanierItem from './PanierItem';

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

  test('supprime l’item correctement', () => {
    const { container } = render(<PanierItem {...props} />);
    const trashDiv = container.querySelector('.remove-icon');
    fireEvent.click(trashDiv);
    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });
  
});
