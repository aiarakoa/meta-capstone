import './Testimonial.css';
import bereniceImage from '../persona-berenice.png';
import cliffordImage from '../persona-clifford.png';
import ibrahimaImage from '../persona-ibrahima.png';
import saraiImage from '../persona-sarai.png';
import tillyImage from '../persona-tilly.png';

function Testimonial(props) {
    const images        = {'Bérénice': bereniceImage, 'Clifford': cliffordImage, 'Ibrahima': ibrahimaImage, 'Tilly': tillyImage, 'Sarai': saraiImage};
    const altTexts      = {'Bérénice': 'Meet Bérénice', 'Clifford': 'Meet Clifford', 'Ibrahima': 'Meet Ibrahima', 'Tilly': 'Meet Tilly', 'Sarai': 'Meet Sarai'};
    const reviewTexts   = {
        'Bérénice': "“Their vegan offer is amazing. In addition, it’s so easy to reserve a table with them, I can always get what I need. They treat their customers with love, feeding our bellies and souls”",
        'Clifford': "“I enjoy eating at Little Lemon but, as I have a sweet tooth, what I love the most is their desserts, especially that lemon pie... I swear I’ll steal their recipe to bake it at home! xD I love these guys :-D”",
        'Ibrahima': "“Love their Mediterranean food, especially fish, and they always have good offers for frequent customers. Their delivery service is top notch, they got a client for life in me!”",
        'Tilly': "“Delicious food and the best delivery service in Chicago, so easy to order online, so fast to deliver! And food comes as if it were just been taken out of the kitchen, superb!”",
        'Sarai': "“Every time I eat their food is like being at home in Spain, it is so authentic and savory... and I eat there more often than I expected because they have affordable menus and great offers”",
    }
    return (
        <>
            <article        className = "home-testimonials-review">
                <figure     className = "home-testimonials-review-figure" role = "none">
                    <img    className = "home-testimonials-review-img"      src = {images[props.userName]}       alt = {altTexts[props.userName]} />
                </figure>
                <h5>
                    {props.userName}
                </h5>
                <p>
                    <em>{reviewTexts[props.userName]}</em>
                </p>
            </article>
        </>
    );
}

export default Testimonial;