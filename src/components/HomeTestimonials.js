import Testimonial from './Testimonial';

function HomeTestimonials() {
    return (
        <>
            <section            className = "home-testimonials">
                <h3>
                    Testimonials
                </h3>
                <button         className = "home-testimonials-left-arrow"      aria-label = "Click to access a new testimonial to the left">
                    
                </button>
                <Testimonial    userName = 'Bérénice' />
                <Testimonial    userName = 'Clifford' />
                <Testimonial    userName = 'Ibrahima' />
                <Testimonial    userName = 'Tilly' />
                <button         className = "home-testimonials-right-arrow"     aria-label = "Click to access a new testimonial to the right">

                </button>
            </section>
        </>
    );
}

export default HomeTestimonials;