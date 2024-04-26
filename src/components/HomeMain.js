import './HomeMain.css';
import HomeHero from './HomeHero';
import HomeHighlights from './HomeHighlights';
import HomeTestimonials from './HomeTestimonials';
import HomeAbout from './HomeAbout';

function HomeMain() {
    return (
        <>
            <main id = "main" className = "home-main">
                <HomeHero />
                <HomeHighlights />
                <HomeTestimonials />
                <HomeAbout />
            </main>
        </>
    );
}

export default HomeMain;