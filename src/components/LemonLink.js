import './LemonLink.css';
import {Link} from 'react-router-dom';

function LemonLink(props) {
    const linkLocations = {'header': 'top-nav-link', 'footer': 'bottom-nav-link'}
    const linkTypes = {
        'home': 'home-link', 'about': 'about-link', 'menu': 'menu-link', 'reserve': 'reserve-link', 'order': 'order-link', 'login': 'login-link',
        'home-footer': 'home-footer-link', 'about-footer': 'about-footer-link', 'menu-footer': 'menu-footer-link', 'reserve-footer': 'reserve-footer-link',
        'order-footer': 'order-footer-link', 'login-footer': 'login-footer-link', 'twitter': 'twitter-footer-link', 'instagram': 'instagram-footer-link',
        'tiktok': 'tiktok-footer-link', 'youtube': 'youtube-footer-link', 'facebook': 'facebook-footer-link', 'pinterest': 'pinterest-footer-link'
    }
    return (
        <>
            <Link to = {`${props.url}`} className = {`${linkLocations[props.linkLocation]} ${linkTypes[props.linkType]}`}><span class = 'empty-link-no-more'>{props.linkType}</span></Link>
        </>
    );
}

export default LemonLink;