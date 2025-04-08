import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListeCommandesLivreur from './ListeCommandesLivreur';

// Mock de navigate
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock du composant enfant (CommandToDeliver)
jest.mock('../../components/commandToDeliver/CommandToDeliver', () => ({
  __esModule: true,
  default: ({ price, deliveryTime, distance, restaurantAddress, deliveryAddress, onClick, onDelete }) => (
    <div data-testid="commande" onClick={onClick}>
      <p>{price}€</p>
      <p>{deliveryTime} min</p>
      <p>{distance} km</p>
      <p>{restaurantAddress}</p>
      <p>{deliveryAddress}</p>
      <button onClick={onDelete}>Supprimer</button>
    </div>
  ),
}));

test('affiche les commandes avec les bonnes infos', () => {
  render(
    <MemoryRouter>
      <ListeCommandesLivreur />
    </MemoryRouter>
  );

  expect(screen.getAllByTestId('commande')).toHaveLength(5);
  expect(screen.getByText('20€')).toBeInTheDocument();
  expect(screen.getByText('10 min')).toBeInTheDocument();
  expect(screen.getByText('8.7 km')).toBeInTheDocument();
  expect(screen.getByText('25 Avenue du McDo, 13290 Aix')).toBeInTheDocument();
  expect(screen.getByText('280 Avenue du Bidule, 13290 Aix')).toBeInTheDocument();
});

test('supprime une commande après clic sur supprimer', () => {
  render(
    <MemoryRouter>
      <ListeCommandesLivreur />
    </MemoryRouter>
  );

  const commandesAvant = screen.getAllByTestId('commande');
  expect(commandesAvant).toHaveLength(5);

  const btnSupprimer = screen.getAllByText('Supprimer')[0];
  fireEvent.click(btnSupprimer);

  const commandesAprès = screen.getAllByTestId('commande');
  expect(commandesAprès).toHaveLength(4);
});

test('navigue vers la page livraison avec les bonnes infos', () => {
  render(
    <MemoryRouter>
      <ListeCommandesLivreur />
    </MemoryRouter>
  );

  const commande = screen.getAllByTestId('commande')[0];
  fireEvent.click(commande);

  expect(mockNavigate).toHaveBeenCalledWith('/livraison-livreur', expect.objectContaining({
    state: {
      command: expect.objectContaining({
        id: 1,
        price: '20',
        deliveryTime: '10',
        distance: '8.7',
        restaurantAddress: '25 Avenue du McDo, 13290 Aix',
        deliveryAddress: '280 Avenue du Bidule, 13290 Aix',
      })
    }
  }));
});
