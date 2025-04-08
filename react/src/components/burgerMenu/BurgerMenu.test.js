import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BurgerMenu from './BurgerMenu';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
const mockOnClose = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('BurgerMenu', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockOnClose.mockClear();
  });

  test('ne s’affiche pas si isOpen = false', () => {
    const { container } = render(<BurgerMenu isOpen={false} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  test('s\'affiche si isOpen = true', () => {
    render(
      <BrowserRouter>
        <BurgerMenu isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Aurélien/i)).toBeInTheDocument();
    expect(screen.getByText(/Gérer le compte/i)).toBeInTheDocument();
    expect(screen.getByText(/Commandes/i)).toBeInTheDocument();
    expect(screen.getByText(/Parrainage/i)).toBeInTheDocument();
  });

  test('clique en dehors ferme le menu', () => {
    render(
      <BrowserRouter>
        <BurgerMenu isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    );

    fireEvent.mouseDown(document.body); // simulate click outside
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('clic sur "Gérer le compte" ferme le menu et redirige', () => {
    render(
      <BrowserRouter>
        <BurgerMenu isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Gérer le compte/i));
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/mon-compte');
  });

  test('clic sur "Commandes" redirige vers historique', () => {
    render(
      <BrowserRouter>
        <BurgerMenu isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Commandes/i));
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/historique-commande');
  });

  test('clic sur "Parrainage" redirige vers parrainage', () => {
    render(
      <BrowserRouter>
        <BurgerMenu isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Parrainage/i));
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/parrainage');
  });
});
