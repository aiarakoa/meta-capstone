//import renderer from 'react-test-renderer';
import {screen, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import LemonLink from './components/LemonLink';
import {Routes, Route, Router} from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import MenuPage from './components/MenuPage';
import ReservePage from './components/ReservePage';
import OrderPage from './components/OrderPage';
import LoginPage from './components/LoginPage';

describe("Routing", () => {
  render(
    <Router>
      <Routes>
        <Route path = "/"         element = {<HomePage />} />
        <Route path = "/about"    element = {<AboutPage />} />
        <Route path = "/menu"     element = {<MenuPage />} />
        <Route path = "/reserve"  element = {<ReservePage />} />
        <Route path = "/order"    element = {<OrderPage />} />
        <Route path = "/login"    element = {<LoginPage />} />
      </Routes>
      <nav>
        <LemonLink linkLocation = 'header'        linkType = 'home'     url = '' />
        <LemonLink linkLocation = 'header'        linkType = 'about'    url = 'about' />
        <LemonLink linkLocation = 'header'        linkType = 'menu'     url = 'menu' />
        <LemonLink linkLocation = 'header'        linkType = 'reserve'  url = 'reserve' />
        <LemonLink linkLocation = 'header'        linkType = 'order'    url = 'order' />
        <LemonLink linkLocation = 'header'        linkType = 'login'    url = 'login' />
      </nav>
    </Router>
  );
  const links               =   screen.getAllByRole('link');
  const homeLink            =   links[0];
  const reserveLink         =   links[3];

  it('Renders the home page when Home link is clicked', () => {
    fireEvent.click(homeLink);
    expect(screen.getByText(/Testimonials/i)).toBeInTheDocument()
  });

  it('Renders the reserve page when Reserve link is clicked', () => {
    fireEvent.click(reserveLink);
    expect(screen.getByText(/Please enter how many guests are expected/i)).toBeInTheDocument()
  });
});