import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

// Mock du useNavigate
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

test('affiche les informations', () => {
  render(
    <MemoryRouter>
      <ProductCard
        name="Sushi"
        price="12.99"
        image="/sushi.png"
        description="Un délicieux plateau de sushis"
        optionsLabel="Choix"
        options={["Wasabi", "Gingembre"]}
      />
    </MemoryRouter>
  );

  expect(screen.getByText('Sushi')).toBeInTheDocument();
  expect(screen.getByText('12.99')).toBeInTheDocument();
});

test('navigue vers la page item avec les bonnes données au clic', () => {
  render(
    <MemoryRouter>
      <ProductCard
        name="Sushi"
        price="12.99"
        image="/sushi.png"
        description="Un délicieux plateau de sushis"
        optionsLabel="Choix"
        options={["Wasabi", "Gingembre"]}
      />
    </MemoryRouter>
  );

  const card = screen.getByText('Sushi');
  fireEvent.click(card);

  expect(mockNavigate).toHaveBeenCalledWith('/restaurant/item', {
    state: {
      name: 'Sushi',
      price: '12.99',
      image: '/sushi.png',
      description: 'Un délicieux plateau de sushis',
      optionsLabel: 'Choix',
      options: ['Wasabi', 'Gingembre'],
    },
  });
});
