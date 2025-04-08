import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ItemPage from './ItemPage';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockState = {
  name: 'Sushi Deluxe',
  price: '14.99',
  description: 'Un assortiment de sushis haut de gamme',
  image: '/img/sushi.jpg',
  optionsLabel: 'Accompagnements',
  options: ['Wasabi', 'Gingembre', 'Sauce soja'],
};

const renderWithRouterState = (state = mockState) => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/item', state }]}>
      <Routes>
        <Route path="/item" element={<ItemPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ItemPage', () => {
  test('affiche les infos du produit', () => {
    renderWithRouterState();

    expect(screen.getByText('Sushi Deluxe')).toBeInTheDocument();
    expect(screen.getByText('14.99')).toBeInTheDocument();
    expect(screen.getByText(/haut de gamme/i)).toBeInTheDocument();
  });

  test('affiche les options si elles existent', () => {
    renderWithRouterState();

    expect(screen.getByText('Accompagnements')).toBeInTheDocument();
    expect(screen.getByText('Wasabi')).toBeInTheDocument();
    expect(screen.getByText('Gingembre')).toBeInTheDocument();
    expect(screen.getByText('Sauce soja')).toBeInTheDocument();
  });

  test('ne plante pas si aucune option n’est fournie', () => {
    renderWithRouterState({
      ...mockState,
      options: [],
    });

    expect(screen.queryByText('Accompagnements')).not.toBeInTheDocument();
  });

  test('clique sur retour appelle navigate(-1)', () => {
    renderWithRouterState();
    const btnRetour = screen.getByText(/← Retour/i);
    fireEvent.click(btnRetour);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('affiche le bouton Ajouter au panier', () => {
    renderWithRouterState();
    expect(screen.getByText(/Ajouter au panier/i)).toBeInTheDocument();
  });
});
