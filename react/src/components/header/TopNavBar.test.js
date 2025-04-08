import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopNavBar from './TopNavBar';

const mockNavigate = jest.fn();

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock Panier & BurgerMenu pour simplifier
jest.mock('../../pages/panier/Panier', () => ({ isOpen }) => (
  isOpen ? <div data-testid="mock-panier">Panier ouvert</div> : null
));

jest.mock('../burgerMenu/BurgerMenu', () => ({ isOpen }) => (
  isOpen ? <div data-testid="mock-burger">Menu ouvert</div> : null
));

// Mock TopNavBarMobile (test ne doit pas le rendre en mobile)
jest.mock('./TopNavBarMobile', () => () => <div data-testid="mobile-navbar">MobileNav</div>);

describe('TopNavBar', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // desktop
    });
  });

  test('affiche la navbar desktop', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('mobile-navbar')).not.toBeInTheDocument();
    expect(screen.getByText(/Panier • 1/i)).toBeInTheDocument();
  });

  test('ouvre le BurgerMenu au clic sur l’icône menu', () => {
    const { container } = render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );
  
    const menuIcon = container.querySelector('.hambIcon');
    fireEvent.click(menuIcon);
  
    expect(screen.getByTestId('mock-burger')).toBeInTheDocument();
  });

  test('ouvre le Panier au clic sur le texte Panier', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Panier • 1/i));
    expect(screen.getByTestId('mock-panier')).toBeInTheDocument();
  });

  test('clique sur le logo redirige vers /home', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('bannerLogo');
    fireEvent.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});
