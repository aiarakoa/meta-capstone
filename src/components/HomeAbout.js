import './HomeAbout.css';
import marioImage from '../mario.jpg';
import marioAdrianoImage from '../mario-adriano-b.jpg';

function HomeAbout() {
    const marioAlt                            = "Mario at work";
    const marioAdrianoAlt                     = "Mario and Adriano at work";
    return (
        <>
            <section            className = "home-about">
                <article        className = "home-about-article home-about-text">
                    <h2>
                        Little Lemon
                    </h2>
                    <h3>
                        Chicago
                    </h3>
                    <blockquote>
                        <p><em>“Grandma Carmelina moved to Chicago from Scandriglia and married a Greek cook, Theofanis. Together, they established Little Lemon in 1960.</em></p>
                        <p><em>Together with my husband Mario, we honoured their legacy with an overhauled set of Mediterranean recipes that combine good old tradition and modern tastes, having healthy lifestyles in mind. If you know us, come and discover our new specials. If you don’t, come by and you will come back”</em></p>
                    </blockquote>
                    <p>
                        - Adriano Pancioni, Little Lemon's co-owner
                    </p>
                </article>
                <article        className = "home-about-article home-about-image">
                    <figure     className = "home-about-figure home-about-figure-left" role = "none">
                        <img    className = "home-about-image-img"       src = {marioImage}             alt = {marioAlt} />
                    </figure>
                    <figure     className = "home-about-figure home-about-figure-right" role = "none">
                        <img    className = "home-about-image-img"       src = {marioAdrianoImage}      alt = {marioAdrianoAlt} />
                    </figure>
                </article>
            </section>
        </>
    );
}

export default HomeAbout;