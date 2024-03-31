import SpecialHighlight from './SpecialHighlight';

function HomeHighlights() {
    return (
        <>
            <section            className = "home-highlights">
                <h3>
                    This Week's Specials!
                </h3>
                <button>
                    Order online!
                </button>
                <SpecialHighlight specialName = 'Greek salad' />
                <SpecialHighlight specialName = 'Bruschetta' />
                <SpecialHighlight specialName = 'Lemon dessert' />
            </section>
        </>
    );
}

export default HomeHighlights;