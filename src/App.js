import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import MenuPage from './components/MenuPage';
import ReservePage from './components/ReservePage';
import OrderPage from './components/OrderPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path = "/"         element = {<HomePage />} />
        <Route path = "/about"    element = {<AboutPage />} />
        <Route path = "/menu"     element = {<MenuPage />} />
        <Route path = "/reserve"  element = {<ReservePage />} />
        <Route path = "/order"    element = {<OrderPage />} />
        <Route path = "/login"    element = {<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
