import ListingsGrid from './ListingCards';
import '../Styles/Listingcards.css'; // Import the CSS file


const Home = ({category}) => { 
    return (
        <div className='home'> 
            <ListingsGrid category={category} />
        </div>
    )
}

export default Home
