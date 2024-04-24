//import renderer from 'react-test-renderer';
//import {screen, render, fireEvent, waitFor} from '@testing-library/react';
import {screen, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import LemonLink from './components/LemonLink';
import {Routes, Route, MemoryRouter} from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import MenuPage from './components/MenuPage';
import ReservePage from './components/ReservePage';
import OrderPage from './components/OrderPage';
import LoginPage from './components/LoginPage';
//import { createMemoryHistory } from 'history';
//import userEvent from '@testing-library/user-event'

describe("Routing", () => {
//  const history               =   createMemoryHistory();
  render(
//    <MemoryRouter location={history.location} navigator={history}>
    <MemoryRouter initialEntries={['/']}>
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
    </MemoryRouter>
  );
  const links               =   screen.getAllByRole('link');
//  const homeLink            =   links[12];
  const reserveLink         =   links[15];

  it('is BOOOOORIIIIIING', () => {
    // screen.debug(undefined, null);
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
  });
/*
  it('Renders the home page when Home link is clicked', async () => {
    // screen.debug(undefined, null);
    fireEvent.click(homeLink);
    await waitFor(() => expect(history.location.pathname).toEqual('/'));
    await screen.findByText('Testimonials');
    // screen.debug(undefined, null);
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
  });
*/
  it('Renders the reserve page when Reserve link is clicked', async () => {
    // screen.debug(undefined, null);
//    console.log(reserveLink.getAttribute('href'));
//    const user              =   userEvent.setup();
    fireEvent.click(reserveLink);
//    await user.click(reserveLink);
//    await waitFor(() => expect(history.location.pathname).toEqual('/reserve'));
    // screen.debug(undefined, null);
//    await waitFor(() => expect(screen.getByText('Table details')).toBeInTheDocument());
    const details           =   await screen.findByText('Table details');
    expect(details).toBeInTheDocument();
  });
});

