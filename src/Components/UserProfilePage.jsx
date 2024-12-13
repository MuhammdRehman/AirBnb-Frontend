import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/UserProfilePage.css'; 
import { useAuthStore } from '../store/useAuthStore';

const UserProfilePage = () => {
    const {user} = useAuthStore();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    const loggedInUserId = user._id;
   
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsResponse = await axios.get(`http://localhost:3001/api/listings/bookings/${loggedInUserId}`);
                setBookings(bookingsResponse.data);
            } catch (error) {
                setError('An error occurred while fetching bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [loggedInUserId]);

   

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
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
                            
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => {
                            const { listingId, checkIn, checkOut, amount, _id } = booking;
                            console.log(booking);
                            return (
                                <tr key={_id}>
                                    <td>{listingId ? listingId.name : 'N/A'}</td>
                                    <td>{new Date(checkIn).toLocaleDateString()}</td>
                                    <td>{new Date(checkOut).toLocaleDateString()}</td>
                                    <td>${amount}</td>
                                   
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserProfilePage;
