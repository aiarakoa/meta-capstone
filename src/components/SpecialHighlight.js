import greekSaladImage from '../greek-salad.jpg';
import bruschettaImage from '../bruschetta.jpg';
import lemonPieImage from '../lemon-pie.jpg';
import deliveryImage from '../delivery.png';

function SpecialHighlight(props) {
    const images            = {'Greek salad': greekSaladImage, 'Bruschetta': bruschettaImage, 'Lemon dessert': lemonPieImage, 'Delivery': deliveryImage};
    const altTexts          = {'Greek salad': 'Greek salad', 'Bruschetta': 'Bruschetta', 'Lemon dessert': 'Lemon dessert', 'Delivery': 'Delivery'};
    const highlightTexts    = {
        'Greek salad': "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
        'Bruschetta': "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
        'Lemon dessert': "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
    }
    const prices            = {'Greek salad': '$5.99', 'Bruschetta': '$12.99', 'Lemon dessert': '$5.00'};
    return (
        <>
            <article        className = "home-highlights-special-card home-highlights-greek-bg">
                <figure     className = "home-highlights-dish-figure" role = "none">
                    <img    className = "home-highlights-dish-img"          src = {images[props.specialName]}    alt = {altTexts[props.specialName]} />
                </figure>
                <h4>
                    <span className = "h4-left">{props.specialName}</span> <span className = "h4-right">{prices[props.specialName]}</span>
                </h4>
                <p>
                    {highlightTexts[props.specialName]}
                </p>
                <figure     className = "home-highlights-delivery-figure">
                    <figcaption>
                        Order a delivery
                    </figcaption>
                    <img    className = "home-highlights-delivery-img"       src = {images['Delivery']}      alt = {altTexts['Delivery']} />
                </figure>
            </article>
        </>
    );
}

export default SpecialHighlight;