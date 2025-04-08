// Panier.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Panier from './Panier';

describe('Panier', () => {
  test('affiche les items si ouvert', () => {
    render(<Panier isOpen={true} onClose={() => {}} />);

    expect(screen.getByText(/Votre Panier/i)).toBeInTheDocument();
    expect(screen.getByText(/6 CHICKEN McNUGGETS/i)).toBeInTheDocument();
    expect(screen.getByText(/DOUBLE CHEESE/i)).toBeInTheDocument();
  });

  test('cache les items si fermé', () => {
    const { container } = render(<Panier isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  test('fermeture automatisée au retour', () => {
    const onCloseMock = jest.fn();
    render(<Panier isOpen={true} onClose={onCloseMock} />);

    const retourBtn = screen.getByText(/Retour/i);
    fireEvent.click(retourBtn);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
