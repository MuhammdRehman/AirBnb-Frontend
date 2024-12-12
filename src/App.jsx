import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import ListingDetails from './Components/ListingDetails'; 
import BookingPage from './Components/BookingPage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import {useAuthStore} from './store/useAuthStore';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const {user,setUser,Logout} = useAuthStore();
  useEffect(() => {
    handleLoginBack();
  },[]);
  const handleLoginBack = async()=>{
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const res = await axios.get('http://localhost:3001/api/auth/me',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  
  
  return (
      <Routes>
        <Route path='/login' element={
          user ? <Navigate to='/' /> : <LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>

        <Route path="/" element={
          user ? <Home /> : <Navigate to='/login'/>} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/bookings/:id" element={<BookingPage />} />
      </Routes>
  );
}

export default App;
