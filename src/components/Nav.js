import './Nav.css';
import logo from '../logo.png';

function Nav() {
  const rickrollURL         = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const logoAlt             = "Little Lemon";
  return (
    <>
      <nav        className = "top-nav">
        <figure   className = "top-logo-figure">
          <img    className = "top-logo-img"      src = {logo}    alt = {logoAlt} />
        </figure>
        <a        className = "top-nav-link home-link"            href = {rickrollURL}>
          
        </a>
        <a        className = "top-nav-link about-link"           href = {rickrollURL}>

        </a>
        <a        className = "top-nav-link menu-link"            href = {rickrollURL}>

        </a>
        <a        className = "top-nav-link reserve-link"         href = {rickrollURL}>

        </a>
        <a        className = "top-nav-link order-link"           href = {rickrollURL}>

        </a>
        <a        className = "top-nav-link login-link"           href = {rickrollURL}>

        </a>
      </nav>      
    </>
  );
}

export default Nav;