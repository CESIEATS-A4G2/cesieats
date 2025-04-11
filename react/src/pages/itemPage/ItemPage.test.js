import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ItemPage from './ItemPage';
import api from '../../api';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../components/header/Header', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header mocké</div>
}));

jest.mock('../../components/footer/SiteFooter', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-footer">Footer mocké</div>
}));

jest.mock('../../api', () => {
  const mockApi = {
    getOrderByStatus: jest.fn().mockResolvedValue({ data: [] }),
    getItem: jest.fn((restaurantId, itemId) => {
      if (restaurantId === "123" && itemId === "456") {
        return Promise.resolve({
          data: {
            name: 'Sushi Deluxe',
            price: '14.99',
            description: 'Un assortiment de sushis haut de gamme',
            image: '/img/sushi.jpg',
            optionsLabel: 'Accompagnements',
            options: ['Wasabi', 'Gingembre', 'Sauce soja'],
          },
        });
      }
      if (restaurantId === "123" && itemId === "999") {
        return Promise.resolve({
          data: {
            name: 'Sushi Simple',
            price: '10.99',
            description: 'Sushi sans options',
            image: '/img/sushi-simple.jpg',
            optionsLabel: 'Accompagnements',
            options: [],
          },
        });
      }
      return Promise.reject(new Error('Item non trouvé'));
    }),
    getMenu: jest.fn().mockResolvedValue({ data: {} }),
    addItemToCart: jest.fn(),
    addMenuToCart: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockApi,
  };
});

const renderWithPath = (path) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/restaurant/:restaurantId/:type/:itemId" element={<ItemPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ItemPage', () => {
  test('affiche les infos du produit', async () => {
    renderWithPath('/restaurant/123/items/456');

    expect(await screen.findByText('Sushi Deluxe')).toBeInTheDocument();
    expect(screen.getByText('14.99')).toBeInTheDocument();
    expect(screen.getByText(/haut de gamme/i)).toBeInTheDocument();
  });

  test('affiche les options si elles existent', async () => {
    renderWithPath('/restaurant/123/items/456');

    expect(await screen.findByText('Accompagnements')).toBeInTheDocument();
    expect(screen.getByText('Wasabi')).toBeInTheDocument();
    expect(screen.getByText('Gingembre')).toBeInTheDocument();
    expect(screen.getByText('Sauce soja')).toBeInTheDocument();
  });

  test('ne plante pas si aucune option n’est fournie', async () => {
    renderWithPath('/restaurant/123/items/999');

    expect(await screen.findByText('Sushi Simple')).toBeInTheDocument();
    expect(screen.queryByText('Accompagnements')).not.toBeInTheDocument();
  });

  test('clique sur retour appelle navigate(-1)', async () => {
    renderWithPath('/restaurant/123/items/456');

    expect(await screen.findByText(/← Retour/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/← Retour/i));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('affiche le bouton Ajouter au panier', async () => {
    renderWithPath('/restaurant/123/items/456');

    expect(await screen.findByText(/Ajouter au panier/i)).toBeInTheDocument();
  });
});
