import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home'; 
import Footer from './Components/Footer';

function App() {
  const [category, setCategory] = useState('');
  return (
    <Router>
      <Navbar setCategory={setCategory} />
      <Home category={category} />
      <Footer/>
    </Router>
  );
}

export default App;
