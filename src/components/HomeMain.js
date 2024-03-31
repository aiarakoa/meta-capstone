import './HomeMain.css';
import heroImage from '../hero-image.jpg';
import greekSaladImage from '../greek-salad.jpg';
import bruschettaImage from '../bruschetta.jpg';
import lemonPieImage from '../lemon-pie.jpg';
import deliveryImage from '../delivery.png';
import bereniceImage from '../persona-berenice.png';
import cliffordImage from '../persona-clifford.png';
import ibrahimaImage from '../persona-ibrahima.png';
import tillyImage from '../persona-tilly.png';
import marioImage from '../mario.jpg';
import marioAdrianoImage from '../mario-adriano-b.jpg';

function HomeMain() {
    const heroImageAlt                        = "Hungry yet?";
    const greekSaladAlt                       = "Greek salad";
    const bruschettaAlt                       = "Bruschetta";
    const lemonPieAlt                         = "Lemon dessert";
    const deliveryAlt                         = "Delivery";
    const bereniceAlt                         = "Meet Bérénice";
    const cliffordAlt                         = "Meet Clifford";
    const ibrahimaAlt                         = "Meet Ibrahima";
    const tillyAlt                            = "Meet Tilly";
    const marioAlt                            = "Mario at work";
    const marioAdrianoAlt                     = "Mario and Adriano at work";
    return (
        <>
            <main>
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
                <section            className = "home-highlights">
                    <h3>
                        This Week's Specials!
                    </h3>
                    <button>
                        Order online!
                    </button>
                    <article        className = "home-highlights-special-card home-highlights-greek-bg">
                        <figure     className = "home-highlights-dish-figure">
                            <img    className = "home-highlights-dish-img"          src = {greekSaladImage}    alt = {greekSaladAlt} />
                        </figure>
                        <h4>
                            <span className = "h4-left">Greek Salad</span> <span className = "h4-right">$12.99</span>
                        </h4>
                        <p>
                            The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.
                        </p>
                        <figure     className = "home-highlights-delivery-figure">
                            <figcaption>
                                Order a delivery
                            </figcaption>
                            <img    className = "home-highlights-delivery-img"       src = {deliveryImage}      alt = {deliveryAlt} />
                        </figure>
                    </article>
                    <article        className = "home-highlights-special-card home-highlights-bruschetta-bg">
                        <figure     className = "home-highlights-dish-figure">
                            <img    className = "home-highlights-dish-img"          src = {bruschettaImage}     alt = {bruschettaAlt} />
                        </figure>
                        <h4>
                            <span className = "h4-left">Bruschetta</span> <span className = "h4-right">$5.99</span>
                        </h4>
                        <p>
                            Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.
                        </p>
                        <figure     className = "home-highlights-delivery-figure">
                            <figcaption>
                                Order a delivery
                            </figcaption>
                            <img    className = "home-highlights-delivery-img"       src = {deliveryImage}      alt = {deliveryAlt} />
                        </figure>
                    </article>
                    <article        className = "home-highlights-special-card home-highlights-lemon-bg">
                        <figure     className = "home-highlights-dish-figure">
                            <img    className = "home-highlights-dish-img"          src = {lemonPieImage}       alt = {lemonPieAlt} />
                        </figure>
                        <h4>
                            <span className = "h4-left">Lemon Dessert</span> <span className = "h4-right">$5.00</span>
                        </h4>
                        <p>
                            This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.
                        </p>
                        <figure     className = "home-highlights-delivery-figure">
                            <figcaption>
                                Order a delivery
                            </figcaption>
                            <img    className = "home-highlights-delivery-img"      src = {deliveryImage}       alt = {deliveryAlt} />
                        </figure>
                    </article>
                </section>
                <section            className = "home-testimonials">
                    <h3>
                        Testimonials
                    </h3>
                    <button         className = "home-testimonials-left-arrow">
                        
                    </button>
                    <article        className = "home-testimonials-review home-testimonials-berenice">
                        <figure     className = "home-testimonials-review-figure">
                            <img    className = "home-testimonials-review-img"      src = {bereniceImage}       alt = {bereniceAlt} />
                        </figure>
                        <h5>
                            Bérénice
                        </h5>
                        <p>
                            <em>“Their vegan offer is amazing. In addition, it’s so easy to reserve a table with them, I can always get what I need. They treat their customers with love, feeding our bellies and souls"</em>
                        </p>
                    </article>
                    <article        className = "home-testimonials-review home-testimonials-clifford">
                        <figure     className = "home-testimonials-review-figure">
                            <img    className = "home-testimonials-review-img"      src = {cliffordImage}       alt = {cliffordAlt} />
                        </figure>
                        <h5>
                            Clifford
                        </h5>
                        <p>
                            <em>“I enjoy eating at Little Lemon but, as I have a sweet tooth, what I love the most is their desserts, especially that lemon pie... I swear I’ll steal their recipe to bake it at home! xD I love these guys :-D”</em>
                        </p>
                    </article>
                    <article        className = "home-testimonials-review home-testimonials-ibrahima">
                        <figure     className = "home-testimonials-review-figure">
                            <img    className = "home-testimonials-review-img"      src = {ibrahimaImage}       alt = {ibrahimaAlt} />
                        </figure>
                        <h5>
                            Ibrahima
                        </h5>
                        <p>
                            <em>“Love their Mediterranean food, especially fish, and they always have good offers for frequent customers. Their delivery service is top notch, they got a client for life in me!”</em>
                        </p>
                    </article>
                    <article        className = "home-testimonials-review home-testimonials-tilly">
                        <figure     className = "home-testimonials-review-figure">
                            <img    className = "home-testimonials-review-img"      src = {tillyImage}          alt = {tillyAlt} />
                        </figure>
                        <h5>
                            Tilly
                        </h5>
                        <p>
                            <em>“Delicious food and the best delivery service in Chicago, so easy to order online, so fast to deliver! And food comes as if it were just been taken out of the kitchen, superb!”</em>
                        </p>
                    </article>
                    <button         className = "home-testimonials-right-arrow">

                    </button>
                </section>
                <section            className = "home-about">
                    <article        className = "home-about-article home-about-text">
                        <h2>
                            Little Lemon
                        </h2>
                        <h4>
                            Chicago
                        </h4>
                        <blockquote>
                            <em>
                                <p>“Grandma Carmelina moved to Chicago from Scandriglia and married a Greek cook, Theofanis. Together, they established Little Lemon in 1960.</p>

                                <p>Together with my husband Mario, we honoured their legacy with an overhauled set of Mediterranean recipes that combine good old tradition and modern tastes, having healthy lifestyles in mind. If you know us, come and discover our new specials. If you don’t, come by and you will come back”</p>
                            </em>
                        </blockquote>
                        <p>
                            - Adriano Pancioni, Little Lemon's co-owner
                        </p>
                    </article>
                    <article        className = "home-about-article home-about-image">
                        <figure     className = "home-about-figure home-about-figure-left">
                            <img    className = "home-about-image-img"       src = {marioImage}             alt = {marioAlt} />
                        </figure>
                        <figure     className = "home-about-figure home-about-figure-right">
                            <img    className = "home-about-image-img"       src = {marioAdrianoImage}      alt = {marioAdrianoAlt} />
                        </figure>
                    </article>
                </section>
            </main>
        </>
    );
}

export default HomeMain;