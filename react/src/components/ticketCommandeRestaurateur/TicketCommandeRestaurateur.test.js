import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketCommandeRestaurateur from './TicketCommandeRestaurateur';
import TicketCommandePreteRestaurateur from './TicketCommandePreteRestaurateur';

// Mock du useNavigate
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('TicketCommandePreteRestaurateur', () => {

    test('affiche les infos de commande', () => {
        render(<TicketCommandeRestaurateur />);
        expect(screen.getByText('Emilie N')).toBeInTheDocument();
        expect(screen.getByText(/Prête en/i)).toBeInTheDocument();
        expect(screen.getByText(/10 min/i)).toBeInTheDocument();
    });

    test('affiche les infos du client et du temps', () => {
        render(<BrowserRouter>
            <TicketCommandePreteRestaurateur nom="Jean B" temps="5 min" />
        </BrowserRouter>);

        expect(screen.getByText('Jean B')).toBeInTheDocument();
        expect(screen.getByText(/Prête depuis/i)).toBeInTheDocument();
        expect(screen.getByText(/5 min/)).toBeInTheDocument();
    });

    test('affiche un autre label si type = "en attente"', () => {
        render(<BrowserRouter>
            <TicketCommandePreteRestaurateur nom="Alice" temps="12 min" type="en attente" />
        </BrowserRouter>);

        expect(screen.getByText(/Temps de préparation/i)).toBeInTheDocument();
    });

    test('navigue vers la page de gestion avec les bonnes infos', () => {
        render(<BrowserRouter>
            <TicketCommandePreteRestaurateur nom="Emma" temps="7 min" type="prete" />
        </BrowserRouter>);

        fireEvent.click(screen.getByText('Emma'));

        expect(mockNavigate).toHaveBeenCalledWith('/gestioncommande-restaurateur', {
            state: {
                nomClient: 'Emma',
                duree: '7 min',
                type: 'prete'
            }
        });
    });
});
