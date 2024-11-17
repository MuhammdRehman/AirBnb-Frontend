import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ListingDetails from './Components/ListingDetails'; 
import BookingPage from './Components/BookingPage';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/booking/:id" element={<BookingPage />} />
      </Routes>
     
    </Router>
  );
}

export default App;
