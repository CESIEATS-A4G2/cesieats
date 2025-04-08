import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InscriptionMenu from './InscriptionMenu';
import { BrowserRouter } from 'react-router-dom';

// Mock du useNavigate
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('InscriptionMenu', () => {
  test('affiche le formulaire', () => {
    render(<BrowserRouter><InscriptionMenu /></BrowserRouter>);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Mot de passe/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirmez le mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
  });

  test('soumission du formulaire redirige vers "/home"', () => {
    render(<BrowserRouter><InscriptionMenu /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@email.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^Mot de passe$/i), {
      target: { value: 'motdepasse' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirmez le mot de passe/i), {
      target: { value: 'motdepasse' },
    });
    fireEvent.click(screen.getByText(/Enregistrer/i));

    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  test('le lien vers Connexion existe', () => {
    render(<BrowserRouter><InscriptionMenu /></BrowserRouter>);
    const link = screen.getByText(/Connexion/i);
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  /*

  test('ne redirige pas si champ email manquant', () => {
    render(<BrowserRouter><InscriptionMenu /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText(/^Mot de passe$/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirmez le mot de passe/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText(/Enregistrer/i));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('ne redirige pas si email mal formé', () => {
    render(<BrowserRouter><InscriptionMenu /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'mauvaismail' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^Mot de passe$/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirmez le mot de passe/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText(/Enregistrer/i));

    expect(mockNavigate).not.toHaveBeenCalled();
  });*/
});
