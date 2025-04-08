import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConnexionMenu from './ConnexionMenu';
import { BrowserRouter } from 'react-router-dom';

// Mock du useNavigate
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('ConnexionMenu', () => {
  test('affiche le formulaire', () => {
    render(<BrowserRouter><ConnexionMenu /></BrowserRouter>);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
  });

  test('soumission du formulaire renvoie automatiquement à "/home"', () => {
    render(<BrowserRouter><ConnexionMenu /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@email.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
      target: { value: 'motdepasse' },
    });
    fireEvent.click(screen.getByText(/Se connecter/i));
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  test('le lien inscription existe', () => {
    render(<BrowserRouter><ConnexionMenu /></BrowserRouter>);
    const link = screen.getByText(/Inscription/i);
    expect(link.closest('a')).toHaveAttribute('href', '/inscription');
  });

  /*

  test('ne redirige pas en cas de non-saisie', () => {
    render(<BrowserRouter><ConnexionMenu /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), { //pas de mail entré
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText(/Se connecter/i));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('ne redirige pas si mauvaise saisie', () => {
    render(<BrowserRouter><ConnexionMenu /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'mauvaisemail' }, // pas un format email
    });

    fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText(/Se connecter/i));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  */
});
