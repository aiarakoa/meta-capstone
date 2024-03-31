import heroImage from '../hero-image.jpg';

function HomeHero() {
    const heroImageAlt                        = "Hungry yet?";
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
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </p>
                    <button>
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