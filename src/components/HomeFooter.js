import './HomeFooter.css';
import logoWhite from '../logowhite.png';

function HomeFooter() {
  const logoWhiteAlt                        = "Little Lemon";
  const rickrollURL                         = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <>
      <footer>
        <figure>
          <img        className = "footer-image-img"                            src = {logoWhite}             alt = {logoWhiteAlt} />
        </figure>
        <section>
          <article>
            <h3>Navigation</h3>
            <a        className = "bottom-nav-link home-footer-link"            href = {rickrollURL}>
            
            </a>
            <a        className = "bottom-nav-link about-footer-link"           href = {rickrollURL}>
    
            </a>
            <a        className = "bottom-nav-link menu-footer-link"            href = {rickrollURL}>
    
            </a>
            <a        className = "bottom-nav-link reserve-footer-link"         href = {rickrollURL}>
    
            </a>
            <a        className = "bottom-nav-link order-footer-link"           href = {rickrollURL}>
    
            </a>
            <a        className = "bottom-nav-link login-footer-link"           href = {rickrollURL}>
    
            </a>
          </article>
          <article>
            <h3>Contact</h3>
            <p>Little Lemon</p>

            <p>000 Wishful Road</p>
            <p>Chicago, IL</p>

            <p>+1 312-987-6543</p>

            <p>info@lillemon.com</p>
          </article>
          <article>
            <h3>Social Media</h3>
            <a        className = "bottom-nav-link twitter-footer-link"        href = {rickrollURL}>
            
            </a>
            <a        className = "bottom-nav-link instagram-footer-link"      href = {rickrollURL}>
    
            </a>
            <a        className = "bottom-nav-link tiktok-footer-link"         href = {rickrollURL}>
    
            </a>
            <a        className = "bottom-nav-link youtube-footer-link"        href = {rickrollURL}>
    
            </a>
            <a        className = "bottom-nav-link facebook-footer-link"       href = {rickrollURL}>
    
            </a>
            <a        className = "bottom-nav-link pinterest-footer-link"      href = {rickrollURL}>
    
            </a>
          </article>
        </section>
      </footer>
    </>
  );
}

export default HomeFooter;