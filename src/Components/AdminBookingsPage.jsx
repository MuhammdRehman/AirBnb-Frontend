import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminBookingsPage.css';
import Navbar from './Navbar';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
const AdminBookingsPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthStore();
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            role: user.role,
        }
    };
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const url = user.role === "admin" ? 'http://localhost:3001/api/admin/bookings' : `http://localhost:3001/api/host/bookings/${user._id}`;
                const response = await axios.get(url, config);
                if (response.status === 200) {
                    setBookings(response.data);
                }

            } catch (error) {
                if (response.status === 404) {
                    setError('There are no bookings yet...');
                }
                else {
                    setError('An error occurred while fetching bookings.');
                }
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
        toast.error(error);
        return;
    }

    return (
        <>
            <Navbar />
            <div className="admin-bookings-page">
                <h1 style={{ color: 'rgb(238, 62, 59)' }}>All Bookings History</h1>
                {bookings.length === 0 ? (
                    <p>Still there is No Booking made for your property.</p>
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
                                        <td>${listingId ? listingId.price : 'N/A'}</td>
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
                                            {listingId ? (<button className='button' onClick={() => handleListing(listingId._id)}>See Listing</button>) : 'N/A'}

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
