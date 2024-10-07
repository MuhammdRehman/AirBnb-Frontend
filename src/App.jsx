import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar';


function App() {
  const [category, setCategory] = useState('');
  return (
    <Router>
      <Navbar setCategory={setCategory} />
    </Router>
  );
}

export default App;
