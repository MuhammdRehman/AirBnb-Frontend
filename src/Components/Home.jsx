import ListingsGrid from './ListingsGrid';
import '../Styles/Listingcards.css';
import Navbar from './Navbar';
import HorizontalScrollList from './HorizontalScrollList';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Home = ({ category }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const handleListing = () => {
    navigate("/listingform");
  }
  const handleBooking = () => {
    navigate("/bookings");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <HorizontalScrollList />
      <div style={{ display: 'flex', flexDirection:'column', gap: '5px' }}>
        {user && user.role !== "guest" && <button className='button' onClick={handleListing}>Add Listing</button>}
        {user && user.role !== "guest" && <button className='button' onClick={handleBooking}>See All Bookings</button>}
      </div>
      <ListingsGrid category={category} />
      <Footer />
    </div>

  )
}

export default Home;
