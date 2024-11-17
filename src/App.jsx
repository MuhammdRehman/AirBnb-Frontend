import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HorizontalScrollList from './Components/HorizontalScrollList';
import Home from './Components/Home';
import Footer from './Components/Footer';
import ListingDetails from './Components/ListingDetails'; 

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>
     
    </Router>
  );
}

export default App;
