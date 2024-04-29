import './Nav.css';
import logo from '../logo.png';
import LemonLink from './LemonLink';

function Nav() {
  const logoAlt             = "Little Lemon logo";
  return (
    <>
      <nav        className = "top-nav">
        <figure   className = "top-logo-figure">
          <img    className = "top-logo-img"      src = {logo}          alt = {logoAlt} />
        </figure>
        <LemonLink linkLocation = 'header'        linkType = 'home'     url = '' />
        <LemonLink linkLocation = 'header'        linkType = 'about'    url = 'about' />
        <LemonLink linkLocation = 'header'        linkType = 'menu'     url = 'menu' />
        <LemonLink linkLocation = 'header'        linkType = 'reserve'  url = 'reserve' />
        <LemonLink linkLocation = 'header'        linkType = 'order'    url = 'order' />
        <LemonLink linkLocation = 'header'        linkType = 'login'    url = 'login' />
      </nav>
    </>
  );
}

export default Nav;