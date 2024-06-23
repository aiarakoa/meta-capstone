import './HomeTestimonials.css';
import Testimonial from './Testimonial';
import {useState} from 'react';

function HomeTestimonials() {
    const userNames                     =   ['Bérénice', 'Clifford', 'Ibrahima', 'Tilly', 'Sarai'];
    const [userIndex, setUserIndex]     =   useState(0);
    const shiftTestimonialsLeft         =   () => {
        setUserIndex(userIndex + 1);
    }

    const shiftTestimonialsRight        =   () => {
        setUserIndex(userIndex - 1);
    }

    const evaluateUserName              =   (offset) => {
        return userNames[evaluateUserRealIndex(offset)];
    }

    const evaluateUserRealIndex         =   (offset) => {
        return (((userIndex + offset) % userNames.length) + userNames.length) % userNames.length;
    }

    return (
        <>
            <section            className   =   "home-testimonials">
                <h3>
                    Testimonials
                </h3>
                <button         className   =   "home-testimonials-left-arrow"      aria-label  =   "Click to access a new testimonial to the left"
                                onClick     =   {shiftTestimonialsLeft}>
                    
                </button>
                <Testimonial    userName = {evaluateUserName(0)} />
                <Testimonial    userName = {evaluateUserName(1)} />
                <Testimonial    userName = {evaluateUserName(2)} />
                <Testimonial    userName = {evaluateUserName(3)} />
                <button         className   =   "home-testimonials-right-arrow"     aria-label  =   "Click to access a new testimonial to the right"
                                onClick     =   {shiftTestimonialsRight}>

                </button>
            </section>
        </>
    );
}

export default HomeTestimonials;