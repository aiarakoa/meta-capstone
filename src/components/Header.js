import './Header.css';
import Nav from './Nav';
import SkipNavigationLink from './SkipNavigationLink';

function Header() {
  return (
    <>
      <header>
        <SkipNavigationLink />
        <Nav />
      </header>
    </>
  );
}

export default Header;
