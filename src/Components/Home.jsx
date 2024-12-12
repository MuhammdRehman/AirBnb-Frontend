import ListingsGrid from './ListingsGrid';
import '../Styles/Listingcards.css'; // Import the CSS file
import Navbar from './Navbar';
import HorizontalScrollList from './HorizontalScrollList';
import Footer from './Footer';

const Home = ({ category }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <HorizontalScrollList />
        <ListingsGrid category={category} />
        <Footer />
      </div>

    )
}

export default Home;
