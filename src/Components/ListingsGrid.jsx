import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListingsCard from './ListingsCard'; // Assuming ListingCard is in the same folder

const ListingsGrid = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/api/listings')
            .then(response => {
                setListings(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load listings. Please try again later.');
                setLoading(false);
            });
    }, []);

    const handleCardClick = (id) => {
        navigate(`/listing/${id}`);
    };

    const handleBookNowClick = (id) => {
        navigate(`/booking/${id}`);
    };

    if (loading) {
        return <p>Loading listings...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="listings-grid">
            {listings.length > 0 ? (
                listings.map(listing => (
                    <ListingsCard
                        key={listing.id}
                        listing={listing}
                        onClick={handleCardClick}
                        onBookNow={handleBookNowClick}
                        fromBooking={false}
                    />
                ))
            ) : (
                <p>No listings available.</p>
            )}
        </div>
    );
};

export default ListingsGrid;
