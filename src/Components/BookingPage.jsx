import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListingsCard from './ListingsCard';
import '../Styles/BookingPage.css';

const BookingPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/api/listings/${id}`)
            .then((response) => {
                setListing(response.data);
            })
            .catch((err) => {
                console.error('Error fetching listing:', err);
                alert('Failed to load listing details. Please try again.');
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate dates
        if (new Date(checkIn) >= new Date(checkOut)) {
            setError('Check-in date must be earlier than the Check-out date.');
            setSuccess('');
            return;
        }

        try {
            const response = await axios.post(`/api/bookings/${id}`, {
                checkIn,
                checkOut,
            });

            console.log('Booking Successful:', response.data);
            setSuccess('Booking Successful!');
            setError('');
        } catch (err) {
            console.error('Error making booking:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to complete booking.');
            setSuccess('');
        }
    };

    return (
        <div className="booking-page">
            <h1>Booking Details</h1>

            {listing ? (
                <div className="listing-section">
                    <ListingsCard listing={listing} onClick={() => { }} fromBooking={true} />
                </div>
            ) : (
                <p>Loading listing details...</p>
            )}

            <form onSubmit={handleSubmit}>
                <div className="booking-form">
                    <h2>Book Your Stay</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <label>
                        Check-in Date:
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </label>

                    <label>
                        Check-out Date:
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </label>

                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default BookingPage;
