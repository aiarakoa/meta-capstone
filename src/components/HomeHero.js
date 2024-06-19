import heroImage from '../hero-image.jpg';
import {useNavigate} from 'react-router-dom';

function HomeHero() {
    const heroImageAlt                          =   "Hungry yet?";
    const goTo                                  =   useNavigate();
    const goReserve                             =   () => goTo('/reserve');
    return (
        <>
            <section            className = "home-hero">
                <article        className = "home-hero-article home-hero-text">
                    <h2>
                        Little Lemon
                    </h2>
                    <h4>
                        Chicago
                    </h4>
                    <p>
                        We are a family owned restaurant, focused on traditional Mediterranean recipes served with a modern twist.
                    </p>
                    <button onClick = {goReserve}>
                        Reserve a table
                    </button>
                </article>
                <article        className = "home-hero-article home-hero-image">
                    <figure     className = "home-hero-figure">
                        <img    className = "home-hero-image-img"       src = {heroImage}    alt = {heroImageAlt} />
                    </figure>
                </article>
            </section>
        </>
    );
}

export default HomeHero;