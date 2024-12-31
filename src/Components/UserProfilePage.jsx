import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/UserProfilePage.css';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
const UserProfilePage = () => {
    const { user } = useAuthStore();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loggedInUserId = user._id;
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsResponse = await axios.get(
                    `http://localhost:3001/api/listings/bookings/${loggedInUserId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            role: user.role,
                        },
                    }
                );
                if (bookingsResponse.status === 200) {
                    setBookings(bookingsResponse.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError("Oops!!! You have not made any booking still");
                } else {
                    setError(error.message || "Something went wrong!");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [loggedInUserId]);



    if (loading) {
        <div>Loading...</div>;
        return;
    }

    if (error) {
        toast.error(error);
        navigate('/');
        return;
    }
    return (
        <>
            <Navbar />
            <div className="user-profile-page">
                <h1>Your Bookings</h1>
                {bookings.length === 0 ? (
                    <p>You haven't made any bookings yet.</p>
                ) : (
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Listing</th>
                                <th>Check-in Date</th>
                                <th>Check-out Date</th>
                                <th>Amount</th>
                                <th>Listing Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => {
                                const { listingId, checkIn, checkOut, price, _id } = booking;
                                console.log(booking);
                                return (
                                    <tr key={_id}>
                                        <td>{listingId ? listingId.name : 'N/A'}</td>
                                        <td>{new Date(checkIn).toLocaleDateString()}</td>
                                        <td>{new Date(checkOut).toLocaleDateString()}</td>
                                        <td>${price}</td>
                                        <td><button className='button' style={{ backgroundColor: 'brown' }} onClick={e => { e.stopPropagation(); navigate(`/listings/${listingId._id}`); }}>View</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default UserProfilePage;
