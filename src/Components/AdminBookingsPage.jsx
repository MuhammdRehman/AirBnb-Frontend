import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminBookingsPage.css';
import Navbar from './Navbar';

const AdminBookingsPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch bookings data when component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/bookings');
                setBookings(response.data);
            } catch (error) {
                setError('An error occurred while fetching bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);
    const handleListing = (id) => {
        navigate(`/listings/${id}`);
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
        <Navbar />
        <div className="admin-bookings-page">
            <h1>All Bookings History</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="bookings-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Listing</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                            <th>Amount Per Night</th>
                            <th>Amenities</th>
                            <th>See Listings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => {
                            const { userId, listingId, checkIn, checkOut, _id } = booking;
                            return (
                                <tr key={_id}>
                                    <td>{userId ? userId.username : 'N/A'}</td>
                                    <td>{listingId ? listingId.name : 'N/A'}</td>
                                    <td>{new Date(checkIn).toLocaleDateString()}</td>
                                    <td>{new Date(checkOut).toLocaleDateString()}</td>
                                    <td>${listingId ? listingId.price  : 'N/A'}</td>
                                    <td>
                                        {listingId ? (
                                            <ul>
                                                {listingId.amenities.map((amenity, index) => (
                                                    <li key={index}>{amenity}</li>
                                                ))}
                                            </ul>
                                        ) : 'N/A'}
                                    </td>
                                    <td>
                                        {listingId ? (<button onClick={() => handleListing(listingId._id)}>See Listing</button>) : 'N/A'}

                                    </td>
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

export default AdminBookingsPage;
