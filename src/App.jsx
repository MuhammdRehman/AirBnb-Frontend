import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HorizontalScrollList from './Components/HorizontalScrollList';
import Home from './Components/Home';
import Footer from './Components/Footer';

function App() {
  const [category, setCategory] = useState('');
  return (
    <Router>
      <Navbar setCategory={setCategory} />
      <HorizontalScrollList setCategory={setCategory}/>
      <Home setCategory={setCategory} />
      
      <Footer/>
    </Router>
  );
}

export default App;
