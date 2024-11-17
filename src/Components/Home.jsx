import ListingsGrid from './ListingCards';
import '../Styles/Listingcards.css'; // Import the CSS file
import Navbar from './Navbar';
import HorizontalScrollList from './HorizontalScrollList';
import Footer from './Footer';

const Home = ({ category }) => {
    return (
        <>
            <Navbar />
            <HorizontalScrollList />
            <div className='home'>
                <ListingsGrid category={category} />
            </div>
            <Footer />
        </>
    )
}

export default Home;
