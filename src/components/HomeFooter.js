import './HomeFooter.css';
import logoWhite from '../logowhite.png';
import LemonLink from './LemonLink';

function HomeFooter() {
  const logoWhiteAlt                        = "Little Lemon monochrome logo";
  const twitterURL                          = "https://twitter.com/littlelemonchicago";
  const instagramURL                        = "https://www.instagram.com/littlelemonchicago/";
  const tiktokURL                           = "https://www.tiktok.com/@littlelemonchicago";
  const youtubeURL                          = "https://www.youtube.com/@littlelemonchicago";
  const facebookURL                         = "https://www.facebook.com/littlelemonchicago/";
  const pinterestURL                        = "https://www.pinterest.es/littlelemonchicago/";

  return (
    <>
      <footer>
        <figure>
          <img        className = "footer-image-img"                            src = {logoWhite}             alt = {logoWhiteAlt} />
        </figure>
        <section>
          <article>
            <h3>Navigation</h3>
            <LemonLink linkLocation = 'footer'        linkType = 'home-footer'     url = '/' />
            <LemonLink linkLocation = 'footer'        linkType = 'about-footer'    url = '/about' />
            <LemonLink linkLocation = 'footer'        linkType = 'menu-footer'     url = '/menu' />
            <LemonLink linkLocation = 'footer'        linkType = 'reserve-footer'  url = '/reserve' />
            <LemonLink linkLocation = 'footer'        linkType = 'order-footer'    url = '/order' />
            <LemonLink linkLocation = 'footer'        linkType = 'login-footer'    url = '/login' />
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
            <LemonLink linkLocation = 'footer'        linkType = 'twitter'          url = {twitterURL} />
            <LemonLink linkLocation = 'footer'        linkType = 'instagram'        url = {instagramURL} />
            <LemonLink linkLocation = 'footer'        linkType = 'tiktok'           url = {tiktokURL} />
            <LemonLink linkLocation = 'footer'        linkType = 'youtube'          url = {youtubeURL} />
            <LemonLink linkLocation = 'footer'        linkType = 'facebook'         url = {facebookURL} />
            <LemonLink linkLocation = 'footer'        linkType = 'pinterest'        url = {pinterestURL} />
          </article>
        </section>
      </footer>
    </>
  );
}

export default HomeFooter;