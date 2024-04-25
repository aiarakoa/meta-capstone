import {screen, render} from '@testing-library/react';
import React from 'react';
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
import userEvent from '@testing-library/user-event'

describe("Routing", () => {
  it('Goes back to home page when Home link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
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
    const homeLink            =   links[0];

    const userPuppet        =   userEvent.setup();
    await userPuppet.click(homeLink);
    expect(await screen.findByText("This Week's Specials!")).toBeInTheDocument();
  });

  it('Renders the reserve page when Reserve link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
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
    const reserveLink         =   links[3];

    const userPuppet        =   userEvent.setup();
    await userPuppet.click(reserveLink);
    expect(await screen.findByText('Table details')).toBeInTheDocument();
  });
});

